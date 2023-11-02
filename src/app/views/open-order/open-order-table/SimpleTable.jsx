import React, { useState } from 'react'
import { Table, TableHead, TableCell, TableBody, IconButton, TableRow, Chip } from '@mui/material'
import { Box, styled } from '@mui/system'
import PropTypes from 'prop-types'
import moment from 'moment'
import SwapVertIcon from '@mui/icons-material/SwapVert'
import DeleteIcon from '@mui/icons-material/Delete'
import { useSelector, useDispatch } from 'react-redux'
import { getOrders, closeOrder, changeOrderCommand } from 'app/redux/actions/OpenOrderAction'
import { useEffect } from 'react'
import { ConfirmationDialog } from 'app/components'

const OrderTableRow = styled(TableRow)(({ isGreen }) => ({
  backgroundColor: isGreen ? '#f0f9eb' : '#fef0f0'
}))

const OrderTableCell = styled(TableCell)(({ isGreen }) => ({
  color: isGreen ? '#67c23a' : '#f56c6c'
}))

const OrderChip = styled(Chip)(({ isGreen }) => ({
  color: isGreen ? '#67c23a' : '#f56c6c',
  borderColor: isGreen ? '#67c23a' : '#f56c6c',
  backgroundColor: isGreen ? '#f0f9eb' : '#fef0f0'
}))

const StyledTable = styled(Table)(() => ({
  whiteSpace: 'pre',
  '& thead': {
    '& tr': {
      '& th': {
        paddingLeft: 0,
        paddingRight: 0
      }
    }
  },
  '& tbody': {
    '& tr': {
      '& td': {
        paddingLeft: 0,
        textTransform: 'capitalize'
      }
    }
  }
}))

const SimpleTableBodyRow = ({
  order = {},
  index,
  onChangeOrderCommandClick,
  onCloseOrderClick
}) => {
  return (
    <OrderTableRow key={index} isGreen={order.orderCommand === 'BUY'}>
      <TableCell>
        {order.label.startsWith('ZXY') ? (
          <Chip label="ZXY" color="primary" size="small" />
        ) : (
          <Chip label="IVF" color="default" size="small" />
        )}
      </TableCell>
      <TableCell>{order.instrument}</TableCell>
      <TableCell>
        <OrderChip
          label={order.orderCommand}
          isGreen={order.orderCommand === 'BUY'}
          size="small"
          variant="outlined"
        />
      </TableCell>
      <TableCell>{order.openPrice}</TableCell>
      <TableCell>{order.originalAmount}</TableCell>
      <TableCell>{order.stopLossPrice}</TableCell>
      <OrderTableCell
        isGreen={
          ((order.orderCommand === 'BUY') & (order.profitLossInPips >= 0)) |
          ((order.orderCommand === 'SELL') & (order.profitLossInPips < 0))
        }
      >
        {order.profitLossInPips}
      </OrderTableCell>
      <OrderTableCell
        isGreen={
          ((order.orderCommand === 'BUY') & (order.profitLossInAccountCurrency >= 0)) |
          ((order.orderCommand === 'SELL') & (order.profitLossInAccountCurrency < 0))
        }
      >
        $ {order.profitLossInAccountCurrency}
      </OrderTableCell>
      <TableCell>{moment(order.fillTime).format('YYYY-MM-DD HH:mm:ss')}</TableCell>
      <TableCell>
        <IconButton
          size="small"
          color="warning"
          aria-label="swap order command"
          onClick={() => onChangeOrderCommandClick(order.id)}
        >
          <SwapVertIcon fontSize="inherit" />
        </IconButton>
        <IconButton
          size="small"
          color="warning"
          aria-label="delete order"
          onClick={() => onCloseOrderClick(order.id)}
        >
          <DeleteIcon fontSize="inherit" />
        </IconButton>
      </TableCell>
    </OrderTableRow>
  )
}
SimpleTableBodyRow.propTypes = {
  order: PropTypes.object.isRequired,
  index: PropTypes.number,
  onChangeOrderCommandClick: PropTypes.func,
  onCloseOrderClick: PropTypes.func
}

let openOrderLoaded = false

const SimpleTable = () => {
  const orderInit = {
    id: '',
    label: '',
    fillTime: 0,
    instrument: '',
    orderCommand: '',
    openPrice: 0,
    originalAmount: 0,
    profitLossInPips: 0,
    profitLossInAccountCurrency: 0,
    stopLossPrice: 0
  }
  const listInit = {
    order: {
      GBPUSD: orderInit,
      USDJPY: orderInit,
      GBPJPY: orderInit
    },
    orders: []
  }
  const [openDialog, setOpenDialog] = useState(false)
  const [list, setList] = useState(listInit)

  const openOrder = useSelector((state) => state.openOrder)
  const dispatch = useDispatch()

  if (!openOrderLoaded) {
    dispatch(getOrders())
    openOrderLoaded = true
  }

  useEffect(() => {
    setList(openOrder)
  }, [openOrder])

  const handleChangeOrderCommand = (orderId) => {
    dispatch(changeOrderCommand(orderId))
    setOpenDialog(true)
  }

  const handleCloseOrder = (orderId) => {
    dispatch(closeOrder(orderId))
    setOpenDialog(true)
  }

  return (
    <Box width="100%" overflow="auto">
      <StyledTable sx={{ minWidth: 900 }}>
        <TableHead>
          <TableRow>
            <TableCell>Label</TableCell>
            <TableCell>Instrument</TableCell>
            <TableCell>Command</TableCell>
            <TableCell>Open Price</TableCell>
            <TableCell>Amount</TableCell>
            <TableCell>Stop Loss</TableCell>
            <TableCell>Pips</TableCell>
            <TableCell>Currency</TableCell>
            <TableCell>Time</TableCell>
            <TableCell>Action</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {list.order &&
            Object.values(list.order).map((order, index) => (
              <SimpleTableBodyRow
                key={index}
                order={order}
                onChangeOrderCommandClick={() => handleChangeOrderCommand(order.id)}
                onCloseOrderClick={() => handleCloseOrder(order.id)}
              />
            ))}
          {list.orders &&
            list.orders.map((order, index) => (
              <SimpleTableBodyRow
                key={index}
                order={order}
                onChangeOrderCommandClick={() => handleChangeOrderCommand(order.id)}
                onCloseOrderClick={() => handleCloseOrder(order.id)}
              />
            ))}
        </TableBody>
      </StyledTable>
      <ConfirmationDialog
        open={openDialog}
        text="success"
        onYesClick={() => setOpenDialog(false)}
        onConfirmDialogClose={() => setOpenDialog(false)}
      />
    </Box>
  )
}

export default SimpleTable

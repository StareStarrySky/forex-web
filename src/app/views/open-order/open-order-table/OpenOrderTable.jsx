import React from 'react'
import { Breadcrumb } from 'app/components'
import { styled } from '@mui/system'
import SimpleTable from './SimpleTable'

const Container = styled('div')(({ theme }) => ({
  margin: '30px',
  [theme.breakpoints.down('sm')]: {
    margin: '16px'
  },
  '& .breadcrumb': {
    marginBottom: '30px',
    [theme.breakpoints.down('sm')]: {
      marginBottom: '16px'
    }
  }
}))

const OpenOrderTable = () => {
  return (
    <Container>
      <div className="breadcrumb">
        <Breadcrumb routeSegments={[{ name: 'OpenOrder' }]} />
      </div>
      <SimpleTable />
    </Container>
  )
}

export default OpenOrderTable

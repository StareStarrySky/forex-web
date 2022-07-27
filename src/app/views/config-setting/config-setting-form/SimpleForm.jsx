import {
  Button,
  Icon,
  Grid,
  FormControl,
  FormControlLabel,
  MenuItem,
  Switch,
  Box,
  Chip
} from '@mui/material'
import { styled } from '@mui/system'
import { Span } from 'app/components/Typography'
import { SimpleCard } from 'app/components'
import React, { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { ValidatorForm, TextValidator, SelectValidator } from 'react-material-ui-form-validator'
import { getConfigSetting, saveConfigSetting } from 'app/redux/actions/ConfigSettingAction'
import ConfirmationDialog from 'app/components/ConfirmationDialog/ConfirmationDialog'
import PropTypes from 'prop-types'

const TextField = styled(TextValidator)(() => ({
  width: '100%',
  marginBottom: '16px'
}))

const SelectField = styled(SelectValidator)(() => ({
  width: '100%',
  marginBottom: '16px'
}))

const InstrumentFormItem = ({ name = '', instrument = {}, onChange }) => {
  const instrumentNames = [
    { value: 'GBPUSD', label: 'GBP/USD' },
    { value: 'USDJPY', label: 'USD/JPY' },
    { value: 'GBPJPY', label: 'GBP/JPY' }
  ]

  const instrumentChange = (event) => {
    onChange?.({
      ...event,
      target: {
        name,
        value: {
          name: event.target.value
        }
      }
    })
  }

  return (
    <Box>
      <SelectField
        select
        onChange={instrumentChange}
        value={instrument.name}
        validators={['required']}
        label="instrument"
        errorMessages={['this field is required']}
      >
        {instrumentNames.map((option) => {
          return (
            <MenuItem key={option.value} value={option.value}>
              {option.label}
            </MenuItem>
          )
        })}
      </SelectField>
    </Box>
  )
}
InstrumentFormItem.propTypes = {
  name: PropTypes.string.isRequired,
  instrument: PropTypes.object.isRequired,
  onChange: PropTypes.func
}

const PassagewayFormItem = ({
  name = '',
  passageway = {},
  passageways = [],
  index = 0,
  onChange
}) => {
  let passagewayChange = () => {}
  if (name === 'curPassageway') {
    passagewayChange = (event) => {
      const value =
        event.target.name === 'top'
          ? { top: event.target.valueAsNumber, bottom: passageway.bottom }
          : { top: passageway.top, bottom: event.target.valueAsNumber }
      onChange?.({
        ...event,
        target: {
          name,
          value
        }
      })
    }
  } else if (name === 'passageways') {
    passagewayChange = (event) => {
      passageways[index] =
        event.target.name === 'top'
          ? { top: event.target.valueAsNumber, bottom: passageway.bottom }
          : { top: passageway.top, bottom: event.target.valueAsNumber }
      onChange?.({
        ...event,
        target: {
          name,
          value: passageways
        }
      })
    }
  }

  return (
    <Box
      sx={{
        border: 'solid 1px',
        borderColor: 'primary.light',
        borderRadius: '5px',
        padding: '5px'
      }}
    >
      <TextField
        label={name + '-' + (index + 1) + '.top'}
        onChange={passagewayChange}
        type="number"
        name="top"
        value={passageway.top || 0}
      />
      <TextField
        label={name + '-' + (index + 1) + '.bottom'}
        onChange={passagewayChange}
        type="number"
        name="bottom"
        value={passageway.bottom || 0}
      />
    </Box>
  )
}
PassagewayFormItem.propTypes = {
  name: PropTypes.string.isRequired,
  passageway: PropTypes.object.isRequired,
  passageways: PropTypes.array,
  index: PropTypes.number,
  onChange: PropTypes.func
}

const PassagewaysFormItem = ({ name = '', passageways = [], onChange }) => {
  const [passagewayList, setPassagewayList] = useState(passageways)

  const handleAdd = (event) => {
    passagewayList.push({ top: 0, bottom: 0 })
    setPassagewayList(passagewayList)

    onChange?.({
      ...event,
      target: {
        name,
        value: passagewayList
      }
    })
  }

  const handleRemove = (event, index) => {
    passagewayList.splice(index, 1)
    setPassagewayList(passagewayList)

    onChange?.({
      ...event,
      target: {
        name,
        value: passagewayList
      }
    })
  }

  return (
    <Box
      sx={{
        border: 'solid 1px',
        borderColor: 'primary.dark',
        borderRadius: '5px',
        padding: '5px'
      }}
    >
      {passagewayList.map((passageway, index) => {
        return (
          <Box key={index} sx={{ marginBottom: '10px' }}>
            <Button
              color="error"
              variant="outlined"
              onClick={(event) => handleRemove(event, index)}
            >
              <Icon>remove</Icon>
            </Button>
            <PassagewayFormItem
              name={name}
              otherName={'-' + index}
              index={index}
              passageway={passageway}
              passageways={passagewayList}
              onChange={onChange}
            />
          </Box>
        )
      })}
      <Box>
        <Button color="primary" variant="outlined" onClick={handleAdd}>
          <Icon>add</Icon>
        </Button>
        <Chip label={passagewayList.length} />
      </Box>
    </Box>
  )
}
PassagewaysFormItem.propTypes = {
  name: PropTypes.string.isRequired,
  passageways: PropTypes.array.isRequired,
  onChange: PropTypes.func
}

let configSettingListLoaded = false

const SimpleForm = () => {
  const [openDialog, setOpenDialog] = useState(false)
  const [formItem, setFormItem] = useState({
    instrument: {
      name: ''
    },
    canTrade: true,
    fuse: 4,
    curFuse: 0,
    bufferRandom: 8,
    tradeAmount: 0.001,
    passageways: [
      {
        top: 0,
        bottom: 0
      }
    ],
    curPassageway: {
      top: 0,
      bottom: 0
    }
  })

  const configSettingList = useSelector((state) => state.configSetting)
  const [form, setForm] = useState([])
  const dispatch = useDispatch()

  if (!configSettingListLoaded) {
    dispatch(getConfigSetting())
    configSettingListLoaded = true
  }

  useEffect(() => {
    setForm(configSettingList)
  }, [configSettingList])

  const handleSubmit = () => {
    dispatch(saveConfigSetting(form))
    setOpenDialog(true)
  }

  const handleChange = (event, index) => {
    // event.persist()
    const feild = event.target
    const newFormItem = {
      ...form[index],
      [feild.name]:
        feild.type === 'checkbox'
          ? feild.checked
          : feild.type === 'number'
          ? feild.valueAsNumber
          : feild.value
    }
    setFormItem(newFormItem)
    form[index] = newFormItem
    setForm(form)
  }

  const addFormItem = () => {
    setFormItem({ ...formItem })
    form.push(formItem)
    setForm(form)
  }

  const removeFormItem = (index) => {
    setFormItem({ ...formItem })
    form.splice(index, 1)
    setForm(form)
  }

  return (
    <div>
      <ValidatorForm onSubmit={handleSubmit} onError={() => null}>
        <Grid container spacing={12}>
          {form.map((configSetting, index) => {
            return (
              <Grid item lg={3} md={3} sm={12} xs={12} sx={{ mt: 2 }} key={index}>
                <Button color="error" variant="outlined" onClick={() => removeFormItem(index)}>
                  <Icon>remove</Icon>
                </Button>
                <SimpleCard title={configSetting.instrument.name}>
                  <InstrumentFormItem
                    name="instrument"
                    instrument={configSetting.instrument}
                    onChange={(event) => handleChange(event, index)}
                  />
                  <FormControl>
                    <FormControlLabel
                      control={
                        <Switch
                          checked={configSetting.canTrade}
                          onChange={(event) => handleChange(event, index)}
                          name="canTrade"
                        />
                      }
                      label="canTrade"
                      labelPlacement="start"
                    />
                  </FormControl>
                  <TextField
                    label="fuse"
                    onChange={(event) => handleChange(event, index)}
                    type="number"
                    name="fuse"
                    value={configSetting.fuse || 0}
                  />
                  <TextField
                    label="curFuse"
                    onChange={(event) => handleChange(event, index)}
                    type="number"
                    name="curFuse"
                    value={configSetting.curFuse || 0}
                  />
                  <TextField
                    label="bufferRandom"
                    onChange={(event) => handleChange(event, index)}
                    type="number"
                    name="bufferRandom"
                    value={configSetting.bufferRandom || 0}
                  />
                  <TextField
                    label="tradeAmount"
                    onChange={(event) => handleChange(event, index)}
                    type="number"
                    name="tradeAmount"
                    value={configSetting.tradeAmount || 0}
                    inputProps={{ step: 0.001 }}
                  />
                  <PassagewaysFormItem
                    name="passageways"
                    passageways={configSetting.passageways}
                    onChange={(event) => handleChange(event, index)}
                  />
                  <PassagewayFormItem
                    name="curPassageway"
                    passageway={configSetting.curPassageway}
                    onChange={(event) => handleChange(event, index)}
                  />
                </SimpleCard>
              </Grid>
            )
          })}
          <Grid item lg={3} md={3} sm={12} xs={12} sx={{ mt: 2 }}>
            <SimpleCard title="NEW">
              <Grid
                container
                direction="row"
                justifyContent="center"
                alignItems="center"
                sx={{ height: '100%', cursor: 'pointer' }}
                onClick={addFormItem}
              >
                <Icon>add</Icon>
              </Grid>
            </SimpleCard>
          </Grid>
        </Grid>
        <Button color="primary" variant="contained" type="submit">
          <Icon>send</Icon>
          <Span sx={{ pl: 1, textTransform: 'capitalize' }}>Submit</Span>
        </Button>
      </ValidatorForm>
      <ConfirmationDialog
        open={openDialog}
        text="success"
        onYesClick={() => setOpenDialog(false)}
      />
    </div>
  )
}

export default SimpleForm

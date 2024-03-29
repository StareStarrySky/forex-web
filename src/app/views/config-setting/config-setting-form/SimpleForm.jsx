import {
  Button,
  Icon,
  Grid,
  FormControl,
  FormControlLabel,
  MenuItem,
  Switch,
  Box,
  Chip,
  Snackbar,
  Alert
} from '@mui/material'
import { styled } from '@mui/system'
import AutorenewIcon from '@mui/icons-material/Autorenew'
import { Span } from 'app/components/Typography'
import { SimpleCard } from 'app/components'
import React, { useEffect, useRef, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { ValidatorForm, TextValidator, SelectValidator } from 'react-material-ui-form-validator'
import { getConfigSetting, saveConfigSetting } from 'app/redux/actions/ConfigSettingAction'
import PropTypes from 'prop-types'

const TextField = styled(TextValidator)(() => ({
  width: '100%',
  marginBottom: '16px'
}))

const SelectField = styled(SelectValidator)(() => ({
  width: '100%',
  marginBottom: '16px'
}))

const CircularButton = styled(Button)(({ theme }) => ({
  borderRadius: '50%',
  width: theme.spacing(4),
  minWidth: theme.spacing(4)
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
      const value = event.target.valueAsNumber
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
      passageways[index] = event.target.valueAsNumber
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
    <Box sx={{ padding: '5px' }}>
      <TextField
        label={name === 'passageways' ? name + '-' + (index + 1) : name}
        onChange={passagewayChange}
        type="number"
        name="passageway"
        value={passageway || 0}
      />
    </Box>
  )
}
PassagewayFormItem.propTypes = {
  name: PropTypes.string.isRequired,
  passageway: PropTypes.number.isRequired,
  passageways: PropTypes.array,
  index: PropTypes.number,
  onChange: PropTypes.func
}

const PassagewaysFormItem = ({ name = '', passageways = [], onChange }) => {
  const handleAdd = (event, index) => {
    passageways.splice(index + 1, 0, 0)

    onChange?.({
      ...event,
      target: {
        name,
        value: passageways
      }
    })
  }

  const handleRemove = (event, index) => {
    passageways.splice(index, 1)

    onChange?.({
      ...event,
      target: {
        name,
        value: passageways
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
      <Button color="primary" variant="outlined" onClick={(event) => handleAdd(event, -1)}>
        <Icon>add</Icon>
      </Button>
      {passageways.map((passageway, index) => {
        return (
          <Box key={index} sx={{ marginTop: '10px', marginBottom: '10px' }}>
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
              passageways={passageways}
              onChange={onChange}
            />
            <Button color="primary" variant="outlined" onClick={(event) => handleAdd(event, index)}>
              <Icon>add</Icon>
            </Button>
          </Box>
        )
      })}
      <Box>
        <Chip label={passageways.length} />
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
  const formItemInit = {
    instrument: {
      name: 'GBPJPY'
    },
    canTrade: true,
    fuse: 4,
    curFuse: 0,
    bufferRandom: 8,
    tradeAmount: 0.001,
    passageways: [0],
    curPassageway: 0
  }
  const [openSnackbar, setOpenSnackbar] = useState(false)
  const openSnackbarTrigger = useRef(false)
  const [formItem, setFormItem] = useState(formItemInit)

  const configSettingList = useSelector((state) => state.configSetting)
  const [form, setForm] = useState([])
  const dispatch = useDispatch()

  if (!configSettingListLoaded) {
    dispatch(getConfigSetting())
    configSettingListLoaded = true
  }

  useEffect(() => {
    setForm(configSettingList)
    if (openSnackbarTrigger.current) {
      setOpenSnackbar(true)
      openSnackbarTrigger.current = false
    }
  }, [configSettingList])

  const handleRenew = () => {
    dispatch(getConfigSetting())
    openSnackbarTrigger.current = true
  }

  const handleSubmit = () => {
    dispatch(saveConfigSetting(form))
    openSnackbarTrigger.current = true
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
    setFormItem(formItemInit)
    form.push(formItemInit)
    setForm(form)
  }

  const removeFormItem = (index) => {
    setFormItem(formItemInit)
    form.splice(index, 1)
    setForm(form)
  }

  return (
    <Box>
      <Box marginBottom={'8px'}>
        <CircularButton
          variant="contained"
          color="primary"
          size="small"
          aria-label="Renew"
          onClick={() => handleRenew()}
        >
          <AutorenewIcon>renew</AutorenewIcon>
        </CircularButton>
      </Box>
      <ValidatorForm onSubmit={handleSubmit} onError={() => null}>
        <Grid container spacing={12}>
          {form.map((configSetting, index) => {
            return (
              <Grid item lg={3} md={3} sm={12} xs={12} key={index}>
                <Grid>
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
              </Grid>
            )
          })}
          <Grid item lg={3} md={3} sm={12} xs={12}>
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
      <Snackbar
        anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
        open={openSnackbar}
        autoHideDuration={1000}
        onClose={() => setOpenSnackbar(false)}
      >
        <Alert severity="success">success</Alert>
      </Snackbar>
    </Box>
  )
}

export default SimpleForm

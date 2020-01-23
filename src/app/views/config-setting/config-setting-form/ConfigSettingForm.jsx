import React from 'react'
import SimpleForm from './SimpleForm'
import { Breadcrumb } from 'app/components'
import { styled } from '@mui/system'

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

const ConfigSettingForm = () => {
  return (
    <Container>
      <div className="breadcrumb">
        <Breadcrumb routeSegments={[{ name: 'ConfigSetting' }]} />
      </div>
      <SimpleForm />
    </Container>
  )
}

export default ConfigSettingForm

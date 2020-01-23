import {
  Card,
  Grid,
  Button,
  Checkbox,
  CircularProgress,
  FormControlLabel,
  Link
} from '@mui/material'
import React, { useState } from 'react'
import useAuth from 'app/hooks/useAuth'
import { useNavigate } from 'react-router-dom'
import { Box, styled, useTheme } from '@mui/system'
import { TextValidator, ValidatorForm } from 'react-material-ui-form-validator'
import { Paragraph, Span } from 'app/components/Typography'

const FlexBox = styled(Box)(() => ({
  display: 'flex',
  alignItems: 'center'
}))

const JustifyBox = styled(FlexBox)(() => ({
  justifyContent: 'space-evenly',
  flexDirection: 'column'
}))

const ContentBox = styled(Box)(() => ({
  height: '100%',
  padding: '32px',
  position: 'relative',
  background: 'rgba(0, 0, 0, 0.01)'
}))

const IMG = styled('img')(() => ({
  width: '100%'
}))

const JWTRoot = styled(JustifyBox)(() => ({
  background: '#1A2038',
  minHeight: '100% !important',
  '& .card': {
    maxWidth: 800,
    borderRadius: 12,
    margin: '1rem'
  }
}))

const StyledProgress = styled(CircularProgress)(() => ({
  position: 'absolute',
  top: '6px',
  left: '25px'
}))

const JwtLogin = () => {
  const navigate = useNavigate()
  const [loading, setLoading] = useState(false)
  const [userInfo, setUserInfo] = useState({
    email: '645810562@qq.com',
    password: 'root1'
  })
  const [message, setMessage] = useState('')
  const { login } = useAuth()

  const handleChange = ({ target: { name, value } }) => {
    let temp = { ...userInfo }
    temp[name] = value
    setUserInfo(temp)
  }

  const { palette } = useTheme()
  const textError = palette.error.main
  const textPrimary = palette.primary.main

  const handleFormSubmit = async (event) => {
    setLoading(true)
    try {
      await login(userInfo.email, userInfo.password)
      navigate('/')
    } catch (e) {
      console.log(e)
      setMessage(e.message)
      setLoading(false)
    }
  }

  return (
    <JWTRoot>
      <Card className="card">
        <Grid container>
          <Grid item lg={5} md={5} sm={5} xs={12}>
            <JustifyBox p={4} height="100%">
              <IMG src="/assets/images/illustrations/dreamer.svg" alt="" />
            </JustifyBox>
          </Grid>
          <Grid item lg={7} md={7} sm={7} xs={12}>
            <ContentBox>
              <ValidatorForm onSubmit={handleFormSubmit}>
                <TextValidator
                  sx={{ mb: 3, width: '100%' }}
                  variant="outlined"
                  size="small"
                  label="Email"
                  onChange={handleChange}
                  type="email"
                  name="email"
                  value={userInfo.email}
                  validators={['required', 'isEmail']}
                  errorMessages={['this field is required', 'email is not valid']}
                />
                <TextValidator
                  sx={{ mb: '12px', width: '100%' }}
                  label="Password"
                  variant="outlined"
                  size="small"
                  onChange={handleChange}
                  name="password"
                  type="password"
                  value={userInfo.password}
                  validators={['required']}
                  errorMessages={['this field is required']}
                />
                <FormControlLabel
                  sx={{ mb: '6px', maxWidth: 288 }}
                  name="agreement"
                  onChange={handleChange}
                  control={
                    <Checkbox
                      size="small"
                      onChange={({ target: { checked } }) =>
                        handleChange({
                          target: {
                            name: 'agreement',
                            value: checked
                          }
                        })
                      }
                      checked={userInfo.agreement || true}
                    />
                  }
                  label="Remeber me"
                />

                {message && <Paragraph sx={{ mb: '12px', color: textError }}>{message}</Paragraph>}

                <FlexBox mb={2} flexWrap="wrap">
                  <Box position="relative">
                    <Button variant="contained" color="primary" disabled={loading} type="submit">
                      Sign in
                    </Button>
                    {loading && <StyledProgress size={24} className="buttonProgress" />}
                  </Box>
                  <Span sx={{ mr: 1, ml: '20px' }}>or</Span>
                  <Button
                    sx={{ textTransform: 'capitalize' }}
                    onClick={() => navigate('/session/signup')}
                  >
                    Sign up
                  </Button>
                </FlexBox>
                <Button
                  sx={{ color: textPrimary }}
                  onClick={() => navigate('/session/forgot-password')}
                >
                  Forgot password?
                </Button>
              </ValidatorForm>
              <Grid sx={{ float: 'right', color: 'lightgrey' }}>ver-{document.ver}</Grid>
            </ContentBox>
          </Grid>
        </Grid>
      </Card>
      <Grid container sx={{ justifyContent: 'center' }}>
        <Link target="_blank" href="https://beian.miit.gov.cn/" rel="noreferrer" underline="none">
          <Box sx={{ display: 'flex' }}>
            <Paragraph>鄂ICP备19027347号</Paragraph>
          </Box>
        </Link>
        <img src="/assets/images/national_emblem.png" alt="备案图标" />
        <Link
          target="_blank"
          href="http://www.beian.gov.cn/portal/registerSystemInfo?recordcode=42011102003716"
          rel="noreferrer"
          underline="none"
        >
          <Box sx={{ display: 'flex' }}>
            <Paragraph>鄂公网安备42011102003716号</Paragraph>
          </Box>
        </Link>
      </Grid>
    </JWTRoot>
  )
}

export default JwtLogin

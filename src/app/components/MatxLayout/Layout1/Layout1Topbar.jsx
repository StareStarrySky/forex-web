import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import useAuth from 'app/hooks/useAuth'
import useSettings from 'app/hooks/useSettings'
import { styled, useTheme, Box } from '@mui/system'
import { Span } from '../../../components/Typography'
import { MatxMenu, MatxSearchBox } from 'app/components'
import ShoppingCart from '../../ShoppingCart/ShoppingCart'
import NotificationBar from '../../NotificationBar/NotificationBar'
import { themeShadows } from 'app/components/MatxTheme/themeColors'
import { NotificationProvider } from 'app/contexts/NotificationContext'
import { Icon, IconButton, MenuItem, Avatar, useMediaQuery, Hidden, Badge } from '@mui/material'
import { topBarHeight } from 'app/utils/constant'
import useStomp from 'app/hooks/useStomp'

const StyledIconButton = styled(IconButton)(({ theme }) => ({
  color: theme.palette.text.primary
}))

const TopbarRoot = styled('div')(({ theme }) => ({
  top: 0,
  zIndex: 96,
  transition: 'all 0.3s ease',
  boxShadow: themeShadows[8],
  height: topBarHeight
}))

const TopbarContainer = styled(Box)(({ theme }) => ({
  padding: '8px',
  paddingLeft: 18,
  paddingRight: 20,
  height: '100%',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'space-between',
  background: theme.palette.primary.main,
  [theme.breakpoints.down('sm')]: {
    paddingLeft: 16,
    paddingRight: 16
  },
  [theme.breakpoints.down('xs')]: {
    paddingLeft: 14,
    paddingRight: 16
  }
}))

const UserMenu = styled(Box)(() => ({
  display: 'flex',
  alignItems: 'center',
  cursor: 'pointer',
  borderRadius: 24,
  padding: 4,
  '& span': {
    margin: '0 8px'
  }
}))

const StyledItem = styled(MenuItem)(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  minWidth: 185,
  '& a': {
    width: '100%',
    display: 'flex',
    alignItems: 'center',
    textDecoration: 'none'
  },
  '& span': {
    marginRight: '10px',
    color: theme.palette.text.primary
  }
}))

const IconBox = styled('div')(({ theme }) => ({
  display: 'inherit',
  [theme.breakpoints.down('md')]: {
    display: 'none !important'
  }
}))

let stompActivated = false

const Layout1Topbar = () => {
  const theme = useTheme()
  const { settings, updateSettings } = useSettings()
  const { logout, user } = useAuth()
  const isMdScreen = useMediaQuery(theme.breakpoints.down('md'))

  const { clientStatus, clientActivate, clientCallback } = useStomp()
  const [onlineBadgeColor, setOnlineBadgeColor] = useState('default')
  if (!stompActivated) {
    clientActivate()
    stompActivated = true
  }
  useEffect(() => {
    if (clientStatus) {
      clientCallback({
        connected: () => setOnlineBadgeColor('success'),
        message: () => setOnlineBadgeColor('secondary'),
        msgError: () => setOnlineBadgeColor('warning'),
        disconnected: () => setOnlineBadgeColor('error'),
        defaultCall: () => setOnlineBadgeColor('default')
      })
    }
  }, [clientStatus, clientCallback])

  const updateSidebarMode = (sidebarSettings) => {
    updateSettings({
      layout1Settings: {
        leftSidebar: {
          ...sidebarSettings
        }
      }
    })
  }

  const handleSidebarToggle = () => {
    let { layout1Settings } = settings
    let mode
    if (isMdScreen) {
      mode = layout1Settings.leftSidebar.mode === 'close' ? 'mobile' : 'close'
    } else {
      mode = layout1Settings.leftSidebar.mode === 'full' ? 'close' : 'full'
    }
    updateSidebarMode({ mode })
  }

  return (
    <TopbarRoot>
      <TopbarContainer>
        <Box display="flex">
          <StyledIconButton onClick={handleSidebarToggle}>
            <Icon>menu</Icon>
          </StyledIconButton>

          <IconBox>
            <StyledIconButton>
              <Icon>mail_outline</Icon>
            </StyledIconButton>

            <StyledIconButton>
              <Icon>web_asset</Icon>
            </StyledIconButton>

            <StyledIconButton>
              <Icon>star_outline</Icon>
            </StyledIconButton>
          </IconBox>
        </Box>
        <Box display="flex" alignItems="center">
          <MatxSearchBox />
          <NotificationProvider>
            <NotificationBar />
          </NotificationProvider>

          <ShoppingCart />

          <MatxMenu
            menuButton={
              <UserMenu>
                <Hidden xsDown>
                  <Span>
                    Hi <strong>{user.name}</strong>
                  </Span>
                </Hidden>
                <Badge
                  variant="dot"
                  color={onlineBadgeColor}
                  anchorOrigin={{
                    vertical: 'bottom',
                    horizontal: 'right'
                  }}
                >
                  <Avatar src={user.avatar} sx={{ cursor: 'pointer' }} />
                </Badge>
              </UserMenu>
            }
          >
            <StyledItem>
              <Link to="/">
                <Icon> home </Icon>
                <Span> Home </Span>
              </Link>
            </StyledItem>
            <StyledItem>
              <Link to="/page-layouts/user-profile">
                <Icon> person </Icon>
                <Span> Profile </Span>
              </Link>
            </StyledItem>
            <StyledItem>
              <Icon> settings </Icon>
              <Span> Settings </Span>
            </StyledItem>
            <StyledItem onClick={logout}>
              <Icon> power_settings_new </Icon>
              <Span> Logout </Span>
            </StyledItem>
          </MatxMenu>
        </Box>
      </TopbarContainer>
    </TopbarRoot>
  )
}

export default React.memo(Layout1Topbar)

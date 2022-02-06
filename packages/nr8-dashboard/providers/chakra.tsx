import { FunctionComponent } from 'react'
import { GetServerSideProps } from 'next'

import {
  ChakraProvider,
  cookieStorageManager,
  extendTheme,
  localStorageManager
} from '@chakra-ui/react'

import { mode } from '@chakra-ui/theme-tools'

// base theme
const styles = {
  global: (props: any) => ({
    'html': {
      height: '100%'
    },
    'body': {
      fontFamily: 'body',
      color: mode('gray.800', 'whiteAlpha.900')(props),
      bg: mode('white', 'gray.800')(props),
      lineHeight: 'base'
    },
    '*::placeholder': {
      color: mode('gray.400', 'whiteAlpha.400')(props)
    },
    '*, *::before, &::after': {
      borderColor: mode('gray.200', 'whiteAlpha.300')(props),
      wordWrap: 'break-word'
    }
  })
}

//
const config = {
  initialColorMode: 'light',
  useSystemColorMode: false
}

//
export const theme = extendTheme({ config, styles })

console.log(theme)

//
export const getServerSideProps: GetServerSideProps = async ({ req }) => {
  return {
    props: {
      cookies: req.headers.cookie ?? ''
    }
  }
}

//
export interface ProviderProps {
  cookies: string
}

export const Provider: FunctionComponent<ProviderProps> = ({
  cookies,
  children
}) => {
  const colorModeManager =
    typeof cookies === 'string'
      ? cookieStorageManager(cookies)
      : localStorageManager

  return (
    <ChakraProvider theme={theme} colorModeManager={colorModeManager}>
      {children}
    </ChakraProvider>
  )
}

export default Provider

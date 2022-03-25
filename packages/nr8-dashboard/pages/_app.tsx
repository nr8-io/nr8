import Router from 'next/router'
import type { AppProps } from 'next/app'

import debounce from 'lodash/debounce'
import nprogress from 'nprogress'
//
import {
  Provider as ReduxProvider,
  configureStore
} from '@nr8/react-redux-toolkit'

import ChakraProvider from '../providers/chakra'
//
import 'nprogress/nprogress.css'
import '../styles/globals.css'

// css for all pages

//
const progress: any = {}

nprogress.configure({
  minimum: 0.3,
  easing: 'ease',
  speed: 800,
  showSpinner: false
})

//
const startProgress = (key = 'default') => {
  if (typeof progress[key] !== 'function') {
    progress[key] = debounce(() => {
      nprogress.start()
    }, 100)
  }

  progress[key]()
}

//
const stopProgress = (key = 'default') => {
  if (typeof progress[key] === 'function') {
    progress[key].cancel()
    delete progress[key]
  }

  if (Object.keys(progress).length === 0) {
    nprogress.done()
  }
}

Router.events.on('routeChangeStart', () => startProgress())
Router.events.on('routeChangeComplete', () => stopProgress())
Router.events.on('routeChangeError', () => stopProgress())

//
const store = configureStore({
  devTools: true
})

//
export default function App({ Component, pageProps }: AppProps) {
  return (
    <ChakraProvider cookies={pageProps.cookies}>
      <ReduxProvider store={store()}>
        <Component {...pageProps} />
      </ReduxProvider>
    </ChakraProvider>
  )
}

import type { AppProps } from 'next/app'

//
import ChakraProvider from '../providers/chakra'
import { Provider as ReduxProvider, configureStore } from '@nr8/react-redux'

//
import '../styles/globals.css'

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

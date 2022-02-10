import type { AppProps } from 'next/app'

//
import ChakraProvider from '../providers/chakra'
import ReduxProvider from '../providers/redux'

//
import '../styles/globals.css'

//
export default function App({ Component, pageProps }: AppProps) {
  return (
    <ChakraProvider cookies={pageProps.cookies}>
      <ReduxProvider>
        <Component {...pageProps} />
      </ReduxProvider>
    </ChakraProvider>
  )
}

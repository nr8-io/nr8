import type { AppProps } from 'next/app'

//
import '../styles/globals.css'

//
import ChakraProvider from '../providers/chakra'

//
export default function App({ Component, pageProps }: AppProps) {
  return (
    <ChakraProvider cookies={pageProps.cookies}>
      <Component {...pageProps} />
    </ChakraProvider>
  )
}

import '../styles/globals.css'
import ChakraProvider from '../providers/chakra'
import type { AppProps } from 'next/app'

//
export default function App({ Component, pageProps }: AppProps) {
  console.log(pageProps)
  return (
    <ChakraProvider cookies={pageProps.cookies}>
      <Component {...pageProps} />
    </ChakraProvider>
  )
}
import { FunctionComponent } from 'react'

import { Flex } from '@chakra-ui/react'

//
import Document from '../document'
import Footer from '../footer'
import Menu from '../menu'
import Navigation from '../navigation'

//
const Layout: FunctionComponent = ({ children }) => {
  return (
    <>
      <Navigation />
      <Flex>
        <Menu />
        <Document />
      </Flex>
      <Footer />
    </>
  )
}

export default Layout

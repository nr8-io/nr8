import { FunctionComponent } from 'react'

import { Flex, VStack, Box } from '@chakra-ui/react'

//
import Navigation from '../navigation'
import Footer from '../footer'
import Menu from '../menu'

//
const Layout: FunctionComponent = ({ children }) => {
  return (
    <>
      <Navigation />
      <Flex>
        <Menu />
        <Box h={2000} flex={1}></Box>
      </Flex>
      <Footer />
    </>
  )
}

export default Layout

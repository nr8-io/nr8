import { FunctionComponent } from 'react'

import { Flex } from '@chakra-ui/react'

//
import Footer from '../footer'
import Menu from '../menu'
import Navigation from '../navigation'

//
export const Standard: FunctionComponent = ({ children }) => {
  return (
    <>
      <Navigation />
      <Flex>
        <Menu />
        {children}
      </Flex>
      <Footer />
    </>
  )
}

export default Standard

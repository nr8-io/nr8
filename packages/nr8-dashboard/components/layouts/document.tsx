import { FunctionComponent } from 'react'

import { Flex, Box } from '@chakra-ui/react'

import Standard from './standard'
import TableOfContents from '../toc'

//
const Document: FunctionComponent = ({ children }) => {
  return (
    <Standard>
      <Box as="main" width="100%">
        <Flex maxWidth="6xl" p="4" m="0 auto">
          <Box flex="1">{children}</Box>
          <TableOfContents />
        </Flex>
      </Box>
    </Standard>
  )
}

export default Document

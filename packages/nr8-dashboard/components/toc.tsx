import { FunctionComponent } from 'react'

import {
  Flex,
  VStack,
  Box,
  List,
  ListItem,
  useColorModeValue
} from '@chakra-ui/react'

import Link from './link'

//
const TableOfContents: FunctionComponent = ({ children }) => {
  // container style
  const style = {
    display: { base: 'none', xl: 'block' },
    ml: 8,
    width: '330px'
  }

  // list style
  const listStyle = {
    top: '80px',
    fontSize: 'sm',
    padding: 4,
    borderLeft: 1,
    borderStyle: 'solid',
    borderColor: useColorModeValue('gray.200', 'gray.600'),
    sx: {
      li: { m: 2 },
      ul: { ml: 4 }
    }
  }

  //
  return (
    <Box {...style}>
      <List position="sticky" {...listStyle}>
        <ListItem>
          <Link href="#">Requirements</Link>
        </ListItem>
        <ListItem>
          <Link href="#">Scaffold project website</Link>
        </ListItem>
        <ListItem>
          <Link href="#">Project structure</Link>
          <List>
            <ListItem>
              <Link href="#">Project structure rundown</Link>
            </ListItem>
            <ListItem>
              <Link href="#">Monorepos</Link>
            </ListItem>
          </List>
        </ListItem>
        <ListItem>
          <Link href="#">Running the development server</Link>
        </ListItem>
        <ListItem>
          <Link href="#">Build</Link>
        </ListItem>
        <ListItem>
          <Link href="#">Updating your version</Link>
        </ListItem>
        <ListItem>
          <Link href="#">Problems?</Link>
        </ListItem>
      </List>
    </Box>
  )
}

export default TableOfContents

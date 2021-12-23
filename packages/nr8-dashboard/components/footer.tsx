import { FunctionComponent } from 'react'
import {
  Box,
  Image,
  Container,
  SimpleGrid,
  VStack,
  Text,
  Flex,
  useColorModeValue
} from '@chakra-ui/react'

import { ExternalLinkIcon } from '@chakra-ui/icons'

//
import Link from './link'

//
const ListHeader: FunctionComponent = ({ children }) => {
  return (
    <Text fontWeight={'600'} fontSize={'lg'} mb={2}>
      {children}
    </Text>
  )
}

//
const Footer: FunctionComponent = () => {
  //
  const logoSeparatorStyle = {
    align: 'center',
    _before: {
      content: '""',
      borderBottom: '1px solid',
      borderColor: useColorModeValue('gray.200', 'gray.700'),
      flexGrow: 1,
      mr: 8
    },
    _after: {
      content: '""',
      borderBottom: '1px solid',
      borderColor: useColorModeValue('gray.200', 'gray.700'),
      flexGrow: 1,
      ml: 8
    }
  }

  return (
    <Box
      bg={useColorModeValue('gray.50', 'gray.900')}
      color={useColorModeValue('gray.700', 'gray.200')}
    >
      <Container maxW={'container.lg'} pt={10}>
        <SimpleGrid columns={{ base: 1, sm: 2, md: 4 }} spacing={8}>
          <VStack align={'flex-start'}>
            <ListHeader>Learn</ListHeader>
            <Link href={'#'}>About</Link>
            <Link href={'#'}>Installation</Link>
            <Link href={'#'}>Usage</Link>
          </VStack>
          <VStack align={'flex-start'}>
            <ListHeader>Communicty</ListHeader>
            <Link href={'#'} isExternal>
              Stack Overflow <ExternalLinkIcon mx="2px" />
            </Link>
            <Link href={'#'} isExternal>
              Report an Issue <ExternalLinkIcon mx="2px" />
            </Link>
            <Link href={'#'} isExternal>
              Feature request <ExternalLinkIcon mx="2px" />
            </Link>
          </VStack>
          <VStack align={'flex-start'}>
            <ListHeader>More</ListHeader>
            <Link href={'#'} isExternal>
              Blog <ExternalLinkIcon mx="2px" />
            </Link>
            <Link href={'#'} isExternal>
              Github <ExternalLinkIcon mx="2px" />
            </Link>
          </VStack>
          <VStack align={'flex-start'}>
            <ListHeader>Legal</ListHeader>
            <Link href={'#'}>Privacy</Link>
            <Link href={'#'}>Terms</Link>
            <Link href={'#'}>Data Policy</Link>
            <Link href={'#'}>Cookie Policy</Link>
          </VStack>
        </SimpleGrid>
      </Container>
      <Box py={10}>
        <Flex {...logoSeparatorStyle}>
          <Image
            src={useColorModeValue('/logo-purple.png', '/logo-white.png')}
            alt={'Topvine Consulting EOOD'}
            height={'32px'}
          />
        </Flex>
        <Text pt={6} fontSize={'sm'} textAlign={'center'}>
          Narrative Dashboard by Topvine Consulting EOOD
        </Text>
      </Box>
    </Box>
  )
}

export default Footer

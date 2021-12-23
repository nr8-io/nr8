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

//
import Link from './link'

//
const Header: FunctionComponent = ({ children }) => {
  return (
    <Text fontWeight={'600'} fontSize={'lg'} mb={2}>
      {children}
    </Text>
  )
}

//
const Footer: FunctionComponent = () => {
  return (
    <Box
      bg={useColorModeValue('gray.50', 'gray.900')}
      color={useColorModeValue('gray.700', 'gray.200')}
    >
      <Container maxW={'container.lg'} pt={10}>
        <SimpleGrid columns={{ base: 1, sm: 2, md: 4 }} spacing={8}>
          <VStack align={'flex-start'}>
            <Header>Learn</Header>
            <Link href={'#'}>About</Link>
            <Link href={'#'}>Installation</Link>
            <Link href={'#'}>Usage</Link>
          </VStack>
          <VStack align={'flex-start'}>
            <Header>Communicty</Header>
            <Link href={'#'}>Stack Overflow</Link>
            <Link href={'#'}>Report an Issue</Link>
            <Link href={'#'}>Feature request</Link>
          </VStack>
          <VStack align={'flex-start'}>
            <Header>More</Header>
            <Link href={'#'}>Blog</Link>
            <Link href={'#'}>Github</Link>
          </VStack>
          <VStack align={'flex-start'}>
            <Header>Legal</Header>
            <Link href={'#'}>Privacy</Link>
            <Link href={'#'}>Terms</Link>
            <Link href={'#'}>Data Policy</Link>
            <Link href={'#'}>Cookie Policy</Link>
          </VStack>
        </SimpleGrid>
      </Container>
      <Box py={10}>
        <Flex
          align={'center'}
          _before={{
            content: '""',
            borderBottom: '1px solid',
            borderColor: useColorModeValue('gray.200', 'gray.700'),
            flexGrow: 1,
            mr: 8
          }}
          _after={{
            content: '""',
            borderBottom: '1px solid',
            borderColor: useColorModeValue('gray.200', 'gray.700'),
            flexGrow: 1,
            ml: 8
          }}
        >
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

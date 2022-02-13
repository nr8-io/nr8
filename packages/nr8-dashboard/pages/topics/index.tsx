import type { NextPage } from 'next'
import { Box, Button, Flex, Heading, HStack, Tag, Text } from '@chakra-ui/react'
import { ArrowRightIcon } from '@chakra-ui/icons'

//
import StandardLayout from '../../components/layouts/standard'
import Link from '../../components/link'

//
export { getServerSideProps } from '../../providers/chakra'

//
export const Tags: React.FC = (props) => {
  return (
    <HStack spacing={2} {...props}>
      <Tag fontWeight="bold">Draft</Tag>
      <Tag fontWeight="bold">Version: 0.1.0-beta.15</Tag>
    </HStack>
  )
}

const Topics: NextPage = () => {
  return (
    <StandardLayout>
      <Tags />

      <Box as="header" mt={4}>
        <Heading as={'h1'} size={'2xl'} mb={8}>
          Getting Started
        </Heading>
        <Text>Let's learn about the most important nr8 concepts!</Text>
      </Box>

      <Flex as="footer" mt={16}>
        <Button as={Link} href="#" flex={'1 50%'} variant="outline">
          <Box fontWeight={'normal'}>Previous</Box>
          <Box>Installation</Box>
        </Button>
        <Button
          as={Link}
          href="#"
          flex={'1 50%'}
          variant="outline"
          p={8}
          ml={4}
          justifyContent={'flex-end'}
        >
          <Box>
            <Text fontWeight={'normal'} align={'right'}>
              Next
            </Text>
            <Text>
              Playground <ArrowRightIcon w={2} />
            </Text>
          </Box>
        </Button>
      </Flex>
    </StandardLayout>
  )
}

export default Topics

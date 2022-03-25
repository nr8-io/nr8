import type { NextPage } from 'next'
import {
  Box,
  Button,
  Flex,
  Heading,
  HStack,
  Tag,
  Text,
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  HTMLChakraProps,
  ComponentWithAs,
  StackProps
} from '@chakra-ui/react'
import {
  ChevronRightIcon,
  ArrowRightIcon,
  ArrowLeftIcon
} from '@chakra-ui/icons'

//
import DocumentLayout from '../../components/layouts/document'
import Link from '../../components/link'

//
export { getServerSideProps } from '../../providers/chakra'

//
export interface TagsProps extends ComponentWithAs<'div', StackProps> {}

export const Tags: TagsProps = (props) => {
  return (
    <HStack spacing={2} {...props}>
      <Tag fontSize="xs" fontWeight="bold">
        Draft
      </Tag>
      <Tag fontSize="xs" fontWeight="bold">
        Version: 0.1.0-beta.15
      </Tag>
    </HStack>
  )
}

export interface ButtonProps extends HTMLChakraProps<'button'> {
  href: string
}

export const NextButton: React.FC<ButtonProps> = (props) => {
  const { href = '#', children, ...moreProps } = props

  return (
    <Button
      as={Link}
      href={href}
      variant="outline"
      _hover={{
        textDecoration: 'none'
      }}
      p={8}
      justifyContent={'flex-end'}
      {...moreProps}
    >
      <Box>
        <Text fontWeight={'normal'} align={'right'}>
          Next
        </Text>
        {children}
      </Box>
    </Button>
  )
}

export const PreviousButton: React.FC<ButtonProps> = (props) => {
  const { href = '#', children, ...moreProps } = props

  return (
    <Button
      as={Link}
      href={href}
      variant="outline"
      _hover={{
        textDecoration: 'none'
      }}
      p={8}
      justifyContent={'flex-start'}
      {...moreProps}
    >
      <Box>
        <Text fontWeight={'normal'} align={'left'}>
          Next
        </Text>
        {children}
      </Box>
    </Button>
  )
}

const Page: NextPage = () => {
  return (
    <DocumentLayout>
      <Breadcrumb
        spacing="8px"
        separator={<ChevronRightIcon color="gray.500" />}
      >
        <BreadcrumbItem>
          <BreadcrumbLink fontSize="xs" href="#">
            Home
          </BreadcrumbLink>
        </BreadcrumbItem>

        <BreadcrumbItem>
          <BreadcrumbLink fontSize="xs" isCurrentPage href="#">
            Topics
          </BreadcrumbLink>
        </BreadcrumbItem>
      </Breadcrumb>

      <Tags mt={2} />

      <Box as="header" mt={4}>
        <Heading as={'h1'} size={'2xl'} mb={8}>
          Topics
        </Heading>
        <Text>Let&apos;s learn about the most important nr8 concepts!</Text>
      </Box>

      <Flex as="footer" mt={16}>
        <PreviousButton href="#" flex={'1 50%'}>
          <ArrowLeftIcon w={2} /> Installation
        </PreviousButton>
        <NextButton href="#" flex={'1 50%'} ml={4}>
          Playground <ArrowRightIcon w={2} />
        </NextButton>
      </Flex>
    </DocumentLayout>
  )
}

export default Page

import { useCallback, useState } from 'react'
import type { NextPage } from 'next'
import {
  createEditor,
  Editor,
  BaseEditor,
  Descendant,
  Text as SlateText,
  Transforms
} from 'slate'
import { Slate, Editable, ReactEditor, withReact } from 'slate-react'
import {
  Alert,
  AlertTitle,
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
  StackProps,
  AlertDescription
} from '@chakra-ui/react'
import {
  ChevronRightIcon,
  ArrowRightIcon,
  ArrowLeftIcon,
  InfoIcon
} from '@chakra-ui/icons'

//
import DocumentLayout from '../../components/layouts/document'
import Link from '../../components/link'

//
type CustomElement = { type: 'paragraph'; children: CustomText[] }
type CustomText = { text: string }

declare module 'slate' {
  interface CustomTypes {
    Editor: BaseEditor & ReactEditor
    Element: CustomElement
    Text: CustomText
  }
}

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

const DefaultElement = (props) => {
  return <p {...props.attributes}>{props.children}</p>
}

// Define a React component renderer for our code blocks.
const CodeElement = (props) => {
  return (
    <pre {...props.attributes}>
      <code>{props.children}</code>
    </pre>
  )
}

const Leaf = (props) => {
  return (
    <span
      {...props.attributes}
      style={{ fontWeight: props.leaf.bold ? 'bold' : 'normal' }}
    >
      {props.children}
    </span>
  )
}

const EditText = () => {
  const [editor] = useState(() => withReact(createEditor()))
  const [value, setValue] = useState([
    {
      type: 'paragraph',
      children: [{ text: 'A line of text in a paragraph.' }]
    }
  ])

  const renderElement = useCallback((props) => {
    switch (props.element.type) {
      case 'code':
        return <CodeElement {...props} />
      default:
        return <DefaultElement {...props} />
    }
  }, [])

  return (
    <Slate
      editor={editor}
      value={value}
      onChange={(newValue) => setValue(newValue)}
    >
      <Editable
        renderElement={renderElement}
        onKeyDown={(event) => {
          if (!event.ctrlKey) {
            return
          }

          switch (event.key) {
            // When "`" is pressed, keep our existing code block logic.
            case '`': {
              event.preventDefault()
              const [match] = Editor.nodes(editor, {
                match: (n) => n.type === 'code'
              })
              Transforms.setNodes(
                editor,
                { type: match ? 'paragraph' : 'code' },
                { match: (n) => Editor.isBlock(editor, n) }
              )
              break
            }

            // When "B" is pressed, bold the text in the selection.
            case 'b': {
              event.preventDefault()
              console.log(event)
              Transforms.setNodes(
                editor,
                { bold: true },
                // Apply it to text nodes, and split the text node up if the
                // selection is overlapping only part of it.
                { match: (n) => SlateText.isText(n), split: true }
              )
              break
            }
          }
        }}
      />
    </Slate>
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

        <Alert
          as="blockquote"
          role="none"
          status="success"
          variant="left-accent"
          borderRadius="sm"
          mt="2"
        >
          <Box flex={1}>
            <AlertTitle>Tip</AlertTitle>
            <AlertDescription>
              Use topics to help organise your content
            </AlertDescription>
          </Box>
        </Alert>

        <Heading as={'h2'} size={'xl'} mt={8} mb={4}>
          Repository Structure
        </Heading>
        <Text>
          Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Phasellus
          hendrerit. Pellentesque aliquet nibh nec urna. In nisi neque, aliquet
          vel, dapibus id, mattis vel, nisi. Sed pretium, ligula sollicitudin
          laoreet viverra, tortor libero sodales leo, eget blandit nunc tortor
          eu nibh. Nullam mollis. Ut justo. Suspendisse potenti.
        </Text>
        <EditText />
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

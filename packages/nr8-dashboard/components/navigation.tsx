import { FunctionComponent, MouseEventHandler } from 'react'

import {
  Box,
  Flex,
  IconButton,
  Button,
  Image,
  HStack,
  Collapse,
  useColorMode,
  useColorModeValue,
  useBreakpointValue,
  useDisclosure
} from '@chakra-ui/react'

import { HamburgerIcon, CloseIcon, MoonIcon, SunIcon } from '@chakra-ui/icons'

//
import DesktopNav from './navigation/desktop'
import MobileNav from './navigation/mobile'

//
export interface NavItem {
  label: string
  subLabel?: string
  children?: Array<NavItem>
  href: string
}

const navItems: Array<NavItem> = [
  {
    label: 'Narrative',
    href: '#',
    children: [
      {
        label: 'Topics',
        subLabel:
          'Explore, create and manage the high level topics and categories',
        href: '/topics'
      },
      {
        label: 'Stories',
        subLabel: 'Draft, explore, and manage user stories',
        href: '/stories'
      },
      {
        label: 'Scenes',
        subLabel: 'Explore, create and manage scenes, backgrounds & situations',
        href: '#'
      },
      {
        label: 'Characters',
        subLabel: 'Explore, create and manage characters, actors, or players',
        href: '#'
      },
      {
        label: 'Features',
        subLabel:
          'Explore, create and manage the features, problems and challenges',
        href: '#'
      },
      {
        label: 'Scenarios',
        subLabel: 'Explore, create or individual scenarios',
        href: '#'
      }
    ]
  },
  {
    label: 'API',
    href: '#',
    children: [
      {
        label: 'Scenarios',
        subLabel: 'Explore, create and manage executable scenarios',
        href: '#'
      },
      {
        label: 'Actions',
        subLabel: 'Explore, create and manage individual actions',
        href: '#'
      },
      {
        label: 'Events',
        subLabel: 'Explore, create and manage events',
        href: '#'
      },
      {
        label: 'Queries',
        subLabel: 'Explore, create and manage queries',
        href: '#'
      }
    ]
  },
  {
    label: 'Gateway',
    href: '#',
    children: [
      {
        label: 'Clients',
        subLabel: 'Explore and manage gateway clients',
        href: '#'
      },
      {
        label: 'Services',
        subLabel: 'Explore and manage gateway services',
        href: '#'
      },
      {
        label: 'Routers',
        subLabel: 'Explore and manage gateway router resources',
        href: '#'
      }
    ]
  },
  {
    label: 'Configure',
    href: '#',
    children: [
      {
        label: 'Definitions',
        subLabel: 'Explore and manage api definitions',
        href: '#'
      },
      {
        label: 'Controllers',
        subLabel: 'Explore and manage api controllers',
        href: '#'
      }
    ]
  }
]

//
interface MobileMenuButtonProps {
  open?: boolean
  onClick: MouseEventHandler
}

//
const MobileMenuButton: FunctionComponent<MobileMenuButtonProps> = ({
  open,
  onClick
}) => {
  //
  const style = {
    display: { base: 'flex', md: 'none' },
    flex: { base: 1, md: 'auto' },
    ml: { base: -2 }
  }

  return (
    <Flex {...style}>
      <IconButton
        aria-label={'Toggle Navigation'}
        icon={open ? <CloseIcon w={3} h={3} /> : <HamburgerIcon w={5} h={5} />}
        onClick={onClick}
        variant={'ghost'}
      />
    </Flex>
  )
}

//
const LeftMenu: FunctionComponent = () => {
  //
  const logoStyle: any = {
    textAlign: useBreakpointValue({ base: 'center', md: 'left' }),
    fontFamily: 'heading',
    color: useColorModeValue('gray.800', 'white')
  }

  return (
    <Flex flex={{ base: 1 }} justify={{ base: 'center', md: 'start' }}>
      <Box {...logoStyle}>
        <Image
          src={useColorModeValue('/logo-purple.png', '/logo-white.png')}
          alt={'Narrative'}
          height={'32px'}
        />
      </Box>

      <Flex align={'center'} display={{ base: 'none', md: 'flex' }} ml={10}>
        <DesktopNav navItems={navItems} />
      </Flex>
    </Flex>
  )
}

//
const RightMenu: FunctionComponent = () => {
  const { colorMode, toggleColorMode } = useColorMode()

  return (
    <HStack flex={{ base: 1, md: 0 }} justify={'flex-end'} spacing={6}>
      <Button onClick={toggleColorMode}>
        {colorMode === 'light' ? <MoonIcon /> : <SunIcon />}
      </Button>
    </HStack>
  )
}

//
const Navigation: FunctionComponent = () => {
  const { isOpen, onToggle } = useDisclosure()

  //
  const style = {
    align: 'center',
    bg: useColorModeValue('white', 'gray.800'),
    borderBottom: 1,
    borderColor: useColorModeValue('gray.200', 'gray.600'),
    borderStyle: 'solid',
    color: useColorModeValue('gray.600', 'white'),
    minH: '60px',
    px: { base: 4 },
    py: { base: 2 }
  }

  return (
    <Box position={'sticky'} top={0} zIndex={100}>
      <Flex {...style}>
        <MobileMenuButton open={isOpen} onClick={onToggle} />
        <LeftMenu />
        <RightMenu />
      </Flex>

      <Collapse in={isOpen} animateOpacity>
        <MobileNav navItems={navItems} />
      </Collapse>
    </Box>
  )
}

export default Navigation

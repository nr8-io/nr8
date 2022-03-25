import { FunctionComponent } from 'react'

import {
  Box,
  Flex,
  Text,
  Stack,
  Icon,
  Popover,
  PopoverTrigger,
  PopoverContent,
  useColorModeValue
} from '@chakra-ui/react'

import { ChevronRightIcon } from '@chakra-ui/icons'

//
import { NavItem } from '../navigation'
import Link from '../link'

//
export interface DesktopSubNavProps extends NavItem {}

const DesktopSubNav: FunctionComponent<DesktopSubNavProps> = ({
  label,
  href,
  subLabel
}) => {
  //
  const linkStyle = {
    display: 'block',
    p: 2,
    rounded: 'md',
    _hover: { bg: useColorModeValue('pink.50', 'gray.900') }
  }

  //
  const labelStyle = {
    fontWeight: 500,
    transition: 'all .3s ease',
    _groupHover: { color: 'pink.400' }
  }

  //
  const iconStyle = {
    align: 'center',
    flex: 1,
    justify: 'flex-end',
    opacity: 0,
    transform: 'translateX(-10px)',
    transition: 'all .3s ease',
    _groupHover: { opacity: '100%', transform: 'translateX(0)' }
  }

  return (
    <Link href={href} role={'group'} {...linkStyle}>
      <Stack direction={'row'} align={'center'}>
        <Box>
          <Text {...labelStyle}>{label}</Text>
          <Text fontSize={'sm'}>{subLabel}</Text>
        </Box>
        <Flex {...iconStyle}>
          <Icon color={'purple.900'} w={5} h={5} as={ChevronRightIcon} />
        </Flex>
      </Stack>
    </Link>
  )
}

//
export interface DesktopNavProps {
  navItems: Array<NavItem>
}

const DesktopNav: FunctionComponent<DesktopNavProps> = ({ navItems }) => {
  //
  const linkStyle = {
    color: useColorModeValue('gray.600', 'gray.200'),
    fontSize: 'sm',
    fontWeight: 500,
    p: 2,
    _hover: {
      textDecoration: 'none',
      color: useColorModeValue('purple.900', 'white')
    }
  }

  //
  const popoverStyle = {
    bg: useColorModeValue('white', 'gray.800'),
    border: 0,
    boxShadow: 'xl',
    minW: 'sm',
    p: 4,
    rounded: 'xl'
  }

  return (
    <Stack direction={'row'} spacing={4}>
      {navItems.map((navItem) => (
        <Box key={navItem.label}>
          <Popover trigger={'hover'} placement={'bottom-start'}>
            <PopoverTrigger>
              <div>
                <Link href={navItem.href ?? '#'} {...linkStyle}>
                  {navItem.label}
                </Link>
              </div>
            </PopoverTrigger>

            {navItem.children && (
              <PopoverContent {...popoverStyle}>
                <Stack>
                  {navItem.children.map((child) => (
                    <DesktopSubNav key={child.label} {...child} />
                  ))}
                </Stack>
              </PopoverContent>
            )}
          </Popover>
        </Box>
      ))}
    </Stack>
  )
}

export default DesktopNav

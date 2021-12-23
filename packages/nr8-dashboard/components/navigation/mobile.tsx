import { FunctionComponent } from 'react'

import {
  Flex,
  Text,
  Stack,
  Collapse,
  Icon,
  Link,
  useColorModeValue,
  useDisclosure
} from '@chakra-ui/react'

import { ChevronDownIcon } from '@chakra-ui/icons'

//
import { NavItem } from '../navigation'

//
export interface MobileNavItemProps extends NavItem {}

const MobileNavItem: FunctionComponent<MobileNavItemProps> = ({
  label,
  children,
  href
}) => {
  const { isOpen, onToggle } = useDisclosure()

  //
  const style = {
    align: 'center',
    justify: 'space-between',
    py: 2,
    _hover: {
      textDecoration: 'none'
    }
  }

  //
  const labelStyle = {
    color: useColorModeValue('gray.600', 'gray.200'),
    fontWeight: 600
  }

  //
  const chevronStyle = {
    h: 6,
    transform: isOpen ? 'rotate(180deg)' : '',
    transition: 'all .25s ease-in-out',
    w: 6
  }

  //
  const disclosureStyle = {
    pl: 4,
    borderLeft: 1,
    borderStyle: 'solid',
    borderColor: useColorModeValue('gray.200', 'gray.700'),
    align: 'start'
  }

  return (
    <Stack spacing={4} onClick={children && onToggle}>
      <Flex as={Link} href={href ?? '#'} {...style}>
        <Text {...labelStyle}>{label}</Text>
        {children && <Icon as={ChevronDownIcon} {...chevronStyle} />}
      </Flex>

      <Collapse in={isOpen} animateOpacity style={{ marginTop: '0!important' }}>
        <Stack {...disclosureStyle}>
          {children &&
            children.map((child) => (
              <Link key={child.label} py={2} href={child.href}>
                {child.label}
              </Link>
            ))}
        </Stack>
      </Collapse>
    </Stack>
  )
}

/**
 *
 */
export interface MobileNavProps {
  navItems: NavItem[]
}

const MobileNav: FunctionComponent<MobileNavProps> = ({ navItems }) => {
  //
  const style = {
    bg: useColorModeValue('white', 'gray.800'),
    display: { md: 'none' },
    p: 4
  }

  return (
    <Stack {...style}>
      {navItems.map((navItem) => (
        <MobileNavItem key={navItem.label} {...navItem} />
      ))}
    </Stack>
  )
}

export default MobileNav

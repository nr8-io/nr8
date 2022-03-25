import { FunctionComponent } from 'react'

import {
  Accordion,
  AccordionItem,
  AccordionButton,
  AccordionIcon,
  AccordionPanel,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  Icon,
  IconButton,
  List,
  ListItem,
  Box,
  Flex,
  Text,
  VStack,
  useColorModeValue
} from '@chakra-ui/react'

import { BsThreeDots } from 'react-icons/bs'

import Link from './link'

//
interface MenuGroupProps {
  href: string
}

export const MenuGroup: FunctionComponent<MenuGroupProps> = ({
  children,
  href
}) => {
  return (
    <h2>
      <AccordionButton _focus={{}}>
        <Box flex="1" textAlign="left">
          <Link display={'block'} w={'100%'} href={href}>
            {children}
          </Link>
        </Box>
        <AccordionIcon />
      </AccordionButton>
    </h2>
  )
}

//
interface SubMenuItemProps {
  href: string
}

export const SubMenuItem: FunctionComponent<SubMenuItemProps> = ({
  children,
  href
}) => {
  return (
    <ListItem p={2} _hover={{ bgColor: 'blackAlpha.50' }}>
      <Link display={'block'} w={'100%'} href={href}>
        {children}
      </Link>
    </ListItem>
  )
}

export const ActionMenu: FunctionComponent = () => {
  return (
    <Menu>
      <MenuButton
        as={IconButton}
        size={'xs'}
        icon={<Icon as={BsThreeDots} />}
        variant="ghost"
      />
      <MenuList>
        <MenuItem>New Topic</MenuItem>
        <MenuItem>New Feature</MenuItem>
      </MenuList>
    </Menu>
  )
}
//
export const LeftMenu: FunctionComponent = () => {
  //
  const style = {
    borderRight: 1,
    borderStyle: 'solid',
    width: '330px',
    borderColor: useColorModeValue('gray.200', 'gray.600')
  }

  //
  const titleStyle = {
    borderBottom: 1,
    borderStyle: 'solid',
    padding: 2,
    borderColor: useColorModeValue('gray.200', 'gray.600')
  }

  return (
    <Box as="aside" {...style}>
      <Box position={'sticky'} top={'60px'} h={'100%'} maxH={'100vh'}>
        <Box {...titleStyle}>
          <Flex>
            <Text flex={1}>Features</Text>
            <ActionMenu />
          </Flex>
        </Box>
        <VStack
          as="nav"
          align="left"
          overflowY={'auto'}
          mt={2}
          pl={2}
          pr={2}
          h={'100%'}
        >
          <Accordion allowMultiple>
            <AccordionItem border={'none'}>
              <MenuGroup href="#">Repository Structure</MenuGroup>
              <AccordionPanel pt={0} pr={0} pb={0}>
                <List>
                  <SubMenuItem href="#">Documentation</SubMenuItem>
                  <SubMenuItem href="#">Environments</SubMenuItem>
                  <SubMenuItem href="#">Packages</SubMenuItem>
                  <SubMenuItem href="#">Services</SubMenuItem>
                </List>
              </AccordionPanel>
            </AccordionItem>

            <AccordionItem border={'none'}>
              <MenuGroup href="#">Installing Dependencies</MenuGroup>
              <AccordionPanel pt={0} pr={0} pb={0}>
                <List>
                  <SubMenuItem href="#">Verify correct UID</SubMenuItem>
                  <SubMenuItem href="#">Install Oh My Zsh</SubMenuItem>
                  <SubMenuItem href="#">Install Zsh Marks</SubMenuItem>
                  <SubMenuItem href="#">Install required packages</SubMenuItem>
                  <SubMenuItem href="#">Install nvm</SubMenuItem>
                  <SubMenuItem href="#">Install docker</SubMenuItem>
                  <SubMenuItem href="#">Install the repository</SubMenuItem>
                </List>
              </AccordionPanel>
            </AccordionItem>

            <AccordionItem border={'none'}>
              <MenuGroup href="#">Running the Application</MenuGroup>
              <AccordionPanel pt={0} pr={0} pb={0}>
                <List>
                  <SubMenuItem href="#">Set the Environment</SubMenuItem>
                  <SubMenuItem href="#">NPM Dependencies</SubMenuItem>
                  <SubMenuItem href="#">Deploy Services</SubMenuItem>
                  <SubMenuItem href="#">Apply Secrets</SubMenuItem>
                  <SubMenuItem href="#">Add hosts to /etc/hosts</SubMenuItem>
                  <SubMenuItem href="#">Import database</SubMenuItem>
                  <SubMenuItem href="#">Running the environment</SubMenuItem>
                </List>
              </AccordionPanel>
            </AccordionItem>
          </Accordion>
        </VStack>
      </Box>
    </Box>
  )
}

export default LeftMenu

import { FunctionComponent } from 'react'

import {
  Accordion,
  AccordionItem,
  AccordionButton,
  AccordionIcon,
  AccordionPanel,
  List,
  ListItem,
  Box,
  VStack,
  useColorModeValue
} from '@chakra-ui/react'

import Link from './link'

//
interface MenuItemProps {}

export const MenuItem: FunctionComponent<MenuItemProps> = ({ children }) => {
  return (
    <h2>
      <AccordionButton _focus={{}}>
        <Box flex="1" textAlign="left">
          {children}
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

//
export const Menu: FunctionComponent = () => {
  //
  const style = {
    borderRight: 1,
    borderStyle: 'solid',
    width: '300px',
    borderColor: useColorModeValue('gray.200', 'gray.600')
  }

  return (
    <Box as="aside" {...style}>
      <Box position={'sticky'} top={'60px'} h={'100%'} maxH={'100vh'}>
        <VStack as="nav" align="left" overflowY={'auto'} p={2} h={'100%'}>
          <Accordion allowMultiple>
            <AccordionItem border={'none'}>
              <MenuItem>Repository Structure</MenuItem>
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
              <MenuItem>Installing Dependencies</MenuItem>
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
              <MenuItem>Running the Application</MenuItem>
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

export default Menu

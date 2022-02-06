import { FunctionComponent } from 'react'

import {
  Accordion,
  AccordionItem,
  AccordionButton,
  AccordionIcon,
  AccordionPanel,
  Box,
  VStack,
  useColorModeValue
} from '@chakra-ui/react'

export const MenuItem: FunctionComponent = ({ children }) => {
  return <AccordionButton _focus={{}}>{children}</AccordionButton>
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
      <Box position={'sticky'} top={'60px'}>
        <VStack as="nav" align="left">
          <Accordion allowMultiple>
            <AccordionItem>
              <h2>
                <MenuItem>
                  <Box flex="1" textAlign="left">
                    Section 1 title
                  </Box>
                  <AccordionIcon />
                </MenuItem>
              </h2>
              <AccordionPanel pb={4}>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
                eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut
                enim ad minim veniam, quis nostrud exercitation ullamco laboris
                nisi ut aliquip ex ea commodo consequat.
              </AccordionPanel>
            </AccordionItem>

            <AccordionItem>
              <h2>
                <AccordionButton>
                  <Box flex="1" textAlign="left">
                    Section 2 title
                  </Box>
                  <AccordionIcon />
                </AccordionButton>
              </h2>
              <AccordionPanel pb={4}>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
                eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut
                enim ad minim veniam, quis nostrud exercitation ullamco laboris
                nisi ut aliquip ex ea commodo consequat.
              </AccordionPanel>
            </AccordionItem>
          </Accordion>
        </VStack>
      </Box>
    </Box>
  )
}

export default Menu

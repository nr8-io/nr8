import { FunctionComponent } from 'react'
import { useColorMode, Button } from '@chakra-ui/react'

//
const ColorToggle: FunctionComponent = () => {
  const { colorMode, toggleColorMode } = useColorMode()

  return (
    <Button onClick={toggleColorMode}>
      Toggle {colorMode === 'light' ? 'Dark' : 'Light'}
    </Button>
  )
}

export default ColorToggle

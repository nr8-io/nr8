import type { NextPage } from 'next'
import Head from 'next/head'
import styles from '../styles/Home.module.css'

import {
  useColorMode,
  AspectRatio,
  Box,
  Button,
  Container,
  Image,
  Text,
} from "@chakra-ui/react"

//
function ColorToggle() {
  const { colorMode, toggleColorMode } = useColorMode()
  return (
    <Button onClick={toggleColorMode}>
      Toggle {colorMode === 'light' ? 'Dark' : 'Light'}
    </Button>
  )
}

export { getServerSideProps } from '../providers/chakra'

const Home: NextPage = () => {
  return (
    <div>
      <ColorToggle />
      <Text noOfLines={3}>
        The quick brown fox jumps over the lazy dog is an English-language pangram—a
        sentence that contains all of the letters of the English alphabet. Owing to
        its existence, Chakra was created.
      </Text>
      <Text noOfLines={[1, 2, 3]}>
        The quick brown fox jumps over the lazy dog is an English-language pangram—a
        sentence that contains all of the letters of the English alphabet. Owing to
        its existence, Chakra was created.
      </Text>
    </div>
  )
}

export default Home

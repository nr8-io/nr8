import type { NextPage } from 'next'

//
import StandardLayout from '../components/layouts/standard'

//
export { getServerSideProps } from '../providers/chakra'

const Home: NextPage = () => {
  return (
    <StandardLayout>
      <p>some content</p>
    </StandardLayout>
  )
}

export default Home

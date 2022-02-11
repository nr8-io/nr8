import type { NextPage } from 'next'

//
import StandardLayout from '../../components/layouts/standard'

//
import Counter from '../../components/counter'

//
export { getServerSideProps } from '../../providers/chakra'

const Topics: NextPage = () => {
  return (
    <StandardLayout>
      <Counter />
    </StandardLayout>
  )
}

export default Topics

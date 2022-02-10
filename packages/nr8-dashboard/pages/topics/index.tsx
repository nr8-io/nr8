import type { NextPage } from 'next'
import { useSelector, useDispatch } from 'react-redux'
import { decrement, increment } from '../../providers/redux'

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

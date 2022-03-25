import type { NextPage } from 'next'

//
import DocumentLayout from '../../components/layouts/document'

//
export { getServerSideProps } from '../../providers/chakra'

const Page: NextPage = () => {
  return <DocumentLayout>Stories</DocumentLayout>
}

export default Page

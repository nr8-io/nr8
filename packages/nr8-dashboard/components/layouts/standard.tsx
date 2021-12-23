import { FunctionComponent } from 'react'

//
import Navigation from '../navigation'
import Footer from '../footer'

//
const Layout: FunctionComponent = ({ children }) => {
  return (
    <>
      <Navigation />
      {children}
      <Footer />
    </>
  )
}

export default Layout

import Navigation from '../navigation'
import Footer from '../navigation'

//
export default function Layout(props) {
  const { children } = props

  return (
    <>
      <Navigation />
      {children}
      <Footer />
    </>
  )
}

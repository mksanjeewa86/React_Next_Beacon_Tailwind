import { Footer } from './Footer'
import { Navbar } from './Navbar'

export default function Layout({ children }) {
  return (
    <>
      <Navbar />
      <main style={{ height: 'calc(100vh - 100px)' }}>{children}</main>
      <Footer />
    </>
  )
}

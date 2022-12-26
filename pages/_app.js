import { Layout } from 'antd'
import { Toaster } from 'react-hot-toast'
import NavBar from '../src/components/NavBar'
import { AuthProvider } from '../src/context/auth'
import { PostProvider } from '../src/context/post'
import { MediaProvider } from '../src/context/media'
import '../src/styles/global.css'

const { Footer } = Layout

function MyApp({ Component, pageProps }) {
  return (
    <>
      <AuthProvider>
        <PostProvider>
          <MediaProvider>
            <NavBar />
            <Toaster />
            <Component {...pageProps} />
            <Footer
              style={{
                textAlign: 'center',
                position: 'fixed',
                width: '100%',
                bottom: 0,
                backgroundColor: 'rgb(36, 39, 46)',
                paddingTop: '20px',
                paddingBottom: '20px',
              }}
            >
              ©2022 Cassiano Marinello - This site is made for learning proposal
            </Footer>
          </MediaProvider>
        </PostProvider>
      </AuthProvider>
    </>
  )
}

export default MyApp

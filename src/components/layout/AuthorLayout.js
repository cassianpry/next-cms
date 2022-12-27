import { LoadingOutlined } from '@ant-design/icons'
import { Layout } from 'antd'
import axios from 'axios'
import { useRouter } from 'next/router'
import { useContext, useEffect, useState } from 'react'
import { AuthContext } from '../../context/auth'
import AuthorNav from '../nav/AuthorNav'

const { Content } = Layout

export default function AuthorLayout({ children }) {
  // state
  const [loading, setLoading] = useState(true)
  // context
  const [auth, setAuth] = useContext(AuthContext)

  // router
  const router = useRouter()

  useEffect(() => {
    // if (auth?.user?.role !== "Admin") {
    //   window.location.href = "/";
    //   router.push("/");
    // } else {
    //   setLoading(false);
    //}
    if (auth?.token) getCurrentUser()
  }, [auth?.token])

  const getCurrentUser = async () => {
    try {
      const { data } = await axios.get('/current-author')
      setLoading(false)
      //console.log(data);
    } catch (err) {
      console.log(err)
      router.push('/')
    }
  }

  return (
    <Layout theme="dark">
      {loading ? (
        <div
          style={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            height: 500,
          }}
        >
          <p>
            <LoadingOutlined style={{ fontSize: '50px' }} />
          </p>
        </div>
      ) : (
        <>
          <AuthorNav />
          <Layout theme="dark">
            <Content
              style={{ backgroundColor: 'rgb(30, 30, 30)', padding: '10px' }}
            >
              {children}
            </Content>
          </Layout>
        </>
      )}
    </Layout>
  )
}

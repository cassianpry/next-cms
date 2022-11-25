import { Layout } from 'antd'
import AdminNav from '../nav/AdminNav'

const { Content, Footer } = Layout

export default function AdminLayout({ children }) {
  return (
    <Layout theme="dark">
      <AdminNav />
      <Layout theme="dark">
        <Content
          style={{ backgroundColor: 'rgb(30, 30, 30)', padding: '10px' }}
        >
          {children}
        </Content>
      </Layout>
    </Layout>
  )
}

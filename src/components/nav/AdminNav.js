import { useContext, useEffect, useState } from 'react'
import {
  BarChartOutlined,
  BgColorsOutlined,
  CameraOutlined,
  CommentOutlined,
  LeftOutlined,
  PushpinOutlined,
  RightOutlined,
  TeamOutlined,
  UserOutlined,
} from '@ant-design/icons'
import { Menu, Layout, Button } from 'antd'
import { useWindowWidth } from '@react-hook/window-size'
import { AuthContext } from '../../context/auth'
import { useRouter } from 'next/router'

const { Sider } = Layout

function getItem(label, key, icon, children, type, ...props) {
  return {
    key,
    icon,
    children,
    label,
    type,
    ...props,
  }
}
const items = [
  getItem('Dashboard', '/admin', <BarChartOutlined />),
  getItem('Posts', 'sub1', <PushpinOutlined />, [
    getItem('All Posts', '/admin/posts'),
    getItem('Add New', '/admin/posts/new'),
    getItem('Categories', '/admin/categories'),
  ]),
  getItem('Media', 'sub2', <CameraOutlined />, [
    getItem('Library', '/admin/media'),
    //getItem('Add New', '/admin/media/new'),
  ]),
  getItem('Comments', '/admin/comments', <CommentOutlined />),
  getItem('Users', 'sub3', <TeamOutlined />, [
    getItem('All Users', '/admin/users'),
    getItem('Add New', '/admin/users/new'),
  ]),
  getItem('Profile', '/admin/users/userid', <UserOutlined />),
  getItem('Customize', '/admin/customize', <BgColorsOutlined />),
]
const AdminNav = () => {
  //state
  const [collapsed, setCollapsed] = useState(false)
  const [current, setCurrent] = useState('')
  //context
  const [auth, setAuth] = useContext(AuthContext)
  //router
  const router = useRouter()

  const onlyWidth = useWindowWidth()

  const toggleCollapsed = () => {
    setCollapsed(!collapsed)
  }

  const onClick = (e) => {
    console.log('click ', e)
    setCurrent(e.key)
    router.push(`${e.key}`)
  }

  const signOut = () => {
    //remove from localStorage
    localStorage.removeItem('auth')
    //remove from context
    setAuth({ user: null, token: '' })
    //redirect to home
    router.push('/')
  }

  useEffect(() => {
    if (onlyWidth < 800) {
      setCollapsed(true)
    } else {
      setCollapsed(false)
    }
  }, [onlyWidth])

  return (
    <Sider
      theme="dark"
      collapsed={collapsed}
      onCollapse={() => setCollapsed(!collapsed)}
    >
      <div
        style={{
          display: 'flex',
          justifyContent: 'center',
        }}
      >
        <Button
          type="text"
          onClick={toggleCollapsed}
          style={{ marginBottom: 16, color: 'white' }}
        >
          {collapsed ? <RightOutlined /> : <LeftOutlined />}
        </Button>
      </div>
      <div style={{ height: '90vh' }}>
        <Menu
          defaultSelectedKeys={['1']}
          defaultOpenKeys={['']}
          mode="inline"
          items={items}
          onClick={onClick}
          //collapsed={collapsed}
          theme="dark"
        />
      </div>
    </Sider>
  )
}
export default AdminNav

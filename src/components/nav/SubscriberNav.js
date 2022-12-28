import { useContext, useEffect, useState } from 'react'
import {
  BarChartOutlined,
  CommentOutlined,
  LeftOutlined,
  RightOutlined,
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
  getItem('Dashboard', '/subscriber', <BarChartOutlined />),
  getItem('Comments', '/subscriber/comments', <CommentOutlined />),
  getItem('Profile', '/subscriber/profile', <UserOutlined />),
]
const SubscriberNav = () => {
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
export default SubscriberNav

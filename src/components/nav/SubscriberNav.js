import { useContext, useEffect, useState } from 'react'
import Link from 'next/link'
import {
  BarChartOutlined,
  CommentOutlined,
  LeftOutlined,
  RightOutlined,
  UserOutlined
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
    ...props
  }
}

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

  // const onClick = (e) => {
  //   console.log('click ', e)
  //   setCurrent(e.key)
  //   router.push(`${e.key}`)
  // }

  // const signOut = () => {
  //   //remove from localStorage
  //   localStorage.removeItem('auth')
  //   //remove from context
  //   setAuth({ user: null, token: '' })
  //   //redirect to home
  //   router.push('/')
  // }

  useEffect(() => {
    if (onlyWidth < 800) {
      setCollapsed(true)
    } else {
      setCollapsed(false)
    }
  }, [onlyWidth])

  const items = [
    getItem(
      <Link href="/subscriber">
        <BarChartOutlined style={{ paddingRight: '10px' }} />
        Dashboard
      </Link>,
      'dashboard'
    ),
    getItem(
      <Link href="/subscriber/comments">
        <CommentOutlined style={{ paddingRight: '10px' }} />
        Comments
      </Link>,
      'comments'
    ),
    getItem(
      <Link href={`subscriber/${auth?.user?._id}`}>
        <UserOutlined style={{ paddingRight: '10px' }} />
        Profile
      </Link>,
      'profile'
    )
  ]

  return (
    <Sider
      theme="dark"
      collapsed={collapsed}
      onCollapse={() => setCollapsed(!collapsed)}
    >
      <div
        style={{
          display: 'flex',
          justifyContent: 'center'
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
          // defaultSelectedKeys={['1']}
          // defaultOpenKeys={['']}
          mode="inline"
          items={items}
          //onClick={onClick}
          //collapsed={collapsed}
          theme="dark"
        />
      </div>
    </Sider>
  )
}
export default SubscriberNav

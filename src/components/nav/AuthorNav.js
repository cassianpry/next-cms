import { useContext, useEffect, useState } from 'react'
import Link from 'next/link'
import {
  BarChartOutlined,
  CameraOutlined,
  CommentOutlined,
  LeftOutlined,
  PushpinOutlined,
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

const AuthorNav = () => {
  //state
  const [collapsed, setCollapsed] = useState(false)
  // const [current, setCurrent] = useState('')
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
      <Link href="/author">
        <BarChartOutlined style={{ paddingRight: '10px' }} />
        Dashboard
      </Link>,
      'dashboard'
    ),
    getItem('Posts', 'sub1', <PushpinOutlined />, [
      getItem(<Link href="/author/posts">All Posts</Link>, 'posts'),
      getItem(<Link href="/author/posts/new">Add New</Link>, 'newPost'),
      getItem(<Link href="/author/categories">Categories</Link>, 'categories')
    ]),
    getItem('Media', 'sub2', <CameraOutlined />, [
      getItem(<Link href="/author/media">Library</Link>, 'library')
    ]),
    getItem(
      <Link href="/author/comments">
        <CommentOutlined style={{ paddingRight: '10px' }} />
        Comments
      </Link>,
      'comments'
    ),
    getItem(
      <Link href={`author/${auth?.user?._id}`}>
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
          //defaultSelectedKeys={['1']}
          //defaultOpenKeys={['']}
          openKeys={['sub1', 'sub2', 'sub3']}
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
export default AuthorNav

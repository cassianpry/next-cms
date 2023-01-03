import { useEffect, useState } from 'react'
import {
  BarChartOutlined,
  BgColorsOutlined,
  CameraOutlined,
  CommentOutlined,
  LeftOutlined,
  PushpinOutlined,
  RightOutlined,
  TeamOutlined,
  UserOutlined
} from '@ant-design/icons'
import { Menu, Layout, Button } from 'antd'
import { useWindowWidth } from '@react-hook/window-size'
import { useRouter } from 'next/router'
import Link from 'next/link'

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
const items = [
  getItem(
    <Link href="/admin">
      <BarChartOutlined style={{ paddingRight: '10px' }} />
      Dashboard
    </Link>,
    'dashboard'
  ),
  getItem('Posts', 'sub1', <PushpinOutlined />, [
    getItem(<Link href="/admin/posts">All Posts</Link>, 'posts'),
    getItem(<Link href="/admin/posts/new">Add New</Link>, 'newPost'),
    getItem(<Link href="/admin/categories">Categories</Link>, 'categories')
  ]),
  getItem('Media', 'sub2', <CameraOutlined />, [
    getItem(<Link href="/admin/media">Library</Link>, 'media')
    //getItem('Add New', '/admin/media/new'),
  ]),
  getItem(
    <Link href="/admin/comments">
      <CommentOutlined style={{ paddingRight: '10px' }} />
      Comments
    </Link>,
    'comments'
  ),
  getItem('Users', 'sub3', <TeamOutlined />, [
    getItem(
      <Link href="/admin/users" passHref>
        All Users
      </Link>,
      'users'
    ),
    getItem(<Link href="/admin/users/new">Add New</Link>, 'newUser')
  ]),
  getItem(
    <Link href="/admin/users/userid">
      <UserOutlined style={{ paddingRight: '10px' }} />
      Profile
    </Link>,
    'profile'
  ),
  getItem(
    <Link href="/admin/customize">
      <BgColorsOutlined style={{ paddingRight: '10px' }} />
      Customize
    </Link>,
    'customize'
  )
]
const AdminNav = () => {
  //state
  const [collapsed, setCollapsed] = useState(false)
  const [current, setCurrent] = useState('')

  //router
  const router = useRouter()

  const onlyWidth = useWindowWidth()

  const toggleCollapsed = () => {
    setCollapsed(!collapsed)
  }

  const onClick = (e) => {
    console.log('click ', e)
    setCurrent(e.key)
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
          openKeys={['sub1', 'sub2', 'sub3']}
          //selectedKeys={current}
          //openKeys={''}
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
export default AdminNav

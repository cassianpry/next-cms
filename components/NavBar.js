import { useContext, useState } from 'react'
import {
  ClusterOutlined,
  HomeOutlined,
  LoginOutlined,
  LogoutOutlined,
  SettingOutlined,
  SolutionOutlined,
} from '@ant-design/icons'
import { Menu } from 'antd'
import { useRouter } from 'next/router'
import { AuthContext } from '../context/auth'
import toast from 'react-hot-toast'

function getItem(label, key, icon, children, type) {
  return {
    key,
    icon,
    children,
    label,
    type,
  }
}

const NavBar = () => {
  //state
  const [current, setCurrent] = useState('/')
  //context
  const [auth, setAuth] = useContext(AuthContext)
  //router
  const router = useRouter()

  //menu
  const items = [
    {
      label: 'CMS',
      key: '/',
      icon: <HomeOutlined />,
    },
    auth?.user === null && {
      style: { marginLeft: 'auto' },
      label: 'Register',
      key: '/signup',
      icon: <SolutionOutlined />,
    },
    auth?.user === null && {
      label: 'Login',
      key: '/signin',
      icon: <LoginOutlined />,
    },
    auth?.user !== null && {
      label: 'Dashboard',
      icon: <SettingOutlined />,
      style: { marginLeft: 'auto' },
      children: [
        {
          type: 'group',
          label: <p style={{ color: 'white' }}>Management</p>,
          children: [
            {
              label: 'Admin',
              key: '/admin',
              icon: <ClusterOutlined />,
            },
          ],
        },

        {
          type: 'divider',
        },
        getItem('Logout', 'logout', <LogoutOutlined />),
      ],
    },
  ]

  // const signOut = () => {
  //   //remove from localStorage
  //   localStorage.removeItem('auth')
  //   //remove from context
  //   setAuth({ user: null, token: '' })
  //   //redirect to home
  //   router.push('/')
  // }

  const onClick = (e) => {
    console.log('click ', e)
    setCurrent(e.key)
    if (e.key === 'logout') {
      //remove from localStorage
      localStorage.removeItem('auth')
      //remove from context
      setAuth({ user: null, token: '' })
      //redirect to home
      router.push('/')
      setCurrent('/')
      toast.success('Successfully Logged out')
    } else {
      router.push(`${e.key}`)
    }
  }
  return (
    <div>
      <Menu
        onClick={onClick}
        selectedKeys={[current]}
        mode="horizontal"
        items={items}
        theme="dark"
        selectable
      />
    </div>
  )
}
export default NavBar
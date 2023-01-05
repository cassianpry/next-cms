import { DeleteOutlined, EditOutlined } from '@ant-design/icons'
import { Avatar, Col, List, Row, Input } from 'antd'
import axios from 'axios'
import { useContext, useEffect, useState } from 'react'
import Link from 'next/link'
import { AuthContext } from '../../../src/context/auth'
import { toast } from 'react-hot-toast'

const { Search } = Input

export default function Users() {
  // context
  const [auth, setAuth] = useContext(AuthContext)
  //state
  const [users, setUsers] = useState([])
  const [keyword, setKeyword] = useState('')

  useEffect(() => {
    if (auth?.token) {
      fetchUsers()
    }
  }, [auth?.token, auth?.user?._id])

  const fetchUsers = async () => {
    try {
      const { data } = await axios.get('users')
      setUsers(data)
      console.log(users)
    } catch (err) {
      console.log(err)
    }
  }

  const handleDelete = async (user) => {
    if (user._id === auth.user._id) {
      return
    }
    const answer = window.confirm('Are you sure you want to delete?')
    if (answer) {
      try {
        const { data } = await axios.delete(`/user/${user._id}`)
        setUsers((prev) => prev.filter((u) => u._id !== user._id))
        toast.success('User deleted successfuly')
      } catch (err) {
        console.log(err)
      }
    }
  }

  const filteredUsesrs = users?.filter((u) =>
    u.name.toLowerCase().includes(keyword.toLowerCase())
  )

  return (
    <Row>
      <Col span={24}>
        <h1 style={{ marginBottom: '5px' }}>All Users: ({users.length})</h1>
        <Search
          placeholder="Type something to search..."
          enterButton
          value={keyword}
          onChange={(e) => setKeyword(e.target.value)}
        />
        <List
          itemLayout="horizontal"
          dataSource={filteredUsesrs}
          renderItem={(user) => (
            <List.Item
              key={user._id}
              className="post-list-item"
              actions={[
                <Link href={`/admin/users/${user._id}`}>
                  edit&nbsp;
                  <EditOutlined style={{ color: 'rgb(134, 241, 131)' }} />
                </Link>,
                <>
                  {user?._id === auth?.user?._id ? (
                    ''
                  ) : (
                    <a onClick={() => handleDelete(user)}>
                      delete&nbsp;
                      <DeleteOutlined style={{ color: 'rgb(255,0,0)' }} />
                    </a>
                  )}
                </>
              ]}
            >
              <Avatar src={user.image?.url}>{user?.name[0]}</Avatar>
              <List.Item.Meta
                style={{ marginLeft: '10px' }}
                title={user.name}
              />

              <List.Item.Meta
                style={{ marginLeft: '10px' }}
                title={user.email}
              />

              <List.Item.Meta
                style={{ marginLeft: '10px' }}
                title={user.role}
              />
              <List.Item.Meta
                style={{ marginLeft: '10px' }}
                title={`${user.posts?.length || 0} posts`}
              />
            </List.Item>
          )}
        />
      </Col>
    </Row>
  )
}

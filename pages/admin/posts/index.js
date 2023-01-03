import { DeleteOutlined, EditOutlined, PlusOutlined } from '@ant-design/icons'
import { Button, Col, List, Row } from 'antd'
import axios from 'axios'
import Link from 'next/link'
import { useRouter } from 'next/router'
import { useContext, useEffect } from 'react'
import AdminLayout from '../../../src/components/layout/AdminLayout'
import PostList from '../../../src/components/posts/PostList'
import { PostContext } from '../../../src/context/post'

const Posts = () => {
  const [post, setPost] = useContext(PostContext)
  const router = useRouter()

  const fetchPosts = async () => {
    try {
      const { data } = await axios.get('/posts-for-admin')
      setPost((prev) => ({ ...prev, posts: data }))
    } catch (err) {
      console.log(err)
    }
  }

  useEffect(() => {
    fetchPosts()
  }, [])

  const handleEdit = async (post) => {
    //console.log('EDIT POST => ', post)
    return router.push(`/admin/posts/${post.slug}`)
  }

  const handleDelete = async (post) => {
    //console.log("DELETE POST => ", post);

    try {
      const answer = window.confirm('Are you sure you want to delete?')
      if (answer) {
        const { data } = await axios.delete(`/post/${post._id}`)
        if (data.ok) {
          setPost((prev) => ({
            ...prev,
            posts: prev.posts.filter((p) => p._id !== post._id)
          }))
        }
      }
    } catch (err) {
      console.log(err)
    }
  }

  return (
    <AdminLayout>
      <Row>
        <Col span={24}>
          <Link href="/admin/posts/new">
            <Button
              type="primary"
              style={{ margin: '10px 0px 10px 0px' }}
              icon={<PlusOutlined />}
            >
              <span>Add New</span>
            </Button>
          </Link>
          <h1 style={{ marginTop: '10px' }}>{post.posts?.length} Posts</h1>
          <PostList
            posts={post.posts}
            handleDelete={handleDelete}
            handleEdit={handleEdit}
          />
        </Col>
      </Row>
    </AdminLayout>
  )
}

export default Posts

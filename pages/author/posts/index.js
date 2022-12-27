import { PlusOutlined } from '@ant-design/icons'
import { Button, Col, Row } from 'antd'
import axios from 'axios'
import Link from 'next/link'
import { useRouter } from 'next/router'
import { useContext, useEffect } from 'react'
import AuthorLayout from '../../../src/components/layout/AuthorLayout'
import PostList from '../../../src/components/posts/PostList'
import { PostContext } from '../../../src/context/post'

const Posts = () => {
  const [post, setPost] = useContext(PostContext)
  const router = useRouter()

  const fetchPosts = async () => {
    try {
      const { data } = await axios.get('/posts-by-author')
      setPost((prev) => ({ ...prev, posts: data }))
      console.log(post)
    } catch (err) {
      console.log(err)
    }
  }

  useEffect(() => {
    fetchPosts()
  }, [])

  const handleEdit = async (post) => {
    //console.log('EDIT POST => ', post)
    return router.push(`/author/posts/${post.slug}`)
  }

  const handleDelete = async (post) => {
    //console.log("DELETE POST => ", post);
    const answer = window.confirm('Are you sure you want to delete?')
    if (answer) {
      const { data } = await axios.delete(`/post/${post._id}`)
      if (data.ok) {
        setPost((prev) => ({
          ...prev,
          posts: prev.posts.filter((p) => p._id !== post._id),
        }))
      }
    }
    try {
    } catch (err) {
      //
    }
  }

  return (
    <AuthorLayout>
      <Row>
        <Col span={24}>
          <Link href="/author/posts/new">
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
    </AuthorLayout>
  )
}

export default Posts

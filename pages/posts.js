import { Col, Row, Card, Avatar, Button } from 'antd'
import axios from 'axios'
import Link from 'next/link'
import Head from 'next/head'
import { useEffect, useState } from 'react'

const { Meta } = Card

const Posts = ({ posts }) => {
  //state
  const [allPosts, setAllPosts] = useState(posts)
  const [total, setTotal] = useState(0)
  const [page, setPage] = useState(1)
  const [loading, setLoading] = useState(false)

  const getTotal = async () => {
    try {
      const { data } = await axios.get('/post-count')
      setTotal(data)
    } catch (err) {
      console.log(err)
    }
  }

  const loadMore = async () => {
    try {
      setLoading(true)
      const { data } = await axios.get(`/posts/${page}`)
      setAllPosts([...allPosts, ...data])
      setLoading(false)
    } catch (err) {
      setLoading(false)
    }
  }

  useEffect(() => {
    getTotal()
  }, [])

  useEffect(() => {
    if (page === 1) return
    loadMore()
  }, [page])

  return (
    <>
      <Head>
        <title>Recent blog posts</title>
        <meta description="Blog posts about web develop" />
      </Head>
      <spam>{total}</spam>
      <Row style={{ margin: '10px' }}>
        {allPosts.map((post) => (
          <Col
            key={post._id}
            xs={24}
            xl={8}
            sm={12}
            style={{ marginTop: 10, marginBottom: 10 }}
          >
            <div
              style={{
                paddingRight: '15px',
                paddingLeft: '15px'
              }}
            >
              <Link href={`/post/${post.slug}`}>
                <Card
                  cover={
                    <img
                      className="image-card"
                      alt="example"
                      src={post.featuredImage?.url || 'images/Blur.png'}
                    />
                  }
                >
                  <Meta title={post.title} />
                </Card>
              </Link>
            </div>
          </Col>
        ))}
        {/* <Col sm={24} lg={8}>
          <p>SideBar</p>
        </Col> */}
      </Row>
      {allPosts?.length < total && (
        <Row>
          <Col span={24} style={{ textAlign: 'center' }}>
            <Button
              type="primary"
              loading={loading}
              onClick={() => setPage(page + 1)}
            >
              Load More
            </Button>
          </Col>
        </Row>
      )}
    </>
  )
}

export async function getServerSideProps() {
  const { data } = await axios.get(`${process.env.BASE_URL}/posts/1`)
  return {
    props: {
      posts: data
    }
  }
}

export default Posts

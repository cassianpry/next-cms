import { Col, Row, Card, Avatar } from 'antd'
import axios from 'axios'
import Link from 'next/link'
import Head from 'next/head'

const { Meta } = Card

function Posts({ posts }) {
  return (
    <>
      <Head>
        <title>Recent blog posts</title>
        <meta description="Blog posts about web develop" />
      </Head>
      <Row style={{ margin: '10px' }}>
        {posts.map((post) => (
          <Col
            key={post._id}
            xs={24}
            xl={8}
            sm={12}
            style={{ marginTop: 5, marginBottom: 5 }}
          >
            <div
              style={{
                paddingRight: '15px',
                paddingLeft: '15px',
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
        <Col sm={24} lg={8}>
          <p>SideBar</p>
        </Col>
      </Row>
    </>
  )
}

export async function getServerSideProps() {
  const { data } = await axios.get(`${process.env.BASE_URL}/posts`)
  return {
    props: {
      posts: data,
    },
  }
}

export default Posts

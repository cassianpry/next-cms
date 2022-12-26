import { Col, Row, Card, Avatar, Typography } from 'antd'
import axios from 'axios'
import Link from 'next/link'
import Head from 'next/head'
import dayjs from 'dayjs'
import dynamic from 'next/dynamic'
import rehypeSanitize from 'rehype-sanitize'

const { Meta } = Card
const { Title } = Typography

const MDEditor = dynamic(
  () => import('@uiw/react-md-editor').then((mod) => mod.default),
  { ssr: false }
)

export const SinglePost = ({ post }) => {
  return (
    <>
      <Head>
        <title>{post.title}</title>
        <meta description={post.content.substring(0, 160)} />
      </Head>
      <Row style={{ marginTop: '10px', marginLeft: '10px' }}>
        <Col xs={24} xl={16} style={{ marginTop: 5, marginBottom: 5 }}>
          <Card
            cover={
              <img
                className="image-card"
                alt={post.title}
                src={post?.featuredImage?.url || '/images/Blur.png'}
              />
            }
          >
            <Title style={{ color: 'white' }}>{post.title}</Title>
            <p className="tabs-text">
              {dayjs(post.createdAt).format('MMMM D, YYYY h:mm')} / 0 Comments /
              in&nbsp;
              {post?.categories.map((cat) => (
                <span key={cat._id}>
                  <Link href={`/categories/${cat.slug}`}>{cat.name}&nbsp;</Link>
                </span>
              ))}
            </p>
            <MDEditor
              className="tabs-text"
              data-color-mode="dark"
              value={post.content}
              preview="preview"
              height={'100%'}
              hideToolbar
              visibleDragbar={false}
              previewOptions={{
                rehypePlugins: [[rehypeSanitize]],
              }}
            />
          </Card>
        </Col>
        <Col xs={22} xl={6} offset={1}>
          <p>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
            eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim
            ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut
            aliquip ex ea commodo consequat. Duis aute irure dolor in
            reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla
            pariatur. Excepteur sint occaecat cupidatat non proident, sunt in
            culpa qui officia deserunt mollit anim id est laborum.
          </p>
        </Col>
      </Row>
    </>
  )
}

export async function getServerSideProps({ params }) {
  const { data } = await axios.get(
    `${process.env.BASE_URL}/post/${params.slug}`
  )
  return {
    props: {
      post: data.post,
    },
  }
}

export default SinglePost

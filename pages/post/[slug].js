import { useEffect, useState } from 'react'
import { Col, Row, Card, Typography, List, Avatar } from 'antd'
import { toast } from 'react-hot-toast'
import axios from 'axios'
import Link from 'next/link'
import Head from 'next/head'
import dayjs from 'dayjs'
import dynamic from 'next/dynamic'
import rehypeSanitize from 'rehype-sanitize'
import CommentForm from '../../src/components/comments/CommentForm'
import LoadingComponent from '../../src/components/LoadingComponent'
import relativeTime from 'dayjs/plugin/relativeTime'

dayjs.extend(relativeTime)
const { Title } = Typography

const MDEditor = dynamic(
  () => import('@uiw/react-md-editor').then((mod) => mod.default),
  { ssr: false }
)

export const SinglePost = ({ post, postComments }) => {
  //state
  const [comments, setComments] = useState(postComments)
  const [comment, setComment] = useState('')
  const [loading, setLoading] = useState(true)

  const handleSubmit = async () => {
    try {
      setLoading(true)
      const { data } = await axios.post(`/comment/${post._id}`, { comment })
      setComments([data, ...comments])
      setComment('')
      toast.success('Comment posted successfully')
      setLoading(false)
    } catch (err) {
      console.log(err)
    }
  }

  useEffect(() => {
    console.log(post.content)
    if (
      post.length < 1 &&
      post.content === '' &&
      post.content === 'undefined' &&
      post.content === null
    ) {
      setLoading(true)
    } else {
      setLoading(false)
    }
  }, [])

  return (
    <>
      <Head>
        <title>{post.title}</title>
        <meta description={post.content.substring(0, 160)} />
      </Head>
      <div style={{ margin: '20px' }}>
        <Row>
          <Col xs={24} xl={16} style={{ marginTop: 5, marginBottom: 5 }}>
            {loading ? (
              <LoadingComponent />
            ) : (
              <>
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
                    {dayjs(post.createdAt).format('MMMM D, YYYY - hh:mm')}
                    &nbsp;/&nbsp;
                    {comments.length}&nbsp;Comments / in&nbsp;
                    {post?.categories.map((cat) => (
                      <span key={cat._id}>
                        <Link href={`/categories/${cat.slug}`}>
                          {cat.name}&nbsp;
                        </Link>
                      </span>
                    ))}
                  </p>
                  <MDEditor
                    className="tabs-text"
                    data-color-mode="dark"
                    value={post.content}
                    preview="preview"
                    height="100%"
                    hideToolbar
                    visibleDragbar={false}
                    previewOptions={{
                      rehypePlugins: [[rehypeSanitize]]
                    }}
                  />
                </Card>
                <CommentForm
                  comment={comment}
                  setComment={setComment}
                  handleSubmit={handleSubmit}
                  loading={loading}
                />
                <div style={{ marginTop: '30px' }}>
                  <h4>Comments:</h4>
                  <List
                    itemLayout="horizontal"
                    dataSource={comments}
                    renderItem={(item) => (
                      <List.Item key={item._id} className="post-list-item">
                        <List.Item.Meta
                          avatar={
                            <Avatar>{item?.postedBy?.name?.charAt(0)}</Avatar>
                          }
                          title={item?.postedBy?.name}
                          // description={`${item.content} - ${dayjs(
                          //   item.createdAt
                          // ).fromNow()}`}
                        />
                        {item.content} - {dayjs(item.createdAt).fromNow()}
                      </List.Item>
                    )}
                  />
                </div>
              </>
            )}
          </Col>
          <Col xs={22} xl={6} offset={1}></Col>
        </Row>
      </div>
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
      postComments: data.comments
    }
  }
}

export default SinglePost

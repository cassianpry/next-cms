import { DeleteOutlined, EditOutlined, EyeOutlined } from '@ant-design/icons'
import { Button, Col, Input, List, Modal, Row } from 'antd'
import axios from 'axios'
import dayjs from 'dayjs'
import localizedFormat from 'dayjs/plugin/localizedFormat'
import Link from 'next/link'
import { useRouter } from 'next/router'
import { useContext, useEffect, useState } from 'react'
import { toast } from 'react-hot-toast'
import { AuthContext } from '../../../src/context/auth'
import CommentForm from './CommentForm'

const { Search } = Input
dayjs.extend(localizedFormat)

function CommentsList() {
  //context

  const [auth, setAuth] = useContext(AuthContext)

  //state
  const [keyword, setKeyword] = useState('')
  const [page, setPage] = useState(1)
  const [total, setTotal] = useState(0)
  const [comments, setComments] = useState([])
  const [selectedComment, setselectedComment] = useState({})
  const [content, setContent] = useState('')
  const [visible, setVisible] = useState(false)
  const [loading, setLoading] = useState(false)

  //hook
  const router = useRouter()

  const fetchComments = async () => {
    try {
      if (auth.user.role === 'Admin') {
        setLoading(true)
        const { data } = await axios.get(`/comments/${page}`)
        setComments([...comments, ...data])
        setLoading(false)
      }
      if (auth.user.role === 'Author' || auth.user.role === 'Subscriber') {
        setLoading(true)
        const { data } = await axios.get('/user-comments')
        setComments(data)
        setLoading(false)
      }
    } catch (err) {
      console.log(err)
    }
  }

  const getTotal = async () => {
    try {
      const { data } = await axios.get('/comment-count')
      setTotal(data)
    } catch (err) {
      console.log(err)
    }
  }

  const filteredComments = comments?.filter((comment) =>
    comment.content.toLowerCase().includes(keyword.toLowerCase())
  )

  useEffect(() => {
    if (auth?.token) {
      getTotal()
      fetchComments()
    }
  }, [auth?.token, page])

  // useEffect(() => {
  //   if (page === 1) return
  //   if (auth?.token) fetchComments()
  // }, [page])

  const handleEdit = async (post) => {
    //console.log('EDIT POST => ', post)
  }

  const handleDelete = async (comment) => {
    //console.log("DELETE POST => ", post);

    try {
      const answer = window.confirm('Are you sure you want to delete?')
      if (!answer) {
        return
      }
      const { data } = await axios.delete(`/comment/${comment._id}`)
      if ((data.ok = true)) {
        setComments(comments.filter((c) => c._id !== comment._id))
        setTotal(total - 1)
        toast.success('Comment deleted successfully!')
      }
    } catch (err) {
      console.log(err)
    }
  }

  const handleSubmit = async () => {
    try {
      setLoading(true)
      const { data } = await axios.put(`/comment/${selectedComment._id}`, {
        content
      })
      let arr = comments
      const index = arr.findIndex((c) => c._id === selectedComment._id)
      arr[index].content = data.content
      setComments(arr)
      toast.success('Comment Updated')
      setLoading(false)
      setVisible(false)
    } catch (err) {
      console.log(err)
    }
  }

  return (
    <>
      <Row>
        <Col span={24}>
          <h1 style={{ marginTop: '10px' }}>{comments?.length} Comment(s)</h1>
          <Search
            placeholder="Type something to search..."
            enterButton
            value={keyword}
            onChange={(e) => setKeyword(e.target.value)}
          />
          <List
            itemLayout="horizontal"
            dataSource={filteredComments}
            renderItem={(item) => (
              <List.Item
                className="post-list-item"
                actions={[
                  <Link href={`/post/${item?.postId?.slug}#${item._id}`}>
                    view&nbsp;
                    <EyeOutlined style={{ color: 'rgb(240,230,140)' }} />
                  </Link>,
                  <>
                    {auth.user.role != 'Admin' && (
                      <a
                        onClick={() => {
                          setselectedComment(item)
                          setVisible(true)
                          setContent(item.content)
                        }}
                      >
                        Edit&nbsp;
                        <EditOutlined style={{ color: 'rgb(134, 241, 131)' }} />
                      </a>
                    )}
                  </>,
                  <a onClick={() => handleDelete(item)}>
                    delete&nbsp;
                    <DeleteOutlined style={{ color: 'rgb(255,0,0)' }} />
                  </a>
                ]}
              >
                <List.Item.Meta
                  title={item.content}
                  description={`On ${item?.postId?.title} | ${
                    item?.postedBy?.name
                  } | ${dayjs(item?.createdAt).format('L LT')}`}
                />
              </List.Item>
            )}
          />
        </Col>
      </Row>
      {auth?.user?.role === 'Admin' && page * 6 < total && (
        <Row>
          <Col span={24} style={{ textAlign: 'center', marginTop: '25px' }}>
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
      <Modal
        className="modalStyle"
        open={visible}
        title="Update comment"
        footer={null}
        onOk={() => setVisible(false)}
        onCancel={() => setVisible(false)}
      >
        <CommentForm
          comment={content}
          setComment={setContent}
          handleSubmit={handleSubmit}
          loading={loading}
        />
      </Modal>
    </>
  )
}

export default CommentsList

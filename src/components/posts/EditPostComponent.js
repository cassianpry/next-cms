import { useContext, useEffect, useState } from 'react'
import { Button, Col, Image, Input, Modal, Row, Select } from 'antd'
import axios from 'axios'
import dynamic from 'next/dynamic'
import rehypeSanitize from 'rehype-sanitize'
import { toast } from 'react-hot-toast'
import { LoadingOutlined, UploadOutlined } from '@ant-design/icons'
import ImageLibrary from '../media/ImageLibrary'
import { MediaContext } from '../../../src/context/media'

import '@uiw/react-md-editor/markdown-editor.css'
import '@uiw/react-markdown-preview/markdown.css'
import { useRouter } from 'next/router'

const { Option } = Select

const MDEditor = dynamic(
  () => import('@uiw/react-md-editor').then((mod) => mod.default),
  { ssr: false }
)

function EditPostComponent({ page = 'admin' }) {
  const router = useRouter()

  //context
  const [media, setMedia] = useContext(MediaContext)

  // state
  const [title, setTitle] = useState('')
  const [content, setContent] = useState('')
  const [categories, setCategories] = useState([]) //post's existing categories
  const [loadedCategories, setLoadedCategories] = useState([])
  const [featuredImage, setFeaturedImage] = useState({})
  const [postId, setPostId] = useState('')
  const [loading, setLoading] = useState(true)
  const [btnLoading, setBtnLoading] = useState(false)

  useEffect(() => {
    loadCategories()
  }, [])

  useEffect(() => {
    loadPost()
  }, [router?.query?.slug])

  // load post from database
  const loadPost = async () => {
    try {
      const { data } = await axios.get(`/post/${router.query.slug}`)
      console.log('Got post for edit', data.post)
      // push categories names
      let cat = []
      data.post.categories.map((c) => cat.push(c.name))
      console.log(cat)
      setCategories(cat)
      setTitle(data.post.title)
      setContent(data.post.content)
      setFeaturedImage(data.post.featuredImage)
      setPostId(data.post._id)
      setLoading(false)
    } catch (err) {
      console.log(err)
    }
  }

  // load categories from database
  const loadCategories = async () => {
    try {
      const { data } = await axios.get('/categories')
      setLoadedCategories(data)
    } catch (err) {
      console.log(err)
      toast.error('Post create failed. Try again')
    }
  }

  const handleChange = (e) => {
    setTitle(e.target.value)
    localStorage.setItem('post-title', JSON.stringify(e.target.value))
  }

  const handleEditorChange = (e) => {
    setContent(e)
    localStorage.setItem('post-content', JSON.stringify(e))
  }

  const handlePublish = async () => {
    try {
      setBtnLoading(true)
      const { data } = await axios.put(`/post/${postId}`, {
        title,
        content,
        categories,
        featuredImage: media?.selected?._id
          ? media?.selected?._id
          : featuredImage?._id
          ? featuredImage._id
          : undefined,
      })

      if (data?.error) {
        toast.error(data?.error)
      } else {
        console.log('POST PUBLISHED RES => ', data)
        setTitle('')
        setContent('')
        setCategories([])
        setMedia({ ...media, selected: null })
        setBtnLoading(false)
        toast.success('Post created successfully')
        router.push(`/${page}/posts`)
      }
    } catch (err) {
      console.log(err)
      toast
    }
  }

  return (
    <Row>
      <Col span={14} offset={1}>
        <h1>Update an existing post</h1>
        <Input
          style={{ margin: '10px 0 10px 0' }}
          value={title}
          placeholder="Give your post title"
          size="large"
          onChange={handleChange}
        />
        {loading ? (
          <div
            style={{
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              height: 500,
            }}
          >
            <p>
              <LoadingOutlined style={{ fontSize: '50px' }} />
            </p>
          </div>
        ) : (
          <MDEditor
            data-color-mode="dark"
            value={content}
            onChange={handleEditorChange}
            height={'100%'}
            preview="edit"
            previewOptions={{
              rehypePlugins: [[rehypeSanitize]],
            }}
          />
        )}

        {/* <p>localStorage content = {JSON.stringify(content, null, 4)}</p> */}
      </Col>
      <Col span={6} offset={1}>
        <h1>Categories</h1>
        <Select
          style={{
            margin: '10px 0 10px 0',
            width: '100%',
          }}
          size="large"
          mode="multiple"
          allowClear={true}
          placeholder="Select categories"
          onChange={(e) => setCategories(e)}
          value={[...categories]}
        >
          {loadedCategories?.map((item) => (
            <Option key={item.name}>{item.name}</Option>
          ))}
        </Select>
        {media?.selected ? (
          <Image
            style={{ margin: '10px 0 10px 0', borderRadius: '5px' }}
            width="100%"
            src={media?.selected?.url}
            alt="image post"
          />
        ) : featuredImage?.url ? (
          <Image
            style={{ margin: '10px 0 10px 0', borderRadius: '5px' }}
            width="100%"
            src={featuredImage?.url}
            alt="image post"
          />
        ) : (
          ''
        )}

        <Button
          className="button-transparent"
          style={{ width: '100%' }}
          onClick={() => setMedia({ ...media, showMediaModal: true })}
        >
          <UploadOutlined />
          Upload image
        </Button>
        <Button
          loading={btnLoading}
          style={{ width: '100%', marginTop: '10px' }}
          type="primary"
          onClick={handlePublish}
        >
          Update Post
        </Button>
      </Col>
      <Modal
        className="modalStyle"
        open={media.showMediaModal}
        title="Media"
        width={720}
        footer={null}
        onOk={() => setMedia({ ...media, showMediaModal: false })}
        onCancel={() => setMedia({ ...media, showMediaModal: false })}
      >
        <ImageLibrary />
      </Modal>
    </Row>
  )
}
export default EditPostComponent

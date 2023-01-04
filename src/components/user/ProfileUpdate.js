import generator from 'generate-password'
import { useContext, useEffect, useState } from 'react'
import { toast } from 'react-hot-toast'
import { Avatar, Button, Col, Form, Input, Modal, Row, Select } from 'antd'
import {
  DesktopOutlined,
  LockOutlined,
  MailOutlined,
  UploadOutlined,
  UserAddOutlined,
  UserOutlined
} from '@ant-design/icons'
import axios from 'axios'
import { AuthContext } from '../../../src/context/auth'
import { useRouter } from 'next/router'
import ImageLibrary from '../../../src/components/media/ImageLibrary'
import { MediaContext } from '../../../src/context/media'

const ProfileUpdate = () => {
  //state
  const [id, setId] = useState('')
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [website, setWebsite] = useState('')
  const [password, setPassword] = useState(undefined)
  const [confirmpassword, setConfirmPassword] = useState(undefined)

  const [role, setRole] = useState('')
  const [image, setImage] = useState({})
  const [genPassword, setGenPassword] = useState(
    generator.generate({
      length: 8,
      numbers: true,
      symbols: true,
      uppercase: true,
      lowercase: true,
      strict: true
    })
  )
  const [loading, setLoading] = useState(false)

  //context
  const [auth, setAuth] = useContext(AuthContext)
  const [media, setMedia] = useContext(MediaContext)
  const [form] = Form.useForm()

  //hook
  const router = useRouter()

  const onFinish = async () => {
    console.log('Received values of form: ', {
      id,
      name,
      email,
      password,
      confirmpassword,
      website,
      role,
      image
    })
    setLoading(true)
    try {
      const { data } = await axios.put('/update-user-by-admin', {
        id,
        name,
        email,
        password,
        confirmpassword,
        website,
        role,
        image
      })
      toast.success('User created successfully.')
      setLoading(false)
      form.resetFields()
      router.push('/admin/users')
    } catch (err) {
      toast.error('Unable to create an user. Reload the page and try again.')
      console.log(err)
      setLoading(false)
    }
  }
  const currentUser = async () => {
    try {
      const { data } = await axios.get(`/user/${router?.query?.id}`)
      setId(data._id)
      setName(data.name)
      setEmail(data.email)
      setWebsite(data.website)
      setRole(data.role)
      setImage(data.image)
    } catch (err) {
      console.log('ERRO-> ', err)
    }
  }

  useEffect(() => {
    if (auth?.token) currentUser()
  }, [auth, router?.query?.id])

  return (
    <Row>
      <Col span={12} offset={6}>
        <h1 style={{ marginBottom: '-10px' }}>Update user informarion</h1>
        <div style={{ textAlign: 'center', margin: '50px 0px 50px 0px' }}>
          {media.selected ? (
            <Avatar src={media.selected.url} size={100} />
          ) : image ? (
            <Avatar src={image.url} size={100} />
          ) : (
            <Avatar src="/images/no-avatar-300x300.png" size={100} />
          )}
        </div>
        <Form
          form={form}
          style={{ margin: '-30px 0px 10px 0px' }}
          onFinish={onFinish}
        >
          <Form.Item>
            <Button
              className="button-transparent"
              style={{ width: '100%' }}
              onClick={() => setMedia({ ...media, showMediaModal: true })}
            >
              <UploadOutlined />
              Upload Avatar
            </Button>
          </Form.Item>
          <Form.Item
            rules={[
              {
                required: true,
                message: 'Please input your Name!'
              }
            ]}
          >
            <Input
              value={name}
              prefix={<UserOutlined style={{ color: 'black' }} />}
              placeholder="Your Name"
              onChange={(e) => setName(e.target.value)}
            />
          </Form.Item>

          <Form.Item
            rules={[
              {
                required: true,
                message: 'Please input a valid e-mail!',
                type: 'email'
              }
            ]}
          >
            <Input
              value={email}
              prefix={<MailOutlined style={{ color: 'black' }} />}
              placeholder="email@example.com"
              onChange={(e) => setEmail(e.target.value)}
            />
          </Form.Item>

          <Form.Item>
            <Input
              value={website}
              prefix={<DesktopOutlined style={{ color: 'black' }} />}
              placeholder="https://www.yoursite.com"
              onChange={(e) => setWebsite(e.target.value)}
            />
          </Form.Item>

          <Form.Item>
            <div style={{ display: 'flex' }}>
              <Button
                type="primary"
                onClick={() =>
                  setGenPassword(
                    generator.generate({
                      length: 8,
                      numbers: true,
                      symbols: true,
                      strict: true
                    })
                  )
                }
              >
                Generate Password
              </Button>
              <Input.Password
                value={genPassword}
                style={{ marginLeft: '5px' }}
              />
            </div>
          </Form.Item>

          <Form.Item>
            <Input.Password
              value={password}
              prefix={<LockOutlined style={{ color: 'black' }} />}
              type="password"
              placeholder="Password"
              onChange={(e) => setPassword(e.target.value)}
            />
          </Form.Item>

          <Form.Item>
            <Input.Password
              value={confirmpassword}
              prefix={<LockOutlined style={{ color: 'black' }} />}
              type="password"
              placeholder="Confirm Password"
              onChange={(e) => setConfirmPassword(e.target.value)}
            />
          </Form.Item>

          <Form.Item
            rules={[{ required: true, message: 'Please select a role.' }]}
          >
            <Select
              placeholder="Select an user role"
              value={role}
              onChange={(e) => setRole(e.target.value)}
            >
              <Select.Option value="Admin">Admin</Select.Option>
              <Select.Option value="Author">Author</Select.Option>
              <Select.Option value="Subscriber">Subscriber</Select.Option>
            </Select>
          </Form.Item>

          <Form.Item>
            <Button
              type="primary"
              htmlType="submit"
              className="login-form-button"
              loading={loading}
              disabled={loading}
              icon={<UserAddOutlined />}
            >
              Update User
            </Button>
          </Form.Item>
          <Form.Item name="image">
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
          </Form.Item>
        </Form>
      </Col>
    </Row>
  )
}

export default ProfileUpdate

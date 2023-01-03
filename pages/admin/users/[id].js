import AdminLayout from '../../../src/components/layout/AdminLayout'
import generator from 'generate-password'
import { useContext, useEffect, useState } from 'react'
import { toast } from 'react-hot-toast'
import { Button, Col, Form, Input, Row, Select } from 'antd'
import {
  DesktopOutlined,
  LockOutlined,
  MailOutlined,
  UserAddOutlined,
  UserOutlined
} from '@ant-design/icons'
import axios from 'axios'
import { AuthContext } from '../../../src/context/auth'
import { useRouter } from 'next/router'
import ImageLibrary from '../../../src/components/media/ImageLibrary'
import { MediaContext } from '../../../src/context/media'

const UpdateUser = () => {
  //state
  const [id, setId] = useState('')
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [website, setWebsite] = useState('')
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

  const onFinish = async (values) => {
    console.log('Received values of form: ', values)

    try {
      setLoading(true)
      values.id = id
      values.image = media?.selected?._id
        ? media?.selected?._id
        : image?._id
        ? image?._id
        : undefined

      const { data } = await axios.put('/update-user-by-admin', values)
      console.log('User Update Info ->', values)
      if (values?.error) {
        setLoading(false)
        toast.error(data.error)
      } else {
        toast.success('User created successfully.')
        setLoading(false)
        //form.resetFields()
        //router.push('/admin/users')
      }
    } catch (err) {
      toast.error('Unable to create an user. Reload the page and try again.')
      console.log(err)
      setLoading(false)
    }
  }
  const currentUser = async () => {
    try {
      const { data } = await axios.get(`/user/${router.query.id}`)
      setId(data._id)
      setName(data.name)
      setEmail(data.email)
      setWebsite(data.website)
      setRole(data.role)
      setImage(data.image)
    } catch (err) {
      console.log(err)
    }
  }

  useEffect(() => {
    if (auth?.token) currentUser()
  }, [auth])

  // const handleSubmit = (e) => {
  //   e.preventDefault()
  //   try {
  //     setLoading(true)
  //   } catch (err) {
  //     console.log(err)
  //     toast.error('Unable to create an user. Refresh the page and try again.')
  //   }
  // }

  return (
    <AdminLayout>
      <Row>
        <Col span={12} offset={6}>
          <h2 style={{ marginBottom: '10px' }}>Update user informarion</h2>

          <Form
            form={form}
            style={{ margin: '30px 0px 10px 0px' }}
            name="create_user"
            initialValues={{
              id: id,
              name: name,
              email: email,
              website: website,
              role: role,
              image: media?.selected?._id
                ? media?.selected?._id
                : image?._id
                ? image?._id
                : undefined
            }}
            onFinish={onFinish}
          >
            <Form.Item name="id"></Form.Item>
            <Form.Item
              name="name"
              rules={[
                {
                  required: true,
                  message: 'Please input your Name!'
                }
              ]}
            >
              <Input
                prefix={<UserOutlined style={{ color: 'black' }} />}
                placeholder="Your Name"
              />
            </Form.Item>

            <Form.Item
              name="email"
              rules={[
                {
                  required: true,
                  message: 'Please input a valid e-mail!',
                  type: 'email'
                }
              ]}
            >
              <Input
                prefix={<MailOutlined style={{ color: 'black' }} />}
                placeholder="email@example.com"
              />
            </Form.Item>

            <Form.Item name="website">
              <Input
                prefix={<DesktopOutlined style={{ color: 'black' }} />}
                placeholder="https://www.yoursite.com"
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
                <Input.Password value={genPassword} />
              </div>
            </Form.Item>

            <Form.Item name="password">
              <Input.Password
                prefix={<LockOutlined style={{ color: 'black' }} />}
                type="password"
                placeholder="Password"
              />
            </Form.Item>

            <Form.Item name="confirmpassword">
              <Input.Password
                prefix={<LockOutlined style={{ color: 'black' }} />}
                type="password"
                placeholder="Confirm Password"
              />
            </Form.Item>

            <Form.Item
              name="role"
              rules={[{ required: true, message: 'Please select a role.' }]}
            >
              <Select placeholder="Select an user role">
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
              <ImageLibrary />
            </Form.Item>
          </Form>
          {/* <Input
            style={{ margin: '20px 0px 10px 0px' }}
            size="large"
            placeholder="Full Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
          <Input
            style={{ margin: '10px 0px 10px 0px' }}
            size="large"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <Input
            style={{ margin: '10px 0px 10px 0px' }}
            size="large"
            placeholder="Website"
            value={website}
            onChange={(e) => setWebsite(e.target.value)}
          />
          <div style={{ display: 'flex' }}>
            <Button
              style={{ margin: '10px 0px 10px 0px' }}
              type="primary"
              size="large"
              onClick={() =>
                setPassword(
                  generator.generate({
                    length: 6,
                    numbers: true,
                    symbols: true,
                    strict: true,
                  })
                )
              }
            >
              Generate Password
            </Button>
            <Input.Password
              style={{ margin: '10px 0px 10px 0px' }}
              value={password}
            />
          </div> */}
        </Col>
      </Row>
    </AdminLayout>
  )
}

export default UpdateUser

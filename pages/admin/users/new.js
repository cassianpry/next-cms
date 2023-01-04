import AdminLayout from '../../../src/components/layout/AdminLayout'
import generator from 'generate-password'
import { useContext, useEffect, useState } from 'react'
import { toast } from 'react-hot-toast'
import { Button, Checkbox, Col, Form, Input, Row, Select } from 'antd'
import {
  DesktopOutlined,
  HomeOutlined,
  LockOutlined,
  MailOutlined,
  UserAddOutlined,
  UserOutlined
} from '@ant-design/icons'
import axios from 'axios'
import { useRouter } from 'next/router'
import { AuthContext } from '../../../src/context/auth'

const NewUser = () => {
  //state
  // const [name, setName] = useState('')
  // const [email, setEmail] = useState('')
  // const [website, setWebsite] = useState('')
  const [form] = Form.useForm()
  const [genPassword, setGenPassword] = useState(
    generator.generate({
      length: 6,
      numbers: true,
      symbols: true,
      uppercase: true,
      lowercase: true,
      strict: true
    })
  )
  // const [confirmPassword, setConfirmPassword] = useState('')
  // const [role, setRole] = useState('')
  const [loading, setLoading] = useState(false)

  //hook
  const router = useRouter()

  //contex
  const [auth, setAuth] = useContext(AuthContext)

  useEffect(() => {
    if (auth?.token) {
      router.push('')
    }
  }, [auth])

  const onFinish = async (values) => {
    console.log('Received values of form: ', values)
    setLoading(true)
    try {
      const { data } = await axios.post('/create-user', values)
      if (data?.error) {
        setLoading(false)
        toast.error(data.error)
      } else {
        toast.success('User created successfully.')
        setLoading(false)
        //form.resetFields()
      }
    } catch (err) {
      toast.error('Unable to create an user. Reload the page and try again.')
      console.log(err)
      setLoading(false)
    }
  }

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
          <h1>Add new user</h1>
          <Form
            name="normal_login"
            initialValues={{
              remember: true
            }}
            onFinish={onFinish}
          >
            <Form.Item
              style={{ paddingBottom: '5px' }}
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
              style={{ paddingBottom: '5px' }}
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

            <Form.Item style={{ paddingBottom: '5px' }} name="website">
              <Input
                prefix={<HomeOutlined style={{ color: 'black' }} />}
                placeholder="Your Website"
              />
            </Form.Item>

            <Form.Item>
              <div style={{ display: 'flex', margin: 'auto' }}>
                <Button
                  type="primary"
                  onClick={() =>
                    setGenPassword(
                      generator.generate({
                        length: 6,
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
                  style={{ marginLeft: '5px' }}
                  value={genPassword}
                />
              </div>
            </Form.Item>

            <Form.Item
              style={{ paddingBottom: '5px' }}
              name="password"
              rules={[
                {
                  required: true,
                  message: 'Please input your Password!'
                }
              ]}
            >
              <Input.Password
                prefix={<LockOutlined style={{ color: 'black' }} />}
                type="password"
                placeholder="Password"
              />
            </Form.Item>

            <Form.Item
              style={{ paddingBottom: '5px' }}
              name="confirmpassword"
              rules={[
                {
                  required: true,
                  message: 'Please confirm your Password!'
                }
              ]}
            >
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
              <Select
                initialValues="Subscriber"
                placeholder="Select an user role"
              >
                <Select.Option value="Admin">Admin</Select.Option>
                <Select.Option value="Author">Author</Select.Option>
                <Select.Option value="Subscriber">Subscriber</Select.Option>
              </Select>
            </Form.Item>
            <Form.Item name="checked" valuePropName="checked">
              <Checkbox>
                Send the new user an email about their account.
              </Checkbox>
            </Form.Item>

            <Form.Item>
              <Button
                style={{ width: '100%' }}
                type="primary"
                htmlType="submit"
                className="login-form-button"
                loading={loading}
                disabled={loading}
                icon={<UserAddOutlined />}
              >
                Add User
              </Button>
            </Form.Item>
          </Form>
        </Col>
      </Row>
    </AdminLayout>
  )
}

export default NewUser

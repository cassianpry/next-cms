import AdminLayout from '../../../src/components/layout/AdminLayout'
import generator from 'generate-password'
import { useContext, useEffect, useState } from 'react'
import { toast } from 'react-hot-toast'
import { Button, Checkbox, Col, Form, Input, Row, Select } from 'antd'
import { AuthContext } from '../../../src/context/auth'
import { useRouter } from 'next/router'
import {
  DesktopOutlined,
  LockOutlined,
  MailOutlined,
  UserOutlined,
} from '@ant-design/icons'
import Link from 'next/link'
import axios from 'axios'

const NewUser = () => {
  //state
  // const [name, setName] = useState('')
  // const [email, setEmail] = useState('')
  // const [website, setWebsite] = useState('')
  const [password, setPassword] = useState(
    generator.generate({
      length: 6,
      numbers: true,
      symbols: true,
      uppercase: true,
      lowercase: true,
      strict: true,
    })
  )
  // const [confirmPassword, setConfirmPassword] = useState('')
  // const [role, setRole] = useState('')
  const [loading, setLoading] = useState(false)

  const onFinish = async (values) => {
    console.log('Received values of form: ', values)
    try {
      setLoading(true)
      const { data } = await axios.post('/create-user', values)
      if (values?.error) {
        setLoading(false)
        toast.error(data.error)
      } else {
        toast.success('User created successfully.')
        setLoading(false)
      }
    } catch (err) {
      toast.error('Signup failed. Try again.')
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
          <h2 style={{ marginBottom: '-10px' }}>Add new user</h2>
          <Form
            style={{ margin: '30px 0px 10px 0px' }}
            name="create_user"
            initialValues={{
              remember: true,
            }}
            onFinish={onFinish}
          >
            <Form.Item
              name="name"
              rules={[
                {
                  required: true,
                  message: 'Please input your Name!',
                },
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
                  type: 'email',
                },
              ]}
            >
              <Input
                prefix={<MailOutlined style={{ color: 'black' }} />}
                placeholder="email@example.com"
              />
            </Form.Item>

            <Form.Item
              name="website"
              rules={[
                {
                  message: 'Please input a valid website',
                },
              ]}
            >
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
                <Input.Password value={password} />
              </div>
            </Form.Item>

            <Form.Item
              name="password"
              rules={[
                {
                  required: true,
                  message: 'Please input your Password!',
                },
              ]}
            >
              <Input.Password
                prefix={<LockOutlined style={{ color: 'black' }} />}
                type="password"
                placeholder="Password"
              />
            </Form.Item>

            <Form.Item
              name="confirmpassword"
              rules={[
                {
                  required: true,
                  message: 'Please confirm your Password!',
                },
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
              <Select initialValues="Subscriber">
                <Select.Option value="Subscriber">Subscriber</Select.Option>
                <Select.Option value="Author">Author</Select.Option>
                <Select.Option value="Admin">Admin</Select.Option>
              </Select>
            </Form.Item>
            <Form.Item name="checked" valuePropName="checked">
              <Checkbox>
                Send the new user an email about their account.
              </Checkbox>
            </Form.Item>

            <Form.Item>
              <Button
                type="primary"
                htmlType="submit"
                className="login-form-button"
                loading={loading}
                disabled={loading}
              >
                Add User
              </Button>
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

export default NewUser

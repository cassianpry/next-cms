import { LockOutlined, MailOutlined } from "@ant-design/icons";
import { Button, Col, Form, Input, Row } from "antd";
import Link from "next/link";
import axios from "axios";
import { useContext, useState } from "react";
import toast from "react-hot-toast";
import { AuthContext } from "../src/context/auth";
import { useRouter } from "next/router";

export default function Signin() {
  //context
  const [auth, setAuth] = useContext(AuthContext);
  //state
  const [loading, setLoading] = useState(false);
  //hooks
  const router = useRouter();
  const [form] = Form.useForm();

  const onFinish = async (values) => {
    console.log("Received values of form: ", values);
    try {
      setLoading(true);
      const { data } = await axios.post(
        `${process.env.NEXT_PUBLIC_API}/signin`,
        values
      );
      if (data?.error) {
        setLoading(false);
        toast.error(data.error);
      } else {
        console.log("res=>", data);
        //save in context
        setAuth(data);
        //save in localStorage
        localStorage.setItem("auth", JSON.stringify(data));
        toast.success("Login successfully!");
        setLoading(false);
        //redirect
        form.resetFields();
        router.push("/admin");
      }
    } catch (err) {
      setLoading(false);
      toast.error("Signup failed. Try again.");
      console.log("err=>", err);
    }
  };

  return (
    <Row>
      <Col span={8} offset={8}>
        <h1 style={{ paddingTop: "100px" }}>Sign In</h1>
        <Form
          form={form}
          name="normal_login"
          initialValues={{
            remember: true,
          }}
          onFinish={onFinish}
        >
          <Form.Item
            name="email"
            rules={[
              {
                required: true,
                message: "Please input a valid e-mail!",
                type: "email",
              },
            ]}
          >
            <Input
              prefix={<MailOutlined style={{ color: "black" }} />}
              placeholder="email@example.com"
            />
          </Form.Item>

          <Form.Item
            name="password"
            rules={[
              {
                required: true,
                message: "Please input your Password!",
              },
            ]}
          >
            <Input.Password
              prefix={<LockOutlined style={{ color: "black" }} />}
              type="password"
              placeholder="Password"
            />
          </Form.Item>

          <Form.Item>
            <div
              style={{
                display: "flex",
                alignItems: "center",
              }}
            >
              <Button
                type="primary"
                htmlType="submit"
                className="login-form-button"
                loading={loading}
                disabled={loading}
              >
                Login
              </Button>
              <span
                style={{
                  paddingRight: "5px",
                  marginLeft: "auto",
                }}
              >
                Don't have an account?
              </span>

              <Link style={{}} href="/signup">
                Register now!
              </Link>
            </div>
            <div
              style={{
                display: "flex",
                alignItems: "center",
                marginTop: "20px",
              }}
            >
              <Link style={{ marginLeft: "auto" }} href="/forgot-password">
                Forgot password?
              </Link>
            </div>
          </Form.Item>
        </Form>
      </Col>
    </Row>
  );
}

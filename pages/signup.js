import { LockOutlined, MailOutlined, UserOutlined } from "@ant-design/icons";
import { Button, Col, Form, Input, Row } from "antd";
import Link from "next/link";
import axios from "axios";
import toast from "react-hot-toast";
import { useContext, useState } from "react";
import { AuthContext } from "../context/auth";
import { useRouter } from "next/router";

const Signup = () => {
  //context
  const [aurh, setAuth] = useContext(AuthContext);

  //hook
  const router = useRouter();

  //State
  const [loading, setLoading] = useState(false);

  //process.env.NEXT_PUBLIC_API

  const onFinish = async (values) => {
    console.log("Received values of form: ", values);
    setLoading(true);

    try {
      const { data } = await axios.post(
        `${process.env.NEXT_PUBLIC_API}/signup`,
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
        toast.success("Successfully signed up");
        setLoading(false);
        //redirect
        router.push("/signin");
      }
    } catch (err) {
      setLoading(false);
      toast.error("Signup failed. Try again.");
      console.log(err);
    }
  };

  return (
    <Row>
      <Col span={8} offset={8}>
        <h1 style={{ paddingTop: "100px", textAlign: "center" }}>Sign up</h1>
        <Form
          name="normal_login"
          initialValues={{
            remember: true,
          }}
          onFinish={onFinish}
        >
          <Form.Item
            style={{ paddingBottom: "5px" }}
            name="name"
            rules={[
              {
                required: true,
                message: "Please input your Name!",
              },
            ]}
          >
            <Input
              prefix={<UserOutlined style={{ color: "black" }} />}
              placeholder="Your Name"
            />
          </Form.Item>

          <Form.Item
            style={{ paddingBottom: "5px" }}
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
            style={{ paddingBottom: "5px" }}
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

          <Form.Item
            style={{ paddingBottom: "5px" }}
            name="confirmpassword"
            rules={[
              {
                required: true,
                message: "Please confirm your Password!",
              },
            ]}
          >
            <Input.Password
              prefix={<LockOutlined style={{ color: "black" }} />}
              type="password"
              placeholder="Confirm Password"
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
                Register
              </Button>

              <span
                style={{
                  paddingLeft: "5px",
                  paddingRight: "5px",
                  marginLeft: "auto",
                }}
              >
                Or
              </span>

              <Link
                style={{
                  marginLeft: "auto",
                }}
                href="/signin"
              >
                Login now!
              </Link>
            </div>
          </Form.Item>
        </Form>
      </Col>
    </Row>
  );
};

export default Signup;

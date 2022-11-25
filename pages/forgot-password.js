import { CodeOutlined, LockOutlined, MailOutlined } from "@ant-design/icons";
import { Button, Col, Form, Input, Row } from "antd";
import axios from "axios";
import { useState } from "react";
import toast from "react-hot-toast";
import { useRouter } from "next/router";

export default function ForgotPassword() {
  //state
  const [loading, setLoading] = useState(false);
  const [reseted, setReseted] = useState(false);

  //hooks
  const router = useRouter();
  const [form] = Form.useForm();

  const onFinish = async (values) => {
    console.log("Received values of form: ", values);

    try {
      setLoading(true);
      const { data } = await axios.post(
        `${process.env.NEXT_PUBLIC_API}/forgot-password`,
        values
      );
      if (data?.error) {
        setLoading(false);
        toast.error(data.error);
      } else {
        toast.success("Password reset successfully! Check your e-mail");
        setLoading(false);
        setReseted(true);
      }
    } catch (err) {
      setLoading(false);
      toast.error("Operation failed. Try again.");
      console.log("err=>", err);
    }
  };

  const resetPassword = async (values) => {
    console.log("Received values of form: ", values);
    try {
      setLoading(true);
      const { data } = await axios.post(
        `${process.env.NEXT_PUBLIC_API}/reset-password`,
        values
      );
      if (data?.error) {
        setLoading(false);
        toast.error(data.error);
      } else {
        toast.success(
          "Password changed successfully! please login with your new password."
        );
        form.resetFields();
        setReseted(false);
        setLoading(false);
        router.push("/signin");
      }
    } catch (err) {
      setLoading(false);
      toast.error("Operation failed. Try again.");
      console.log("err=>", err);
    }
  };

  return (
    <Row>
      <Col span={8} offset={8}>
        <h1 style={{ paddingTop: "100px", textAlign: "center" }}>
          Forgot Password
        </h1>
        <Form
          form={form}
          name="normal_login"
          initialValues={{
            remember: true,
          }}
          onFinish={reseted ? resetPassword : onFinish}
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

          {reseted && (
            <>
              <Form.Item
                style={{ paddingBottom: "5px" }}
                name="resetCode"
                rules={[
                  {
                    required: true,
                    message: "Please enter the code.",
                  },
                ]}
              >
                <Input
                  prefix={<CodeOutlined style={{ color: "black" }} />}
                  type="text"
                  placeholder="Reset Code"
                />
              </Form.Item>
              <Form.Item
                style={{ paddingBottom: "5px" }}
                name="password"
                rules={[
                  {
                    required: true,
                    message: "Please enter your new Password!",
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
                    message: "Please confirm your new Password!",
                  },
                ]}
              >
                <Input.Password
                  prefix={<LockOutlined style={{ color: "black" }} />}
                  type="password"
                  placeholder="Confirm Password"
                />
              </Form.Item>
            </>
          )}

          <Form.Item>
            <Button
              type="primary"
              htmlType="submit"
              style={{ marginTop: "10px" }}
              loading={loading}
              disabled={loading}
            >
              Submit
            </Button>
          </Form.Item>
        </Form>
      </Col>
    </Row>
  );
}

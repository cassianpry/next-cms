import { EditOutlined, SaveOutlined } from "@ant-design/icons";
import { Button, Col, Form, Input, Row } from "antd";
import axios from "axios";
import { useState } from "react";
import toast from "react-hot-toast";
import AdminLayout from "../../../src/components/layout/AdminLayout";

export default function Categories() {
  //state
  const [loading, setLoading] = useState(false);
  //context
  const [form] = Form.useForm();

  const onFinish = async (values) => {
    console.log("Received values of form: ", values);
    try {
      setLoading(true);
      const { data } = await axios.post(
        `${process.env.NEXT_PUBLIC_API}/category`,
        values
      );
      if (data?.error) {
        setLoading(false);
        toast.error(data.error);
      } else {
        setLoading(false);
        form.resetFields();
        toast.success("Category created successfully.");
      }
    } catch (err) {
      setLoading(false);
      toast.error("Operation failed. Try again.");
      console.log("err=>", err);
    }
  };
  return (
    <AdminLayout>
      <div style={{ padding: "20px" }}>
        <Row>
          {/* First Column */}
          <Col span={12}>
            <h1>Categories</h1>
            <p>Add new category</p>
            <Form
              form={form}
              name="normal_login"
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
                    message: "Give it a name.",
                  },
                ]}
              >
                <Input
                  prefix={<EditOutlined style={{ color: "black" }} />}
                  placeholder="Category Name"
                />
              </Form.Item>
              <Button
                type="primary"
                htmlType="submit"
                icon={<SaveOutlined />}
                loading={loading}
              >
                Add Category
              </Button>
            </Form>
          </Col>

          {/* Second Column */}
          <Col>
            <p>Show categories list</p>
          </Col>
        </Row>
      </div>
    </AdminLayout>
  );
}

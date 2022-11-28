import { EditOutlined, SaveOutlined } from "@ant-design/icons";
import { Button, Col, Form, Input, List, Modal, Row } from "antd";
import axios from "axios";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import AdminLayout from "../../../src/components/layout/AdminLayout";
import CategoryUpdateModal from "../../../src/components/modal/CategoryUpdateModal";

export default function Categories() {
  // state
  const [loading, setLoading] = useState(false);
  const [categories, setCategories] = useState([]);
  // update state
  const [updatingCategory, setUpdatingCategory] = useState({});
  const [open, setOpen] = useState(false);
  // hooks
  const [form] = Form.useForm();

  useEffect(() => {
    getCategories();
  }, []);

  const getCategories = async () => {
    try {
      const { data } = await axios.get("/categories");
      setCategories(data);
    } catch (err) {}
  };
  const onFinish = async (values) => {
    console.log("Received values of form: ", values);
    try {
      setLoading(true);
      const { data } = await axios.post(
        `${process.env.NEXT_PUBLIC_API}/category`,
        values
      );
      setCategories([...categories, data]);
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

  const handleDelete = async (item) => {
    try {
      const { data } = await axios.delete(`/category/${item.slug}`);
      setCategories(categories.filter((cat) => cat._id !== data._id));
      toast.success("Category deleted successfully.");
    } catch (err) {
      console.log(err);
      toast.error("Delete operation failed. Try again");
    }
  };

  const handleEdit = async (item) => {
    setUpdatingCategory(item);
    setOpen(true);
  };

  const handleUpdate = async (values) => {
    try {
      const { data } = await axios.put(
        `/category/${updatingCategory.slug}`,
        values
      );
      const newCategories = categories.map((cat) => {
        if (cat._id === data._id) {
          return data;
        }
        return cat;
      });
      setCategories(newCategories);
      toast.success("Category updated successfully");
      setOpen(false);
      setUpdatingCategory({});
      console.log("Category updated => ", data);
    } catch (err) {
      console.log(err);
      toast.error("Update operation failed. Try again");
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
                  className=""
                  prefix={<EditOutlined />}
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
          <Col sm={22} lg={10} offset={1}>
            <List
              itemLayout="horizontal"
              dataSource={categories}
              renderItem={(item) => (
                <List.Item
                  actions={[
                    <p style={{ color: "rgba(255, 255, 255, 0.65)" }}>
                      <a onClick={() => handleEdit(item)}>edit</a>
                    </p>,
                    <p style={{ color: "rgba(255, 255, 255, 0.65)" }}>|</p>,
                    <p style={{ color: "rgba(255, 255, 255, 0.65)" }}>
                      <a onClick={() => handleDelete(item)}>delete</a>
                    </p>,
                  ]}
                >
                  <List.Item.Meta
                    title={
                      <p style={{ color: "rgba(255, 255, 255, 0.65)" }}>
                        {item.name}
                      </p>
                    }
                  />
                </List.Item>
              )}
            ></List>
          </Col>
          {/* Modal */}
          <CategoryUpdateModal
            open={open}
            setOpen={setOpen}
            handleUpdate={handleUpdate}
            updatingCategory={updatingCategory}
          />
        </Row>
      </div>
    </AdminLayout>
  );
}

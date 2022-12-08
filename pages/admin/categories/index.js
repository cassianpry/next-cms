import { EditOutlined, SaveOutlined } from "@ant-design/icons";
import { Button, Col, Form, Input, List, Modal, Row } from "antd";
import axios from "axios";
import { useContext, useEffect, useState } from "react";
import toast from "react-hot-toast";
import AdminLayout from "../../../src/components/layout/AdminLayout";
import CategoryUpdateModal from "../../../src/components/modal/CategoryUpdateModal";
import { PostContext } from "../../../src/context/post";

export default function Categories() {
  // context
  const [post, setPost] = useContext(PostContext);
  // state
  const [loading, setLoading] = useState(false);
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
      setPost((prev) => ({ ...prev, categories: data }));
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
      // local state setCategories
      // setCategories([...categories, data]);

      // global state categories
      setPost((prev) => ({ ...prev, categories: [data, ...categories] }));
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
      //setCategories(newCategories);
      setPost((prev) => ({ ...prev, categories: newCategories }));
      toast.success("Category updated successfully");
      setOpen(false);
      setUpdatingCategory({});
      console.log("Category updated => ", data);
    } catch (err) {
      console.log(err);
      toast.error("Update operation failed. Try again");
    }
  };

  const handleDelete = async (item) => {
    try {
      const { data } = await axios.delete(`/category/${item.slug}`);
      //setCategories(categories.filter((cat) => cat._id !== data._id));
      setPost((prev) => ({
        ...prev,
        categories: categories.filter((cat) => cat._id !== data._id),
      }));
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

  const { categories } = post;

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
                    <a onClick={() => handleEdit(item)}>edit</a>,
                    <a onClick={() => handleDelete(item)}>delete</a>,
                  ]}
                >
                  <List.Item.Meta title={item.name} />
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

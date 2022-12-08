import { PlusOutlined } from "@ant-design/icons";
import { Button, Col, List, Row } from "antd";
import axios from "axios";
import Link from "next/link";
import { useContext, useEffect, useState } from "react";
import AdminLayout from "../../../src/components/layout/AdminLayout";
import { PostContext } from "../../../src/context/post";

const Posts = () => {
  const [post, setPost] = useContext(PostContext);

  const fetchPosts = async () => {
    try {
      const { data } = await axios.get("/posts");
      setPost((prev) => ({ ...prev, posts: data }));
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    fetchPosts();
  }, []);

  const handleEdit = async (post) => {
    //
    console.log("EDIT POST => ", post);
  };

  const handleDelete = async (post) => {
    //
    console.log("DELETE POST => ", post);
  };

  return (
    <AdminLayout>
      <Row>
        <Col span={24}>
          <Link href="/admin/posts/new">
            <Button
              type="primary"
              style={{ margin: "10px 0px 10px 0px" }}
              icon={<PlusOutlined />}
            >
              <span>Add New</span>
            </Button>
          </Link>
          <h1 style={{ marginTop: "10px" }}>{post.posts.length} Posts</h1>
          <List
            itemLayout="horizontal"
            dataSource={post.posts}
            renderItem={(item) => (
              <List.Item
                actions={[
                  <a onClick={() => handleEdit(item)}>edit</a>,
                  <a onClick={() => handleDelete(item)}>delete</a>,
                ]}
              >
                <List.Item.Meta title={item.title} />
              </List.Item>
            )}
          />
        </Col>
      </Row>
    </AdminLayout>
  );
};

export default Posts;

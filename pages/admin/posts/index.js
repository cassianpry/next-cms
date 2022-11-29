import { PlusOutlined } from "@ant-design/icons";
import { Button, Col, Row } from "antd";
import Link from "next/link";
import AdminLayout from "../../../src/components/layout/AdminLayout";

const Posts = () => {
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
        </Col>
      </Row>
    </AdminLayout>
  );
};

export default Posts;

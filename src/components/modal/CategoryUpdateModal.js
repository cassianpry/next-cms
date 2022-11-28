import { EditOutlined, SaveOutlined } from "@ant-design/icons";
import { Button, Form, Input, Modal } from "antd";

const CategoryUpdateModal = ({
  open,
  setOpen,
  handleUpdate,
  updatingCategory,
}) => {
  return (
    <Modal
      className="modalStyle"
      title={
        <p
          style={{
            color: "rgba(255, 255, 255, 0.65)",
            fontWeight: "bold",
          }}
        >
          Update Category
        </p>
      }
      open={open}
      onCancel={() => setOpen(false)}
      footer={null}
    >
      <Form
        name="normal_login"
        fields={[{ name: ["name"], value: updatingCategory.name }]}
        onFinish={handleUpdate}
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
            prefix={<EditOutlined />}
            placeholder={<p style={{ color: "red" }}>Category Name</p>}
          />
        </Form.Item>
        <Button type="primary" htmlType="submit" icon={<SaveOutlined />}>
          Update
        </Button>
      </Form>
    </Modal>
  );
};
export default CategoryUpdateModal;

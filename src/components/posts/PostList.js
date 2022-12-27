import { DeleteOutlined, EditOutlined } from '@ant-design/icons'
import { List } from 'antd'

const PostList = ({ posts, handleDelete, handleEdit }) => {
  return (
    <List
      itemLayout="horizontal"
      dataSource={posts}
      renderItem={(item) => (
        <List.Item
          className="post-list-item"
          actions={[
            <a onClick={() => handleEdit(item)}>
              edit&nbsp;
              <EditOutlined style={{ color: 'rgb(134, 241, 131)' }} />
            </a>,
            <a onClick={() => handleDelete(item)}>
              delete&nbsp;
              <DeleteOutlined style={{ color: 'rgb(255,0,0)' }} />
            </a>,
          ]}
        >
          <List.Item.Meta title={item.title} />
        </List.Item>
      )}
    />
  )
}

export default PostList

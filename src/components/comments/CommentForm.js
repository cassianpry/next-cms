import { Button, Input } from 'antd'
import { useContext } from 'react'
import { AuthContext } from '../../context/auth'
const { TextArea } = Input

const CommentForm = ({ comment, setComment, handleSubmit, loading }) => {
  //context
  const [auth, setAuth] = useContext(AuthContext)

  return (
    <div style={{ marginTop: 5 }}>
      <TextArea
        style={{ marginBottom: 5 }}
        rows={5}
        placeholder="Write a comment..."
        value={comment}
        onChange={(e) => setComment(e.target.value)}
        disabled={auth?.user === null && auth?.token === ''}
        maxLength={200}
      />
      <Button
        type="primary"
        loading={loading}
        onClick={handleSubmit}
        disabled={
          (auth?.user === null && auth?.token === '') || comment.length < 1
        }
      >
        Post
      </Button>
    </div>
  )
}

export default CommentForm

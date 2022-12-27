import AuthorLayout from '../../../src/components/layout/AuthorLayout'
import EditPostComponent from '../../../src/components/posts/EditPostComponent'

function EditPost() {
  return (
    <AuthorLayout>
      <EditPostComponent page="author" />
    </AuthorLayout>
  )
}
export default EditPost

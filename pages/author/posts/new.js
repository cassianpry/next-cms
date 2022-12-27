import AuthorLayout from '../../../src/components/layout/AuthorLayout'
import NewPostComponent from '../../../src/components/posts/NewPostComponent'

function NewPost() {
  return (
    <AuthorLayout>
      <NewPostComponent page="author" />
    </AuthorLayout>
  )
}
export default NewPost

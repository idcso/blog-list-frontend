import { useState } from 'react'
import { createComment } from '../reducers/blogReducer'

const CommentForm = ({ handleCreateComment }) => {
  const [comment, setComment] = useState('')

  const createComment = (event) => {
    event.preventDefault()

    handleCreateComment(comment)
    setComment('')
  }

  return (
    <form onSubmit={createComment}>
      <input
        type="text"
        value={comment}
        onChange={(e) => setComment(e.target.value)}
      />
      <button>add comment</button>
    </form>
  )
}

export default CommentForm

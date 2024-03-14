import axios from 'axios'

const createComment = async (id, comment) => {
  const response = await axios.post(`/api/blogs/${id}/comments`, { comment })
  return response.data
}

export default { createComment }

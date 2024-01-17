import axios from 'axios'
const baseUrl = '/api/blogs'

const config = token => {
  const header = { headers: { 'Authorization': `Bearer ${token}` } }
  return header
}

const getAll = async () => {
  const response = await axios.get(baseUrl)
  return response.data
}

const createNewBlog = async (blog, token) => {
  await axios.post(baseUrl, blog, config(token))
}

export default { getAll, createNewBlog }
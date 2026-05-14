



import client from './client'


export const getCategories = async () => {
  const res = await client.get('/api/categories')
  return res.data
}


export const createCategory = async (name) => {
  const res = await client.post('/api/categories', null, {
    params: { name },
  })
  return res.data
}


export const deleteCategory = async (id) => {
  await client.delete(`/api/categories/${id}`)
}
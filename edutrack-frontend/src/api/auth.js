



import client from './client'


export const register = async (data) => {
  const res = await client.post('/auth/register', data)
  return res.data
}


export const login = async (data) => {
  const res = await client.post('/auth/login', data)
  return res.data
}


export const getMe = async () => {
  const res = await client.get('/auth/me')
  return res.data
}


export const getUsers = async () => {
  const res = await client.get('/auth/users')
  return res.data
}
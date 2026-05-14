



import client from './client'


export const register = async (data) => {
  const res = await client.post('/api/auth/register', data)
  return res.data
}


export const login = async (data) => {
  const res = await client.post('/api/auth/login', data)
  return res.data
}


export const getMe = async () => {
  const res = await client.get('/api/auth/me')
  return res.data
}


export const getUsers = async () => {
  const res = await client.get('/api/auth/users')
  return res.data
}




import client, { uploadFile } from './client'


export const getCourses = async (params = {}) => {
  const defaults = { page: 0, size: 9 }
  const res = await client.get('/api/courses', { params: { ...defaults, ...params } })
  return res.data
}


export const getCourseById = async (id) => {
  const res = await client.get(`/api/courses/${id}`)
  return res.data
}


export const createCourse = async (data) => {
  const res = await client.post('/api/courses', data)
  return res.data
}


export const updateCourse = async (id, data) => {
  const res = await client.put(`/api/courses/${id}`, data)
  return res.data
}


export const deleteCourse = async (id) => {
  await client.delete(`/api/courses/${id}`)
}


export const uploadCourseImage = async (id, file) => {
  const res = await uploadFile(`/api/courses/${id}/image`, file, 'file')
  return res.data
}


export const addLesson = async (courseId, data) => {
  const res = await client.post(`/api/courses/${courseId}/lessons`, data)
  return res.data
}


export const getCourseLessons = async (courseId) => {
  const res = await client.get(`/api/courses/${courseId}`)
  return res.data.lessons || []
}
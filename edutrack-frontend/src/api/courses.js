



import client, { uploadFile } from './client'


export const getCourses = async (params = {}) => {
  const defaults = { page: 0, size: 9 }
  const res = await client.get('/courses', { params: { ...defaults, ...params } })
  return res.data
}


export const getCourseById = async (id) => {
  const res = await client.get(`/courses/${id}`)
  return res.data
}


export const createCourse = async (data) => {
  const res = await client.post('/courses', data)
  return res.data
}


export const updateCourse = async (id, data) => {
  const res = await client.put(`/courses/${id}`, data)
  return res.data
}


export const deleteCourse = async (id) => {
  await client.delete(`/courses/${id}`)
}


export const uploadCourseImage = async (id, file) => {
  const res = await uploadFile(`/courses/${id}/image`, file, 'file')
  return res.data
}


export const addLesson = async (courseId, data) => {
  const res = await client.post(`/courses/${courseId}/lessons`, data)
  return res.data
}


export const getCourseLessons = async (courseId) => {
  const res = await client.get(`/courses/${courseId}`)
  return res.data.lessons || []
}
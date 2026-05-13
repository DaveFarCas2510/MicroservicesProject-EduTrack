



import client from './client'


export const enrollCourse = async (courseId, totalLessons) => {
  const res = await client.post('/enrollments', { courseId, totalLessons })
  return res.data
}


export const getMyEnrollments = async () => {
  const res = await client.get('/enrollments/my')
  return res.data
}


export const completeLesson = async (courseId, lessonId) => {
  const res = await client.post('/enrollments/progress', { courseId, lessonId })
  return res.data
}


export const getCourseProgress = async (courseId) => {
  const res = await client.get(`/enrollments/progress/${courseId}`)
  return res.data
}


export const getCourseEnrollments = async (courseId) => {
  const res = await client.get(`/enrollments/course/${courseId}`)
  return res.data
}


export const getLesson = async (lessonId) => {
  const res = await client.get(`/lessons/${lessonId}`)
  return res.data
}
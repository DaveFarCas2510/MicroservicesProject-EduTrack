import { Routes, Route } from 'react-router-dom'
import { useAuth } from '@/hooks/useAuth'
import Navbar from '@/components/layout/Navbar'
import Footer from '@/components/layout/Footer'
import ProtectedRoute from '@/router/ProtectedRoute'
import PageTransition from '@/components/layout/PageTransition'
import Spinner from '@/components/ui/Spinner'

import HomePage from '@/pages/HomePage'
import LoginPage from '@/pages/auth/LoginPage'
import RegisterPage from '@/pages/auth/RegisterPage'
import CatalogPage from '@/pages/catalog/CatalogPage'
import CourseDetailPage from '@/pages/catalog/CourseDetailPage'
import DashboardPage from '@/pages/dashboard/DashboardPage'
import LessonPage from '@/pages/dashboard/LessonPage'
import AdminPage from '@/pages/admin/AdminPage'
import ManageCourses from '@/pages/admin/ManageCourses'
import ManageCategories from '@/pages/admin/ManageCategories'
import ManageLessons from '@/pages/admin/ManageLessons'
import ManageUsers from '@/pages/admin/ManageUsers'
import NotFoundPage from '@/pages/NotFoundPage'

const PageLoader = () => (
  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', minHeight: '60vh' }}>
    <Spinner size={40} />
  </div>
)

const Layout = ({ children }) => (
  <>
    <Navbar />
    <main className="page-main">
      <PageTransition>{children}</PageTransition>
    </main>
    <Footer />
  </>
)

const AppRouter = () => {
  const { loading } = useAuth()

  if (loading) return <PageLoader />

  return (
    <Routes>
      <Route path="/" element={<Layout><HomePage /></Layout>} />
      <Route path="/login" element={<Layout><LoginPage /></Layout>} />
      <Route path="/register" element={<Layout><RegisterPage /></Layout>} />
      <Route path="/cursos" element={<Layout><CatalogPage /></Layout>} />
      <Route path="/cursos/:id" element={<Layout><CourseDetailPage /></Layout>} />

      <Route path="/dashboard" element={
        <Layout>
          <ProtectedRoute requiredRole="USER"><DashboardPage /></ProtectedRoute>
        </Layout>
      } />
      <Route path="/dashboard/curso/:courseId/leccion/:lessonId" element={
        <Layout>
          <ProtectedRoute requiredRole="USER"><LessonPage /></ProtectedRoute>
        </Layout>
      } />

      <Route path="/admin" element={
        <Layout>
          <ProtectedRoute requiredRole="ADMIN"><AdminPage /></ProtectedRoute>
        </Layout>
      } />
      <Route path="/admin/cursos" element={
        <Layout>
          <ProtectedRoute requiredRole="ADMIN"><ManageCourses /></ProtectedRoute>
        </Layout>
      } />
      <Route path="/admin/categorias" element={
        <Layout>
          <ProtectedRoute requiredRole="ADMIN"><ManageCategories /></ProtectedRoute>
        </Layout>
      } />
      <Route path="/admin/lecciones" element={
        <Layout>
          <ProtectedRoute requiredRole="ADMIN"><ManageLessons /></ProtectedRoute>
        </Layout>
      } />
      <Route path="/admin/usuarios" element={
        <Layout>
          <ProtectedRoute requiredRole="ADMIN"><ManageUsers /></ProtectedRoute>
        </Layout>
      } />

      <Route path="*" element={
        <Layout>
          <NotFoundPage />
        </Layout>
      } />
    </Routes>
  )
}

export default AppRouter

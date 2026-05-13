import { useNavigate } from 'react-router-dom'
import Card, { CardImage, CardBody, CardTitle, CardDescription, CardFooter } from '@/components/ui/Card'

const BookIcon = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
    <path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20" />
    <path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z" />
  </svg>
)

const CourseCard = ({ course }) => {
  const navigate = useNavigate()

  return (
    <Card onClick={() => navigate(`/cursos/${course.id}`)}>
      <CardImage src={course.imageUrl} icon={<BookIcon />} alt={course.title} />
      <CardBody>
        <CardTitle>{course.title}</CardTitle>
        <CardDescription>{course.description}</CardDescription>
      </CardBody>
      <CardFooter>
        <span style={{
          fontSize: 'var(--text-xs)',
          fontWeight: 600,
          color: 'var(--accent)',
          textTransform: 'uppercase',
          letterSpacing: '0.05em',
        }}>
          {course.category?.name || 'General'}
        </span>
        <span style={{ fontSize: 'var(--text-xs)', color: 'var(--text-muted)' }}>
          {new Date(course.createdAt).toLocaleDateString('es-ES', {
            year: 'numeric',
            month: 'short',
            day: 'numeric',
          })}
        </span>
      </CardFooter>
    </Card>
  )
}

export default CourseCard

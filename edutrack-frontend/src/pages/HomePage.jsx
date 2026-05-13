import { Link } from 'react-router-dom'
import { useAuth } from '@/context/AuthContext'
import styles from './HomePage.module.css'

const BookIcon = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
    <path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z" />
    <path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z" />
  </svg>
)

const UsersIcon = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
    <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
    <circle cx="9" cy="7" r="4" />
    <path d="M23 21v-2a4 4 0 0 0-3-3.87" />
    <path d="M16 3.13a4 4 0 0 1 0 7.75" />
  </svg>
)

const PlayIcon = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
    <polygon points="5 3 19 12 5 21 5 3" />
  </svg>
)

const CertificateIcon = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
    <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
  </svg>
)

const FeatureRow = ({ icon, title, desc, reversed }) => (
  <div className={[styles.featureRow, reversed ? styles.featureRowReversed : ''].filter(Boolean).join(' ')}>
    <div className={styles.featureVisual}>
      <div className={styles.featureIconCircle}>
        {icon}
      </div>
    </div>
    <div className={styles.featureContent}>
      <h3 className={styles.featureTitle}>{title}</h3>
      <p className={styles.featureDesc}>{desc}</p>
    </div>
  </div>
)

const HeroSection = () => {
  const { isAuthenticated } = useAuth()

  return (
    <section className={styles.hero}>
      <div className={styles.heroBg} />
      <div className={styles.heroGlow} />
      <div className={styles.heroInner}>
        <div className={styles.heroTextCol}>
          <span className={styles.heroBadge}>Plataforma de aprendizaje online</span>
          <h1 className={styles.heroTitle}>
            El conocimiento que<br />
            <span className={styles.heroGradient}>transforma tu futuro</span>
          </h1>
          <p className={styles.heroDesc}>
            Aprende con cursos diseñados por expertos, avanza a tu ritmo y obtén certificados que impulsen tu carrera profesional.
          </p>
          <br></br>
          <div className={styles.heroActions}>
            {isAuthenticated ? (
              <Link to="/cursos" className={styles.heroBtnPrimary}>Explorar cursos</Link>
            ) : (
              <>
                <Link to="/register" className={styles.heroBtnPrimary}>Comenzar gratis</Link>
                <Link to="/cursos" className={styles.heroBtnGhost}>Ver catálogo →</Link>
              </>
            )}
          </div>
          <div className={styles.heroMetrics}>
            <span><strong>500+</strong> cursos</span>
            <span><strong>10K</strong> estudiantes</span>
            <span><strong>98%</strong> satisfacción</span>
          </div>
        </div>
        <div className={styles.heroVisualCol}>
          <div className={styles.heroShape1} />
          <div className={styles.heroShape2} />
          <div className={styles.heroShape3} />
          <div className={styles.heroCard1}>
            <BookIcon />
            <div>
              <strong>Aprendizaje activo</strong>
              <span>Lecciones interactivas</span>
            </div>
          </div>
          <div className={styles.heroCard2}>
            <UsersIcon />
            <div>
              <strong>Comunidad global</strong>
              <span>+10K estudiantes</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

const FeaturesSection = () => (
  <section className={styles.features}>
    <div className={styles.featuresInner}>
      <div className={styles.sectionHeader}>
        <h2 className={styles.sectionTitle}>Todo lo que necesitas para crecer</h2>
        <p className={styles.sectionDesc}>Una plataforma completa diseñada para que aprendas de forma efectiva y flexible.</p>
      </div>
      <div className={styles.featuresList}>
        <FeatureRow
          icon={<BookIcon />}
          title="Cursos estructurados"
          desc="Contenido organizado en módulos y lecciones secuenciales. Cada curso está diseñado por profesionales con experiencia real en la industria, garantizando un aprendizaje progresivo y sólido."
          reversed={false}
        />
        <FeatureRow
          icon={<PlayIcon />}
          title="Aprendizaje interactivo"
          desc="No solo teoría. Accede a ejercicios prácticos, quizzes y proyectos reales que te ayudarán a aplicar lo aprendido y construir un portafolio profesional."
          reversed={true}
        />
        <FeatureRow
          icon={<CertificateIcon />}
          title="Certificación profesional"
          desc="Al completar cada curso recibirás un certificado digital verificable. Comparte tus logros en LinkedIn y destaca en el mercado laboral."
          reversed={false}
        />
      </div>
    </div>
  </section>
)

const StatsBar = () => (
  <section className={styles.statsBar}>
    <div className={styles.statsInner}>
      <div className={styles.statItem}>
        <span className={styles.statNumber}>500+</span>
        <span className={styles.statLabel}>Cursos disponibles</span>
      </div>
      <div className={styles.statDivider} />
      <div className={styles.statItem}>
        <span className={styles.statNumber}>10K+</span>
        <span className={styles.statLabel}>Estudiantes activos</span>
      </div>
      <div className={styles.statDivider} />
      <div className={styles.statItem}>
        <span className={styles.statNumber}>25+</span>
        <span className={styles.statLabel}>Países</span>
      </div>
      <div className={styles.statDivider} />
      <div className={styles.statItem}>
        <span className={styles.statNumber}>98%</span>
        <span className={styles.statLabel}>Satisfacción</span>
      </div>
    </div>
  </section>
)

const StepsSection = () => (
  <section className={styles.steps}>
    <div className={styles.stepsInner}>
      <div className={styles.sectionHeader}>
        <h2 className={styles.sectionTitle}>Comienza en 3 pasos</h2>
        <p className={styles.sectionDesc}>Es más fácil de lo que imaginas.</p>
      </div>
      <div className={styles.stepsList}>
        <div className={styles.stepItem}>
          <div className={styles.stepDot}>
            <span>1</span>
            <div className={styles.stepLine} />
          </div>
          <div className={styles.stepContent}>
            <h3>Explora y elige</h3>
            <p>Navega por nuestro catálogo y encuentra el curso perfecto para ti. Filtra por categoría, nivel o duración.</p>
          </div>
        </div>
        <div className={styles.stepItem}>
          <div className={styles.stepDot}>
            <span>2</span>
            <div className={styles.stepLine} />
          </div>
          <div className={styles.stepContent}>
            <h3>Aprende a tu ritmo</h3>
            <p>Accede 24/7 desde cualquier dispositivo. Avanza a tu velocidad, repite lecciones y resuelve ejercicios prácticos.</p>
          </div>
        </div>
        <div className={styles.stepItem}>
          <div className={styles.stepDot}>
            <span>3</span>
          </div>
          <div className={styles.stepContent}>
            <h3>Certifícate</h3>
            <p>Completa el curso y obtén un certificado digital que valide tus nuevas habilidades ante cualquier empleador.</p>
          </div>
        </div>
      </div>
    </div>
  </section>
)

const TestimonialsSection = () => (
  <section className={styles.testimonials}>
    <div className={styles.testimonialsInner}>
      <div className={styles.sectionHeader}>
        <h2 className={styles.sectionTitle}>Lo que dicen nuestros estudiantes</h2>
        <p className={styles.sectionDesc}>Historias reales de transformación profesional.</p>
      </div>
      <div className={styles.testimonialsGrid}>
        <div className={styles.tCard}>
          <div className={styles.tCardStars}>
            {Array(5).fill(null).map((_, i) => (
              <svg key={i} width="14" height="14" viewBox="0 0 24 24" fill="var(--accent)" stroke="none">
                <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
              </svg>
            ))}
          </div>
          <p className={styles.tCardText}>"Gracias a EduTrack pude cambiar de carrera en solo 6 meses. Los cursos son claros, prácticos y los instructores son excelentes."</p>
          <div className={styles.tCardAuthor}>
            <div className={styles.tCardAvatar}>MG</div>
            <div>
              <strong>María García</strong>
              <span>Desarrolladora Web</span>
            </div>
          </div>
        </div>
        <div className={styles.tCard}>
          <div className={styles.tCardStars}>
            {Array(5).fill(null).map((_, i) => (
              <svg key={i} width="14" height="14" viewBox="0 0 24 24" fill="var(--accent)" stroke="none">
                <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
              </svg>
            ))}
          </div>
          <p className={styles.tCardText}>"La flexibilidad de aprender a mi propio ritmo es increíble. Los contenidos complementan perfectamente mi formación universitaria."</p>
          <div className={styles.tCardAuthor}>
            <div className={styles.tCardAvatar}>CR</div>
            <div>
              <strong>Carlos Rodríguez</strong>
              <span>Estudiante</span>
            </div>
          </div>
        </div>
        <div className={styles.tCard}>
          <div className={styles.tCardStars}>
            {Array(5).fill(null).map((_, i) => (
              <svg key={i} width="14" height="14" viewBox="0 0 24 24" fill="var(--accent)" stroke="none">
                <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
              </svg>
            ))}
          </div>
          <p className={styles.tCardText}>"Apliqué todo lo aprendido directamente en mi trabajo. La calidad de los cursos es impresionante. Altamente recomendado."</p>
          <div className={styles.tCardAuthor}>
            <div className={styles.tCardAvatar}>AM</div>
            <div>
              <strong>Ana Martínez</strong>
              <span>Diseñadora UX</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
)

const CtaSection = () => {
  const { isAuthenticated } = useAuth()

  return (
    <section className={styles.cta}>
      <div className={styles.ctaInner}>
        <div className={styles.ctaContent}>
          <h2 className={styles.ctaTitle}>¿Listo para transformar tu carrera?</h2>
          <p className={styles.ctaDesc}>Únete a miles de estudiantes que ya están aprendiendo y creciendo con EduTrack.</p><br></br>
          <div className={styles.ctaActions}>
            {isAuthenticated ? (
              <Link to="/cursos" className={styles.ctaBtn}>Explorar cursos</Link>
            ) : (
              <>
                <Link to="/register" className={styles.ctaBtn}>Regístrate gratis</Link>
                <Link to="/login" className={styles.ctaBtnGhost}>Ya tengo cuenta</Link>
              </>
            )}
          </div>
        </div>
        <div className={styles.ctaGraphic}>
          <div className={styles.ctaShape1} />
          <div className={styles.ctaShape2} />
        </div>
      </div>
    </section>
  )
}

const HomePage = () => (
  <>
    <HeroSection />
    <FeaturesSection />
    <StatsBar />
    <StepsSection />
    <TestimonialsSection />
    <CtaSection />
  </>
)

export default HomePage
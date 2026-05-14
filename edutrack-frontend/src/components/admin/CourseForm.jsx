import { useState, useRef } from 'react'
import { createCourse, updateCourse, uploadCourseImage } from '@/api/courses'
import Button from '@/components/ui/Button'
import { useToast } from '@/hooks/useToast'

const formResponsive = `
  @media (max-width: 640px) {
    .course-form-grid { grid-template-columns: 1fr !important; }
  }
  @media (max-width: 480px) {
    .course-form-grid input, .course-form-grid select, .course-form-grid textarea {
      padding: var(--space-2) var(--space-3) !important;
      font-size: var(--text-sm) !important;
    }
  }
  @media (max-width: 400px) {
    .course-form-grid input, .course-form-grid select, .course-form-grid textarea {
      padding: var(--space-1) var(--space-2) !important;
      font-size: var(--text-xs) !important;
    }
  }
`

const CourseForm = ({ course, categories, onSave, onCancel }) => {
  const toast = useToast()
  const isEditing = !!course

  const [form, setForm] = useState({
    title: course?.title || '',
    description: course?.description || '',
    categoryId: course?.category?.id || (categories[0]?.id || ''),
  })
  const [imageFile, setImageFile] = useState(null)
  const [imagePreview, setImagePreview] = useState(course?.imageUrl || null)
  const [saving, setSaving] = useState(false)
  const fileInputRef = useRef(null)

  const handleImageSelect = (e) => {
    const file = e.target.files[0]
    if (!file) return
    setImageFile(file)
    const reader = new FileReader()
    reader.onload = (ev) => setImagePreview(ev.target.result)
    reader.readAsDataURL(file)
  }

  const handleRemoveImage = () => {
    setImageFile(null)
    setImagePreview(null)
    if (fileInputRef.current) fileInputRef.current.value = ''
  }

  const handleChange = (e) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }))
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (!form.title.trim() || !form.description.trim() || !form.categoryId) {
      toast.error('Completa todos los campos del curso')
      return
    }

    setSaving(true)
    try {
      let savedCourse

      if (isEditing) {
        savedCourse = await updateCourse(course.id, {
          title: form.title,
          description: form.description,
          categoryId: Number(form.categoryId),
        })
      } else {
        savedCourse = await createCourse({
          title: form.title,
          description: form.description,
          categoryId: Number(form.categoryId),
        })
      }

      if (imageFile) {
        try {
          await uploadCourseImage(savedCourse.id, imageFile)
        } catch (err) {
          toast.warning(err.message || 'Curso creado, pero no se pudo subir la imagen')
        }
      }

      toast.success(isEditing ? 'Curso actualizado' : 'Curso creado exitosamente')
      onSave()
    } catch (err) {
      toast.error(err.message || 'Error al guardar el curso')
    } finally {
      setSaving(false)
    }
  }

  return (
    <>
      <style>{formResponsive}</style>
      <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-5)' }}>
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 'var(--space-4)' }} className="course-form-grid">
        <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-1)' }}>
          <label style={{ fontSize: 'var(--text-sm)', fontWeight: 600, color: 'var(--text-secondary)' }}>
            Título del curso
          </label>
          <input
            name="title"
            value={form.title}
            onChange={handleChange}
            placeholder="Ej: Desarrollo Web Avanzado"
            style={{
              padding: 'var(--space-3) var(--space-4)',
              border: '1px solid var(--border)',
              borderRadius: 'var(--radius-md)',
              background: 'var(--bg-base)',
              color: 'var(--text-primary)',
              fontSize: 'var(--text-base)',
            }}
            required
          />
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-1)' }}>
          <label style={{ fontSize: 'var(--text-sm)', fontWeight: 600, color: 'var(--text-secondary)' }}>
            Categoría
          </label>
          <select
            name="categoryId"
            value={form.categoryId}
            onChange={handleChange}
            className="native-select"
            style={{
              padding: 'var(--space-3) var(--space-4)',
              border: '1px solid var(--border)',
              borderRadius: 'var(--radius-md)',
              background: 'var(--bg-base)',
              color: 'var(--text-primary)',
              fontSize: 'var(--text-base)',
            }}
            required
          >
            <option value="">Seleccionar categoría</option>
            {categories.map((cat) => (
              <option key={cat.id} value={cat.id}>{cat.name}</option>
            ))}
          </select>
        </div>
      </div>

      <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-1)' }}>
        <label style={{ fontSize: 'var(--text-sm)', fontWeight: 600, color: 'var(--text-secondary)' }}>
          Descripción
        </label>
        <textarea
          name="description"
          value={form.description}
          onChange={handleChange}
          placeholder="Describe los objetivos y temario del curso..."
          rows={3}
          style={{
            padding: 'var(--space-3) var(--space-4)',
            border: '1px solid var(--border)',
            borderRadius: 'var(--radius-md)',
            background: 'var(--bg-base)',
            color: 'var(--text-primary)',
            fontSize: 'var(--text-base)',
            resize: 'vertical',
            fontFamily: 'var(--font-body)',
          }}
          required
        />
      </div>

      <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-1)' }}>
        <label style={{ fontSize: 'var(--text-sm)', fontWeight: 600, color: 'var(--text-secondary)' }}>
          Imagen de portada
        </label>
        <div
          onClick={() => fileInputRef.current?.click()}
          style={{
            position: 'relative',
            width: '100%',
            height: 180,
            borderRadius: 'var(--radius-lg)',
            border: `2px dashed ${imagePreview ? 'var(--accent)' : 'var(--border)'}`,
            background: imagePreview ? 'var(--bg-base)' : 'var(--bg-surface)',
            cursor: 'pointer',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            overflow: 'hidden',
            transition: 'border-color var(--transition-fast)',
          }}
        >
          {imagePreview ? (
            <>
              <img
                src={imagePreview}
                alt="Preview"
                style={{
                  width: '100%',
                  height: '100%',
                  objectFit: 'cover',
                }}
              />
              <button
                type="button"
                onClick={(e) => { e.stopPropagation(); handleRemoveImage() }}
                style={{
                  position: 'absolute',
                  top: 8,
                  right: 8,
                  width: 32,
                  height: 32,
                  borderRadius: '50%',
                  background: 'rgba(0,0,0,0.6)',
                  color: '#fff',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  border: 'none',
                  cursor: 'pointer',
                }}
                title="Eliminar imagen"
              >
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
                  <path d="M18 6 6 18M6 6l12 12" />
                </svg>
              </button>
            </>
          ) : (
            <div style={{ textAlign: 'center', color: 'var(--text-muted)' }}>
              <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" style={{ margin: '0 auto 8px', display: 'block' }}>
                <rect x="3" y="3" width="18" height="18" rx="2" ry="2" />
                <circle cx="8.5" cy="8.5" r="1.5" />
                <path d="M21 15l-5-5L5 21" />
              </svg>
              <span style={{ fontSize: 'var(--text-sm)', fontWeight: 500 }}>Haz clic para subir imagen</span>
              <br />
              <span style={{ fontSize: 'var(--text-xs)' }}>JPG, PNG, WebP</span>
            </div>
          )}
        </div>
        <input
          ref={fileInputRef}
          type="file"
          accept="image/jpeg,image/png,image/webp"
          onChange={handleImageSelect}
          style={{ display: 'none' }}
        />
      </div>
      <div style={{ display: 'flex', gap: 'var(--space-2)', justifyContent: 'flex-end', borderTop: '1px solid var(--border)', paddingTop: 'var(--space-4)' }}>
        <Button type="button" variant="ghost" onClick={onCancel}>Cancelar</Button>
        <Button type="submit" loading={saving}>
          {isEditing ? 'Guardar cambios' : 'Crear curso'}
        </Button>
      </div>
    </form>
    </>
  )
}

export default CourseForm

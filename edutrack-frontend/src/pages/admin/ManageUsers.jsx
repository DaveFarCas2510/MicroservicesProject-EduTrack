import { useState, useEffect } from 'react'
import { getUsers } from '@/api/auth'
import Sidebar from '@/components/layout/Sidebar'
import { Badge } from '@/components/ui/Badge'
import Spinner from '@/components/ui/Spinner'
import styles from './Manage.module.css'

const ManageUsers = () => {
  const [users, setUsers] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    const fetchUsers = async () => {
      setLoading(true)
      try {
        const data = await getUsers()
        setUsers(data || [])
      } catch (err) {
        setError(err.message || 'Error al cargar usuarios')
      } finally {
        setLoading(false)
      }
    }
    fetchUsers()
  }, [])

  return (
    <div className={styles.layout}>
      <Sidebar />
      <div className={styles.content}>
        <div className={styles.header}>
          <div>
            <h1 className={styles.title}>Usuarios</h1>
            <p className={styles.subtitle}>{users.length} usuario{users.length !== 1 ? 's' : ''} registrado{users.length !== 1 ? 's' : ''}</p>
          </div>
        </div>

        {loading ? (
          <div className={styles.loading}><Spinner size={32} /></div>
        ) : error ? (
          <div className={styles.error}>
            <p>{error}</p>
          </div>
        ) : (
          <div className={styles.tableWrapper}>
            <div className={styles.table}>
              <div className={[styles.tableHeader, styles.tableHeaderUsers].join(' ')}>
                <span className={styles.colName}>Nombre</span>
                <span className={styles.colEmail}>Email</span>
                <span className={styles.colRole}>Rol</span>
                <span className={styles.colDate}>Registrado</span>
              </div>
              {users.map((user) => (
                <div key={user.id} className={[styles.tableRow, styles.tableRowUsers].join(' ')}>
                  <span className={styles.colName}>
                    <span className={styles.userAvatar}>
                      {user.name?.charAt(0).toUpperCase()}
                    </span>
                    <span className={styles.rowTitle}>{user.name}</span>
                  </span>
                  <span className={styles.colEmail}>{user.email}</span>
                  <span className={styles.colRole}>
                    <Badge variant={user.role === 'ADMIN' ? 'accent' : 'default'} size="sm">
                      {user.role === 'ADMIN' ? 'Admin' : 'Usuario'}
                    </Badge>
                  </span>
                  <span className={styles.colDate}>
                    {user.createdAt
                      ? new Date(user.createdAt).toLocaleDateString('es-ES', {
                          year: 'numeric',
                          month: 'short',
                          day: 'numeric',
                        })
                      : '—'}
                  </span>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

export default ManageUsers

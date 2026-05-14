




import { createContext, useEffect, useReducer, useCallback } from 'react'
import { login as apiLogin, register as apiRegister, getMe } from '@/api/auth'


const initialState = {
  user: null,
  token: localStorage.getItem('token') || null,
  loading: true,   
  error: null,
}


const authReducer = (state, action) => {
  switch (action.type) {
    case 'SET_LOADING':
      return { ...state, loading: action.payload }
    case 'SET_USER':
      return { ...state, user: action.payload, loading: false, error: null }
    case 'SET_ERROR':
      return { ...state, error: action.payload, loading: false }
    case 'LOGIN_SUCCESS':
      return {
        ...state,
        user: action.payload.user,
        token: action.payload.token,
        loading: false,
        error: null,
      }
    case 'LOGOUT':
      return { ...initialState, token: null, loading: false }
    case 'CLEAR_ERROR':
      return { ...state, error: null }
    default:
      return state
  }
}


export const AuthContext = createContext(null)


export const AuthProvider = ({ children }) => {
  const [state, dispatch] = useReducer(authReducer, initialState)

  useEffect(() => {
    const verify = async () => {
      const token = localStorage.getItem('token')
      if (!token) {
        dispatch({ type: 'SET_LOADING', payload: false })
        return
      }
      try {
        const user = await getMe()
        dispatch({ type: 'SET_USER', payload: user })
      } catch {
        localStorage.removeItem('token')
        dispatch({ type: 'LOGOUT' })
      }
    }
    verify()
  }, [])

  useEffect(() => {
    const handleForceLogout = () => {
      localStorage.removeItem('token')
      dispatch({ type: 'LOGOUT' })
    }
    window.addEventListener('auth:logout', handleForceLogout)
    return () => window.removeEventListener('auth:logout', handleForceLogout)
  }, [])

  const login = useCallback(async (credentials) => {
    dispatch({ type: 'SET_LOADING', payload: true })
    dispatch({ type: 'CLEAR_ERROR' })
    try {
      const data = await apiLogin(credentials)
      localStorage.setItem('token', data.token)
      dispatch({
        type: 'LOGIN_SUCCESS',
        payload: {
          token: data.token,
          user: {
            id: data.id,
            name: data.name,
            email: data.email,
            role: data.role,
          },
        },
      })
      return data
    } catch (err) {
      dispatch({ type: 'SET_ERROR', payload: err.message })
      throw err
    }
  }, [])

  const register = useCallback(async (userData) => {
    dispatch({ type: 'SET_LOADING', payload: true })
    dispatch({ type: 'CLEAR_ERROR' })
    try {
      const data = await apiRegister(userData)
      localStorage.setItem('token', data.token)
      dispatch({
        type: 'LOGIN_SUCCESS',
        payload: {
          token: data.token,
          user: {
            id: data.id,
            name: data.name,
            email: data.email,
            role: data.role,
          },
        },
      })
      return data
    } catch (err) {
      dispatch({ type: 'SET_ERROR', payload: err.message })
      throw err
    }
  }, [])

  const logout = useCallback(() => {
    localStorage.removeItem('token')
    dispatch({ type: 'LOGOUT' })
  }, [])

  const clearError = useCallback(() => {
    dispatch({ type: 'CLEAR_ERROR' })
  }, [])

  const isAuthenticated = !!state.user
  const isAdmin = state.user?.role === 'ADMIN'
  const isUser = state.user?.role === 'USER'

  const value = {
    ...state,
    isAuthenticated,
    isAdmin,
    isUser,
    login,
    register,
    logout,
    clearError,
  }

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}



import { createContext, useContext, useEffect, useState } from 'react'
import { firebase } from './Firebase'
import Analytics from 'analytics'
import { trackingUser } from 'api/UserAPI'

const AuthContext = createContext({
  user: null,
  loading: true,
  logout: () => {},
})

const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const handleAuthChange = (u) => {
      setUser(u)
      setLoading(false)
      if (u) {
        Analytics.setUser(u.uid, { action: 'IdTokenChanged' })
        trackingUser(u.uid, 'Sign In')
      }
    }

    return firebase.auth().onIdTokenChanged(handleAuthChange)
  }, [])

  const logout = async () => {
    try {
      await firebase.auth().signOut()
      Analytics.track('User Logged Out')
    } catch (error) {
      console.error('Logout error:', error)
    }
  }

  const value = {
    user,
    loading,
    logout,
  }

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}

const useAuth = () => {
  const context = useContext(AuthContext)
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider')
  }
  return context
}

export { AuthProvider, useAuth }

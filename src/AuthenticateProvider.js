import {
  useEffect,
  useState,
  useContext,
  createContext
} from 'react'
import { firebase } from './Firebase'
import Analytics from 'analytics';
import { trackingUser } from 'api/UserAPI'
const AuthContext = createContext({
  user: null,
  loading: true,
  logout: () => {}
})


const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null)
  const [loading, setLoading] = useState(true)


  useEffect(() => {
    const cancelAuthListener = firebase.auth().onIdTokenChanged((u) => {
      setUser(u)
      if(u) {
        Analytics.setUser(u.uid, { action: 'IdTokenChanged' })
        trackingUser(u.uid, "Sign In")
      }
      setLoading(false)
    })

    return () => cancelAuthListener()
  }, [])

  return (
    <AuthContext.Provider
      value={{ user, loading, logout: () => firebase.auth().signOut() }}
    >
      {children}
    </AuthContext.Provider>
  )
}

function useAuth () {
  return useContext(AuthContext)
}

export { AuthProvider, useAuth }

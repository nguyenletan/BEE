import { useState, useEffect } from 'react'
import StyledFirebaseAuth from 'react-firebaseui/StyledFirebaseAuth'
import { firebase } from './Firebase'

const firebaseAuthConfig = {
  signInFlow: 'popup',
  signInOptions: [
    {
      provider: firebase.auth.EmailAuthProvider.PROVIDER_ID,
      requireDisplayName: false
    }
  ],
  signInSuccessUrl: '/'
}

const FirebaseAuth = () => {
  const [show, setShow] = useState(false)

  useEffect(() => {
    setShow(true)
  }, [])

  return (
    <div>
      {show && (
        <StyledFirebaseAuth
          uiConfig={firebaseAuthConfig}
          firebaseAuth={firebase.auth()}
        />
      )}
    </div>
  )
}

export default FirebaseAuth

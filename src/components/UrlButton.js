import React from 'react'
import styled from 'styled-components'
import { Input } from '@mui/material'

const Button = styled.button`
  border-radius: 15px;
  padding-left: 20px;
  padding-right: 20px;
  font-size: 0.8rem;
`

const UrlButton = ({url}) => {
  const [showUrl, setShowUrl] = React.useState(false)
  const onClick = () => {
    navigator.clipboard.writeText(`${window.location.origin}/iframe/${url}`)
    setShowUrl(!showUrl)
  }

  return (
    <>
      {showUrl && <div>
        <Input value={`${window.location.origin}/iframe/${url}`} inputProps="url" className="me-1"/>
        <Button type="button" className="btn btn-outline-primary btn-sm" onClick={onClick}>Copy</Button>
      </div>
      }
    {!showUrl && <Button
      type="button"
      onClick={onClick}
      className="btn btn-primary btn-sm"
    >Get Url
    </Button>
    }
    </>
  )
}

export default UrlButton

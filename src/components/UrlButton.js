import React from 'react'
import styled from 'styled-components'
import { Input } from '@mui/material'

const Button = styled.button`
  border-radius: 15px;
  padding-left: 20px;
  padding-right: 20px;
  font-size: 0.8rem;
`

const UrlButton = ({url, textWidth}) => {
  const [showUrl, setShowUrl] = React.useState(false)
  const onClick = () => {
    navigator.clipboard.writeText(`${window.location.origin}/iframe/${url}`)
    setShowUrl(!showUrl)
  }

  const width = textWidth ? textWidth : '40ch'

  return (
    <>
      {showUrl && <div>
        <Input sx={{ width: width }} size="small" value={`${window.location.origin}/iframe/${url}`} inputProps="url"/>
        <Button type="button" className="btn btn-primary btn-sm ms-1" onClick={onClick}>Copy Url</Button>
      </div>
      }
    {!showUrl && <Button
      type="button"
      onClick={onClick}
      className="btn btn-primary btn-sm"
    >Show Url
    </Button>
    }
    </>
  )
}

export default UrlButton

import React, { useState } from 'react'
import ReactDOM from 'react-dom'
import styled from 'styled-components'

const StyledTitle = styled.h1`
  color: var(--background);
  font-size: 25px;
  font-weight: normal;
  letter-spacing: 4px;
  margin: auto;
  margin-top: 8px;
  text-align: center;
`

export default function InputTitle (props) {
  return (
    <StyledTitle>{props.text}</StyledTitle>
  )
}

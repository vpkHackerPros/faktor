import React, {useState, useEffect} from 'react'
import styled  from 'styled-components'

const StyledPanel = styled.div`
  height: content;
  width: 90%;
  margin: auto;
  margin-top: 40px;
  margin-bottom: 40px;
  background: var(--mainColor2);
  padding: 25px;
  border-radius: 4vh;
  display: flex;
  flex-direction: row;
`

export default function Panel (props) {
  return (
    <StyledPanel>{props.children}</StyledPanel>
  )
}

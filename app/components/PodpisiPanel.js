import React, {useState} from 'react'
import styled from 'styled-components'
import Button from './Button'
import FastTextInput from './FastTextInput'
import Panel from './Panel'

const PodpisLine = styled.div`
  height: 100%;
  margin :5px;
`

function Podpis (props) {
  const [text, setText] = useState('')
  const onClick = () => {
    fetch(`http://localhost:4545/podpis`, {
      method: 'POST',
      body: JSON.stringify({
        podpis: text,
        isLeft: props.isLeft
      }),
      headers: {'Content-Type': 'application/json'},
    })
  }
  return (
    <PodpisLine>
      <FastTextInput text={text} setText={setText}/>
      <Button onClick={onClick}>PODPIS NOT</Button>
    </PodpisLine>
  )
}

export default function PodpisiPanel (props) {
  return (
    <Panel> 
      <Podpis isLeft={ true } />
      <Podpis isLeft={ false } />
    </Panel>
  )
}
import React, {useState, useEffect} from 'react'
import styled  from 'styled-components'
import ContentThreeDays from './ContentThreeDays.js'
import TextInput from './FastTextInput.js'
import StyledPanel from './StyledPanel.js'
import Button from './Button.js'
import InputTitle from './InputTitle.js'
import {SocketProvider, useSocket} from '../hooks/useSocket.js'
import FileSelector from './FileSelector.js'
import Panel from './Panel.js'

const Container = styled.div`
  box-sizing: border-box;
  flex-direction: column;
  height: 350px;
  padding: 10px;
  margin: 15px;
  margin: 5px;
  border-radius: 5px;
`
const InputSize = styled.div`
  height: 100px;
`

function GostPanel(props){
  const [tema, setTema] = useState ('ni teme')
  const [gost1, setVir1] = useState ('gost 1')
  const [gost2, setVir2] = useState ('gost 2')
  useEffect( () => {
    fetch(`http://localhost:4545/gosti`, {
      method: 'POST',
      body: JSON.stringify({
        gost: [gost1, gost2]
      }),
      headers: {'Content-Type': 'application/json'},
    })
  }, [gost1, gost2])

  return(
    <Panel>
      <InputTitle text={'PRVI GOST'} />
      <TextInput text={gost1} setText={setVir1}  />
      <InputTitle text={'DRUGI GOST'} />
      <TextInput text={gost2} setText={setVir2}  />
    </Panel>
  )
}

export default GostPanel

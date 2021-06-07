import React, {useState, useEffect} from 'react'
import styled  from 'styled-components'
import ContentThreeDays from './ContentThreeDays.js'
import TextInput from './FastTextInput.js'
import StyledPanel from './StyledPanel.js'
import Button from './Button.js'
import InputTitle from './InputTitle.js'
import Panel from './Panel.js'
import {SocketProvider, useSocket} from '../hooks/useSocket.js'

const Container = styled.div`
  box-sizing: border-box;
  height: 355px;
  margin: auto;
  padding: 10px;
  border-radius: 5px;
`

function StartPanel(props){
  const [tema, setTema] = useState ('prva tema')
  const [tema2, setTema2] = useState ('druga tema')
  const [podpis, setPodpis] = useState ('voditelj')
  const [crawlPath, setCrawlPath] = useState()
  const [crawlText, setCrawlText] = useState()
  useEffect( () => {
    fetch('http://localhost:4545/crawlText', {
      method: 'POST',
      body: JSON.stringify({
        text: crawlText
      }),
      headers: {'Content-Type': 'application/json'},
    })
  }, [crawlText])
  useEffect( () => {
    fetch(`http://localhost:4545/${props.secondTheme}`, {
      method: 'POST',
      body: JSON.stringify({
        tema: tema2,
        podpis: '',
      }),
      headers: {'Content-Type': 'application/json'},
    })
  }, [tema, tema2, podpis])

  useEffect( () => {
    fetch(`http://localhost:4545/${props.sendDataTo}`, {
      method: 'POST',
      body: JSON.stringify({
        tema: tema,
        podpis: podpis,
      }),
      headers: {'Content-Type': 'application/json'},
    })
  }, [tema, podpis])

  return(
    <div>
      <Panel>
        <InputTitle text={'VODITELJ'} />
        <TextInput text={podpis} setText={setPodpis} />
      </Panel>
      <Panel>
        <InputTitle text={'PRVA TEMA'} />
        <TextInput text={tema} setText={setTema} />
        <InputTitle text={'DRUGA TEMA'} />
        <TextInput text={tema2} setText={setTema2} />
      </Panel>
    </div>
  )
}

export default StartPanel

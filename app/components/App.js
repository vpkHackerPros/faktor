import React, { useState, useEffect } from 'react'
import {SocketProvider} from '../hooks/useSocket.js'

import SideStoryPanel from './SideStoryPanel.js'
import PodpisiPanel from './PodpisiPanel.js'
import styled, { createGlobalStyle } from 'styled-components'

var fromXML = require("from-xml").fromXML;


const GlobalStyle = createGlobalStyle`
  :root {
    --mainColor1: #2F4858; //temno modra
    --mainColor2: #336699; //svetlej modra
    --textColor: #119977;  //zelena
    --background: white;
  }
  #root {
    height: 100%
  }
  body {
    height: 100%;
    width: 100%;
    margin: auto;
    position: relative;
    overflow: scroll;
    font-size: 1.5em;
    background: var(--background);

    //ozadje
    background-color: var(--mainColor1);
  }
  html {
    height: 100%;
    width: 100%;
    margin: 0;
  }
`
const AppContainer = styled.div`
  color: var(--background);
  height: 100%;
`

const AppTitle = styled.h1`
  font-size: 100px;
  font-weight: black;
  text-align: center;
  color: white;
  letter-spacing: 28px;
  text-shadow: 5px 5px 0px var(--textColor), -5px -5px 0px var(--mainColor2);
`

export default function App (props) {
  return (
    <SocketProvider connection={{ip:'localhost', port:6100}}>
      <GlobalStyle/>
      <AppTitle>LJ TV POPOLDNE</AppTitle>
      <PodpisiPanel />
      <SideStoryPanel />
    </SocketProvider>
  )
}

import React, { useState } from 'react';
import ReactDOM from 'react-dom';
import styled from 'styled-components';

const Input = styled.input`
  box-sizing: border-box;
  padding: 3px;
  background-color: var(--background);
  border: 3px solid var(--background);
  border-radius: 10vh;
  height: 60px;
  width: 100%;
  color: var(--mainColor2);
  outline: none;
  font-size: 30px;
  flex: 1;
  text-align: center;
  margin: auto;
  margin-top: 15px;
  margin-bottom: 15px;
  &:focus {
    border: 3px solid var(--textColor);
    color: var(--mainColor1);
  }
`

function FastTextInput (props) {
  const handleChange = (event) => props.setText(event.target.value)
  return (
    <Input type="text" value={props.text} onChange={handleChange} maxLength={`${props.maxLength || 1000}`}/>
  )
}

export default FastTextInput

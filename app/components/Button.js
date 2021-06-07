import React from 'react'
import styled from 'styled-components'

const Button = styled.button`
  flex: 1;
  width: fit-content;
  height: 100%;
  background-color: var(--textColor);
  border: none;
  border-radius: 5px;
  margin: 50px;
  font-size: 30px;
  font-weight: black;
  color: var(--background);
  outline: none;
  padding: 15px;
  cursor: pointer;

  &: hover {
    transform: translateY(-2px);
  }
  &: active {
    transform: translateY(0px);
  }
`
export default Button

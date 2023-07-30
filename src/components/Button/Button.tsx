import React from 'react'

import {css} from '@emotion/css';

interface IButton {
  children : React.ReactNode
 text : string;
 bgcolor : string;
}
const Button = ({children , text, bgcolor="#4f4f4f"} : IButton) => {
    const buttonStyle = css`
    color: white;
    background-color: ${bgcolor} ;
    box-shadow: 2px 2px 10px rgba(0, 0, 0, 1);
    padding: 4px 10px;
    border-radius: 5px;
    border: none;
    cursor: pointer;
  
    &:hover {
      box-shadow: 2px 2px 10px rgba(0, 0, 0, 0.5);
    }
  `;
  return (
    <div className={buttonStyle}>{text}</div>
  )
}

export default Button
import React from "react";
import {css} from '@emotion/css';

const jumping_dots_loader = css`
width: 100px;
  height: 100px;
  border-radius: 100%;
  position: relative;
  margin: 0 auto;

  & span{
    display: inline-block;
    width: 20px;
    height: 20px;
    border-radius: 100%;
    background-color: rgba(241, 83, 110, 0.8);
    margin: 35px 5px;
  }

  & span:nth-child(1) {
    animation: bounce 1s ease-in-out infinite;
  }

  & span:nth-child(2) {
    animation: bounce 1s ease-in-out 0.33s infinite;
  }

   & span:nth-child(3) {
    animation: bounce 1s ease-in-out 0.66s infinite;
  }

  @keyframes bounce {
    0%,
    75%,
    100% {
      -webkit-transform: translateY(0);
      -ms-transform: translateY(0);
      -o-transform: translateY(0);
      transform: translateY(0);
    }
  
    25% {
      -webkit-transform: translateY(-20px);
      -ms-transform: translateY(-20px);
      -o-transform: translateY(-20px);
      transform: translateY(-20px);
    }
  }

`
const moving_gradient = css`
`

const Loading = () => {
  return (
    <div>
      <div className={jumping_dots_loader}>
        <span></span> <span></span> <span></span>
      </div>
      <div className={moving_gradient}></div>
    </div>
  );
};

export default Loading;

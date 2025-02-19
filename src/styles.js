import styled, {keyframes} from 'styled-components'

const rotate = keyframes`
  from {
    transform: rotate(0deg);
  }

  to {
    transform: rotate(360deg);
  }
`;

export const NotifyItem = styled.div`
  box-sizing: border-box;
  color: #000;
  line-height: 16px;
  position: relative;
  font-weight: 500;
  background: #EFF2F5;
  cursor: pointer;
  margin-bottom: 15px;
  transition: .3s ease left;
  width: 320px;
  left: 320px;
  font-size: 14px;
  pointer-events: auto;
  
  box-shadow: rgb(38 38 38 / 4%) 0 1px 2px, rgb(38 38 38 / 16%) 0 4px 8px;

  &:before {
    position: absolute;
    top: 50%;
    left: 15px;
    margin-top: -14px;
    display: block;
    width: 28px;
    height: 28px;
    font-size: 28px;
    text-align: center;
  }
  
  img.load,
  svg.load {
    width: 25px;
    height: 25px;
    animation: ${rotate} 2s linear infinite;
    margin-right: 14px;
    margin-left: 10px;
  }

  /* Объединяем стили для элементов с классом .close */
  img.close,
  svg.close {
    position: absolute;
    width: 25px;
    height: 25px;
    left: 265px;
    margin-right: 14px;
    cursor: pointer;
    transition: opacity 0.3s ease;
  }

  img.close:hover,
  svg.close:hover {
    opacity: 0.9;
  }
  
  .text{
    width: 180px;
  }
  
  &:hover{
   opacity: 0.7; 
  }
`


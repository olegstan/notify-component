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
  box-shadow: rgb(38 38 38 / 4%) 0px 1px 2px, rgb(38 38 38 / 16%) 0px 4px 8px;

  img.load,
  svg.load {
    width: 25px;
    height: 25px;
    animation: ${rotate} 2s linear infinite;
    margin-right: 14px;
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


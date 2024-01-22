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

  img.load{
    height: 25px;
    width: 25px;
    animation: ${rotate} 2s linear infinite;
    margin-right: 14px;
  }
  img.close{
    position: absolute;
    height: 25px;
    width: 25px;
    margin-right: 14px;
    left: 265px;
  }
  img.close:hover{
    opacity: 0.9;
  }
  svg.load{
    height: 25px;
    width: 25px;
    animation: ${rotate} 2s linear infinite;
    margin-right: 14px;
  }
  svg.close{
    position: absolute;
    height: 25px;
    width: 25px;
    margin-right: 14px;
    left: 265px;
  }
  svg.close:hover{
    opacity: 0.9;
  }
  
  .text{
    width: 200px;
  }
`


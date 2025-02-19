import styled, {keyframes} from 'styled-components'

export const Preload = styled.div`
  border-top-right-radius: 6px;
  border-top-left-radius: 6px;
  position: relative;
  width: 100%;
  padding: 0;
  
  & > div{
    background-color: #2196F3 !important;
    height: 3px;
    border-top-right-radius: 6px;
    border-top-left-radius: 6px;
    position: absolute;
    top: 0;
    transition: 1s width;
  }
  
  &:hover{
    opacity: 1;
  }
`

export const Content = styled.div`
  display: flex;
  align-items: center;
  padding: 15px 15px 15px 15px;
`
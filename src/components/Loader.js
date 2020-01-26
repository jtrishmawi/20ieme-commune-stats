import React from 'react';
import styled, {keyframes} from 'styled-components';

const Container = styled.div`
  height: 100vh;
  width: 100vw;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: #fff;
`

const ldsDualRing = keyframes`
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
`;

const LoaderElement = styled.div`
  display: inline-block;
  width: 64px;
  height: 64px;

  &:after {
    content: " ";
    display: block;
    width: 46px;
    height: 46px;
    margin: 1px;
    border-radius: 50%;
    border: 5px solid #000;
    border-color: #000 transparent #000 transparent;
    animation: ${ldsDualRing} 1.2s linear infinite;
  }
`;

const Loader = () => {
  return (
    <Container>
      <LoaderElement />
    </Container>
  );
};

export default Loader;
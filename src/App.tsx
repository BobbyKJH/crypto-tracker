import React, { useState } from "react";
import styled from "styled-components";

const Container = styled.div`
  background-color: ${(props) => props.theme.bgColor};
`;
const H1 = styled.h1`
  color: ${(props) => props.theme.textColor};
`;
const Btn = styled.button`
  background-color: ${(props) => props.theme.btnColor};
`;
function App() {
  return (
    <Container>
      <H1>1</H1>
      <Btn>Hello</Btn>
    </Container>
  );
}

export default App;

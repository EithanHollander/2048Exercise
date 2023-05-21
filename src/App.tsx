import React from "react";
import Matrix from "./components/Matrix";
import styled from "styled-components";

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100vh;
  width: 100vw;
`;

function App() {
  return (
    <Container>
      <Matrix />
    </Container>
  );
}

export default App;

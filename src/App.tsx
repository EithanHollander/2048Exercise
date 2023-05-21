import "./App.css";
import React from "react";
import Matrix from "./components/Matrix";
import styled from "styled-components";
import RestartButton from "./components/RestartButton";
import matrixStore from "./stores/MatrixStore";
import { observer } from "mobx-react-lite";

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100vh;
  width: 100vw;
  color: #776e65;
  font-family: "Clear Sans", "Helvetica Neue", Arial, sans-serif;
  background: #faf8ef;
`;

const InnerContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: start;
  align-items: left;
`;

const Title = styled.h1`
  font-size: 80px;
  font-weight: bold;
  margin: 0;
`;

const StyledRestartButton = styled(RestartButton)`
  margin-top: 4px;
`;

const GameOverTitle = styled.h3`
  font-size: 30px;
  font-weight: bold;
  width: 100%;
  margin: 0;
  margin-top: 20px;
  text-align: center;
`;

const StyledMatrix = styled(Matrix)`
  margin-top: 35px;
`;

const App = observer(() => {
  return (
    <Container>
      <InnerContainer>
        <Title>2048</Title>
        <StyledRestartButton />
        {matrixStore.isGameOver && <GameOverTitle>Game Over!</GameOverTitle>}
        <StyledMatrix />
      </InnerContainer>
    </Container>
  );
});

export default App;

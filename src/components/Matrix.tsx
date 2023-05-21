import { useEffect } from "react";
import { observer } from "mobx-react-lite";
import matrixStore from "../stores/MatrixStore";
import styled from "styled-components";

interface KeyboardEvent {
  key: string;
}

const Container = styled.div`
  display: flex;
  flex-direction: column;
  flex-wrap: wrap;
  justify-content: center;
  align-items: center;
  height: 410px;
  width: 410px;
`;

const Row = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
`;

const Cell = styled.div`
  border: solid black 1px;
  height: 100px;
  width: 100px;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 35px;
`;

const Matrix = observer(() => {
  useEffect(() => {
    matrixStore.init();
  }, []);

  useEffect(() => {
    function handleKeyDown(event: KeyboardEvent) {
      console.log(event.key);
      if (event.key === "ArrowRight") {
        matrixStore.moveRight();
      }
      if (event.key === "ArrowLeft") {
        matrixStore.moveLeft();
      }
      if (event.key === "ArrowDown") {
        matrixStore.moveDown();
      }
      if (event.key === "ArrowUp") {
        matrixStore.moveUp();
      }
    }

    document.addEventListener("keydown", handleKeyDown);

    return function cleanup() {
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, []);

  return (
    <Container>
      {matrixStore.board.map((row, rowIndex) => {
        return (
          <Row key={rowIndex}>
            {row.map((cellValue, columnIndex) => {
              return (
                <Cell key={columnIndex}>
                  {cellValue === 0 ? null : cellValue}
                </Cell>
              );
            })}
          </Row>
        );
      })}
    </Container>
  );
});

export default Matrix;

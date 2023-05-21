import { useEffect } from "react";
import { observer } from "mobx-react-lite";
import matrixStore from "../stores/MatrixStore";
import styled from "styled-components";
import "./Matrix.css";

interface KeyboardEvent {
  key: string;
}

const Container = styled.div`
  display: flex;
  flex-direction: column;
  flex-wrap: wrap;
  justify-content: center;
  align-items: center;
  color: #776e65;
  background: #bbad9f;
  border-radius: 6px;
  width: 500px;
  height: 500px;

  :last-child {
    margin-bottom: 0px;
  }
`;

const Row = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  margin-bottom: 15px;

  :last-child {
    margin-right: 0px;
  }
`;

const Cell = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 106.25px;
  height: 106.25px;
  border-radius: 3px;
  font-weight: bold;
  margin-right: 15px;
`;

type MatrixProps = {
  className?: string;
};

const Matrix = observer((props: MatrixProps) => {
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
    <Container className={props.className}>
      {matrixStore.board.map((row, rowIndex) => {
        return (
          <Row key={rowIndex}>
            {row.map((cellValue, columnIndex) => {
              return (
                <Cell className={"cell cell-" + cellValue} key={columnIndex}>
                  {matrixStore.isCellEmptyByCoordinate(rowIndex, columnIndex)
                    ? null
                    : cellValue}
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

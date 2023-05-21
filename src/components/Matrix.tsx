import { useEffect } from "react";
import { observer } from "mobx-react-lite";
import matrixStore from "../stores/MatrixStore";
import styled from "styled-components";

const Container = styled.div`
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  justify-content: center;
  align-items: center;
  height: 410px;
  width: 410px;
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
    console.log(matrixStore.board);
  }, []);

  return (
    <Container>
      {matrixStore.board.map((row, index) => {
        return (
          <div key={index}>
            {row.map((cellValue, index) => {
              return (
                <Cell key={index}>{cellValue === 0 ? null : cellValue}</Cell>
              );
            })}
          </div>
        );
      })}
    </Container>
  );
});

export default Matrix;

import { useEffect } from "react";
import { observer } from "mobx-react-lite";
import matrixStore from "../stores/MatrixStore";

const Matrix = observer(() => {
  useEffect(() => {
    matrixStore.init();
    console.log(matrixStore.board);
  }, []);

  return <div>This is Matrix!</div>;
});

export default Matrix;

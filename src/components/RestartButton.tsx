import { styled } from "styled-components";
import matrixStore from "../stores/MatrixStore";

const Button = styled.a`
  background: #8f7a66;
  flex-shrink: 0;
  border-radius: 3px;
  padding: 0 20px;
  color: #f9f6f2;
  height: 40px;
  font-size: 18px;
  line-height: 42px;
  font-weight: bold;
  text-decoration: none;
  cursor: pointer;
  text-align: center;
  width: 109px;
`;

type RestartButtonProps = {
  className?: string;
};
const RestartButton = (props: RestartButtonProps) => {
  const onClick = () => {
    matrixStore.init();
  };
  return (
    <Button className={props.className} onClick={onClick}>
      New Game
    </Button>
  );
};

export default RestartButton;

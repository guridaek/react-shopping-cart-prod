import { styled } from "styled-components";

interface Props {
  width: string;
  height: string;
  background: string;
}

const Skeleton = (props: Props) => {
  return <Wrapper {...props}></Wrapper>;
};

const Wrapper = styled.div<Props>`
  background: ${(props) => props.background};
  width: ${(props) => props.width};
  height: ${(props) => props.height};
`;

export default Skeleton;

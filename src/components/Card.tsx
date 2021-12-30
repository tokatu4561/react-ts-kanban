import React from "react";
import styled from "styled-components";
import * as color from "../color";
import { CheckIcon as _CheckIcon, TrashIcon } from "./Icon";

type Props = {
  children?: string;
};

export function Card(props: Props) {
  const { children } = props;
  return (
    <Container>
      <_CheckIcon></_CheckIcon>
      <Text>{children}</Text>
      <DeleteButton />
    </Container>
  );
}

const Container = styled.div`
  position: relative;
  border: solid 1px ${color.Silver};
  border-radius: 6px;
  box-shadow: 0 1px 3px hsla(0, 0%, 7%, 0.1);
  padding: 8px 32px;
  background-color: ${color.White};
  cursor: move;
`;

const Text = styled.span`
  color: ${color.Black};
  font-size: 14px;
  line-height: 1.7;
  white-space: pre-wrap;
`;

const DeleteButton = styled.button.attrs({
  type: "button",
  children: <TrashIcon />,
})`
  position: absolute;
  top: 12px;
  right: 8px;
  font-size: 14px;
  color: ${color.Gray};

  :hover {
    color: ${color.Red};
  }
`;

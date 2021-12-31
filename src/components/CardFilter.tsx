import React, { useState } from "react";
import styled from "styled-components";
import * as color from "../color";
import { SearchIcon as _SearchIcon } from "./Icon";

type Props = {
  value: string;
  onChange: (value: string) => void;
};

export function CardFilter(props: Props) {
  const { value, onChange } = props;
  const onChangeInputText = (e: any) => {
    onChange(e.currentTarget.value);
  };

  return (
    <Container>
      <SearchIcon />
      <Input
        value={value}
        onChange={onChangeInputText}
        placeholder="Filter cards"
      />
    </Container>
  );
}

type DropProps = {
  disabled: boolean;
  onDrop: () => void;
  children: React.ReactChild;
  className: string;
  style: React.CSSProperties;
};

const Container = styled.label`
  display: flex;
  align-items: center;
  min-width: 300px;
  border: solid 1px ${color.Silver};
  border-radius: 3px;
`;

const SearchIcon = styled(_SearchIcon)`
  margin: 0 4px 0 8px;
  font-size: 16px;
  background-color: ${color.White};
`;

const Input = styled.input.attrs({ type: "search" })`
  width: 100%;
  padding: 6px 8px 6px 0;
  color: ${color.White};
  background-color: ${color.Navy};
  font-size: 14px;

  :focus {
    outline: none;
  }
`;

import React from "react";
import styled from "styled-components";
import * as color from "../color";
import { CardFilter } from "./CardFilter";

type Props = {
  filterValue: string;
  onFilterChange: any;
  className?: string;
};

export function Header(props: Props) {
  const { filterValue, className, onFilterChange } = props;
  return (
    <Container className={className}>
      <Logo>カンバン　Practice</Logo>

      <CardFilter value={filterValue} onChange={onFilterChange} />
    </Container>
  );
}

const Container = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 8px 16px;
  background-color: ${color.Navy};
`;

const Logo = styled.div`
  color: ${color.Silver};
  font-size: 16px;
  font-weight: bold;
`;

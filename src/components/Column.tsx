import React, { useState } from "react";
import styled from "styled-components";
import * as color from "../color";
import { Card } from "./Card";
import { PlusIcon } from "./Icon";
import { InputForm } from "./InputForm";

type Props = {
  title?: string;
  filterValue?: string;
  cards: {
    id: string;
    text?: string;
  }[];
};

export function Column(props: Props) {
  const { title, cards: NonFiltercards, filterValue } = props;
  const totalCount = NonFiltercards.length;

  const filterVal = filterValue?.trim();
  //   検索する文字を１文字づつの配列にする
  const keywords = filterVal?.toLowerCase().split(/\s+/g) ?? [];
  const cards = NonFiltercards.filter(({ text }) =>
    keywords?.every((w) => text?.toLowerCase().includes(w))
  );

  const [text, setText] = useState("");
  const [inputMode, setInputMode] = useState(false);
  const toggleInput = () => setInputMode((prev) => !prev);
  const confirmInput = () => setInputMode(false);
  const cancelInput = () => setInputMode(false);

  return (
    <Container>
      <Header>
        <CountBadge>{totalCount}</CountBadge>
        <ColumnName>{title}</ColumnName>

        <AddButton onClick={toggleInput} />
      </Header>
      {inputMode && (
        <InputForm
          value={text}
          onChange={setText}
          onConfirm={confirmInput}
          onCancel={cancelInput}
        />
      )}

      {filterValue && <ResultCount>{cards.length} results</ResultCount>}

      <VerticalScroll>
        {cards.map(({ id, text }) => (
          <Card key={id}>{text}</Card>
        ))}
      </VerticalScroll>
    </Container>
  );
}

const Container = styled.div`
  display: flex;
  flex-flow: column;
  width: 355px;
  min-height: 100%;
  border: solid 1px ${color.Silver};
  border-radius: 6px;
  background-color: ${color.LightSilver};

  > :not(:last-child) {
    flex-shrink: 0;
  }
`;

const ResultCount = styled.div`
  color: ${color.Black};
  font-size: 12px;
  text-align: center;
`;

const Header = styled.div`
  display: flex;
  justify-content: flex-start;
  align-items: center;
  padding: 8px;
`;

const CountBadge = styled.div`
  margin-right: 8px;
  border-radius: 20px;
  padding: 2px 6px;
  color: ${color.Black};
  background-color: ${color.Silver};
  font-size: 12px;
  line-height: 1;
`;

const ColumnName = styled.div`
  color: ${color.Black};
  font-size: 14px;
  font-weight: bold;
`;

const AddButton = styled.button.attrs({
  type: "button",
  children: <PlusIcon />,
})`
  margin-left: auto;
  color: ${color.Black};

  :hover {
    color: ${color.Blue};
  }
`;

const VerticalScroll = styled.div`
  height: 100%;
  padding: 8px;
  overflow-y: auto;
  flex: 1 1 auto;

  > :not(:first-child) {
    margin-top: 8px;
  }
`;

import styled from "styled-components";
import React, { useRef, useState } from "react";
import { Column } from "./components/Column";
import { Header as _Header } from "./components/Header";

function App() {
  const [filterValue, setFilterValue] = useState("");
  const [columns, setColumns] = useState([
    {
      id: "A",
      title: "TODO",
      cards: [
        { id: "a", text: "朝食をとる🍞" },
        { id: "b", text: "SNSをチェックする🐦" },
        { id: "c", text: "布団に入る (:3[___]" },
      ],
    },
    {
      id: "B",
      title: "Doing",
      cards: [
        { id: "d", text: "顔を洗う👐" },
        { id: "e", text: "歯を磨く🦷" },
      ],
    },
    {
      id: "C",
      title: "Waiting",
      cards: [],
    },
    {
      id: "D",
      title: "Done",
      cards: [{ id: "f", text: "布団から出る (:3っ)っ -=三[＿＿]" }],
    },
  ]);

  const [draggingCardID, setDraggingCardID] =
    useState<string | undefined>(undefined);

  const dropCardTo = (toID: string) => {
    const fromID = draggingCardID;
    if (!fromID) return;

    setDraggingCardID(undefined);

    if (fromID === toID) return;

    setColumns((columns) => {
      //移動するカードを取得する
      const card = columns
        .flatMap((col) => col.cards)
        .find((c) => c.id === fromID);
      console.log(card);

      if (!card) {
        return columns;
      }

      // 新しい列を作成して返す
      return columns.map((column) => {
        // 現在のcolumnをコピーする
        let newColumn = column;

        if (newColumn.cards.some((c) => c.id === fromID)) {
          newColumn = {
            ...newColumn,
            cards: newColumn.cards.filter((c) => c.id !== fromID),
          };
        }

        // 列の末尾に移動
        if (newColumn.id === toID) {
          newColumn = {
            ...newColumn,
            cards: [...newColumn.cards, card],
          };
        }
        // 列の末尾以外に移動
        else if (newColumn.cards.some((c) => c.id === toID)) {
          newColumn = {
            ...newColumn,
            cards: newColumn.cards.flatMap((c) =>
              c.id === toID ? [card, c] : [c]
            ),
          };
        }

        return newColumn;
      });
    });
  };

  return (
    <Container>
      <Header
        filterValue={filterValue}
        onFilterChange={setFilterValue}
      ></Header>
      <MainArea>
        <HorizontalScroll>
          {columns.map(({ id: columnID, title, cards }) => {
            return (
              <Column
                key={columnID}
                title={title}
                filterValue={filterValue}
                cards={cards}
                onCardDragStart={(cardID) => setDraggingCardID(cardID)}
                onCardDrop={(entered) => dropCardTo(entered ?? columnID)}
              ></Column>
            );
          })}
        </HorizontalScroll>
      </MainArea>
    </Container>
  );
}

const Container = styled.div`
  display: flex;
  flex-direction: column;
  flex-wrap: wrap;
  height: 100%;
`;

const MainArea = styled.div`
  height: 100vh;
  padding: 16px 0;
  overflow-y: auto;
`;

const HorizontalScroll = styled.div`
  display: flex;
  width: 100%;
  height: 100%;
  overflow-x: auto;

  > * {
    margin-left: 16px;
    flex-shrink: 0;
  }

  ::after {
    display: block;
    flex: 0 0 16px;
    content: "";
  }
`;

const Header = styled(_Header)`
  flex-shrink: 0;
`;

export default App;

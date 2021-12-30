import styled from "styled-components";
import * as color from "./color";

function App() {
  return (
    <Container>
      <Header>
        <div>カンバン</div>
        <CardFilter placeholder="Filter cards" />
      </Header>
      <MainArea>
        <HorizontalScroll>
          <Column>
            <ColumnHeader>TODO</ColumnHeader>

            <Card>朝食をとる🍞</Card>
            <Card>SNSをチェックする🐦</Card>
            <Card>布団に入る (:3[___]</Card>
          </Column>
          <Column>
            <ColumnHeader>Doing</ColumnHeader>

            <Card>顔を洗う👐</Card>
            <Card>歯を磨く🦷</Card>
          </Column>

          <Column>
            <ColumnHeader>Waiting</ColumnHeader>
          </Column>

          <Column>
            <ColumnHeader>Done</ColumnHeader>

            <Card></Card>
          </Column>
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

const Header = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 8px 16px;
  background-color: ${color.Navy};
  flex-shrink: 0;
  color: ${color.Silver};
  font-size: 16px;
  font-weight: bold;
`;

const Logo = styled.div``;

const CardFilter = styled.input`
  min-width: 300px;
  border: solid 1px ${color.Silver};
  border-radius: 3px;
`;

const MainArea = styled.div`
  height: 100%;
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

const Column = styled.div`
  display: flex;
  flex-flow: column;
  width: 355px;
  height: 100%;
  border: solid 1px ${color.Silver};
  border-radius: 6px;
  background-color: ${color.LightSilver};
  padding: 1rem;
`;

const ColumnHeader = styled.div`
  display: flex;
  justify-content: flex-start;
  align-items: center;
`;

const Card = styled.div`
  position: relative;
  border: solid 1px ${color.Silver};
  border-radius: 6px;
  box-shadow: 0 1px 3px hsla(0, 0%, 7%, 0.1);
  padding: 8px 32px;
  background-color: ${color.White};
  cursor: move;
`;

export default App;

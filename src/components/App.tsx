import { FC } from "react";
import "./App.scss";
import Container from "react-bootstrap/Container";
import SeasonRaceWinnerList from "./Race/SeasonRaceWinnerList";

const App: FC = () => {
  return (
    <Container fluid="md">
      <SeasonRaceWinnerList year="2024" />
    </Container>
  );
};

export default App;

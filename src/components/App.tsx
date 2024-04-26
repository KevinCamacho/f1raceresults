import { FC, useState } from "react";
import "./App.scss";
import Container from "react-bootstrap/Container";
import Navbar from "react-bootstrap/Navbar";
import SeasonRaceWinnerList from "./Race/SeasonRaceWinnerList";
import Nav from "react-bootstrap/Nav";
import NavDropdown from "react-bootstrap/NavDropdown";

const App: FC = () => {
  const years: string[] = ["2020", "2021", "2022", "2023", "2024"];
  const [selectedYear, setSelectedYear] = useState<string>(
    years[years.length - 1],
  );

  const onNavItemClick = (eventKey: any, event: Object) => {
    setSelectedYear(eventKey);
  };

  return (
    <>
      <Navbar expand="sm" className="bg-body-tertiary">
        <Container fluid>
          <Navbar.Brand>F1 Race Results</Navbar.Brand>

          <Navbar.Collapse
            id="navbar-dark-example"
            className="d-flex justify-content-end"
          >
            <Nav>
              <NavDropdown
                id="seasonSelectionDropdown"
                title="Season"
                menuVariant="dark"
                onSelect={onNavItemClick}
              >
                {years.map((year: string, index: number) => (
                  <NavDropdown.Item
                    as="button"
                    key={`dropdownYear${index}`}
                    eventKey={year}
                    active={selectedYear === year}
                  >
                    {year}
                  </NavDropdown.Item>
                ))}
              </NavDropdown>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
      <Container fluid="md" className="mt-3">
        <SeasonRaceWinnerList year={selectedYear} />
      </Container>
    </>
  );
};

export default App;

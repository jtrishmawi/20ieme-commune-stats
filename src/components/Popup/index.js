import React, { useEffect, useState } from 'react';
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import { ThemeProvider } from 'styled-components';

import Ballot from './charts/Ballot'

import theme from '../../theme';
import { Container, List, Table, Header } from './styles';

import 'react-tabs/style/react-tabs.css';

const Popup = ({ office, data }) => {
  const [firstRound, setFirstRound] = useState([]);
  const [secondRound, setSecondRound] = useState([]);
  const [casted, setCasted] = useState(0);
  const [white, setWhite] = useState(0);
  const [absentions, setAbsentions] = useState(0);

  useEffect(() => {
    let first = [];
    let second = [];

    data.forEach((result, index) => {
      if (index === 0) {
        setCasted(result.exprimes);
        setWhite(result.votants - result.exprimes);
        setAbsentions(result.inscrits - result.votants);
      }

      if (result.tour === 1) {
        first = [result, ...first];
      } else {
        second = [result, ...second];
      }
    });

    setFirstRound(first.sort((a, b) => b.voix - a.voix));
    setSecondRound(second.sort((a, b) => b.voix - a.voix));
  }, [data]);

  return (
    <ThemeProvider theme={theme}>
      <Container>
        <Header>{office.lib}<small>{office.adresse}</small></Header>
        <Ballot casted={casted} white={white} absentions={absentions} />
        <List>
          <li>Exprimés: {casted}</li>
          <li>Blancs: {white}</li>
          <li>Abstentions: {absentions}</li>
        </List>
        <Tabs>
          <TabList>
            <Tab>1er Tour</Tab>
            <Tab>2ième Tour</Tab>
          </TabList>

          <TabPanel>
            <Table>
              <thead>
                <tr>
                  <th>Tête de liste</th>
                  <th>Parti</th>
                  <th>Nbre de Voix</th>
                </tr>
              </thead>
              <tbody>
                {firstRound.map(r => (
                  <tr key={r.tete_de_liste}>
                    <td>{r.tete_de_liste}</td>
                    <td>{r.code_nuance}</td>
                    <td>{r.voix}</td>
                  </tr>
                ))}
              </tbody>
            </Table>
          </TabPanel>
          <TabPanel>
            <Table>
              <thead>
                <tr>
                  <th>Tête de liste</th>
                  <th>Parti</th>
                  <th>Nbre de Voix</th>
                </tr>
              </thead>
              <tbody>
                {secondRound.map(r => (
                  <tr key={r.tete_de_liste}>
                    <td>{r.tete_de_liste}</td>
                    <td>{r.code_nuance}</td>
                    <td>{r.voix}</td>
                  </tr>
                ))}
              </tbody>
            </Table>
          </TabPanel>
        </Tabs>
      </Container>
    </ThemeProvider>
  );
};

export default Popup;
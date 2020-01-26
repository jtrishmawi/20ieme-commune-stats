import React, { createContext, useContext, useReducer } from 'react';
import { useAsync } from 'react-use';

import { initialState, LOAD } from './constants';
import { reducer } from './reducer';


const fetchSectors = async () => {
  const response = await fetch(`${process.env.PUBLIC_URL}/data/secteurs-des-bureaux-de-vote.geojson`);
  const sectors = await response.json();

  const filteredSectors = sectors.features.filter(feature => feature.properties.arrondissement === 20);

  return { ...sectors, features: filteredSectors };
}

const fetchOffices = async () => {
  const response = await fetch(`${process.env.PUBLIC_URL}/data/bureaux-de-votes.geojson`);
  const offices = await response.json();

  const filteredOffices = offices.features.filter(feature => feature.properties.cp === '75020');

  return { ...offices, features: filteredOffices };
}

const fetchResults = async () => {
  const response = await fetch(`${process.env.PUBLIC_URL}/data/resultats.json`);
  return await response.json();
}

const buildTableData = ({ features: offices }, results) => results.map(result => {
  const office = offices.find(office => Number(office.properties.num_bv) === result.num_bv);
  const adresse = `${office.properties.lib} - ${office.properties.adresse}`;
  const tour = result.tour === 1 ? '1er Tour' : '2ième Tour';

  return { ...result, adresse, tour }
})

const StateContext = createContext();

export const withState = WrappedComponent => {
  const StateProvider = props => {
    const [state, dispatch] = useReducer(reducer, initialState);

    const { loading, error } = useAsync(async () => {
      const [sectors, offices, results] = await Promise.all([
        fetchSectors(),
        fetchOffices(),
        fetchResults(),
      ]);

      const table = buildTableData(offices, results);

      dispatch({
        type: LOAD,
        data: { sectors, offices, results, table }
      });
    }, [])

    return (
      <StateContext.Provider value={[state, dispatch]}>
        <WrappedComponent {...{ props, loading, error }} />
      </StateContext.Provider>
    );
  };

  return StateProvider;
};

export const useData = () => useContext(StateContext);
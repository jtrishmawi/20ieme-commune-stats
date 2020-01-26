import React, { memo, useState, useMemo, useEffect } from 'react';
import { Container, Form, FormGroup, Input, Option, InputGroup, InputGroupButton } from '@bootstrap-styled/v4';
import DataTable from 'react-data-table-component';
import { useDebounce } from 'react-use';
import intersection from 'lodash/intersection'

import { useData } from '../state';

const columns = [
  {
    name: 'Tête de liste',
    selector: 'tete_de_liste',
    sortable: true,
    searchable: true,
    grow: 2
  },
  {
    name: 'Parti',
    selector: 'code_nuance',
    searchable: true,
    sortable: true,
  },
  {
    name: 'Tour',
    selector: 'tour',
    searchable: true,
    sortable: true,
  },
  {
    name: 'Voix',
    selector: 'voix',
    sortable: true,
  },
  {
    name: 'Inscrits',
    selector: 'inscrits',
    hide: 'md',
  },
  {
    name: 'Votants',
    selector: 'votants',
    hide: 'md',
  },
  {
    name: 'Exprimés',
    selector: 'exprimes',
    hide: 'md',
  },
  {
    name: 'Adresse',
    selector: 'adresse',
    searchable: true,
    sortable: true,
    grow: 3,
    hide: 'sm',
  },
];

const Table = () => {
  const [{ table }] = useData();
  const [filter, setFilter] = useState({});
  const [filteredItem, setFilteredItem] = useState(table);

  const searchableColumns = useMemo(() => columns.filter(column => column.searchable).map(({ selector, name }) => ({ selector, name })), []);

  useEffect(() => {
    setFilter(filter => searchableColumns.reduce((acc, { selector }) => acc = { ...acc, ...{ [selector]: '' } }, filter))
  }, [searchableColumns])

  const Filter = useMemo(
    () => (
      <Container>
        <Form inline className="justify-content-between">
          {searchableColumns.map(({ selector, name }) => {
            const options = filteredItem.reduce((acc, row) => acc.add(row[selector]), new Set())
            return (
              <FormGroup key={selector} className="mr-2">
                <InputGroup size="sm">
                  <Input type="select" name={selector} value={filter[selector]} onChange={e => setFilter(filter => ({ ...filter, ...{ [selector]: e.target.value } }))}>
                    <Option value="">{name}</Option>
                    {[...options].map(option => <Option key={option} value={option}>{option}</Option>)}
                  </Input>
                  <InputGroupButton color="danger" groupClassName="input-group-prepend" onClick={e => setFilter(filter => ({ ...filter, ...{ [selector]: '' } }))}>&#10007;</InputGroupButton>
                </InputGroup>
              </FormGroup>
            )
          }
          )}
        </Form>
      </Container>
    )
    , [filter, searchableColumns, filteredItem]);

  useDebounce(
    () => {
      if (Object.values(filter).join('') === '') {
        setFilteredItem(table)
      } else {
        const result = intersection(...Object.entries(filter).filter(([, value]) => value !== '').map(([name, value]) => table.filter(row => row[name] === value)))
        setFilteredItem(result)
      }
    },
    350,
    [filter]
  );

  return (
    <DataTable
      title="Resultats par bureau de vote"
      columns={columns}
      data={filteredItem}
      dense
      pagination
      subHeader
      subHeaderComponent={Filter}
    />
  );
};

export default memo(Table);
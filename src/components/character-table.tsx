import React, { useState, Fragment } from 'react';
import Select from './react-select';
import styles from './css/character-table.module.css';
import { HeightByUnits, Character } from '../types';
import { OptionTypeBase } from 'react-select';

const filterOptions = [
  {
    label: 'Select Gender(None)',
    value: 'none'
  },
  {
    label: 'Male',
    value: 'male'
  },
  {
    label: 'Female',
    value: 'female'
  },
  {
    label: 'N/A',
    value: 'n/a'
  },
  {
    label: 'Hermaphrodite',
    value: 'hermaphrodite'
  }
];

const defaultFilter = filterOptions[0];

export interface CharacterTableProps {
  characters: Array<Character>,
  charactersTotalHeight: HeightByUnits,
  totalCharacters: number
};

function CharacterTable(props: CharacterTableProps) {
  const [sortField, setSortField] = useState({ name: 'name', intCheck: false });
  const [orderType, setOrderType] = useState('asc');
  const [genderFilter, setGenderFilter] = useState(defaultFilter.value);

  const toggleSortOrder = () => {
    setOrderType(orderType === 'asc' ? 'desc' : 'asc');
  };

  const {
    characters,
    totalCharacters,
    charactersTotalHeight: {
      cm,
      ft,
      inch
    }
  } = props;

  const compare = (current: any, next: any) => {
    const { name, intCheck } = sortField;
    const orderTypeIndex = orderType === 'asc' ? 1 : -1;
    let currentField = current[name];
    let nextField = next[name];

    if (intCheck) {
      currentField = Number.isNaN(Number(currentField)) ? 0 : Number(currentField);
      nextField = Number.isNaN(Number(nextField)) ? 0 : Number(nextField);

      return orderTypeIndex * (currentField - nextField);
    }

    return orderTypeIndex * (currentField > nextField ? 1 : -1);
  };

  const filter = (character: any) => {
    return genderFilter === 'none' ? true : character.gender === genderFilter;
  };

  const currentSortClassName = (field: string) => {
    return sortField.name === field ? `${styles.currentSort} ${styles[orderType]}` : '';
  };

  const finalCharacters = characters.sort(compare).filter(filter);

  return (
    <Fragment>
      <div className={styles.filterContainer}>
        <Select
          options={filterOptions}
          onChange={(gender: OptionTypeBase) => setGenderFilter(gender.value)}
          value={defaultFilter}
        />
      </div>
      <table className={styles.table}>
        <thead>
          <tr>
            <th>#</th>
            <th
              onClick={() => setSortField({ name: 'name', intCheck: false })}
              onDoubleClick={toggleSortOrder}
              className={currentSortClassName('name')}
            >
              Name
            </th>
            <th
              onClick={() => setSortField({ name: 'gender', intCheck: false })}
              onDoubleClick={toggleSortOrder}
              className={currentSortClassName('gender')}
            >
              Gender
            </th>
            <th
              onClick={() => setSortField({ name: 'height', intCheck: true })}
              onDoubleClick={toggleSortOrder}
              className={currentSortClassName('height')}
            >
              Height(cm)
            </th>
          </tr>
        </thead>
        <tbody>
          {finalCharacters.map((character: any, index: number) => {
            return (
              <tr key={character.url}>
                <td>{index + 1}</td>
                <td>{character.name}</td>
                <td>{character.gender}</td>
                <td>{character.height}</td>
              </tr>
            );
          })}
          <tr>
            <td>Total: {totalCharacters}</td>
            <td>-</td>
            <td>-</td>
            <td>Total: {cm}cm ({ft}ft {inch}in)</td> 
          </tr>
        </tbody>
      </table>
    </Fragment>
  );
}

export default CharacterTable;

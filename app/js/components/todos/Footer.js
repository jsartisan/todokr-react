import React from 'react';
import FilterLink from './FilterLink';
import { FILTERS } from '../../constants/TodosConstants';

export default () => (
  <p>
   { FILTERS.map(filter => <FilterLink filter={filter.key}>{filter.text}</FilterLink>) }
  </p>
);

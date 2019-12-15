import React from 'react';
import Select from './react-select';
import Loading from './loading';
import ErrorMessage from './error-message';
import { OptionTypeBase } from 'react-select';

export interface MovieDropDownProps {
  isLoading: boolean;
  error: boolean;
  options: Array<OptionTypeBase>;
  onChange: any;
};

function MovieDropDown(props: MovieDropDownProps) {
  if (props.isLoading) {
    return <Loading />;
  }

  if (props.error) {
    return <ErrorMessage />;
  }

  return (
    <Select onChange={props.onChange} options={props.options} />  
  );
}

export default MovieDropDown;

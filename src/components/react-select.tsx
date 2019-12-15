import React from 'react';
import Select from 'react-select';

const customTheme = (theme: any) => ({
  ...theme,
  colors: {
  ...theme.colors,
    primary25: '#f7ca1861',
    primary: '#F7CA18',
  },
});

export default (props: any) => {
  return <Select {...props} theme={customTheme} />
}

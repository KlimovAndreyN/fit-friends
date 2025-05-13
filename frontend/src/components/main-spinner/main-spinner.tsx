import { JSX } from 'react';

import BaseBackground from '../base-intro/base-background';

import { LOADING_TEXT, PageTitle } from '../../const';

function MainSpinner(): JSX.Element {
  const props = {
    title: PageTitle.Loading,
    children: <h1>{LOADING_TEXT}</h1>
  };

  return (
    <BaseBackground {...props} />
  );
}

export default MainSpinner;

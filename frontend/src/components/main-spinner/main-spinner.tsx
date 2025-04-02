import BaseBackground from '../base-intro/base-background';

import { PageTitle } from '../../const';

function MainSpinner(): JSX.Element {
  const props = {
    title: PageTitle.Loading,
    children: <h1>Загрузка...</h1>
  };

  return (
    <BaseBackground {...props} />
  );
}

export default MainSpinner;

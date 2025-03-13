import BaseIntro from '../base-intro/base-intro';

import { PageTitle } from '../../const';

function MainSpinner(): JSX.Element {
  const props = {
    title: PageTitle.Loading,
    children: <h1>Загрузка...</h1>
  };

  return (
    <BaseIntro {...props} />
  );
}

export default MainSpinner;

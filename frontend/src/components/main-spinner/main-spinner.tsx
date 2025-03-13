import BaseIntro from '../base-intro/base-intro';

import { PageTitle } from '../../const';

function MainSpinner(): JSX.Element {
  const props = {
    title: PageTitle.Loading,
    children: <p className="intro__text">Загрузка...</p>
  };

  return (
    <BaseIntro {...props} />
  );
}

export default MainSpinner;

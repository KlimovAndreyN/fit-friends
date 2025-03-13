import { Link, useNavigate } from 'react-router-dom';

import BaseIntro from '../../components/base-intro/base-intro';

import { AppRoute, PageTitle } from '../../const';

function Intro(): JSX.Element {
  //! history не работает
  const navigate = useNavigate();

  const handleRegisterButtonClick = () => {
    navigate(AppRoute.SignUp);
  };

  const props = {
    title: PageTitle.Intro,
    children:
      <>
        <button className="btn intro__button" type="button" onClick={handleRegisterButtonClick}>Регистрация</button>
        <p className="intro__text">Есть аккаунт? <Link className="intro__link" to={AppRoute.SignIn}>Вход</Link></p>
      </>
  };

  return (
    <BaseIntro {...props} />
  );
}

export default Intro;

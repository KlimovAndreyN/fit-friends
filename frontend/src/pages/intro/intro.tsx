import { Link, useNavigate } from 'react-router-dom';

import BaseBackground from '../../components/base-intro/base-background';

import { AppRoute, PageTitle } from '../../const';

function Intro(): JSX.Element {
  const navigate = useNavigate();

  const handleRegisterButtonClick = () => {
    navigate(AppRoute.SignUp);
  };

  const props = {
    title: PageTitle.Intro,
    children:
      <div className="intro__buttons">
        <button className="btn intro__button" type="button" onClick={handleRegisterButtonClick}>Регистрация</button>
        <p className="intro__text">Есть аккаунт? <Link className="intro__link" to={AppRoute.SignIn}>Вход</Link></p>
      </div>
  };

  return (
    <BaseBackground {...props} />
  );
}

export default Intro;

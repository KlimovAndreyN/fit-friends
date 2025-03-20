import { useNavigate } from 'react-router-dom';

import PopupForm from '../../components/popup-form/popup-form';
import { AppRoute, PageTitle } from '../../const';

function NotFound(): JSX.Element {
  const navigate = useNavigate();

  const handlePopupFormSubmit = () => {
    navigate(AppRoute.Root);
  };

  const popupFormProps = {
    title: PageTitle.NotFound,
    caption: 'Страница не найдена!',
    extraClass: '',
    onSubmit: handlePopupFormSubmit
  };

  return (
    <PopupForm {...popupFormProps} >
      <div>
        <h1>404 - Страница не найдена!</h1>
        <h2>Возможно, страница была удалена или</h2>
        <h2>её вовсе не существовало.</h2>
        <br />
        <button className='btn' type="submit">На главную</button>
        { }
      </div>
    </PopupForm>
  );
}

export default NotFound;

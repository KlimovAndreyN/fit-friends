import { useNavigate } from 'react-router-dom';

type BackButtonProps = {
  className: string;
}

function BackButton({ className }: BackButtonProps): JSX.Element {
  const navigate = useNavigate();

  const handleBackButtonClick = () => {
    navigate(-1);
  };

  return (
    <button
      className={`btn-flat btn-flat--underlined ${className}__back`}
      type="button"
      onClick={handleBackButtonClick}
    >
      <svg width="14" height="10" aria-hidden="true">
        <use xlinkHref="#arrow-left"></use>
      </svg><span>Назад</span>
    </button>
  );
}

export default BackButton;

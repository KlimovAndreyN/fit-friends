import { DefaultUser, USER_GENDERS } from '../../const';

type SignUpUserGengersProps = {
  name: string;
}

function SignUpUserGengers({ name }: SignUpUserGengersProps): JSX.Element {
  //! перевести на компонет CustomToggleRadio
  //! возможно совсем не нужно, передалть на всю форму на управляемые?

  return (
    <div className="sign-up__radio">
      <span className="sign-up__label">Пол</span>
      <div className="custom-toggle-radio custom-toggle-radio--big">
        {
          USER_GENDERS.map(
            ({ value, title }) => {
              const checked = value === DefaultUser.GENDER;

              return (
                <div className="custom-toggle-radio__block" key={value}>
                  <label>
                    <input type="radio" name={name} value={value} defaultChecked={checked} />
                    <span className="custom-toggle-radio__icon" />
                    <span className="custom-toggle-radio__label">{title}</span>
                  </label>
                </div>
              );
            }
          )
        }
      </div>
    </div>
  );
}

export default SignUpUserGengers;

import { DefaultUser, SORTED_USER_GENDERS, UserGenderOption } from '../../const';

type SignUpUserGengersProps = {
  name: string;
}

function SignUpUserGengers({ name }: SignUpUserGengersProps): JSX.Element {
  return (
    <div className="sign-up__radio">
      <span className="sign-up__label">Пол</span>
      <div className="custom-toggle-radio custom-toggle-radio--big">
        {
          SORTED_USER_GENDERS.map(
            (userGender) => {
              const { title } = UserGenderOption[userGender];
              const checked = userGender === DefaultUser.GENDER;

              return (
                <div className="custom-toggle-radio__block" key={userGender}>
                  <label>
                    <input type="radio" name={name} value={userGender} defaultChecked={checked} />
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

import { isSportsmanRole, Role } from '@backend/shared/core';

type SignUpUserRolesProps = {
  name: string;
  value: Role;
  onChange: (newValue: Role) => void;
}

function SignUpUserRoles({ name, value, onChange }: SignUpUserRolesProps): JSX.Element {
  return (
    <div className="sign-up__role">
      <h2 className="sign-up__legend">Выберите роль</h2>
      <div className="role-selector sign-up__role-selector">
        {
          [Role.Coach, Role.Sportsman].map(
            (role) => {
              const isSportsman = isSportsmanRole(role);

              const handleRationInputChange = () => {
                onChange(role);
              };

              return (
                <div className="role-btn" key={role}>
                  <label>
                    <input
                      className="visually-hidden"
                      type="radio"
                      name={name}
                      checked={role === value}
                      onChange={handleRationInputChange}
                    />
                    <span className="role-btn__icon">
                      <svg width="12" height="13" aria-hidden="true">
                        <use xlinkHref={isSportsman ? '#icon-weight' : '#icon-cup'} />
                      </svg>
                    </span>
                    <span className="role-btn__btn">{isSportsman ? 'Я хочу тренироваться' : 'Я хочу тренировать'}</span>
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

export default SignUpUserRoles;

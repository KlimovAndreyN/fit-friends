import { Role } from '@backend/shared/core';

import { DefaultUser } from '../../const';

type SignUpUserRolesProps = {
  name: string;
}

function SignUpUserRoles({ name }: SignUpUserRolesProps): JSX.Element {
  //! значение по умолчанию принимать пропсами
  //! переделать на управляемый

  return (
    /*
    //! visually-hidden - спрятал выбор роли, по умолчанию был coach
    <div className="sign-up__role">
    <div className="sign-up__role visually-hidden">
    */
    <div className="sign-up__role visually-hidden">
      <h2 className="sign-up__legend">Выберите роль</h2>
      <div className="role-selector sign-up__role-selector">
        {
          [Role.Coach, Role.Sportsman].map(
            (userRole) => {
              const title = (userRole === Role.Sportsman) ? 'Я хочу тренироваться' : 'Я хочу тренировать';
              const svgIcon = (userRole === Role.Sportsman) ? '#icon-weight' : '#icon-cup';
              const checked = userRole === DefaultUser.ROLE;

              return (
                <div className="role-btn" key={userRole}>
                  <label>
                    <input className="visually-hidden" type="radio" name={name} value={userRole} defaultChecked={checked} />
                    <span className="role-btn__icon">
                      <svg width="12" height="13" aria-hidden="true">
                        <use xlinkHref={svgIcon} />
                      </svg>
                    </span>
                    <span className="role-btn__btn">{title}</span>
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

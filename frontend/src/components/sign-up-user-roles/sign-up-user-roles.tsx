import { DefaultUser, SORTED_USER_ROLES, UserRoleOption } from '../../const';

type SignUpUserRolesProps = {
  name: string;
}

function SignUpUserRoles({ name }: SignUpUserRolesProps): JSX.Element {

  return (
    /*
    //! visually-hidden - спратал выбор роли, по умолчанию был coach
    <div className="sign-up__role">
    <div className="sign-up__role visually-hidden">
    */
    <div className="sign-up__role visually-hidden">
      <h2 className="sign-up__legend">Выберите роль</h2>
      <div className="role-selector sign-up__role-selector">
        {
          SORTED_USER_ROLES.map(
            (userRole) => {
              const { value, title, svgIcon } = UserRoleOption[userRole];
              const checked = userRole === DefaultUser.ROLE;

              return (
                <div className="role-btn" key={value}>
                  <label>
                    <input className="visually-hidden" type="radio" name={name} value={value} defaultChecked={checked} />
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
    </div >
  );
}

export default SignUpUserRoles;

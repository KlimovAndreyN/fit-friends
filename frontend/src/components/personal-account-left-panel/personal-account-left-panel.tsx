import { FormEvent, Fragment, useState } from 'react';

import AvatarUpload from '../../components/avatar-upload/avatar-upload';
import PersonalAccountBlock from '../../components/personal-account-block/personal-account-block';
import CustomInput from '../../components/custom-input/custom-input';
import CustomSelect from '../../components/custom-select/custom-select';
import SpecializationsCheckbox from '../../components/specializations-checkbox/specializations-checkbox';

import { UserRole } from '@backend/shared';

import { useAppSelector } from '../../hooks';
import { getUserInfo, getUserRole } from '../../store/user-process/selectors';
import { LOCATIONS, USER_GENDERS, USER_LEVELS } from '../../const';

function PersonalAccountLeftPanel(): JSX.Element {
  const [isEditing, setIsEditing] = useState(false);
  const userRole = useAppSelector(getUserRole);
  const userInfo = useAppSelector(getUserInfo);
  const { name, avatarPath, about, specializations, metroStationName, gender, level } = userInfo;

  const handleButtonClick = (event: FormEvent<HTMLButtonElement>) => {
    event.preventDefault();

    setIsEditing(true);
  };

  const handleFormSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const form = event.currentTarget;
    const formData = new FormData(form);

    //! отладка
    // eslint-disable-next-line no-console
    console.log(formData);

    /*
    const level = (formData.get(FormFieldName.Level)?.toString() || '') as UserLevel;
    const dto: ICreateQuestionnaireDto = {
      userRole,
      caloriesWaste
    };

    dispatch(createQuestionnaire(dto));
    */

    setIsEditing(false);
  };

  //! отладка
  // eslint-disable-next-line no-console
  console.log('PersonalAccountLeftPanel', 'userRole,', userRole, 'userInfo', userInfo);

  const mainClassName = `user-info${(isEditing) ? '-edit' : ''}`;
  const buttonCaption = (isEditing) ? 'Сохранить' : 'Редактировать';
  const isSpotsmanRole = (userRole === UserRole.Sportsman);
  const readyForTrainingCaption = (isSpotsmanRole) ? 'Готов к тренировке' : 'Готов тренировать';

  return (
    <section className={mainClassName}>
      <div className={`${mainClassName}__header`}>
        {/* //! нужен будет обработчик при изменнии файла в режиме редактирования */}
        <AvatarUpload name='user-photo-1' path={avatarPath} forPersonalAccount isShowButtons={isEditing} readonly={!isEditing} />
      </div>
      {/* //! нужен будет обработчик при сохранении формы, если редактирование */}
      <form className={`${mainClassName}__form`} method="post" onSubmit={(isEditing) ? handleFormSubmit : undefined}>
        {/* //! нужен будет обработчик при нажатии на кнопку, если просмотр */}
        <button
          className={`btn-flat btn-flat--underlined ${mainClassName}__${(isEditing) ? 'save' : 'edit'}-button`}
          type={(isEditing) ? 'submit' : 'button'}
          aria-label={buttonCaption}
          onClick={(isEditing) ? undefined : handleButtonClick}
        >
          <svg width="12" height="12" aria-hidden="true">
            <use xlinkHref="#icon-edit"></use>
          </svg>
          <span>{buttonCaption}</span>
        </button>
        <PersonalAccountBlock mainClassNamePrefix={mainClassName} title='Обо мне' >
          <Fragment>
            <CustomInput
              type='text'
              name='name'
              label='Имя'
              value={name}
              divExtraClassName={`${mainClassName}__input`}
              readonly={!isEditing}
            />
            <CustomInput
              type='textarea'
              name='description'
              label='Описание'
              value={about}
              divExtraClassName={`${mainClassName}__textarea`}
              readonly={!isEditing}
            />
          </Fragment>
        </PersonalAccountBlock>
        <PersonalAccountBlock mainClassNamePrefix={mainClassName} extraClassNamePrefix='status' title='Статус' >
          <div className={`custom-toggle custom-toggle--switch ${mainClassName}__toggle`}>
            <label>
              <input type="checkbox" name="ready-for-training" defaultChecked />
              <span className="custom-toggle__icon">
                <svg width="9" height="6" aria-hidden="true">
                  <use xlinkHref="#arrow-check"></use>
                </svg>
              </span>
              <span className="custom-toggle__label">{readyForTrainingCaption}</span>
            </label>
          </div>
        </PersonalAccountBlock>
        <PersonalAccountBlock mainClassNamePrefix={mainClassName} extraClassNamePrefix='specialization' title='Специализация' >
          <SpecializationsCheckbox
            name='specialization'
            values={specializations}
            divExtraClassName={`${mainClassName}__specialization`}
            readonly={!isEditing}
          />
        </PersonalAccountBlock>
        <CustomSelect //! в макете к названию станции добавлено "ст. м. ", добавил titlePrefix
          name='location'
          caption='Локация'
          value={metroStationName}
          titlePrefix='ст. м. '
          options={LOCATIONS}
          extraClassName={`${mainClassName}__select`}
          readonly={!isEditing}
        />
        <CustomSelect
          name='sex'
          caption='Пол'
          value={gender}
          options={USER_GENDERS}
          extraClassName={`${mainClassName}__select`}
          readonly={!isEditing}
        />
        <CustomSelect
          name='level'
          caption='Уровень'
          value={level}
          options={USER_LEVELS}
          extraClassName={`${mainClassName}__select`}
          readonly={!isEditing}
        />
      </form>
    </section>
  );
}

export default PersonalAccountLeftPanel;

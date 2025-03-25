import { FormEvent, Fragment, useState } from 'react';

import AvatarUpload from '../../components/avatar-upload/avatar-upload';
import PersonalAccountBlock from '../../components/personal-account-block/personal-account-block';
import PersonalAccountReadyCheckbox from '../personal-account-ready-checkbox/personal-account-ready-checkbox';
import CustomInput from '../../components/custom-input/custom-input';
import CustomSelect from '../../components/custom-select/custom-select';
import SpecializationsCheckbox from '../../components/specializations-checkbox/specializations-checkbox';

import { IUserInfoRdo } from '@backend/shared';

import { LOCATIONS, USER_GENDERS, USER_LEVELS } from '../../const';

type PersonalAccountLeftPanelProps = {
  userInfo: IUserInfoRdo;
  isSpotsmanRole: boolean;
}

function PersonalAccountLeftPanel({ userInfo, isSpotsmanRole }: PersonalAccountLeftPanelProps): JSX.Element {
  const [isEditing, setIsEditing] = useState(false);

  const { user, questionnaire } = userInfo;
  const { name, avatarPath, about, metroStationName, gender } = user;
  const { specializations, level } = questionnaire;

  const handleButtonClick = (event: FormEvent<HTMLButtonElement>) => {
    event.preventDefault();

    setIsEditing(true);
  };

  const handleFormSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    //! нужен признак очистки аватара и сам файл и кнопки для его обработки
    //! или через стейт
    //! т.е. обработчик при изменнии файла в режиме редактирования

    //! сбор и отправка данных, перечисление названиями полей
    //! блокировка отправки кнопок и всей формы пока отправляются данные

    const form = event.currentTarget;
    const formData = new FormData(form);

    //! отладка
    const entries = formData.entries();
    for (const entry of entries) {
      const [key, value] = entry;
      // eslint-disable-next-line
      console.log(key, value);
    }
    //

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

  const mainClassName = `user-info${(isEditing) ? '-edit' : ''}`;
  const buttonCaption = (isEditing) ? 'Сохранить' : 'Редактировать';

  return (
    <section className={mainClassName} >
      <div className={`${mainClassName}__header`}>
        <AvatarUpload name='user-photo-1' path={avatarPath} forPersonalAccount isShowButtons={isEditing} readonly={!isEditing} />
      </div>
      <form className={`${mainClassName}__form`} method="post" onSubmit={(isEditing) ? handleFormSubmit : undefined}>
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
          <PersonalAccountReadyCheckbox
            name='ready-for-training'
            mainClassName={mainClassName}
            isSpotsmanRole={isSpotsmanRole}
          />
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

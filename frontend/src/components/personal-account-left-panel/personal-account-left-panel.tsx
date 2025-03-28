import { FormEvent, Fragment, useEffect, useState } from 'react';

import AvatarUpload from '../../components/avatar-upload/avatar-upload';
import PersonalAccountBlock from '../../components/personal-account-block/personal-account-block';
import PersonalAccountReadyCheckbox from '../personal-account-ready-checkbox/personal-account-ready-checkbox';
import CustomInput from '../../components/custom-input/custom-input';
import CustomSelect from '../../components/custom-select/custom-select';
import SpecializationsCheckbox from '../../components/specializations-checkbox/specializations-checkbox';

import { IUpdateUserInfoDto, IUserInfoRdo, MetroStationName, Specialization, UserGender, UserLevel } from '@backend/shared';

import { useAppDispatch, useAppSelector } from '../../hooks';
import { updateUserInfo } from '../../store/user-info-action';
import { LOCATIONS, USER_GENDERS, USER_LEVELS } from '../../const';
import { getIsUpdateUserInfoError, getIsUpdateUserInfoExecuting } from '../../store/user-info-process/selectors';

enum FormFieldName {
  Avatar = 'user-photo-1',
  Name = 'name',
  About = 'description',
  ReadyForTraining = 'ready-for-training',
  Spec = 'specialization',
  Location = 'location',
  Sex = 'sex',
  Level = 'level'
}

type PersonalAccountLeftPanelProps = {
  userInfo: IUserInfoRdo;
  isSpotsmanRole: boolean;
}

function PersonalAccountLeftPanel({ userInfo, isSpotsmanRole }: PersonalAccountLeftPanelProps): JSX.Element {
  //! возможно стоит разделить функционал - вынести форму отдельно
  //! обработка аватарки удалить и заменить
  const dispatch = useAppDispatch();
  const isUpdateUserInfoExecuting = useAppSelector(getIsUpdateUserInfoExecuting);
  const isUpdateUserInfoError = useAppSelector(getIsUpdateUserInfoError);

  const { user, questionnaire } = userInfo;
  const { name, avatarFilePath, about, metroStationName, gender } = user;
  const { specializations, level } = questionnaire;

  const [isEditing, setIsEditing] = useState(false);
  const [avatarFile, setAvatarFile] = useState<File | undefined>();
  const [emptyAvatarFile, setEmptyAvatarFile] = useState(!avatarFilePath);

  useEffect(() => {
    if (!isUpdateUserInfoExecuting && !isUpdateUserInfoError) {
      setIsEditing(false);
    }
  }, [isUpdateUserInfoExecuting, isUpdateUserInfoError]);

  const handleAvatarUploadChange = (_filePath: string, file: File | undefined) => {
    setEmptyAvatarFile(!file);
    setAvatarFile(file);
  };

  const handleButtonClick = (event: FormEvent<HTMLButtonElement>) => {
    event.preventDefault();

    setIsEditing(true);
  };

  const handleFormSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const form = event.currentTarget;
    const formData = new FormData(form);

    const dto: IUpdateUserInfoDto = {
      avatarFile,
      emptyAvatarFile,
      name: formData.get(FormFieldName.Name)?.toString() || '',
      about: formData.get(FormFieldName.About)?.toString() || '',
      metroStationName: (formData.get(FormFieldName.Location)?.toString() || '') as MetroStationName, //! одинаковый код - в хелпер
      gender: (formData.get(FormFieldName.Sex)?.toString() || '') as UserGender, //! одинаковый код - в хелпер
      specializations: formData.getAll(FormFieldName.Spec).map((specialization) => (specialization as Specialization)), //! одинаковый код - в хелпер
      level: (formData.get(FormFieldName.Level)?.toString() || '') as UserLevel //! одинаковый код - в хелпер
    };

    dispatch(updateUserInfo(dto));
  };

  const mainClassName = `user-info${(isEditing) ? '-edit' : ''}`;
  const buttonCaption = (isEditing) ? 'Сохранить' : 'Редактировать';

  return (
    <section className={mainClassName} >
      <div className={`${mainClassName}__header`}>
        <AvatarUpload
          name={FormFieldName.Avatar}
          path={avatarFilePath}
          onChange={handleAvatarUploadChange}
          forPersonalAccount
          isShowButtons={isEditing}
          readonly={!isEditing}
        />
      </div>
      <form className={`${mainClassName}__form`} method="post" onSubmit={(isEditing) ? handleFormSubmit : undefined}>
        <button
          className={`btn-flat btn-flat--underlined ${mainClassName}__${(isEditing) ? 'save' : 'edit'}-button`}
          type={(isEditing) ? 'submit' : 'button'}
          aria-label={buttonCaption}
          onClick={(isEditing) ? undefined : handleButtonClick}
          disabled={isUpdateUserInfoExecuting}
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
              name={FormFieldName.Name}
              label='Имя'
              value={name}
              divExtraClassName={`${mainClassName}__input`}
              readonly={!isEditing}
            />
            <CustomInput
              type='textarea'
              name={FormFieldName.About}
              label='Описание'
              value={about}
              divExtraClassName={`${mainClassName}__textarea`}
              readonly={!isEditing}
            />
          </Fragment>
        </PersonalAccountBlock>
        <PersonalAccountBlock mainClassNamePrefix={mainClassName} extraClassNamePrefix='status' title='Статус' >
          <PersonalAccountReadyCheckbox
            name={FormFieldName.ReadyForTraining}
            mainClassName={mainClassName}
            isSpotsmanRole={isSpotsmanRole}
          />
        </PersonalAccountBlock>
        <PersonalAccountBlock mainClassNamePrefix={mainClassName} extraClassNamePrefix='specialization' title='Специализация' >
          <SpecializationsCheckbox
            name={FormFieldName.Spec}
            values={specializations}
            divExtraClassName={`${mainClassName}__specialization`}
            readonly={!isEditing}
          />
        </PersonalAccountBlock>
        <CustomSelect //! в макете к названию станции добавлено "ст. м. ", добавил titlePrefix
          name={FormFieldName.Location}
          caption='Локация'
          value={metroStationName}
          titlePrefix='ст. м. '
          options={LOCATIONS}
          extraClassName={`${mainClassName}__select`}
          readonly={!isEditing}
        />
        <CustomSelect
          name={FormFieldName.Sex}
          caption='Пол'
          value={gender}
          options={USER_GENDERS}
          extraClassName={`${mainClassName}__select`}
          readonly={!isEditing}
        />
        <CustomSelect
          name={FormFieldName.Level}
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

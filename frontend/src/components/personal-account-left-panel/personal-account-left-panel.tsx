import { FormEvent, Fragment, useCallback, useEffect, useState } from 'react';

import AvatarUpload from '../../components/avatar-upload/avatar-upload';
import PersonalAccountBlock from '../../components/personal-account-block/personal-account-block';
import PersonalAccountReadyCheckbox from '../personal-account-ready-checkbox/personal-account-ready-checkbox';
import CustomInput from '../../components/custom-input/custom-input';
import CustomSelect from '../../components/custom-select/custom-select';
import SpecializationsCheckbox from '../../components/specializations-checkbox/specializations-checkbox';

import { IUpdateUserInfoDto, IDetailUserInfoRdo, Location, Specialization, Gender, TrainingLevel } from '@backend/shared/core';

import { isEventEscKey } from '../../utils/common';
import { useAppSelector } from '../../hooks';
import { getIsUpdateUserInfoError, getIsUpdateUserInfoExecuting } from '../../store/user-profile-process/selectors';
import { LOCATIONS, USER_GENDERS, TRAINING_LEVELS } from '../../const';

enum FormFieldName {
  Avatar = 'user-photo-1',
  Name = 'name',
  About = 'description',
  ReadyForTraining = 'ready-for-training',
  Spec = 'specialization',
  UserLocation = 'location',
  Sex = 'sex',
  UserTrainingLevel = 'level'
}

type PersonalAccountLeftPanelProps = {
  userInfo: IDetailUserInfoRdo;
  isSpotsmanRole: boolean;
  onSubmit: (updatedUserInfo: IUpdateUserInfoDto) => void;
}

function PersonalAccountLeftPanel({ userInfo, isSpotsmanRole, onSubmit }: PersonalAccountLeftPanelProps): JSX.Element {
  const isUpdateUserInfoExecuting = useAppSelector(getIsUpdateUserInfoExecuting);
  const isUpdateUserInfoError = useAppSelector(getIsUpdateUserInfoError);

  const { user, questionnaire } = userInfo;
  const { name, avatarFilePath, about, location, gender } = user;
  const { specializations, trainingLevel } = questionnaire;

  const [isEditing, setIsEditing] = useState(false);
  const [avatarFile, setAvatarFile] = useState<File | undefined>();
  const [currentAvatarFilePath, setCurrentAvatarFilePath] = useState(avatarFilePath);

  const handleWindowKeyDown = useCallback((event: KeyboardEvent) => {
    if (isEventEscKey(event)) {
      setCurrentAvatarFilePath(avatarFilePath);
      setAvatarFile(undefined);
      setIsEditing(false);
    }
  }, [avatarFilePath]);

  useEffect(() => {
    if (!isUpdateUserInfoExecuting && !isUpdateUserInfoError) {
      setIsEditing(false);
    }

    window.addEventListener('keydown', handleWindowKeyDown);

    return () => {
      window.removeEventListener('keydown', handleWindowKeyDown);
    };
  }, [isUpdateUserInfoExecuting, isUpdateUserInfoError, handleWindowKeyDown, avatarFilePath]);

  const handleAvatarUploadChange = (filePath: string, file: File | undefined) => {
    setCurrentAvatarFilePath(filePath);
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

    const updatedUserInfo: IUpdateUserInfoDto = {
      avatarFile,
      emptyAvatarFile: !currentAvatarFilePath,
      name: formData.get(FormFieldName.Name)?.toString() || '',
      about: formData.get(FormFieldName.About)?.toString() || '',
      location: (formData.get(FormFieldName.UserLocation)?.toString() || '') as Location, //! одинаковый код - в хелпер
      gender: (formData.get(FormFieldName.Sex)?.toString() || '') as Gender, //! одинаковый код - в хелпер
      specializations: formData.getAll(FormFieldName.Spec).map((specialization) => (specialization as Specialization)), //! одинаковый код - в хелпер
      trainingLevel: (formData.get(FormFieldName.UserTrainingLevel)?.toString() || '') as TrainingLevel //! одинаковый код - в хелпер
    };

    onSubmit(updatedUserInfo);
  };

  const mainClassName = `user-info${(isEditing) ? '-edit' : ''}`;
  const buttonCaption = (isEditing) ? 'Сохранить' : 'Редактировать';

  return (
    <section className={mainClassName} >
      <div className={`${mainClassName}__header`}>
        <AvatarUpload
          name={FormFieldName.Avatar}
          path={currentAvatarFilePath}
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
          name={FormFieldName.UserLocation}
          caption='Локация'
          value={location}
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
          name={FormFieldName.UserTrainingLevel}
          caption='Уровень'
          value={trainingLevel}
          options={TRAINING_LEVELS}
          extraClassName={`${mainClassName}__select`}
          readonly={!isEditing}
        />
      </form>
    </section>
  );
}

export default PersonalAccountLeftPanel;

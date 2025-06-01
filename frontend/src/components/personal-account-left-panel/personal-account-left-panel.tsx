import { JSX, FormEvent, Fragment, useEffect, useState } from 'react';

import AvatarUpload from '../../components/avatar-upload/avatar-upload';
import PersonalAccountBlock from '../../components/personal-account-block/personal-account-block';
import PersonalAccountReadyCheckbox from '../personal-account-ready-checkbox/personal-account-ready-checkbox';
import CustomInput from '../../components/custom-input/custom-input';
import CustomSelect from '../../components/custom-select/custom-select';
import SpecializationsCheckbox from '../../components/specializations-checkbox/specializations-checkbox';

import { IUpdateUserProfileDto, IAccountInfoRdo, Location, Specialization, Gender, TrainingLevel, Role } from '@backend/shared/core';

import { useAppSelector } from '../../hooks';
import useEscapeKey from '../../hooks/use-escape-key';
import { getIsUpdateAccountInfoError, getIsUpdateAccountInfoExecuting } from '../../store/account-process/selectors';
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
  account: IAccountInfoRdo;
  role: Role;
  onSubmit: (updatedUserProfile: IUpdateUserProfileDto) => void;
}

function PersonalAccountLeftPanel({ account, role, onSubmit }: PersonalAccountLeftPanelProps): JSX.Element {
  //! много кода! поделить как нибуть!
  // при режиме - только чтение - не менять курсор мыши у AvatarUpload...

  const isUpdateAccountExecuting = useAppSelector(getIsUpdateAccountInfoExecuting);
  const isUpdateAccountError = useAppSelector(getIsUpdateAccountInfoError);

  const { user, questionnaire } = account;
  const { name, avatarFilePath, about, location, gender } = user;
  const { specializations, trainingLevel } = questionnaire;

  const [isEditing, setIsEditing] = useState(false);
  const [avatarFile, setAvatarFile] = useState<File | undefined>();
  const [currentAvatarFilePath, setCurrentAvatarFilePath] = useState(avatarFilePath);

  const handleWindowKeyDown = () => {
    setCurrentAvatarFilePath(avatarFilePath);
    setAvatarFile(undefined);
    setIsEditing(false);
  };

  useEscapeKey(handleWindowKeyDown);

  useEffect(() => {
    if (!isUpdateAccountExecuting && !isUpdateAccountError) {
      setIsEditing(false);
    }
  }, [isUpdateAccountExecuting, isUpdateAccountError, avatarFilePath]);

  const handleAvatarUploadChange = (filePath: string, file: File | undefined) => {
    setCurrentAvatarFilePath(filePath);
    setAvatarFile(file);
  };

  const handleButtonClick = (event: FormEvent) => {
    event.preventDefault();
    setIsEditing(true);
  };

  const handleFormSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const form = event.currentTarget;
    const formData = new FormData(form);

    const updatedUserProfile: IUpdateUserProfileDto = {
      avatarFile,
      emptyAvatarFile: !currentAvatarFilePath,
      name: formData.get(FormFieldName.Name)?.toString() || '',
      about: formData.get(FormFieldName.About)?.toString() || '',
      location: (formData.get(FormFieldName.UserLocation)?.toString() || '') as Location, //! одинаковый код - в хелпер
      gender: (formData.get(FormFieldName.Sex)?.toString() || '') as Gender, //! одинаковый код - в хелпер
      specializations: formData.getAll(FormFieldName.Spec).map((specialization) => (specialization as Specialization)), //! одинаковый код - в хелпер
      trainingLevel: (formData.get(FormFieldName.UserTrainingLevel)?.toString() || '') as TrainingLevel //! одинаковый код - в хелпер
    };

    onSubmit(updatedUserProfile);
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
          readOnly={!isEditing}
        />
      </div>
      <form className={`${mainClassName}__form`} method="post" onSubmit={(isEditing) ? handleFormSubmit : undefined}>
        <button
          className={`btn-flat btn-flat--underlined ${mainClassName}__${(isEditing) ? 'save' : 'edit'}-button`}
          type={(isEditing) ? 'submit' : 'button'}
          aria-label={buttonCaption}
          onClick={(isEditing) ? undefined : handleButtonClick}
          disabled={isUpdateAccountExecuting}
        >
          <svg width="12" height="12" aria-hidden="true">
            <use xlinkHref="#icon-edit" />
          </svg>
          <span>{buttonCaption}</span>
        </button>
        <PersonalAccountBlock mainClassNamePrefix={mainClassName} title='Обо мне' >
          <Fragment>
            <CustomInput
              name={FormFieldName.Name}
              type='text'
              label='Имя'
              value={name}
              divExtraClassName={mainClassName}
              readOnly={!isEditing}
            />
            <CustomInput
              name={FormFieldName.About}
              type='textarea'
              label='Описание'
              value={about}
              divExtraClassName={mainClassName}
              readOnly={!isEditing}
            />
          </Fragment>
        </PersonalAccountBlock>
        <PersonalAccountBlock mainClassNamePrefix={mainClassName} extraClassNamePrefix='status' extraClassNameForDiv title='Статус' >
          <PersonalAccountReadyCheckbox
            name={FormFieldName.ReadyForTraining}
            mainClassName={mainClassName}
            role={role}
          />
        </PersonalAccountBlock>
        <PersonalAccountBlock mainClassNamePrefix={mainClassName} extraClassNamePrefix='specialization' title='Специализация' >
          <SpecializationsCheckbox
            name={FormFieldName.Spec}
            values={specializations}
            divExtraClassName={mainClassName}
            readOnly={!isEditing}
            fromPersonalAccount
          />
        </PersonalAccountBlock>
        <CustomSelect //! в макете к названию станции добавлено "ст. м. ", добавил titlePrefix
          name={FormFieldName.UserLocation}
          caption='Локация'
          value={location}
          titlePrefix='ст. м. '
          options={LOCATIONS}
          extraClassName={mainClassName}
          readOnly={!isEditing}
        />
        <CustomSelect
          name={FormFieldName.Sex}
          caption='Пол'
          value={gender}
          options={USER_GENDERS}
          extraClassName={mainClassName}
          readOnly={!isEditing}
        />
        <CustomSelect
          name={FormFieldName.UserTrainingLevel}
          caption='Уровень'
          value={trainingLevel}
          options={TRAINING_LEVELS}
          extraClassName={mainClassName}
          readOnly={!isEditing}
        />
      </form>
    </section>
  );
}

export default PersonalAccountLeftPanel;

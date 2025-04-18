import QuestionnaireForm from '../../components/questionnaire-form/questionnaire-from';

import { ICreateQuestionnaireSportsmanDto } from '@backend/shared/core';

import { useAppDispatch, useAppSelector } from '../../hooks';
import { getUserRole } from '../../store/user-process/selectors';
import { getIsCreateQuestionnaireExecuting } from '../../store/user-profile-process/selectors';
import { createQuestionnaire } from '../../store/actions/user-profile-action';

function Questionnaire(): JSX.Element | null {
  //! сделать файлы-сертификаты для тренера

  const isCreateExistQuestionnaireExecuting = useAppSelector(getIsCreateQuestionnaireExecuting);
  const userRole = useAppSelector(getUserRole);
  const dispatch = useAppDispatch();

  const handleOnSubmit = (dto: ICreateQuestionnaireSportsmanDto) => {
    dispatch(createQuestionnaire({ dto, userRole }));
  };

  return (
    <QuestionnaireForm userRole={userRole} onSubmit={handleOnSubmit} isDisabled={isCreateExistQuestionnaireExecuting} />
  );
}

export default Questionnaire;

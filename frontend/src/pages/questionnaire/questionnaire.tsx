import QuestionnaireForm from '../../components/questionnaire-form/questionnaire-from';

import { useAppDispatch, useAppSelector } from '../../hooks';
import { getUserRole } from '../../store/user-process/selectors';
import { getIsCreateQuestionnaireExecuting } from '../../store/account-process/selectors';
import { createQuestionnaire } from '../../store/actions/account-action';
import { setPrevLocation } from '../../store/user-process';
import { CreateQuestionnaireDto } from '../../types/types';
import { AppRoute } from '../../const';

function Questionnaire(): JSX.Element | null {
  //! вернуть содежимое формы сюда, а форму уменьшить если возможно

  const dispatch = useAppDispatch();
  const isCreateExistQuestionnaireExecuting = useAppSelector(getIsCreateQuestionnaireExecuting);
  const userRole = useAppSelector(getUserRole);

  const handleOnSubmit = (dto: CreateQuestionnaireDto) => {
    dispatch(createQuestionnaire({ dto, userRole }));
    dispatch(setPrevLocation(AppRoute.Questionnaire));
  };

  return (
    <QuestionnaireForm userRole={userRole} onSubmit={handleOnSubmit} isDisabled={isCreateExistQuestionnaireExecuting} />
  );
}

export default Questionnaire;

import { Navigate } from 'react-router-dom';

import MainSpinner from '../main-spinner/main-spinner';

import { useAppSelector } from '../../hooks';
import { getExistQuestionnaire, getIsExistQuestionnaireExecuting } from '../../store/account-process/selectors';
import { AppRoute } from '../../const';

type QuestionnaireRouteProps = {
  isQuestionnaire?: boolean;
  children: JSX.Element;
}

function QuestionnaireRoute({ children, isQuestionnaire = false }: QuestionnaireRouteProps): JSX.Element {
  const isExistQuestionnaireExecuting = useAppSelector(getIsExistQuestionnaireExecuting);
  const existQuestionnaire = useAppSelector(getExistQuestionnaire);

  if (isExistQuestionnaireExecuting) {
    return <MainSpinner />; //! тут бы другую загрузку на основе PopupForm
  }

  if (isQuestionnaire && existQuestionnaire) {
    return <Navigate to={AppRoute.Index} />;
  }

  if (!isQuestionnaire && !existQuestionnaire) {
    return <Navigate to={AppRoute.Questionnaire} />;
  }

  return children;
}

export default QuestionnaireRoute;

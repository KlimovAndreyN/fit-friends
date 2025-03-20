import { Navigate } from 'react-router-dom';

import { useAppSelector } from '../../hooks';
import { getExistQuestionnaire } from '../../store/user-process/selectors';
import { AppRoute } from '../../const';

type QuestionnaireRouteProps = {
  isQuestionnaire?: boolean;
  children: JSX.Element;
}

function QuestionnaireRoute({ children, isQuestionnaire = false }: QuestionnaireRouteProps): JSX.Element {
  const existQuestionnaire = useAppSelector(getExistQuestionnaire);

  if (isQuestionnaire && existQuestionnaire) {
    return <Navigate to={AppRoute.Root} />;
  }

  if (!isQuestionnaire && !existQuestionnaire) {
    return <Navigate to={AppRoute.Questionnaire} />;
  }

  return children;
}

export default QuestionnaireRoute;

import { ICreateQuestionnaireWithFileIdsDto } from './i-create-questionnaire-with-file-ids.dto';

export type ICreateQuestionnaireSportsmanDto = Pick<
  Required<ICreateQuestionnaireWithFileIdsDto>,
  'specializations' | 'trainingLevel' | 'time' | 'caloriesLose' | 'caloriesWaste'
>;

import { JSX } from 'react';

import CustomInput from '../custom-input/custom-input';

type QuestionnaireUserCalorieProps = {
  name: string;
  caption: string;
}

function QuestionnaireUserCalorie({ name, caption }: QuestionnaireUserCalorieProps): JSX.Element {
  return (
    <div className={`questionnaire-user__${name}`}>
      <span className="questionnaire-user__legend">{caption}</span>
      <CustomInput
        name={name}
        type='number'
        spanText='ккал'
        divExtraClassName='custom-input--with-text-right questionnaire-user'
      />
    </div>
  );
}

export default QuestionnaireUserCalorie;

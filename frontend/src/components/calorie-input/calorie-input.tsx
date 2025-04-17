import CustomInput from '../custom-input/custom-input';

type CalorieProps = {
  name: string;
  caption: string;
}

function CalorieInput({ name, caption }: CalorieProps): JSX.Element {
  //! сменить имя на QuestionnaireUserCalorie

  return (
    <div className={`questionnaire-user__${name}`}>
      <span className="questionnaire-user__legend">{caption}</span>
      <CustomInput
        name={name}
        type='number'
        text='ккал'
        divExtraClassName='custom-input--with-text-right questionnaire-user'
      />
    </div>
  );
}

export default CalorieInput;

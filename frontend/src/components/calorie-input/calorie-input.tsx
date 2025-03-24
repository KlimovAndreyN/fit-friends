import CustomInput from '../custom-input/custom-input';

type CalorieProps = {
  name: string;
  caption: string;
}

function CalorieInput({ name, caption }: CalorieProps): JSX.Element {
  return (
    <div className={`questionnaire-user__${name}`}>
      <span className="questionnaire-user__legend">{caption}</span>
      <CustomInput
        type='number'
        name={name}
        text='ккал'
        divExtraClassName='custom-input--with-text-right questionnaire-user__input'
      />
    </div>
  );
}

export default CalorieInput;

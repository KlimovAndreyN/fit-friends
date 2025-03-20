type QuestionnaireSpecializationsProps = {
  //divExtraClassName?: string;
  name: string;
  /*
  type: string;
  label: string;
  required?: boolean;
  max?: string;
  autoComplete?: string;
  */
}

const QuestionnaireSpecializations = (props: QuestionnaireSpecializationsProps) => {
  //!
  const { /*divExtraClassName, */name/*, type, label, required, max, autoComplete*/ } = props;
  /*
  const divClassNames = ['custom-input'];
  if (divExtraClassName) {
    divClassNames.push(divExtraClassName);
  }
  */

  return (
    <div className="questionnaire-user__block">
      <span className="questionnaire-user__legend">Ваша специализация (тип) тренировок</span>
      <div className="specialization-checkbox questionnaire-user__specializations">
        <div className="btn-checkbox">
          <label>
            <input className="visually-hidden" type="checkbox" name={name} value="yoga" />
            <span className="btn-checkbox__btn">Йога</span>
          </label>
        </div>
        <div className="btn-checkbox">
          <label>
            <input className="visually-hidden" type="checkbox" name={name} value="running" />
            <span className="btn-checkbox__btn">Бег</span>
          </label>
        </div>
        <div className="btn-checkbox">
          <label>
            <input className="visually-hidden" type="checkbox" name={name} value="power" defaultChecked />
            <span className="btn-checkbox__btn">Силовые</span>
          </label>
        </div>
        <div className="btn-checkbox">
          <label>
            <input className="visually-hidden" type="checkbox" name={name} value="aerobics" />
            <span className="btn-checkbox__btn">Аэробика</span>
          </label>
        </div>
        <div className="btn-checkbox">
          <label>
            <input className="visually-hidden" type="checkbox" name={name} value="crossfit" defaultChecked />
            <span className="btn-checkbox__btn">Кроссфит</span>
          </label>
        </div>
        <div className="btn-checkbox">
          <label>
            <input className="visually-hidden" type="checkbox" name={name} value="boxing" defaultChecked />
            <span className="btn-checkbox__btn">Бокс</span>
          </label>
        </div>
        <div className="btn-checkbox">
          <label>
            <input className="visually-hidden" type="checkbox" name={name} value="pilates" />
            <span className="btn-checkbox__btn">Пилатес</span>
          </label>
        </div>
        <div className="btn-checkbox">
          <label>
            <input className="visually-hidden" type="checkbox" name={name} value="stretching" />
            <span className="btn-checkbox__btn">Стрейчинг</span>
          </label>
        </div>
      </div>
    </div>
  );
};

export default QuestionnaireSpecializations;

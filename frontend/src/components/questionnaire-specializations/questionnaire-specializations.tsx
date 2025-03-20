import { SORTED_SPECIALISATIONS, SpecialisationOption } from '../../const';

type QuestionnaireSpecializationsProps = {
  divExtraClassName: string;
  name: string;
  caption: string;
}

function QuestionnaireSpecializations({ divExtraClassName, name, caption }: QuestionnaireSpecializationsProps): JSX.Element {
  return (
    <div className={`questionnaire-${divExtraClassName}__block`}>
      <span className={`questionnaire-${divExtraClassName}__legend`}>{caption}</span>
      <div className="specialization-checkbox questionnaire-user__specializations">
        {
          SORTED_SPECIALISATIONS.map(
            (specialisation) => {
              const { title, defaultChecked } = SpecialisationOption[specialisation];

              return (
                <div className="btn-checkbox" key={specialisation}>
                  <label>
                    <input className="visually-hidden" type="checkbox" name={name} value={specialisation} defaultChecked={defaultChecked} />
                    <span className="btn-checkbox__btn">{title}</span>
                  </label>
                </div>
              );
            }
          )
        }
      </div>
    </div>
  );
}

export default QuestionnaireSpecializations;

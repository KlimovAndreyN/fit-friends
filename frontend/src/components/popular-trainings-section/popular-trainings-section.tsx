import PopularTrainingList from '../popular-trainings-list/popular-trainings-list';

function PopularTrainingSection(): JSX.Element {
  //! сделать листание, добавленные тренировки вывелись правее
  //! заголовок с кнопками похож на всех трех блоках SpecialForYouSection, PopularTrainingSection и LookForCompanySection

  return (
    <section className="popular-trainings">
      <div className="container">
        <div className="popular-trainings__wrapper">
          <div className="popular-trainings__title-wrapper">
            <h2 className="popular-trainings__title">Популярные тренировки</h2>
            <button className="btn-flat popular-trainings__button" type="button">
              <span>Смотреть все</span>
              <svg width="14" height="10" aria-hidden="true">
                <use xlinkHref="#arrow-right"></use>
              </svg>
            </button>
            <div className="popular-trainings__controls">
              <button className="btn-icon popular-trainings__control" type="button" aria-label="previous">
                <svg width="16" height="14" aria-hidden="true">
                  <use xlinkHref="#arrow-left"></use>
                </svg>
              </button>
              <button className="btn-icon popular-trainings__control" type="button" aria-label="next">
                <svg width="16" height="14" aria-hidden="true">
                  <use xlinkHref="#arrow-right"></use>
                </svg>
              </button>
            </div>
          </div>
          <PopularTrainingList />
        </div>
      </div>
    </section>
  );
}

export default PopularTrainingSection;

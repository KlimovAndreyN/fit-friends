import LookForCompanyList from '../look-for-company-list/look-for-company-list';

function LookForCompanySection(): JSX.Element {
  //! сделать листание, добавленные тренировки вывелись правее
  //! заголовок с кнопками похож на всех трех блоках SpecialForYouSection, PopularTrainingSection и LookForCompanySection
  //! 'Смотреть все' - нужен раздел
  //! В случае отсутствия контента для любого из блоков, отображается текст-заглушка: «Скоро здесь появится что-то полезное».
  //! пока заглушку - наверное 2 или 3й этап
  //! проверить консоль браузера на ошибки

  return (
    <section className="look-for-company">
      <div className="container">
        <div className="look-for-company__wrapper">
          <div className="look-for-company__title-wrapper">
            <h2 className="look-for-company__title">Ищут компанию для тренировки</h2>
            <button className="btn-flat btn-flat--light look-for-company__button" type="button">
              <span>Смотреть все</span>
              <svg width="14" height="10" aria-hidden="true">
                <use xlinkHref="#arrow-right"></use>
              </svg>
            </button>
            <div className="look-for-company__controls">
              <button className="btn-icon btn-icon--outlined look-for-company__control" type="button" aria-label="previous">
                <svg width="16" height="14" aria-hidden="true">
                  <use xlinkHref="#arrow-left"></use>
                </svg>
              </button>
              <button className="btn-icon btn-icon--outlined look-for-company__control" type="button" aria-label="next">
                <svg width="16" height="14" aria-hidden="true">
                  <use xlinkHref="#arrow-right"></use>
                </svg>
              </button>
            </div>
          </div>
          <LookForCompanyList />
        </div>
      </div>
    </section>
  );
}

export default LookForCompanySection;

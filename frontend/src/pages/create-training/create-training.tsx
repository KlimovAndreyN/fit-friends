import { FormEvent, Fragment, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

import Header from '../../components/header/header';
import Block from '../../components/block/block';

import { useAppDispatch, useAppSelector } from '../../hooks';
import { setPrevLocation } from '../../store/user-process';
import { getIsCreatedTraining, getIsCreateTrainingExecuting } from '../../store/training-process/selectors';
import { createTraining } from '../../store/actions/training-action';
import { AppRoute, PageTitle } from '../../const';

function CreateTraining(): JSX.Element {
  //! форма похода на PopupForm, только с верхним меню, выделить все отдельно, если еще будет использоватся в похожем виде
  //    или когда переделаю PopupForm на форму и страницу

  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const isCreateTrainingExecuting = useAppSelector(getIsCreateTrainingExecuting);
  const isCreatedTraining = useAppSelector(getIsCreatedTraining);

  useEffect(() => {
    if (isCreatedTraining) {
      navigate(AppRoute.MyTrainings);
    }
  }, [navigate, isCreatedTraining]);

  //! отладка
  // eslint-disable-next-line no-console
  console.log('CreateTraining');
  // eslint-disable-next-line no-console
  console.log('isCreateTrainingExecuting', isCreateTrainingExecuting);

  const handlePopupFormSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    //! попробовать добавить в начало новую тренировку, но фильтры могут быть не те, проще заново обновить список тренирорвок и фильтры скинуть
    //! должен быть в начале, т.к. начальная сортировка по дате
    dispatch(setPrevLocation(AppRoute.CreateTraining));

    //! временно
    dispatch(createTraining('test'));
  };

  const mainClassNamePrefix = 'create-training'; //! заменить везде
  //const isDisabled = isCreateExistQuestionnaireExecuting;


  return (
    <Fragment>
      <Header title={PageTitle.CreateTraining} />
      <main>
        <div className="popup-form popup-form--create-training">
          <div className="popup-form__wrapper">
            <div className="popup-form__content">
              <div className="popup-form__title-wrapper">
                <h1 className="popup-form__title">Создание тренировки</h1>
              </div>
              <div className="popup-form__form">
                <form method="post" onSubmit={handlePopupFormSubmit}>
                  <div className="create-training">
                    <div className="create-training__wrapper">
                      <Block legend='Название тренировки' className={mainClassNamePrefix} isHeaderLegend>
                        <div className="custom-input create-training__input">
                          <label>
                            <span className="custom-input__wrapper">
                              <input type="text" name="training-name" />
                            </span>
                          </label>
                        </div>
                      </Block>
                      <Block legend='Характеристики тренировки' className={mainClassNamePrefix} isHeaderLegend>
                        <div className="create-training__info">
                          <div className="custom-select custom-select--not-selected">
                            <span className="custom-select__label">Выберите тип тренировки</span>
                            <button className="custom-select__button" type="button" aria-label="Выберите одну из опций">
                              <span className="custom-select__text">
                              </span>
                              <span className="custom-select__icon">
                                <svg width="15" height="6" aria-hidden="true">
                                  <use xlinkHref="#arrow-down"></use>
                                </svg>
                              </span>
                            </button>
                            <ul className="custom-select__list" role="listbox">
                            </ul>
                          </div>
                          <div className="custom-input custom-input--with-text-right">
                            <label>
                              <span className="custom-input__label">Сколько калорий потратим</span>
                              <span className="custom-input__wrapper">
                                <input type="number" name="calories" />
                                <span className="custom-input__text">ккал</span>
                              </span>
                            </label>
                          </div>
                          <div className="custom-select custom-select--not-selected">
                            <span className="custom-select__label">Сколько времени потратим</span>
                            <button className="custom-select__button" type="button" aria-label="Выберите одну из опций">
                              <span className="custom-select__text">
                              </span>
                              <span className="custom-select__icon">
                                <svg width="15" height="6" aria-hidden="true">
                                  <use xlinkHref="#arrow-down"></use>
                                </svg>
                              </span>
                            </button>
                            <ul className="custom-select__list" role="listbox">
                            </ul>
                          </div>
                          <div className="custom-input custom-input--with-text-right">
                            <label>
                              <span className="custom-input__label">Стоимость тренировки</span>
                              <span className="custom-input__wrapper">
                                <input type="number" name="price" />
                                <span className="custom-input__text">₽</span>
                              </span>
                            </label>
                          </div>
                          <div className="custom-select custom-select--not-selected">
                            <span className="custom-select__label">Выберите уровень тренировки</span>
                            <button className="custom-select__button" type="button" aria-label="Выберите одну из опций">
                              <span className="custom-select__text">
                              </span>
                              <span className="custom-select__icon">
                                <svg width="15" height="6" aria-hidden="true">
                                  <use xlinkHref="#arrow-down"></use>
                                </svg>
                              </span>
                            </button>
                            <ul className="custom-select__list" role="listbox">
                            </ul>
                          </div>
                          <div className="create-training__radio-wrapper">
                            <span className="create-training__label">Кому подойдет тренировка</span>
                            <br />
                            <div className="custom-toggle-radio create-training__radio">
                              <div className="custom-toggle-radio__block">
                                <label>
                                  <input type="radio" name="gender" />
                                  <span className="custom-toggle-radio__icon">
                                  </span>
                                  <span className="custom-toggle-radio__label">Мужчинам</span>
                                </label>
                              </div>
                              <div className="custom-toggle-radio__block">
                                <label>
                                  <input type="radio" name="gender" defaultChecked />
                                  <span className="custom-toggle-radio__icon">
                                  </span>
                                  <span className="custom-toggle-radio__label">Женщинам</span>
                                </label>
                              </div>
                              <div className="custom-toggle-radio__block">
                                <label>
                                  <input type="radio" name="gender" />
                                  <span className="custom-toggle-radio__icon">
                                  </span>
                                  <span className="custom-toggle-radio__label">Всем</span>
                                </label>
                              </div>
                            </div>
                          </div>
                        </div>
                      </Block>
                      <Block legend='Описание тренировки' className={mainClassNamePrefix} isHeaderLegend>
                        <div className="custom-textarea create-training__textarea">
                          <label>
                            <textarea name="description" placeholder=" "></textarea>
                          </label>
                        </div>
                      </Block>
                      <Block legend='Загрузите видео-тренировку' className={mainClassNamePrefix} isHeaderLegend>
                        <div className="drag-and-drop create-training__drag-and-drop">
                          <label>
                            <span className="drag-and-drop__label" tabIndex={0}>Загрузите сюда файлы формата MOV, AVI или MP4
                              <svg width="20" height="20" aria-hidden="true">
                                <use xlinkHref="#icon-import-video"></use>
                              </svg>
                            </span>
                            <input type="file" name="import" tabIndex={-1} accept=".mov, .avi, .mp4" />
                          </label>
                        </div>
                      </Block>
                    </div>
                    <button className="btn create-training__button" type="submit">Опубликовать</button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </main >
    </Fragment >
  );
}

export default CreateTraining;

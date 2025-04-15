type FilterMinMaxRangeProps = {
  title: string;
  prefixClassName: string;
  minValue: number | undefined;
  maxValue: number | undefined;
  showInputs?: boolean;
  onChange: (min: number | undefined, max: number | undefined) => void;
}

function FilterMinMaxRange({ title, prefixClassName, minValue, maxValue, showInputs, onChange }: FilterMinMaxRangeProps): JSX.Element {

  /*
            <div className="gym-catalog-form__block gym-catalog-form__block--price">
              <h4 className="gym-catalog-form__block-title">Цена, ₽</h4>
              <div className="filter-price">
                <div className="filter-price__input-text filter-price__input-text--min">
                  <input
                    type="number"
                    id="text-min"
                    name="text-min"
                    defaultValue={priceMin}
                    onInput={(event: FormEvent<HTMLInputElement>) => {
                      event.preventDefault();

                      setPriceMin(parseStringNumber(event.currentTarget.value));
                    }}
                  />
                  <label htmlFor="text-min">от</label>
                </div>
                <div className="filter-price__input-text filter-price__input-text--max">
                  <input type="number" id="text-max" name="text-max" defaultValue="3200" />
                  <label htmlFor="text-max">до</label>
                </div>
              </div>
              <div className="filter-range">
                <div className="filter-range__scale">
                  <div className="filter-range__bar"><span className="visually-hidden">Полоса прокрутки</span></div>
                </div>
                <div className="filter-range__control">
                  <button className="filter-range__min-toggle"><span className="visually-hidden">Минимальное значение</span></button>
                  <button className="filter-range__max-toggle"><span className="visually-hidden">Максимальное значение</span></button>
                </div>
              </div>
            </div>


            <div className="gym-catalog-form__block gym-catalog-form__block--rating">
              <h4 className="gym-catalog-form__block-title">Рейтинг</h4>
              <div className="filter-raiting">
                <div className="filter-raiting__scale">
                  <div className="filter-raiting__bar"><span className="visually-hidden">Полоса прокрутки</span></div>
                </div>
                <div className="filter-raiting__control">
                  <button className="filter-raiting__min-toggle"><span className="visually-hidden">Минимальное значение</span></button><span>1</span>
                  <button className="filter-raiting__max-toggle"><span className="visually-hidden">Максимальное значение</span></button><span>5</span>
                </div>
              </div>
            </div>
   */

  return (
    <div className={`gym-catalog-form__block gym-catalog-form__block--${prefixClassName}`}>
      <h4 className="gym-catalog-form__block-title">{title}</h4>
      <div className={`filter-${prefixClassName}`}>
        <div className={`filter-${prefixClassName}__input-text filter-${prefixClassName}__input-text--min`}>
          <input type="number" id="text-min-cal" name="text-min-cal" defaultValue={minValue} />
          <label htmlFor="text-min-cal">от</label>
        </div>
        <div className={`filter-${prefixClassName}__input-text filter-${prefixClassName}__input-text--max`}>
          <input type="number" id="text-max-cal" name="text-max-cal" defaultValue={maxValue} />
          <label htmlFor="text-max-cal">до</label>
        </div>
      </div>
      <div className="filter-range">
        <div className="filter-range__scale">
          <div className="filter-range__bar"><span className="visually-hidden">Полоса прокрутки</span></div>
        </div>
        <div className="filter-range__control">
          <button className="filter-range__min-toggle"><span className="visually-hidden">Минимальное значение</span></button>
          <button className="filter-range__max-toggle"><span className="visually-hidden">Максимальное значение</span></button>
        </div>
      </div>
    </div>
  );
}

export default FilterMinMaxRange;

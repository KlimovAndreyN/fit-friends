function ThumbnailSpecGym(): JSX.Element {
  //! разный текст и картинка? на разных страницах, сейчас поставил текст по ТЗ, есть блоки в ЛК тренера, ЛК спортсмена и главной, поискать еще есть ли где
  return (
    <div className="thumbnail-spec-gym">
      <div className="thumbnail-spec-gym__image">
        <picture>
          <source type="image/webp" srcSet="img/content/thumbnails/nearest-gym-01.webp, img/content/thumbnails/nearest-gym-01@2x.webp 2x" />
          <img src="img/content/thumbnails/nearest-gym-01.jpg" srcSet="img/content/thumbnails/nearest-gym-01@2x.jpg 2x" width="330" height="190" alt="" />
        </picture>
      </div>
      {/*
        //! закоментировано в маркапах
        <!-- <p class="thumbnail-spec-gym__type">Ближайший зал</p> -->
        <div class="thumbnail-spec-gym__header", align ="center",>
      */}
      <div className="thumbnail-spec-gym__header">
        <h3 className="thumbnail-spec-gym__title">Скоро здесь появится что-то полезное</h3>
      </div>
    </div>
  );
}

export default ThumbnailSpecGym;

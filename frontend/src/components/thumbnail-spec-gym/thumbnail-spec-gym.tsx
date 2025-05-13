import { JSX } from 'react';

type ThumbnailSpecGymProps = {
  text?: string;
}

function ThumbnailSpecGym({ text }: ThumbnailSpecGymProps): JSX.Element {
  return (
    <div className="thumbnail-spec-gym">
      <div className="thumbnail-spec-gym__image">
        <picture>
          <source type="image/webp" srcSet="img/content/thumbnails/nearest-gym-01.webp, img/content/thumbnails/nearest-gym-01@2x.webp 2x" />
          <img src="img/content/thumbnails/nearest-gym-01.jpg" srcSet="img/content/thumbnails/nearest-gym-01@2x.jpg 2x" width="330" height="190" alt="" />
        </picture>
      </div>
      {/*
        // закоментировано в маркапе
        <!-- <p class="thumbnail-spec-gym__type">Ближайший зал</p> -->
        // ошибка в маркапе
        <div class="thumbnail-spec-gym__header", align ="center",>
      */}
      <div className="thumbnail-spec-gym__header" style={{ textAlign: 'center' }}>
        <h3 className="thumbnail-spec-gym__title">{text || 'Скоро здесь появится что-то полезное'}</h3>
      </div>
    </div>
  );
}

export default ThumbnailSpecGym;

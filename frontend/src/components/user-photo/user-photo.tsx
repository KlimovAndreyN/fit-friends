type UserPhotoProps = {
  path?: string;
  className: string;
}

function UserPhoto({ path, className }: UserPhotoProps): JSX.Element {
  return (
    <div className={className}>
      {
        (path)
          ?
          <img src={path} width="64" height="64" alt="Изображение тренера" />
          :
          <div style={{
            backgroundColor: 'white',
            width: 64,
            height: 64,
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            borderRadius: '50%',
            border: '1px solid #333'
          }}
          >
            <svg aria-hidden="true" width="40" height="48"><use xlinkHref="#icon-user" /></svg>
          </div>
      }
    </div >
  );
}

export default UserPhoto;

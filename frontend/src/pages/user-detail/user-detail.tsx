import { JSX, Fragment, useEffect } from 'react';
import { useParams } from 'react-router-dom';

import Header from '../../components/header/header';
import BackButton from '../../components/back-button/back-button';
import UserDetailWrapper from '../../components/user-detail-wrapper/user-detail-wrapper';
import Spinner from '../../components/spinner/spinner';
import NotFound from '../not-found/not-found';

import { useAppDispatch, useAppSelector } from '../../hooks';
import useScrollToTop from '../../hooks/use-scroll-to-top';
import { getUserId } from '../../store/user-process/selectors';
import { setPrevLocation } from '../../store/user-process';
import { getDetailUserProfile, getIsFetchDetailUserProfileError, getIsFetchDetailUserProfileExecuting } from '../../store/user-profile-process/selectors';
import { fetchDetailUserProfile } from '../../store/actions/user-profile-action';
import { AppRoute, PageTitle } from '../../const';

function UserDetail(): JSX.Element | null {
  //! прокрутка?

  const { id: userId = '' } = useParams();
  const dispatch = useAppDispatch();
  const isFetchDetailUserProfileExecuting = useAppSelector(getIsFetchDetailUserProfileExecuting);
  const isFetchDetailUserProfileError = useAppSelector(getIsFetchDetailUserProfileError);
  const isSelfProfile = userId === useAppSelector(getUserId);
  const detailUserProfile = useAppSelector(getDetailUserProfile);

  useScrollToTop(); //! а если в useEffect?

  useEffect(() => {
    dispatch(fetchDetailUserProfile(userId));
    dispatch(setPrevLocation(AppRoute.UserDetail));
  }, [dispatch, userId]);

  if (!userId) {
    //! может сделать компонент - ErrorMessage?
    //! нет id пользователя
    return <NotFound />;
  }

  if (isFetchDetailUserProfileExecuting) {
    return <Spinner />;
  }

  if (isFetchDetailUserProfileError) {
    //! может сделать компонент - ErrorMessage?
    //! если тренер смотрит другого тренера, то будет ошибка 403 - Forbidden; ...
    //! еще бы дополнительный текст добавить, а его заполнить из ошибки
    return <NotFound />;
  }

  if (!detailUserProfile) {
    // на первом проходе нет загрузки, нет ошибки, и нет пользователя
    return null;
  }

  return (
    <Fragment>
      <Header title={PageTitle.UserDetail} />
      <main>
        <div className="inner-page inner-page--no-sidebar">
          <div className="container">
            <div className="inner-page__wrapper">
              <BackButton className='inner-page' />
              <UserDetailWrapper isSelfProfile={isSelfProfile} detailUserProfile={detailUserProfile} />
            </div>
          </div>
        </div>
      </main>
    </Fragment>
  );
}

export default UserDetail;

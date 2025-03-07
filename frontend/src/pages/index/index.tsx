import { Helmet } from 'react-helmet-async';

import Footer from '../../components/footer/footer';
import Header from '../../components/header/header';

import { PageTitle } from '../../const';

function Index(): JSX.Element {
  return (
    <>
      <Helmet>
        <title>{PageTitle.Index}</title>
      </Helmet>
      <Header />
      <div>Index</div>
      <Footer />
    </>
  );
}

export default Index;

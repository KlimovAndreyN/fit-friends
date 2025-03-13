/*
<span class="header__logo">
            <svg width="187" height="70" aria-hidden="true">
              <use xlink:href="#logo"></use>
            </svg></span>
<a class="header__logo" href="index.html" aria-label="Переход на главную">
            <svg width="187" height="70" aria-hidden="true">
              <use xlink:href="#logo"></use>
            </svg></a>
            */


function Logo(): JSX.Element {
  return (
    <span className="header__logo">
      <svg width="187" height="70" aria-hidden="true">
        <use xlinkHref="#logo"></use>
      </svg>
    </span>
  );
}

export default Logo;

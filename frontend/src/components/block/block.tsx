import { JSX } from 'react';

type Props = {
  className: string;
  legend?: string;
  isHeaderLegend?: boolean;
  children: JSX.Element;
}

function Block({ className, legend, isHeaderLegend, children }: Props): JSX.Element {
  let legendElement: JSX.Element | null = null;

  if (legend) {
    legendElement = (isHeaderLegend)
      ? <h2 className={`${className}__legend`}>{legend}</h2>
      : <span className={`${className}__legend`}>{legend}</span>;
  }

  return (
    <div className={`${className}__block`}>
      {legendElement}
      {children}
    </div>
  );
}

export default Block;

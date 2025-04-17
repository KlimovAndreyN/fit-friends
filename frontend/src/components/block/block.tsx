type Props = {
  className: string;
  legend?: string;
  children: JSX.Element;
}

function Block({ className, legend, children }: Props): JSX.Element {
  return (
    <div className={`${className}__block`}>
      {
        (legend)
          ? <span className={`${className}__legend`}>{legend}</span>
          : null
      }
      {children}
    </div>
  );
}

export default Block;

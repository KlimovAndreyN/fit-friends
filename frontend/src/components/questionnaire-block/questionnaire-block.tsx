type QuestionnairebBlockProps = {
  divExtraClassName: string;
  legend?: string;
  children: JSX.Element;
}

function QuestionnairebBlock({ divExtraClassName, legend, children }: QuestionnairebBlockProps): JSX.Element {
  //! может название просто Block?

  return (
    <div className={`${divExtraClassName}__block`}>
      {
        (legend)
          ? <span className={`${divExtraClassName}__legend`}>{legend}</span>
          : null
      }
      {children}
    </div>
  );
}

export default QuestionnairebBlock;

type QuestionnairebBlockProps = {
  divExtraClassName: string;
  caption: string;
  children: JSX.Element;
}

function QuestionnairebBlock({ divExtraClassName, caption, children }: QuestionnairebBlockProps): JSX.Element {
  return (
    <div className={`questionnaire-${divExtraClassName}__block`}>
      <span className={`questionnaire-${divExtraClassName}__legend`}>{caption}</span>
      {children}
    </div>
  );
}

export default QuestionnairebBlock;

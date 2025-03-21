type QuestionnairebBlockProps = {
  divExtraClassName: string;
  caption?: string;
  children: JSX.Element;
}

function QuestionnairebBlock({ divExtraClassName, caption, children }: QuestionnairebBlockProps): JSX.Element {
  return (
    <div className={`questionnaire-${divExtraClassName}__block`}>
      {
        (caption)
          ? <span className={`questionnaire-${divExtraClassName}__legend`}>{caption}</span>
          : null
      }
      {children}
    </div>
  );
}

export default QuestionnairebBlock;

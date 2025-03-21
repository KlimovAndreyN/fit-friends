import { Entity, StorableEntity, Questionnaire } from '@backend/shared/core';

export class FitQuestionnaireEntity extends Entity implements StorableEntity<Questionnaire> {
  public specialisations: Questionnaire['specialisations'];
  public level: Questionnaire['level'];
  public time?: Questionnaire['time'];
  public caloriesLose?: Questionnaire['caloriesLose'];
  public caloriesWaste?: Questionnaire['caloriesWaste'];
  public fileIds?: Questionnaire['fileIds'];
  public description?: Questionnaire['description'];
  public individualTraining?: Questionnaire['individualTraining'];

  constructor(questionnaire?: Questionnaire) {
    super();

    this.populate(questionnaire);
  }

  public populate(questionnaire?: Questionnaire): void {
    if (!questionnaire) {
      return;
    }

    this.id = questionnaire.id ?? undefined;
    this.specialisations = [...questionnaire.specialisations];
    this.level = questionnaire.level;
    this.time = questionnaire.time;
    this.caloriesLose = questionnaire.caloriesLose;
    this.caloriesWaste = questionnaire.caloriesWaste;
    this.fileIds = [...questionnaire.fileIds];
    this.description = questionnaire.description;
    this.individualTraining = questionnaire.individualTraining;
  }

  public toPOJO(): Questionnaire {
    return {
      id: this.id,
      specialisations: this.specialisations,
      level: this.level,
      time: this.time,
      caloriesLose: this.caloriesLose,
      caloriesWaste: this.caloriesWaste,
      fileIds: this.fileIds,
      description: this.description,
      individualTraining: this.individualTraining
    }
  }
}

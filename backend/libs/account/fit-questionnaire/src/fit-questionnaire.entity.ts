import { Entity, StorableEntity, Questionnaire } from '@backend/shared/core';

export class FitQuestionnaireEntity extends Entity implements StorableEntity<Questionnaire> {
  public userId: Questionnaire['userId'];
  public specializations: Questionnaire['specializations'];
  public trainingLevel: Questionnaire['trainingLevel'];
  public readyForTraining: Questionnaire['readyForTraining'];
  public duration?: Questionnaire['duration'];
  public caloriesLose?: Questionnaire['caloriesLose'];
  public caloriesWaste?: Questionnaire['caloriesWaste'];
  public fileIds?: Questionnaire['fileIds'];
  public description?: Questionnaire['description'];
  public individualTraining?: Questionnaire['individualTraining'];
  public createdAt?: Questionnaire['createdAt'];
  public updatedAt?: Questionnaire['updatedAt'];

  constructor(questionnaire?: Questionnaire) {
    super();

    this.populate(questionnaire);
  }

  public populate(questionnaire?: Questionnaire): void {
    if (!questionnaire) {
      return;
    }

    this.userId = questionnaire.userId;
    this.specializations = [...questionnaire.specializations];
    this.trainingLevel = questionnaire.trainingLevel;
    this.readyForTraining = questionnaire.readyForTraining;
    this.duration = questionnaire.duration;
    this.caloriesLose = questionnaire.caloriesLose;
    this.caloriesWaste = questionnaire.caloriesWaste;
    this.fileIds = (questionnaire.fileIds) ? [...questionnaire.fileIds] : [];
    this.description = questionnaire.description;
    this.individualTraining = questionnaire.individualTraining;
    this.createdAt = questionnaire.createdAt;
    this.updatedAt = questionnaire.updatedAt;
  }

  public toPOJO(): Questionnaire {
    return {
      userId: this.userId,
      specializations: this.specializations,
      trainingLevel: this.trainingLevel,
      readyForTraining: this.readyForTraining,
      duration: this.duration,
      caloriesLose: this.caloriesLose,
      caloriesWaste: this.caloriesWaste,
      fileIds: this.fileIds,
      description: this.description,
      individualTraining: this.individualTraining,
      createdAt: this.createdAt,
      updatedAt: this.updatedAt
    }
  }
}


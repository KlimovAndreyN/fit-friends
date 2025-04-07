import { Entity, StorableEntity, Training } from '@backend/shared/core';

export class TrainingEntity extends Entity implements StorableEntity<Training> {
  public title: Training['title'];
  public backgroundPath: Training['backgroundPath'];
  public trainingLevel: Training['trainingLevel'];
  public specialization: Training['specialization'];
  public duration: Training['duration'];
  public price: Training['price'];
  public caloriesWaste: Training['caloriesWaste'];
  public description: Training['description'];
  public gender: Training['gender'];
  public videoFileId: Training['videoFileId'];
  public rating?: Training['rating'];
  public userId: Training['userId'];
  public isSpecial: Training['isSpecial'];
  public createdAt?: Training['createdAt'];

  constructor(training?: Training) {
    super();

    this.populate(training);
  }

  public populate(training?: Training): void {
    if (!training) {
      return;
    }

    this.id = training.id ?? undefined;
    this.title = training.title;
    this.backgroundPath = training.backgroundPath;
    this.trainingLevel = training.trainingLevel;
    this.specialization = training.specialization;
    this.duration = training.duration;
    this.price = training.price;
    this.caloriesWaste = training.caloriesWaste;
    this.description = training.description;
    this.gender = training.gender;
    this.videoFileId = training.userId;
    this.rating = training.rating ?? undefined;
    this.userId = training.userId;
    this.isSpecial = training.isSpecial;
    this.createdAt = training.createdAt ?? undefined;
  }

  public toPOJO(): Training {
    return {
      id: this.id,
      title: this.title,
      backgroundPath: this.backgroundPath,
      trainingLevel: this.trainingLevel,
      specialization: this.specialization,
      duration: this.duration,
      price: this.price,
      caloriesWaste: this.caloriesWaste,
      description: this.description,
      gender: this.gender,
      videoFileId: this.videoFileId,
      rating: this.rating,
      userId: this.userId,
      isSpecial: this.isSpecial,
      createdAt: this.createdAt
    }
  }
}

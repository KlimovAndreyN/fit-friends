import { Document, Model } from 'mongoose';
import { NotFoundException } from '@nestjs/common';

import { Entity, StorableEntity, EntityFactory } from '@backend/shared/core';

import { Repository } from './repository.interface';

export abstract class BaseMongoRepository<
  T extends Entity & StorableEntity<ReturnType<T['toPOJO']>>,
  DocumentType extends Document
> implements Repository<T> {

  constructor(
    protected entityFactory: EntityFactory<T>,
    protected readonly model: Model<DocumentType>
  ) { }

  private fillFields(entity: T, document: DocumentType) {
    // может отдельная настройка есть?
    //! может в хелпер copyFields / copyField, document, entity, string[] / string
    ['createdAt', 'updatedAt'].forEach((key) => {
      if (Object.keys(entity).includes(key)) {
        entity[key] = document[key];
      }
    });
  }

  protected createEntityFromDocument(document: DocumentType): T | null {
    if (!document) {
      return null;
    }

    const plainObject = document.toObject({ getters: true, versionKey: false, flattenObjectIds: true }) as ReturnType<T['toPOJO']>;
    const entity = this.entityFactory.create(plainObject);

    return entity;
  }

  public async findById(id: T['id']): Promise<T> {
    const document = await this.model.findById(id).exec();

    return this.createEntityFromDocument(document);
  }

  public async save(entity: T): Promise<void> {
    const newDocument = new this.model(entity.toPOJO());

    await newDocument.save();
    entity.id = newDocument._id.toString();
    this.fillFields(entity, newDocument);
  }

  public async update(entity: T): Promise<void> {
    const updatedDocument = await this.model.findByIdAndUpdate(
      entity.id,
      entity.toPOJO(),
      { new: true, runValidators: true }
    ).exec();

    if (!updatedDocument) {
      throw new NotFoundException(`Entity with id ${entity.id} not found`);
    }

    this.fillFields(entity, updatedDocument);
  }

  public async insertOrUpdate(entity: T): Promise<void> {
    const data = entity.toPOJO();
    const updateData = {};

    //! в хелпер, но нужно типизировать... или lodash
    //    может copyWithoutFields / copyWithoutField, data, updateData, string[] / string
    Object.keys(data).forEach((key) => {
      if (key !== 'createdAt') {
        updateData[key] = data[key];
      }
    });

    const updatedDocument = await this.model.findOneAndUpdate(
      { _id: entity.id },
      updateData,
      { new: true, upsert: true, runValidators: true }
    ).exec();

    this.fillFields(entity, updatedDocument);
  }

  public async deleteById(id: T['id']): Promise<void> {
    const deletedDocument = await this.model.findByIdAndDelete(id).exec();

    if (!deletedDocument) {
      throw new NotFoundException(`Entity with id ${id} not found.`);
    }
  }

  public async deleteAll(): Promise<void> {
    this.model.deleteMany().exec();
  }
}

import { Document } from 'mongoose';
import { ModelDefinition, Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

import { Duration, Questionnaire, Specialization, TrainingLevel } from '@backend/shared/core';

@Schema({
  collection: 'questionnaires',
  timestamps: true
})
export class FitQuestionnaireModel extends Document implements Questionnaire {
  @Prop({ required: true, unique: true })
  public userId: string;

  @Prop({ required: true, type: Array })
  public specializations: Specialization[];

  @Prop({ required: true, type: String })
  public trainingLevel: TrainingLevel;

  @Prop({ required: true })
  public readyForTraining: boolean;

  @Prop({ type: String })
  public duration: Duration;

  @Prop()
  public caloriesLose: number

  @Prop()
  public caloriesWaste: number;

  @Prop()
  public fileIds: string[];

  @Prop()
  public description: string;

  @Prop()
  public individualTraining: boolean;

  public createdAt: Date;

  public updatedAt: Date;
}

export const FitQuestionnaireModels: ModelDefinition[] = [{
  name: FitQuestionnaireModel.name,
  schema: SchemaFactory.createForClass(FitQuestionnaireModel)
}];

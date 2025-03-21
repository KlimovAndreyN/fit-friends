import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

import { Duration, Questionnaire, Specialisation, UserLevel } from '@backend/shared/core';

@Schema({
  collection: 'questionnaires'
})
export class FitQuestionnaireModel extends Document implements Questionnaire {
  @Prop({ required: true })
  public specialisations: Specialisation[];

  @Prop({ required: true, type: String })
  public level: UserLevel;

  @Prop({ type: String })
  public time: Duration;

  @Prop()
  public caloriesLose: number;

  @Prop()
  public caloriesWaste: number;

  @Prop()
  public fileIds: string[];

  @Prop()
  public description: string;

  @Prop()
  public individualTraining: boolean;
}

export const FitQuestionnaireSchema = SchemaFactory.createForClass(FitQuestionnaireModel);

import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

import { Questionnaire } from '@backend/shared/core';
import { Document } from 'mongoose';

@Schema({
  collection: 'questionnaires'
})
export class FitQuestionnaireModel extends Document implements Questionnaire {
  @Prop({ required: true })
  public specialisations: Questionnaire['specialisations'];

  @Prop({ required: true, type: String })
  public level: Questionnaire['level'];

  @Prop({ type: String })
  public time: Questionnaire['time'];

  @Prop()
  public caloriesLose: Questionnaire['caloriesLose'];

  @Prop()
  public caloriesWaste?: Questionnaire['caloriesWaste'];

  @Prop()
  public fileIds?: Questionnaire['fileIds'];

  @Prop()
  public description?: Questionnaire['description'];

  @Prop()
  public individualTraining?: Questionnaire['individualTraining'];
}

export const FitQuestionnaireSchema = SchemaFactory.createForClass(FitQuestionnaireModel);

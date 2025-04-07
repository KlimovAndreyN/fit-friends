import { Logger } from '@nestjs/common';

import { getRandomBoolean, getRandomDate, getRandomEnumItem, getRandomItem, getRandomNumber } from '@backend/shared/helpers';
import { FitUserEntity } from '@backend/account/fit-user';
import { TrainingEntity } from '@backend/fit/training';
import { ReviewEntity, ReviewRepository } from '@backend/fit/review';


export async function clearReviews(reviewRepository: ReviewRepository): Promise<void> {
  await reviewRepository.client.review.deleteMany();
}

export async function seedReviews(
  reviewRepository: ReviewRepository,
  trainings: TrainingEntity[],
  sportsmans: FitUserEntity[]
): Promise<ReviewEntity[]> {
  const reviews: ReviewEntity[] = [];

  /*
  for (const { id: userId } of sportsmans) {
    const trainingsCount = getRandomNumber(MIN_COUNT, MAX_COUNT);

    for (let trainingIndex = 1; trainingIndex <= trainingsCount; trainingIndex++) {
      const trainingIndexPrefix = `#${trainingGlobalIndex}-${trainingIndex}`;

      //! потом можно создавать через DTO и сервис, указав id-пользователя и не указывая не нужные поля - rating
      const training: Training = {
        title: `Training title ${trainingIndexPrefix}`,
        backgroundPath: getRandomItem(MOCK_TRAININGS_BACKGROUND_PATHS),
        trainingLevel: getRandomEnumItem(TrainingLevel),
        specialization: getRandomEnumItem(Specialization),
        duration: getRandomEnumItem(Duration),
        price: getRandomNumber(MIN_PRICE, MAX_PRICE),
        caloriesWaste: getRandomNumber(MIN_CALORIES, MAX_CALORIES),
        description: `Training description ${trainingIndexPrefix}`,
        gender: getRandomEnumItem(Gender),
        videoFileId: '1111-2222-3333-4444', //! как бы видео загрузить на file-storage....
        userId,
        rating: getRandomNumber(MIN_RATING, MAX_RATING), //! временно, пока нет сервиса для пересчета рейтинга...
        //! возможно так и отсавить... следующая добавленная оценка расчитает корректный рейтинг
        //! или сформировать отзывы и актуализировать райтинг
        isSpecial: getRandomBoolean(),
        createdAt: getRandomDate(MIN_DATE, MAX_DATE)
      }
      const trainingEntity = new TrainingEntity(training);

      await trainingRepository.save(trainingEntity);
      trainings.push(trainingEntity);

      Logger.log(`Added training: ${trainingEntity.id} for coachId: ${userId}`);
    }
    trainingGlobalIndex++;
  }
  */

  return reviews;
}

-- CreateTable
CREATE TABLE "questionnaires" (
    "user_id" VARCHAR(50) NOT NULL,
    "specializations" VARCHAR(50)[],
    "training_level" VARCHAR(50) NOT NULL,
    "ready_for_training" BOOLEAN NOT NULL,
    "duration" VARCHAR(50),
    "calories_lose" INTEGER,
    "calories_waste" INTEGER,
    "file_ids" VARCHAR(50)[],
    "description" VARCHAR(5000),
    "individual_training" BOOLEAN,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "questionnaires_pkey" PRIMARY KEY ("user_id")
);

-- CreateTable
CREATE TABLE "trainings" (
    "id" VARCHAR(50) NOT NULL,
    "title" VARCHAR(50) NOT NULL,
    "background_path" VARCHAR(100) NOT NULL,
    "training_level" VARCHAR(50) NOT NULL,
    "specialization" VARCHAR(50) NOT NULL,
    "duration" VARCHAR(50) NOT NULL,
    "price" INTEGER NOT NULL,
    "calories_waste" INTEGER NOT NULL,
    "description" VARCHAR(200) NOT NULL,
    "gender" VARCHAR(50) NOT NULL,
    "video_file_id" VARCHAR(50) NOT NULL,
    "rating" DOUBLE PRECISION NOT NULL DEFAULT 0,
    "user_id" VARCHAR(50) NOT NULL,
    "is_special" BOOLEAN NOT NULL DEFAULT false,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "trainings_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "orders" (
    "id" VARCHAR(50) NOT NULL,
    "user_id" VARCHAR(50) NOT NULL,
    "type" VARCHAR(50) NOT NULL,
    "training_id" VARCHAR(50) NOT NULL,
    "training_price" INTEGER NOT NULL,
    "count" INTEGER NOT NULL,
    "sum" INTEGER NOT NULL,
    "payment_method" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "orders_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "reviews" (
    "id" VARCHAR(50) NOT NULL,
    "user_id" VARCHAR(50) NOT NULL,
    "training_id" VARCHAR(50) NOT NULL,
    "rating" INTEGER NOT NULL,
    "message" VARCHAR(1200) NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "reviews_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "subscriptions" (
    "id" VARCHAR(50) NOT NULL,
    "user_id" VARCHAR(50) NOT NULL,
    "coach_id" VARCHAR(50) NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "canceled_at" TIMESTAMP(3),

    CONSTRAINT "subscriptions_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "questionnaires_user_id_key" ON "questionnaires"("user_id");

-- CreateIndex
CREATE INDEX "questionnaires_user_id_idx" ON "questionnaires"("user_id");

-- CreateIndex
CREATE INDEX "questionnaires_specializations_idx" ON "questionnaires"("specializations");

-- CreateIndex
CREATE INDEX "questionnaires_training_level_idx" ON "questionnaires"("training_level");

-- CreateIndex
CREATE INDEX "questionnaires_ready_for_training_idx" ON "questionnaires"("ready_for_training");

-- CreateIndex
CREATE INDEX "questionnaires_duration_idx" ON "questionnaires"("duration");

-- CreateIndex
CREATE INDEX "questionnaires_individual_training_idx" ON "questionnaires"("individual_training");

-- CreateIndex
CREATE INDEX "questionnaires_created_at_idx" ON "questionnaires"("created_at");

-- CreateIndex
CREATE INDEX "trainings_training_level_idx" ON "trainings"("training_level");

-- CreateIndex
CREATE INDEX "trainings_specialization_idx" ON "trainings"("specialization");

-- CreateIndex
CREATE INDEX "trainings_duration_idx" ON "trainings"("duration");

-- CreateIndex
CREATE INDEX "trainings_price_idx" ON "trainings"("price");

-- CreateIndex
CREATE INDEX "trainings_gender_idx" ON "trainings"("gender");

-- CreateIndex
CREATE INDEX "trainings_rating_idx" ON "trainings"("rating");

-- CreateIndex
CREATE INDEX "trainings_user_id_idx" ON "trainings"("user_id");

-- CreateIndex
CREATE INDEX "trainings_is_special_idx" ON "trainings"("is_special");

-- CreateIndex
CREATE INDEX "trainings_created_at_idx" ON "trainings"("created_at");

-- CreateIndex
CREATE INDEX "orders_user_id_idx" ON "orders"("user_id");

-- CreateIndex
CREATE INDEX "orders_training_id_idx" ON "orders"("training_id");

-- CreateIndex
CREATE INDEX "orders_user_id_training_id_idx" ON "orders"("user_id", "training_id");

-- CreateIndex
CREATE INDEX "orders_created_at_idx" ON "orders"("created_at");

-- CreateIndex
CREATE INDEX "reviews_training_id_idx" ON "reviews"("training_id");

-- CreateIndex
CREATE INDEX "reviews_user_id_idx" ON "reviews"("user_id");

-- CreateIndex
CREATE UNIQUE INDEX "reviews_user_id_training_id_key" ON "reviews"("user_id", "training_id");

-- CreateIndex
CREATE INDEX "subscriptions_user_id_coach_id_created_at_canceled_at_idx" ON "subscriptions"("user_id", "coach_id", "created_at", "canceled_at");

-- AddForeignKey
ALTER TABLE "orders" ADD CONSTRAINT "orders_training_id_fkey" FOREIGN KEY ("training_id") REFERENCES "trainings"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "reviews" ADD CONSTRAINT "reviews_training_id_fkey" FOREIGN KEY ("training_id") REFERENCES "trainings"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

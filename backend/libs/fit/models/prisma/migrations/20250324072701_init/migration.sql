-- CreateTable
CREATE TABLE "questionnaires" (
    "id" TEXT NOT NULL,
    "user_id" VARCHAR(50) NOT NULL,
    "specializations" VARCHAR(50)[],
    "level" VARCHAR(50) NOT NULL,
    "time" VARCHAR(50),
    "calories_lose" INTEGER,
    "calories_waste" INTEGER,
    "file_ids" VARCHAR(50)[],
    "description" VARCHAR(5000),
    "individual_training" BOOLEAN,

    CONSTRAINT "questionnaires_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "questionnaires_user_id_key" ON "questionnaires"("user_id");

-- CreateIndex
CREATE INDEX "questionnaires_user_id_idx" ON "questionnaires"("user_id");

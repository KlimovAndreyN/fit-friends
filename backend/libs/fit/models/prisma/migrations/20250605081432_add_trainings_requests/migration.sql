-- CreateTable
CREATE TABLE "trainings_requests" (
    "id" VARCHAR(50) NOT NULL,
    "initiator_id" VARCHAR(50) NOT NULL,
    "user_id" VARCHAR(50) NOT NULL,
    "status" VARCHAR(50) NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "trainings_requests_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "trainings_requests_initiator_id_user_id_idx" ON "trainings_requests"("initiator_id", "user_id");

-- CreateIndex
CREATE INDEX "trainings_requests_initiator_id_idx" ON "trainings_requests"("initiator_id");

-- CreateIndex
CREATE INDEX "trainings_requests_user_id_idx" ON "trainings_requests"("user_id");

-- CreateIndex
CREATE INDEX "trainings_requests_created_at_idx" ON "trainings_requests"("created_at");

-- CreateIndex
CREATE INDEX "trainings_requests_updated_at_idx" ON "trainings_requests"("updated_at");

-- CreateIndex
CREATE UNIQUE INDEX "trainings_requests_initiator_id_user_id_key" ON "trainings_requests"("initiator_id", "user_id");

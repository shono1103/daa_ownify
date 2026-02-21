-- CreateEnum
CREATE TYPE "AppListingRequestStatus" AS ENUM ('PENDING', 'APPROVED', 'REJECTED');

-- CreateTable
CREATE TABLE "app_listing_requests" (
    "id" SERIAL NOT NULL,
    "application_id" INTEGER NOT NULL,
    "requested_by_user_id" INTEGER NOT NULL,
    "status" "AppListingRequestStatus" NOT NULL DEFAULT 'PENDING',
    "reviewed_by_user_id" INTEGER,
    "reviewed_at" TIMESTAMP(3),
    "note" TEXT,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "app_listing_requests_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "app_listing_requests_application_id_idx" ON "app_listing_requests"("application_id");

-- CreateIndex
CREATE INDEX "app_listing_requests_requested_by_user_id_idx" ON "app_listing_requests"("requested_by_user_id");

-- CreateIndex
CREATE INDEX "app_listing_requests_reviewed_by_user_id_idx" ON "app_listing_requests"("reviewed_by_user_id");

-- CreateIndex
CREATE INDEX "app_listing_requests_status_idx" ON "app_listing_requests"("status");

-- AddForeignKey
ALTER TABLE "app_listing_requests" ADD CONSTRAINT "app_listing_requests_application_id_fkey" FOREIGN KEY ("application_id") REFERENCES "Application"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "app_listing_requests" ADD CONSTRAINT "app_listing_requests_requested_by_user_id_fkey" FOREIGN KEY ("requested_by_user_id") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "app_listing_requests" ADD CONSTRAINT "app_listing_requests_reviewed_by_user_id_fkey" FOREIGN KEY ("reviewed_by_user_id") REFERENCES "User"("id") ON DELETE SET NULL ON UPDATE CASCADE;

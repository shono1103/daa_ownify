-- CreateTable
CREATE TABLE "app_symbol_account" (
    "application_id" INTEGER NOT NULL,

    CONSTRAINT "app_symbol_account_pkey" PRIMARY KEY ("application_id")
);

-- AddForeignKey
ALTER TABLE "app_symbol_account" ADD CONSTRAINT "app_symbol_account_application_id_fkey" FOREIGN KEY ("application_id") REFERENCES "Application"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AlterTable
ALTER TABLE "app_symbol_account"
ADD COLUMN "address" TEXT NOT NULL,
ADD COLUMN "public_key" TEXT NOT NULL,
ADD COLUMN "private_key" TEXT NOT NULL;

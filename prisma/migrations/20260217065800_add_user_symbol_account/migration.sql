-- CreateEnum
CREATE TYPE "SymbolNetwork" AS ENUM ('mainnet', 'testnet');

-- CreateTable
CREATE TABLE "UserSymbolAccount" (
    "id" SERIAL NOT NULL,
    "user_id" INTEGER NOT NULL,
    "network" "SymbolNetwork" NOT NULL,
    "public_key" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "UserSymbolAccount_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "UserSymbolAccount_user_id_network_key" ON "UserSymbolAccount"("user_id", "network");

-- CreateIndex
CREATE UNIQUE INDEX "UserSymbolAccount_public_key_key" ON "UserSymbolAccount"("public_key");

-- AddForeignKey
ALTER TABLE "UserSymbolAccount" ADD CONSTRAINT "UserSymbolAccount_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AlterTable
ALTER TABLE "User" ADD COLUMN     "ResetPasswordToken" TEXT,
ADD COLUMN     "ResetTokenExpiry" TIMESTAMP(3) DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "token" TEXT,
ADD COLUMN     "verifyTokenExpiry" TIMESTAMP(3) DEFAULT CURRENT_TIMESTAMP;

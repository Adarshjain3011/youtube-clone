-- AlterTable
ALTER TABLE "Video" ALTER COLUMN "duration" DROP NOT NULL,
ALTER COLUMN "duration" SET DATA TYPE TEXT;

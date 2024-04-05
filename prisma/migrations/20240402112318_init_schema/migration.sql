-- AlterTable
ALTER TABLE "Video" ADD COLUMN     "countWatchLater" INTEGER NOT NULL DEFAULT 0;

-- CreateTable
CREATE TABLE "watchLaterOnVideos" (
    "videoId" TEXT NOT NULL,
    "watchedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "userId" TEXT NOT NULL,

    CONSTRAINT "watchLaterOnVideos_pkey" PRIMARY KEY ("videoId","userId")
);

-- AddForeignKey
ALTER TABLE "watchLaterOnVideos" ADD CONSTRAINT "watchLaterOnVideos_videoId_fkey" FOREIGN KEY ("videoId") REFERENCES "Video"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "watchLaterOnVideos" ADD CONSTRAINT "watchLaterOnVideos_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

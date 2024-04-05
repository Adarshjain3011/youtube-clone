/*
  Warnings:

  - You are about to drop the column `description` on the `Playlist` table. All the data in the column will be lost.
  - You are about to drop the column `name` on the `PlaylistVideo` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Playlist" DROP COLUMN "description";

-- AlterTable
ALTER TABLE "PlaylistVideo" DROP COLUMN "name";

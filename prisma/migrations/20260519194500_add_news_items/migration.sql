-- CreateTable
CREATE TABLE "NewsItem" (
    "id" SERIAL NOT NULL,
    "residentialComplexId" INTEGER,
    "title" TEXT NOT NULL,
    "slug" TEXT NOT NULL,
    "excerpt" TEXT,
    "content" TEXT[] DEFAULT ARRAY[]::TEXT[],
    "image" TEXT,
    "label" TEXT NOT NULL DEFAULT 'Новости',
    "type" TEXT NOT NULL DEFAULT 'news',
    "isFeatured" BOOLEAN NOT NULL DEFAULT false,
    "isPublished" BOOLEAN NOT NULL DEFAULT true,
    "sortOrder" INTEGER NOT NULL DEFAULT 0,
    "publishedAt" TIMESTAMP(3),
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "NewsItem_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "NewsItem_slug_key" ON "NewsItem"("slug");

-- CreateIndex
CREATE INDEX "NewsItem_type_idx" ON "NewsItem"("type");

-- CreateIndex
CREATE INDEX "NewsItem_isPublished_publishedAt_idx" ON "NewsItem"("isPublished", "publishedAt");

-- AddForeignKey
ALTER TABLE "NewsItem" ADD CONSTRAINT "NewsItem_residentialComplexId_fkey" FOREIGN KEY ("residentialComplexId") REFERENCES "ResidentialComplex"("id") ON DELETE SET NULL ON UPDATE CASCADE;

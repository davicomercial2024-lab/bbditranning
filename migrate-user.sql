CREATE TABLE "User" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "email" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "role" TEXT NOT NULL DEFAULT 'student',
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL
);
CREATE UNIQUE INDEX "User_email_key" ON "User"("email");

ALTER TABLE "Student" ADD COLUMN "userId" TEXT REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;
CREATE UNIQUE INDEX "Student_userId_key" ON "Student"("userId");

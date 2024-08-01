-- CreateTable
CREATE TABLE "employees" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "firstname" TEXT NOT NULL,
    "lastname" TEXT NOT NULL,
    "employeenumber" INTEGER NOT NULL,
    "salary" REAL NOT NULL,
    "country" TEXT NOT NULL
);

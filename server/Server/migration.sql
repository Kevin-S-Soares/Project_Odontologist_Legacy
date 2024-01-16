CREATE TABLE "Odontologists" (
    "Id" INTEGER NOT NULL CONSTRAINT "PK_Odontologists" PRIMARY KEY AUTOINCREMENT,
    "Name" TEXT NOT NULL,
    "Phone" TEXT NOT NULL,
    "Email" TEXT NOT NULL
);


CREATE TABLE "Users" (
    "Id" INTEGER NOT NULL CONSTRAINT "PK_Users" PRIMARY KEY AUTOINCREMENT,
    "Email" TEXT NOT NULL,
    "PasswordHash" BLOB NOT NULL,
    "PasswordSalt" BLOB NOT NULL,
    "VerificationToken" TEXT NULL,
    "VerifiedAt" TEXT NULL,
    "PasswordResetToken" TEXT NULL,
    "ResetTokenExpires" TEXT NULL,
    "Role" TEXT NOT NULL,
    "OdontologistId" INTEGER NOT NULL
);


CREATE TABLE "Schedules" (
    "Id" INTEGER NOT NULL CONSTRAINT "PK_Schedules" PRIMARY KEY AUTOINCREMENT,
    "OdontologistId" INTEGER NOT NULL,
    "Name" TEXT NOT NULL,
    "StartDay" INTEGER NOT NULL,
    "StartTime" TEXT NOT NULL,
    "EndDay" INTEGER NOT NULL,
    "EndTime" TEXT NOT NULL,
    CONSTRAINT "FK_Schedules_Odontologists_OdontologistId" FOREIGN KEY ("OdontologistId") REFERENCES "Odontologists" ("Id") ON DELETE CASCADE
);


CREATE TABLE "Appointments" (
    "Id" INTEGER NOT NULL CONSTRAINT "PK_Appointments" PRIMARY KEY AUTOINCREMENT,
    "ScheduleId" INTEGER NOT NULL,
    "Start" TEXT NOT NULL,
    "End" TEXT NOT NULL,
    "PatientName" TEXT NOT NULL,
    "Description" TEXT NOT NULL,
    CONSTRAINT "FK_Appointments_Schedules_ScheduleId" FOREIGN KEY ("ScheduleId") REFERENCES "Schedules" ("Id") ON DELETE CASCADE
);


CREATE TABLE "BreakTimes" (
    "Id" INTEGER NOT NULL CONSTRAINT "PK_BreakTimes" PRIMARY KEY AUTOINCREMENT,
    "ScheduleId" INTEGER NOT NULL,
    "Name" TEXT NOT NULL,
    "StartDay" INTEGER NOT NULL,
    "StartTime" TEXT NOT NULL,
    "EndDay" INTEGER NOT NULL,
    "EndTime" TEXT NOT NULL,
    CONSTRAINT "FK_BreakTimes_Schedules_ScheduleId" FOREIGN KEY ("ScheduleId") REFERENCES "Schedules" ("Id") ON DELETE CASCADE
);


INSERT INTO "Odontologists" ("Id", "Email", "Name", "Phone")
VALUES (1, 'john@blue.com', 'John Blue', '(011) 91111-1111');
INSERT INTO "Odontologists" ("Id", "Email", "Name", "Phone")
VALUES (2, 'maria@yellow.com', 'Maria Yellow', '(011) 92222-2222');


INSERT INTO "Schedules" ("Id", "EndDay", "EndTime", "Name", "OdontologistId", "StartDay", "StartTime")
VALUES (1, 1, '18:00:00', 'Monday', 1, 1, '09:00:00');
INSERT INTO "Schedules" ("Id", "EndDay", "EndTime", "Name", "OdontologistId", "StartDay", "StartTime")
VALUES (2, 2, '18:00:00', 'Tuesday', 1, 2, '09:00:00');
INSERT INTO "Schedules" ("Id", "EndDay", "EndTime", "Name", "OdontologistId", "StartDay", "StartTime")
VALUES (3, 4, '06:00:00', 'Wednesday-Thursday', 2, 3, '21:00:00');
INSERT INTO "Schedules" ("Id", "EndDay", "EndTime", "Name", "OdontologistId", "StartDay", "StartTime")
VALUES (4, 5, '06:00:00', 'Thursday-Friday', 2, 4, '21:00:00');


INSERT INTO "Appointments" ("Id", "Description", "End", "PatientName", "ScheduleId", "Start")
VALUES (1, 'Cleaning', '2023-01-02 09:15:00', 'Bob Brown', 1, '2023-01-02 09:00:00');
INSERT INTO "Appointments" ("Id", "Description", "End", "PatientName", "ScheduleId", "Start")
VALUES (2, 'Cleaning', '2023-01-03 09:15:00', 'Anna Red', 2, '2023-01-03 09:00:00');
INSERT INTO "Appointments" ("Id", "Description", "End", "PatientName", "ScheduleId", "Start")
VALUES (3, 'Treatment', '2023-01-04 21:15:00', 'Peter Green', 3, '2023-01-04 21:00:00');
INSERT INTO "Appointments" ("Id", "Description", "End", "PatientName", "ScheduleId", "Start")
VALUES (4, 'Treatment', '2023-01-05 21:15:00', 'Lara White', 4, '2023-01-05 21:00:00');


INSERT INTO "BreakTimes" ("Id", "EndDay", "EndTime", "Name", "ScheduleId", "StartDay", "StartTime")
VALUES (1, 1, '13:00:00', 'Lunch', 1, 1, '12:00:00');
INSERT INTO "BreakTimes" ("Id", "EndDay", "EndTime", "Name", "ScheduleId", "StartDay", "StartTime")
VALUES (2, 2, '13:00:00', 'Lunch', 2, 2, '12:00:00');
INSERT INTO "BreakTimes" ("Id", "EndDay", "EndTime", "Name", "ScheduleId", "StartDay", "StartTime")
VALUES (3, 4, '01:00:00', 'Dinner', 3, 4, '00:00:00');
INSERT INTO "BreakTimes" ("Id", "EndDay", "EndTime", "Name", "ScheduleId", "StartDay", "StartTime")
VALUES (4, 5, '01:00:00', 'Dinner', 4, 5, '00:00:00');


CREATE INDEX "IX_Appointments_ScheduleId" ON "Appointments" ("ScheduleId");


CREATE INDEX "IX_BreakTimes_ScheduleId" ON "BreakTimes" ("ScheduleId");


CREATE INDEX "IX_Schedules_OdontologistId" ON "Schedules" ("OdontologistId");



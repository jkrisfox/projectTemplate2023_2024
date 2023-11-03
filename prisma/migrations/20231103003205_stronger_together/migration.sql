/*
  Warnings:

  - Added the required column `name` to the `User` table without a default value. This is not possible if the table is not empty.

*/
-- CreateEnum
CREATE TYPE "FriendshipStatus" AS ENUM ('PENDING', 'ACCEPTED', 'DECLINED', 'BLOCKED');

-- CreateEnum
CREATE TYPE "VoteType" AS ENUM ('UPVOTE', 'DOWNVOTE');

-- AlterTable
ALTER TABLE "User" ADD COLUMN     "ProfileImage" BYTEA,
ADD COLUMN     "experience" TEXT,
ADD COLUMN     "name" TEXT NOT NULL,
ADD COLUMN     "verified" BOOLEAN;

-- CreateTable
CREATE TABLE "Friendship" (
    "initiatorId" INTEGER NOT NULL,
    "recipientId" INTEGER NOT NULL,
    "status" "FriendshipStatus" NOT NULL DEFAULT 'PENDING',

    CONSTRAINT "Friendship_pkey" PRIMARY KEY ("initiatorId","recipientId")
);

-- CreateTable
CREATE TABLE "Interest" (
    "Id" SERIAL NOT NULL,
    "interest" TEXT NOT NULL,
    "userId" INTEGER NOT NULL,

    CONSTRAINT "Interest_pkey" PRIMARY KEY ("Id")
);

-- CreateTable
CREATE TABLE "Post" (
    "id" SERIAL NOT NULL,
    "postTitle" TEXT NOT NULL,
    "postDescription" TEXT NOT NULL,
    "authorId" INTEGER NOT NULL,

    CONSTRAINT "Post_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Votes" (
    "id" SERIAL NOT NULL,
    "type" "VoteType" NOT NULL,
    "postId" INTEGER NOT NULL,
    "userId" INTEGER NOT NULL,

    CONSTRAINT "Votes_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Comment" (
    "id" SERIAL NOT NULL,
    "comment" TEXT NOT NULL,
    "postId" INTEGER NOT NULL,
    "userId" INTEGER NOT NULL,

    CONSTRAINT "Comment_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "PostFilters" (
    "id" SERIAL NOT NULL,
    "postId" INTEGER NOT NULL,
    "possibleFilterId" INTEGER NOT NULL,

    CONSTRAINT "PostFilters_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "PossibleFilters" (
    "id" SERIAL NOT NULL,
    "filterType" TEXT NOT NULL,

    CONSTRAINT "PossibleFilters_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Event" (
    "id" SERIAL NOT NULL,
    "eventName" TEXT NOT NULL,
    "location" TEXT NOT NULL,
    "startTime" TIMESTAMP(3) NOT NULL,
    "endTime" TIMESTAMP(3) NOT NULL,
    "maxAttendee" INTEGER NOT NULL,
    "hostId" INTEGER NOT NULL,

    CONSTRAINT "Event_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "EventFilter" (
    "id" SERIAL NOT NULL,
    "eventId" INTEGER NOT NULL,
    "possibleFilterId" INTEGER NOT NULL,

    CONSTRAINT "EventFilter_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Equipments" (
    "id" SERIAL NOT NULL,
    "equipmentName" TEXT NOT NULL,
    "short_description" TEXT NOT NULL,
    "long_description" TEXT NOT NULL,
    "image_path" TEXT NOT NULL,

    CONSTRAINT "Equipments_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "_Attendee" (
    "A" INTEGER NOT NULL,
    "B" INTEGER NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "Votes_postId_userId_key" ON "Votes"("postId", "userId");

-- CreateIndex
CREATE UNIQUE INDEX "PostFilters_postId_possibleFilterId_key" ON "PostFilters"("postId", "possibleFilterId");

-- CreateIndex
CREATE UNIQUE INDEX "PossibleFilters_filterType_key" ON "PossibleFilters"("filterType");

-- CreateIndex
CREATE UNIQUE INDEX "Event_hostId_key" ON "Event"("hostId");

-- CreateIndex
CREATE UNIQUE INDEX "EventFilter_eventId_possibleFilterId_key" ON "EventFilter"("eventId", "possibleFilterId");

-- CreateIndex
CREATE UNIQUE INDEX "_Attendee_AB_unique" ON "_Attendee"("A", "B");

-- CreateIndex
CREATE INDEX "_Attendee_B_index" ON "_Attendee"("B");

-- AddForeignKey
ALTER TABLE "Friendship" ADD CONSTRAINT "Friendship_initiatorId_fkey" FOREIGN KEY ("initiatorId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Friendship" ADD CONSTRAINT "Friendship_recipientId_fkey" FOREIGN KEY ("recipientId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Interest" ADD CONSTRAINT "Interest_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Post" ADD CONSTRAINT "Post_authorId_fkey" FOREIGN KEY ("authorId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Votes" ADD CONSTRAINT "Votes_postId_fkey" FOREIGN KEY ("postId") REFERENCES "Post"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Votes" ADD CONSTRAINT "Votes_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Comment" ADD CONSTRAINT "Comment_postId_fkey" FOREIGN KEY ("postId") REFERENCES "Post"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Comment" ADD CONSTRAINT "Comment_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "PostFilters" ADD CONSTRAINT "PostFilters_postId_fkey" FOREIGN KEY ("postId") REFERENCES "Post"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "PostFilters" ADD CONSTRAINT "PostFilters_possibleFilterId_fkey" FOREIGN KEY ("possibleFilterId") REFERENCES "PossibleFilters"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Event" ADD CONSTRAINT "Event_hostId_fkey" FOREIGN KEY ("hostId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "EventFilter" ADD CONSTRAINT "EventFilter_eventId_fkey" FOREIGN KEY ("eventId") REFERENCES "Event"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "EventFilter" ADD CONSTRAINT "EventFilter_possibleFilterId_fkey" FOREIGN KEY ("possibleFilterId") REFERENCES "PossibleFilters"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_Attendee" ADD CONSTRAINT "_Attendee_A_fkey" FOREIGN KEY ("A") REFERENCES "Event"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_Attendee" ADD CONSTRAINT "_Attendee_B_fkey" FOREIGN KEY ("B") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

INSERT INTO "Equipments" ("equipmentName", "short_description", "long_description", "image_path") 
VALUES 
  ('Treadmill', 'A cardio machine for running or walking indoors.', 'The treadmill is a versatile cardio machine that can be used for running or walking. To get started, set the speed and incline levels to match your fitness level. For safety, always use the attached safety clip, maintain an upright posture, and avoid leaning on the handrails. This machine is perfect for improving cardiovascular endurance and burning calories. Keep a steady pace and gradually increase the intensity as you progress on your fitness journey.', './treadmill.jpg'), 
  ('Elliptical Trainer', 'Low-impact machine for full-body workouts.', 'The elliptical trainer is an excellent low-impact machine that offers a full-body workout. Adjust the resistance level to challenge yourself. For the best results, maintain proper form by keeping your back straight and your core engaged. Avoid leaning on the handrails, as this reduces the effectiveness of the workout. This equipment is perfect for those looking to improve cardiovascular fitness without excessive impact on the joints.', './elliptical_trainer.jpg'), 
  ('Stationary Bike', 'Great for cardiovascular workouts and leg strength.', 'The stationary bike is a fantastic choice for cardiovascular workouts and strengthening leg muscles. Adjust the resistance level and pedal at a comfortable pace. Ensure proper form by keeping your back straight, and consider using pedal straps to secure your feet for added stability. This machine is ideal for those seeking to improve endurance and leg strength in a joint-friendly way.', './stationary_bike.jpg'), 
  ('Leg Press Machine', 'Strengthens leg muscles and glutes.', 'The leg press machine is perfect for strengthening your leg muscles, including quadriceps, hamstrings, and glutes. Adjust the weight to your preference, and ensure that your feet are shoulder-width apart on the footplate. Push the weight while maintaining your back against the backrest. This machine is essential for developing lower body strength and muscle tone.', './leg_press_machine.jpg'), 
  ('Chest Press Machine', 'Targets chest and triceps muscles.', 'The chest press machine focuses on working your chest and triceps. Customize your settings by adjusting the seat and grip handles to your comfort. When using the machine, keep your back against the backrest, exhale while pushing, and maintain control during the entire motion. This equipment is excellent for building chest and triceps strength.', './chest_press_machine.jpg'), 
  ('Lat Pulldown Machine', 'Works the upper back and biceps.', 'The lat pulldown machine is highly effective for targeting the upper back and biceps. Customize your workout by adjusting the seat and selecting an appropriate weight. Maintain proper form by keeping your back straight, pulling the bar down to your chest, and controlling the motion as you release it. This equipment is perfect for developing a strong and defined upper back.', './lat_pulldown_machine.jpg'), 
  ('Rowing Machine', 'Full-body cardio and strength workout.', 'The rowing machine offers a full-body workout that combines cardiovascular exercise with strength training. Start by setting the resistance to your liking. To ensure safety and effectiveness, focus on maintaining proper rowing technique. This equipment is excellent for improving cardiovascular fitness, building strength, and toning multiple muscle groups simultaneously.', './rowing_machine.jpg'), 
  ('Smith Machine', 'Versatile for various strength exercises.', 'The Smith machine is a versatile piece of equipment that allows for a wide range of strength exercises. It features a barbell attached to a guided track, providing stability and safety during exercises like squats, bench presses, and lunges. Customize your workouts by adjusting the weight and bar height. Proper form and control are crucial for effective and safe training on this machine.', './smith_machine.jpg'), 
  ('Stair Climber', 'Cardio and lower body workout.', 'The stair climber is a great option for cardiovascular exercise and lower body strength. Start with a comfortable speed and gradually increase the intensity. Maintain an upright posture during your workout. Using this machine is a fantastic way to improve endurance and sculpt your legs. Always practice safety by using the handrails as needed.', './stair_climber.jpg'), 
  ('Leg Extension Machine', 'Isolate quadriceps for strength and tone.', 'The leg extension machine is designed to isolate and strengthen the quadriceps muscles. Set the weight to your desired level', './stair_climber.jpg');
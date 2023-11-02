-- CreateTable
CREATE TABLE "ToDo" (
    "id" SERIAL NOT NULL,
    "value" TEXT NOT NULL,
    "done" BOOLEAN NOT NULL,
    "ownerId" INTEGER NOT NULL,

    CONSTRAINT "ToDo_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "ToDo" ADD CONSTRAINT "ToDo_ownerId_fkey" FOREIGN KEY ("ownerId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

CREATE TABLE "Equipment" (
  "id" SERIAL PRIMARY KEY,
  "name" VARCHAR(255) NOT NULL,
  "short" TEXT,
  "long" TEXT,
  "image_path" VARCHAR(255)
);


INSERT INTO "Equipment" (name, short_description, long_description, image_path)
VALUES
  ('Treadmill', 'A cardio machine for running or walking indoors.', 'The treadmill is a versatile cardio machine that can be used for running or walking. To get started, set the speed and incline levels to match your fitness level. For safety, always use the attached safety clip, maintain an upright posture, and avoid leaning on the handrails. This machine is perfect for improving cardiovascular endurance and burning calories. Keep a steady pace and gradually increase the intensity as you progress on your fitness journey.', './treadmill'),

  ('Elliptical Trainer', 'Low-impact machine for full-body workouts.', 'The elliptical trainer is an excellent low-impact machine that offers a full-body workout. Adjust the resistance level to challenge yourself. For the best results, maintain proper form by keeping your back straight and your core engaged. Avoid leaning on the handrails, as this reduces the effectiveness of the workout. This equipment is perfect for those looking to improve cardiovascular fitness without excessive impact on the joints.', './elliptical_trainer'),

  ('Stationary Bike', 'Great for cardiovascular workouts and leg strength.', 'The stationary bike is a fantastic choice for cardiovascular workouts and strengthening leg muscles. Adjust the resistance level and pedal at a comfortable pace. Ensure proper form by keeping your back straight, and consider using pedal straps to secure your feet for added stability. This machine is ideal for those seeking to improve endurance and leg strength in a joint-friendly way.', './stationary_bike'),

  ('Leg Press Machine', 'Strengthens leg muscles and glutes.', 'The leg press machine is perfect for strengthening your leg muscles, including quadriceps, hamstrings, and glutes. Adjust the weight to your preference, and ensure that your feet are shoulder-width apart on the footplate. Push the weight while maintaining your back against the backrest. This machine is essential for developing lower body strength and muscle tone.', './leg_press_machine')

  ('Chest Press Machine', 'Targets chest and triceps muscles.', 'The chest press machine focuses on working your chest and triceps. Customize your settings by adjusting the seat and grip handles to your comfort. When using the machine, keep your back against the backrest, exhale while pushing, and maintain control during the entire motion. This equipment is excellent for building chest and triceps strength.', './chest_press_machine'),

  ('Lat Pulldown Machine', 'Works the upper back and biceps.', 'The lat pulldown machine is highly effective for targeting the upper back and biceps. Customize your workout by adjusting the seat and selecting an appropriate weight. Maintain proper form by keeping your back straight, pulling the bar down to your chest, and controlling the motion as you release it. This equipment is perfect for developing a strong and defined upper back.', './lat_pulldown_machine'),

  ('Rowing Machine', 'Full-body cardio and strength workout.', 'The rowing machine offers a full-body workout that combines cardiovascular exercise with strength training. Start by setting the resistance to your liking. To ensure safety and effectiveness, focus on maintaining proper rowing technique. This equipment is excellent for improving cardiovascular fitness, building strength, and toning multiple muscle groups simultaneously.', './rowing_machine'),

  ('Smith Machine', 'Versatile for various strength exercises.', 'The Smith machine is a versatile piece of equipment that allows for a wide range of strength exercises. It features a barbell attached to a guided track, providing stability and safety during exercises like squats, bench presses, and lunges. Customize your workouts by adjusting the weight and bar height. Proper form and control are crucial for effective and safe training on this machine.', './smith_machine'),

  ('Stair Climber', 'Cardio and lower body workout.', 'The stair climber is a great option for cardiovascular exercise and lower body strength. Start with a comfortable speed and gradually increase the intensity. Maintain an upright posture during your workout. Using this machine is a fantastic way to improve endurance and sculpt your legs. Always practice safety by using the handrails as needed.', './stair_climber'),

  ('Leg Extension Machine', 'Isolate quadriceps for strength and tone.', 'The leg extension machine is designed to isolate and strengthen the quadriceps muscles. Set the weight to your desired level and secure your legs under the padded bar. Extend your legs fully while maintaining control during both the upward and downward motion. This machine is a key tool for developing well-defined quadriceps.', './leg_extension_machine'),

  ('Leg Curl Machine', 'Targets hamstring and calf muscles.', 'The leg curl machine is ideal for targeting your hamstring and calf muscles. Adjust the machine to your preferences and ensure your legs are securely positioned under the padded rollers. Curl your legs while keeping your back against the bench. This equipment is crucial for building strong and toned hamstrings and calves.', './leg_curl_machine'),

  ('Dumbbell Set', 'Versatile for various strength exercises.', 'A set of dumbbells is one of the most versatile pieces of equipment in the gym. Use them for exercises such as bicep curls, tricep extensions, shoulder presses, and more. Select the appropriate weight for each exercise and focus on proper form to avoid injury. Dumbbells are essential for building strength and sculpting various muscle groups.', './dumbbell_set'),

  ('Cable Crossover Machine', 'Ideal for cable-based exercises.', 'The cable crossover machine allows you to perform a wide range of cable-based exercises. Adjust the pulleys and attachments as needed for exercises like chest flies, cable curls, and tricep pushdowns. Focus on maintaining control and proper form for each movement. This machine is excellent for targeting specific muscle groups with cable resistance.', './cable_crossover_machine'),

  ('Barbell', 'A versatile tool for strength training.', 'The barbell is a versatile piece of equipment used for a wide range of strength exercises, including bench presses, squats, deadlifts, and more. Load the bar with the desired weight plates and ensure proper form while lifting. Always use a spotter for safety during heavy lifts. Barbells are essential for building overall strength and muscle.', './barbell'),

  ('Pull-up Bar', 'Upper body and core workout.', 'The pull-up bar is excellent for targeting the upper body and core. Perform exercises like pull-ups, chin-ups, and hanging leg raises to strengthen your back, arms, and abdominal muscles. Use proper grip and form during exercises, and gradually increase your repetitions for continuous improvement.', './pull_up_bar'),

  ('Smith Machine', 'Versatile for various strength exercises.', 'The Smith machine is a versatile piece of equipment that allows for a wide range of strength exercises. It features a barbell attached to a guided track, providing stability and safety during exercises like squats, bench presses, and lunges. Customize your workouts by adjusting the weight and bar height. Proper form and control are crucial for effective and safe training on this machine.', './smith_machine_2'),

  ('Seated Leg Press', 'Strengthen your leg muscles.', 'The seated leg press is a great machine for targeting and strengthening your leg muscles. Adjust the seat and choose your desired weight. Keep your feet shoulder-width apart on the footplate and push the weight upward. Maintain proper posture throughout the movement for safety and effective results.', './seated_leg_press'),

  ('Lat Pulldown Machine', 'Works the upper back and biceps.', 'The lat pulldown machine is highly effective for targeting the upper back and biceps. Customize your workout by adjusting the seat and selecting an appropriate weight. Maintain proper form by keeping your back straight, pulling the bar down to your chest, and controlling the motion as you release it. This equipment is perfect for developing a strong and defined upper back.', './lat_pulldown_machine_2'),

  ('Kettlebells', 'Dynamic and versatile free weights.', 'Kettlebells are versatile free weights that allow you to perform dynamic and full-body exercises such as kettlebell swings, goblet squats, and Turkish get-ups. Choose the appropriate weight for your fitness level and use proper form to avoid injury. Kettlebells are great for improving strength, power, and coordination.', './kettlebells'),

  ('Leg Extension Machine', 'Isolate quadriceps for strength and tone.', 'The leg extension machine is designed to isolate and strengthen the quadriceps muscles. Set the weight to your desired level and secure your legs under the padded bar. Extend your legs fully while maintaining control during both the upward and downward motion. This machine is a key tool for developing well-defined quadriceps.', './leg_extension_machine_2'),

  ('Leg Curl Machine', 'Targets hamstring and calf muscles.', 'The leg curl machine is ideal for targeting your hamstring and calf muscles. Adjust the machine to your preferences and ensure your legs are securely positioned under the padded rollers. Curl your legs while keeping your back against the bench. This equipment is crucial for building strong and toned hamstrings and calves.', './leg_curl_machine_2'),

  ('Cable Crossover Machine', 'Ideal for cable-based exercises.', 'The cable crossover machine allows you to perform a wide range of cable-based exercises. Adjust the pulleys and attachments as needed for exercises like chest flies, cable curls, and tricep pushdowns. Focus on maintaining control and proper form for each movement. This machine is excellent for targeting specific muscle groups with cable resistance.', './cable_crossover_machine_2'),

  ('Ab Roller', 'Strengthen your core muscles.', 'The ab roller is a compact yet effective tool for strengthening your core muscles. Kneel on the floor and roll the wheel forward while engaging your abdominal muscles. Maintain control and avoid overextending. This equipment is perfect for building a strong and stable core, which contributes to improved posture and functional fitness.', './ab_roller'),

  ('Smith Machine', 'Versatile for various strength exercises.', 'The Smith machine is a versatile piece of equipment that allows for a wide range of strength exercises. It features a barbell attached to a guided track, providing stability and safety during exercises like squats, bench presses, and lunges. Customize your workouts by adjusting the weight and bar height. Proper form and control are crucial for effective and safe training on this machine.', './smith_machine_3');

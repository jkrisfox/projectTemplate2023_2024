const bcrypt = require('bcryptjs');
const fs = require('fs');
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();



async function insertSeasons(name, start, end) {
    await prisma.season.create({
        data: {
            name: name, 
            start: start, 
            end: end,
        }
    });
    console.log(`inserted '${[name, start, end].join(", ")}'`);
}


async function seedSeasons() {
    console.log("seeding seasons...");

    const filepath = "db_seeding/seasons.csv";
    let data = fs.readFileSync(filepath, "utf8").split("\n");

    let name, start, end;
    for (const line of data) {
        [name, start, end] = line.split(", ");
        if (name && start && end) {
            const nameData = await prisma.season.findMany({
                where: {
                    name: {
                        equals: name
                    }
                }
            });

            if (nameData.length > 0) {
                console.log(`skipping '${name}' because it already exists`);
            }
            else {
                await insertSeasons(name, start, end);
            }
        }
    }

    console.log("finished seeding seasons\n");
}



async function insertUser(username, email, password) {
    await prisma.user.create({
        data: {
            username: username, 
            email: email, 
            // the hash that this project uses
            password: await bcrypt.hash(password, 10)
        }
    });
    console.log(`inserted '${[username, email, password].join(", ")}'`);
}


async function seedUsers(usernames, emails, passwords) {
    console.log("seeding users...");

    for (let i = 0; i < usernames.length; i++) {
        const usernameData = await prisma.user.findMany({
            where: {
                username: {
                    equals: usernames[i]
                }
            }
        });
        const emailData = await prisma.user.findMany({
            where: {
                email: {
                    equals: emails[i]
                }
            }
        });

        if (usernameData.length > 0 || emailData.length > 0) {
            console.log(`skipping '${usernames[i]}' with email '${emails[i]}' because the username or email already exists`);
        }
        else {
            await insertUser(usernames[i], emails[i], passwords[i]);
        }
    }

    console.log("finished seeding users\n");
}



async function insertReview(userId, placeId, latitude, longitude, seasonId, score) {
    // TODO: implement this function using prisma.review.create()
    console.log("INSERTREVIEW", userId, placeId, latitude, longitude, seasonId, score, "\n");
}


async function seedReviews(reviewThreshold, testUsername, seasonName) {
    console.log("seeding reviews...");

    const minScore = 1;
    const maxScore = 10;

    // look up test user's id to use in all the reviews
    const userData = await prisma.user.findUnique({
        where: {
            username: testUsername
        }
    });
    if (userData === null) {
        console.log(`ERROR: could not seed Reviews because the test user '${testUsername}' is not in the database`);
        return;
    }
    const userId = userData.id;

    // look up season id to use in all the reviews
    const seasonData = await prisma.season.findUnique({
        where: {
            name: seasonName
        }
    });
    if (seasonData === null) {
        console.log(`ERROR: could not seed Reviews because the season '${seasonName}' is not in the database`);
        return;
    }
    const seasonId = seasonData.id;

    // read data for listings
    const filepath = "db_seeding/listings.csv";
    let data = fs.readFileSync(filepath, "utf8").split("\n");

    let placeId, latitude, longitude, score;
    // TODO: 
    // should insert some of these reviewThreshold times, some reviewThreshold-1, some reviewThreshold-2
    for (const line of data) {
        [placeId, latitude, longitude] = line.split(", ");
        if (!(placeId && latitude && longitude)) {
            continue;
        }
        score = Math.floor(Math.random() * (maxScore - minScore + 1) + minScore);  // random score
        await insertReview(userId, placeId, latitude, longitude, seasonId, score);
    }

    console.log("finished seeding reviews\n");
}



async function main() {
    // number of reviews needed for a listing to show as a pin on the frontend
    let reviewThreshold = 5;
    // the season name to use for all the seeded reviews (must be in seasons.csv so it can be seeded in the database)
    let seasonName = "Christmas 2023";
    // default behavior is to seed seasons and users, but not reviews (reviews will also seed listings)
    let options = {
        seasons: true, 
        users: true, 
        reviews: false
    };

    // if the "-a" argument is given, set all options to true
    for (let i = 2; i < process.argv.length; i++) {
        if (process.argv[i] === "-a") {
            Object.keys(options).forEach(key => options[key] = true);
        }
    }

    // info for demo accounts that testers can use
    let usernames = ["AliceAndVerdict", "BobOrVegana"];
    let emails = ["alice@gmail.com", "bob@gmail.com"];
    let passwords = ["password", "password"];
    // info for test user that is only used for seeding reviews
    let testUsername = "Test"
    let testEmail = "test@test.com";
    let testPassword = "test";
    // combine demo and test users so seedUsers() gets all of them
    usernames.push(testUsername);
    emails.push(testEmail);
    passwords.push(testPassword);

    if (options.seasons) {
        await seedSeasons();
    }
    if (options.users) {
        await seedUsers(usernames, emails, passwords);
    }
    if (options.reviews) {
        await seedReviews(reviewThreshold, testUsername, seasonName);
    }

    console.log("finished seeding database!");
}



main();

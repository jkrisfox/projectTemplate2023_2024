const bcrypt = require('bcryptjs');
const fs = require('fs');
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();


// creates records for seasons based on a list of strings.
// each element in the list is comma-separated: name, start, end
async function insertSeasons(data) {
    console.log("inserting seasons...");
    let name, start, end;
    for (const line of data) {
        [name, start, end] = line.split(", ");
        if (name && start && end) {
            const nameExists = await prisma.season.findMany({
                where: {
                    name: {
                        equals: name
                    }
                }
            });
            if (nameExists.length > 0) {
                console.log("skipping", name, "because the name is already in the database");
            }
            else {
                await prisma.season.create({
                    data: {
                        name: name, 
                        start: start, 
                        end: end,
                    }
                });
                console.log("inserted", line);
            }
        }
    }
    console.log("finished inserting seasons\n");
}

async function seedSeasons() {
    const filepath = "db_seeding/seasons.csv";
    var data = fs.readFileSync(filepath, "utf8").split("\n");
    await insertSeasons(data);
}


// creates records for users based on three arrays of the same length
async function insertUsers(usernames, emails, passwords) {
    console.log("inserting users...");
    for (let i = 0; i < usernames.length; i++) {
        const usernameExists = await prisma.user.findMany({
            where: {
                username: {
                    equals: usernames[i]
                }
            }
        });
        const emailExists = await prisma.user.findMany({
            where: {
                email: {
                    equals: emails[i]
                }
            }
        });
        if (usernameExists.length > 0 || emailExists.length > 0) {
            console.log("skipping", usernames[i], "with email", emails[i], "because the username or email is already in the database");
        }
        else {
            await prisma.user.create({
                data: {
                    username: usernames[i], 
                    email: emails[i], 
                    // the hash that this project uses
                    password: await bcrypt.hash(passwords[i], 10)
                }
            });
            console.log("inserted", [usernames[i], emails[i], passwords[i]].join(", "));
        }
    }
    console.log("finished inserting users\n");
}


async function seedUsers() {
    let usernames = ["AliceAndVerdict", "BobOrVegana"];
    let emails = ["alice@gmail.com", "bob@gmail.com"];
    // plaintext passwords
    let passwords = ["password", "password"];

    await insertUsers(usernames, emails, passwords);
}


async function main() {
    let options = {
        seasons: true, 
        users: true, 
        listings: true, 
        reviews: true, 
        images: true
    };

    console.log("sowing seeds...\n");

    if (options.seasons) {
        await seedSeasons();
    }
    if (options.users) {
        await seedUsers();
    }
    // if (options.listings) {
    //     await seedListings();
    // }
    // if (options.reviews) {
    //     await seedReviews();
    // }
    // if (options.images) {
    //     await seedImages();
    // }

    console.log("finished seeding database!");
}


main();

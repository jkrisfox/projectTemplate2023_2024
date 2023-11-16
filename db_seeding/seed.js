const bcrypt = require('bcryptjs');
const fs = require('fs');
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();


// creates records for seasons based on a list of strings.
// each element in the list is comma-separated: name, start, end
async function insertSeasons(data) {
    let name, start, end;
    console.log("inserting seasons...");

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
                console.log(`skipping '${name}' because it already exists`);
            }
            else {
                await prisma.season.create({
                    data: {
                        name: name, 
                        start: start, 
                        end: end,
                    }
                });
                console.log(`inserted '${line}'`);
            }
        }
    }

    console.log("finished inserting seasons\n");
}


async function seedSeasons() {
    const filepath = "db_seeding/seasons.csv";
    let data = fs.readFileSync(filepath, "utf8").split("\n");
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
            console.log(`skipping '${usernames[i]}' with email '${emails[i]}' because the username or email already exists`);
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
            console.log(`inserted '${[usernames[i], emails[i], passwords[i]].join(", ")}'`);
        }
    }

    console.log("finished inserting users\n");
}


async function seedUsers(usernames, emails, passwords) {
    await insertUsers(usernames, emails, passwords);
}





async function insertReviews(usernames, emails, passwords) {

}


async function seedReviews(usernames, emails, passwords) {

}





async function main() {
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

    // info for demo users that people can sign in with
    let demoUsernames = ["AliceAndVerdict", "BobOrVegana"];
    let demoEmails = ["alice@gmail.com", "bob@gmail.com"];
    // plaintext passwords
    let demoPasswords = ["password", "password"];
    // info for demo users that are only used for extra reviews
    let extraUsernames = [];
    let extraEmails = [];
    let extraPasswords = [];
    for (let i = 0; i < 5; i++) {
        extraUsernames.push("Test" + String(i));
        extraEmails.push("test" + String(i) + "@gmail.com");
        extraPasswords.push("password");
    }
    // combine
    let usernames = demoUsernames.concat(extraUsernames);
    let emails = demoEmails.concat(extraEmails);
    let passwords = demoPasswords.concat(extraPasswords);

    console.log("sowing seeds...\n");

    if (options.seasons) {
        await seedSeasons();
    }
    if (options.users) {
        await seedUsers(usernames, emails, passwords);
    }
    if (options.reviews) {
        await seedReviews(extraUsernames, extraEmails, extraPasswords);
    }

    console.log("finished seeding database!");
}





main();

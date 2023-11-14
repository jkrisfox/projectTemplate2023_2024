const fs = require('fs');
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();


// create records for seasons based on a list of strings
// each element in the list is comma-separated: name, start, end
async function insertSeasons(data) {
    let name, start, end;
    for (const line of data) {
        [name, start, end] = line.split(", ");
        if (name && start && end) {
            console.log("inserting", line);
            await prisma.season.create({
                data: {
                    name: name, 
                    start: start, 
                    end: end,
                }
            });
        }
    }
}

function seedSeasons() {
    const filepath = "db_seeding/seasons.csv";
    var data = fs.readFileSync(filepath, "utf8").split("\n");
    insertSeasons(data);
}


// TODO
// function seedUsers() {
// TODO: make arrays, put this in loop
//     await prisma.user.create({
//         data: {
//             username: usernames[i], 
//             email: emails[i], 
//             password: passwords[i]
//         }
//     })
// }


// call all the seeding functions
seedSeasons();

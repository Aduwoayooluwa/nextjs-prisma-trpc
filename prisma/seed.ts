import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
    const user1 = await prisma.user.create({
        data: {
            email: 'alice@example.com',
            password: 'hashedpassword1',
            name: 'Alice',
            username: 'alice123',
        },
    });

    const user2 = await prisma.user.create({
        data: {
            email: 'bob@example.com',
            password: 'hashedpassword2',
            name: 'Bob',
            username: 'bob123',
        },
    });

    console.log({ user1, user2 });
}

main()
    .catch((e) => {
        throw e;
    })
    .finally(async () => {
        await prisma.$disconnect();
    });

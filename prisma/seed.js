const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function seed() {
    // Create users
    const users = await prisma.user.createMany({
        data: [
            { username: 'alice', email: 'alice@example.com' },
            { username: 'bob', email: 'bob@example.com' },
            { username: 'charlie', email: 'charlie@example.com' }
        ]
    });

    console.log(`${users.count} users created`);

    // Create profiles
    const profiles = await prisma.profile.createMany({
        data: [
            { userId: 1, profilePicture: 'https://example.com/alice.jpg', biography: 'Alice\'s bio' },
            { userId: 2, profilePicture: 'https://example.com/bob.jpg', biography: 'Bob\'s bio' },
            { userId: 3, profilePicture: 'https://example.com/charlie.jpg', biography: 'Charlie\'s bio' }
        ]
    });

    console.log(`${profiles.count} profiles created`);

    // Create posts
    const posts = await prisma.post.createMany({
        data: [
            { userId: 1, title: 'Alice\'s first post', content: 'Hello, world!', published: true },
            { userId: 1, title: 'Alice\'s second post', content: 'Another post', published: true },
            { userId: 2, title: 'Bob\'s first post', content: 'Bob\'s thoughts', published: true },
            { userId: 2, title: 'Bob\'s second post', content: 'More from Bob', published: true },
            { userId: 3, title: 'Charlie\'s first post', content: 'Charlie\'s musings', published: true },
            { userId: 3, title: 'Charlie\'s second post', content: 'Charlie again', published: true }
        ]
    });

    console.log(`${posts.count} posts created`);

    // Create comments
    const comments = await prisma.comment.createMany({
        data: [
            { userId: 2, postId: 1, content: 'Great post, Alice!' },
            { userId: 3, postId: 3, content: 'Interesting thoughts, Bob!' },
            { userId: 1, postId: 5, content: 'Nice one, Charlie!' }
        ]
    });

    console.log(`${comments.count} comments created`);

    process.exit(0);
}

seed()
    .catch(async (error) => {
        console.error(error);
        await prisma.$disconnect();
        process.exit(1);
    });
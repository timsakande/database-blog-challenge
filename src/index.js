const prisma = require('./db');

async function main() {
    try {
        // Get all rows of data from the users table
        const allUsers = await prisma.user.findMany();
        console.log('All users:', allUsers);

        // Get all posts that belong to the user with ID 2
        const userTwoPosts = await prisma.post.findMany({
            where: { userId: 2 }
        });
        console.log('User 2 posts:', userTwoPosts);

        // Get the user with ID 1 and include their profile in the response
        const userOneWithProfile = await prisma.user.findUnique({
            where: { id: 1 },
            include: { profile: true }
        });
        console.log('User 1 with profile:', userOneWithProfile);

        // Update the post with ID 1
        const updatedPost = await prisma.post.update({
            where: { id: 1 },
            data: { content: 'Updated content for post 1' }
        });
        console.log('Updated post:', updatedPost);

        // Delete the post with ID 3
        const deletedPost = await prisma.post.delete({
            where: { id: 3 }
        });
        console.log('Deleted post:', deletedPost);

    } catch (error) {
        console.error('Error:', error);
    } finally {
        await prisma.$disconnect();
    }
}

main();
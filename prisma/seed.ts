import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcryptjs';

const prisma = new PrismaClient();

async function main() {
  console.log('🌱 Starting database seed...');

  // Clear existing data
  await prisma.comment.deleteMany();
  await prisma.like.deleteMany();
  await prisma.follow.deleteMany();
  await prisma.post.deleteMany();
  await prisma.user.deleteMany();

  console.log('✅ Cleared existing data');

  // Hash password for all users
  const hashedPassword = await bcrypt.hash('password123', 10);

  // Create users
  const alice = await prisma.user.create({
    data: {
      email: 'alice@example.com',
      username: 'alice_wonder',
      password: hashedPassword,
      name: 'Alice Wonderland',
      bio: '📸 Photography enthusiast | 🌍 Travel lover | ☕ Coffee addict',
      image: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Alice',
    },
  });

  const bob = await prisma.user.create({
    data: {
      email: 'bob@example.com',
      username: 'bob_builder',
      password: hashedPassword,
      name: 'Bob Builder',
      bio: '🏗️ Building amazing things | 💻 Tech enthusiast | 🎮 Gamer',
      image: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Bob',
    },
  });

  const charlie = await prisma.user.create({
    data: {
      email: 'charlie@example.com',
      username: 'charlie_chef',
      password: hashedPassword,
      name: 'Charlie Chef',
      bio: '👨‍🍳 Professional chef | 🍕 Food lover | 📖 Recipe creator',
      image: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Charlie',
    },
  });

  const diana = await prisma.user.create({
    data: {
      email: 'diana@example.com',
      username: 'diana_artist',
      password: hashedPassword,
      name: 'Diana Artist',
      bio: '🎨 Digital artist | 🖌️ Creative soul | 🌈 Color enthusiast',
      image: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Diana',
    },
  });

  const evan = await prisma.user.create({
    data: {
      email: 'evan@example.com',
      username: 'evan_explorer',
      password: hashedPassword,
      name: 'Evan Explorer',
      bio: '🏔️ Adventure seeker | 🚴 Outdoor enthusiast | 📷 Nature photographer',
      image: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Evan',
    },
  });

  console.log('✅ Created 5 users');

  // Create posts for Alice
  const alicePost1 = await prisma.post.create({
    data: {
      userId: alice.id,
      imageUrl: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4',
      caption: 'Beautiful mountain sunrise 🌄 #nature #photography',
      createdAt: new Date('2024-12-01T08:00:00Z'),
    },
  });

  const alicePost2 = await prisma.post.create({
    data: {
      userId: alice.id,
      imageUrl: 'https://images.unsplash.com/photo-1495474472287-4d71bcdd2085',
      caption: 'Morning coffee vibes ☕ #coffee #morning',
      createdAt: new Date('2024-12-03T09:30:00Z'),
    },
  });

  const alicePost3 = await prisma.post.create({
    data: {
      userId: alice.id,
      imageUrl: 'https://images.unsplash.com/photo-1469474968028-56623f02e42e',
      caption: 'Wandering through the forest 🌲 #adventure #nature',
      createdAt: new Date('2024-12-05T14:20:00Z'),
    },
  });

  // Create posts for Bob
  const bobPost1 = await prisma.post.create({
    data: {
      userId: bob.id,
      imageUrl: 'https://images.unsplash.com/photo-1518770660439-4636190af475',
      caption: 'New tech setup! 💻 #tech #workspace',
      createdAt: new Date('2024-12-02T10:00:00Z'),
    },
  });

  const bobPost2 = await prisma.post.create({
    data: {
      userId: bob.id,
      imageUrl: 'https://images.unsplash.com/photo-1511512578047-dfb367046420',
      caption: 'Gaming night with the crew 🎮 #gaming #fun',
      createdAt: new Date('2024-12-04T20:00:00Z'),
    },
  });

  // Create posts for Charlie
  const charliePost1 = await prisma.post.create({
    data: {
      userId: charlie.id,
      imageUrl: 'https://images.unsplash.com/photo-1565299624946-b28f40a0ae38',
      caption: 'Homemade pizza perfection! 🍕 #foodie #cooking',
      createdAt: new Date('2024-12-01T18:00:00Z'),
    },
  });

  const charliePost2 = await prisma.post.create({
    data: {
      userId: charlie.id,
      imageUrl: 'https://images.unsplash.com/photo-1546069901-ba9599a7e63c',
      caption: 'Fresh salad for lunch 🥗 #healthy #food',
      createdAt: new Date('2024-12-03T12:30:00Z'),
    },
  });

  const charliePost3 = await prisma.post.create({
    data: {
      userId: charlie.id,
      imageUrl: 'https://images.unsplash.com/photo-1563729784474-d77dbb933a9e',
      caption: 'Dessert time! 🍰 #dessert #baking',
      createdAt: new Date('2024-12-06T16:00:00Z'),
    },
  });

  // Create posts for Diana
  const dianaPost1 = await prisma.post.create({
    data: {
      userId: diana.id,
      imageUrl: 'https://images.unsplash.com/photo-1460661419201-fd4cecdf8a8b',
      caption: 'New artwork in progress 🎨 #art #creative',
      createdAt: new Date('2024-12-02T15:00:00Z'),
    },
  });

  const dianaPost2 = await prisma.post.create({
    data: {
      userId: diana.id,
      imageUrl: 'https://images.unsplash.com/photo-1513364776144-60967b0f800f',
      caption: 'Color palette inspiration 🌈 #colors #design',
      createdAt: new Date('2024-12-05T11:00:00Z'),
    },
  });

  // Create posts for Evan
  const evanPost1 = await prisma.post.create({
    data: {
      userId: evan.id,
      imageUrl: 'https://images.unsplash.com/photo-1464822759023-fed622ff2c3b',
      caption: 'Summit reached! 🏔️ #hiking #adventure',
      createdAt: new Date('2024-12-01T16:00:00Z'),
    },
  });

  const evanPost2 = await prisma.post.create({
    data: {
      userId: evan.id,
      imageUrl: 'https://images.unsplash.com/photo-1486915309851-b0cc1f8a0084',
      caption: 'Cycling through the countryside 🚴 #cycling #outdoor',
      createdAt: new Date('2024-12-04T07:00:00Z'),
    },
  });

  const evanPost3 = await prisma.post.create({
    data: {
      userId: evan.id,
      imageUrl: 'https://images.unsplash.com/photo-1441974231531-c6227db76b6e',
      caption: 'Nature at its finest 🌿 #nature #photography',
      createdAt: new Date('2024-12-07T13:00:00Z'),
    },
  });

  console.log('✅ Created 13 posts');

  // Create follow relationships
  await prisma.follow.createMany({
    data: [
      // Alice follows Bob, Charlie, Diana
      { followerId: alice.id, followingId: bob.id },
      { followerId: alice.id, followingId: charlie.id },
      { followerId: alice.id, followingId: diana.id },
      // Bob follows Alice, Charlie, Evan
      { followerId: bob.id, followingId: alice.id },
      { followerId: bob.id, followingId: charlie.id },
      { followerId: bob.id, followingId: evan.id },
      // Charlie follows Alice, Bob, Diana, Evan
      { followerId: charlie.id, followingId: alice.id },
      { followerId: charlie.id, followingId: bob.id },
      { followerId: charlie.id, followingId: diana.id },
      { followerId: charlie.id, followingId: evan.id },
      // Diana follows Alice, Charlie
      { followerId: diana.id, followingId: alice.id },
      { followerId: diana.id, followingId: charlie.id },
      // Evan follows Bob, Diana
      { followerId: evan.id, followingId: bob.id },
      { followerId: evan.id, followingId: diana.id },
    ],
  });

  console.log('✅ Created follow relationships');

  // Create likes
  await prisma.like.createMany({
    data: [
      // Likes on Alice's posts
      { userId: bob.id, postId: alicePost1.id },
      { userId: charlie.id, postId: alicePost1.id },
      { userId: diana.id, postId: alicePost1.id },
      { userId: bob.id, postId: alicePost2.id },
      { userId: charlie.id, postId: alicePost3.id },
      // Likes on Bob's posts
      { userId: alice.id, postId: bobPost1.id },
      { userId: charlie.id, postId: bobPost1.id },
      { userId: evan.id, postId: bobPost1.id },
      { userId: alice.id, postId: bobPost2.id },
      // Likes on Charlie's posts
      { userId: alice.id, postId: charliePost1.id },
      { userId: bob.id, postId: charliePost1.id },
      { userId: diana.id, postId: charliePost1.id },
      { userId: alice.id, postId: charliePost2.id },
      { userId: diana.id, postId: charliePost3.id },
      // Likes on Diana's posts
      { userId: alice.id, postId: dianaPost1.id },
      { userId: charlie.id, postId: dianaPost1.id },
      { userId: charlie.id, postId: dianaPost2.id },
      // Likes on Evan's posts
      { userId: bob.id, postId: evanPost1.id },
      { userId: charlie.id, postId: evanPost1.id },
      { userId: bob.id, postId: evanPost2.id },
      { userId: diana.id, postId: evanPost3.id },
    ],
  });

  console.log('✅ Created likes');

  // Create comments
  await prisma.comment.createMany({
    data: [
      // Comments on Alice's posts
      {
        userId: bob.id,
        postId: alicePost1.id,
        content: 'Stunning view! 😍',
        createdAt: new Date('2024-12-01T08:30:00Z'),
      },
      {
        userId: charlie.id,
        postId: alicePost1.id,
        content: 'This is breathtaking!',
        createdAt: new Date('2024-12-01T09:00:00Z'),
      },
      {
        userId: diana.id,
        postId: alicePost2.id,
        content: 'Coffee goals! ☕',
        createdAt: new Date('2024-12-03T10:00:00Z'),
      },
      // Comments on Bob's posts
      {
        userId: alice.id,
        postId: bobPost1.id,
        content: 'Love the setup! 💻',
        createdAt: new Date('2024-12-02T11:00:00Z'),
      },
      {
        userId: evan.id,
        postId: bobPost1.id,
        content: 'What keyboard is that?',
        createdAt: new Date('2024-12-02T12:00:00Z'),
      },
      // Comments on Charlie's posts
      {
        userId: alice.id,
        postId: charliePost1.id,
        content: 'Looks delicious! 🤤',
        createdAt: new Date('2024-12-01T19:00:00Z'),
      },
      {
        userId: bob.id,
        postId: charliePost1.id,
        content: 'Recipe please!',
        createdAt: new Date('2024-12-01T20:00:00Z'),
      },
      {
        userId: diana.id,
        postId: charliePost3.id,
        content: 'This looks amazing!',
        createdAt: new Date('2024-12-06T17:00:00Z'),
      },
      // Comments on Diana's posts
      {
        userId: charlie.id,
        postId: dianaPost1.id,
        content: 'Beautiful work! 🎨',
        createdAt: new Date('2024-12-02T16:00:00Z'),
      },
      {
        userId: alice.id,
        postId: dianaPost2.id,
        content: 'Love these colors!',
        createdAt: new Date('2024-12-05T12:00:00Z'),
      },
      // Comments on Evan's posts
      {
        userId: bob.id,
        postId: evanPost1.id,
        content: 'Epic adventure! 🏔️',
        createdAt: new Date('2024-12-01T17:00:00Z'),
      },
      {
        userId: charlie.id,
        postId: evanPost1.id,
        content: 'How long did it take?',
        createdAt: new Date('2024-12-01T18:00:00Z'),
      },
      {
        userId: diana.id,
        postId: evanPost3.id,
        content: 'Gorgeous shot! 📷',
        createdAt: new Date('2024-12-07T14:00:00Z'),
      },
    ],
  });

  console.log('✅ Created comments');

  console.log('\n🎉 Database seeded successfully!');
  console.log('\nSummary:');
  console.log('- 5 users created');
  console.log('- 13 posts created');
  console.log('- 14 follow relationships created');
  console.log('- 21 likes created');
  console.log('- 13 comments created');
  console.log('\nTest credentials:');
  console.log('Email: alice@example.com | Password: password123');
  console.log('Email: bob@example.com | Password: password123');
  console.log('Email: charlie@example.com | Password: password123');
  console.log('Email: diana@example.com | Password: password123');
  console.log('Email: evan@example.com | Password: password123');
}

main()
  .catch((e) => {
    console.error('❌ Error seeding database:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });

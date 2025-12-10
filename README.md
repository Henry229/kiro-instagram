# Kiro Instagram

A simple Instagram clone built with Next.js 16, Prisma, and NextAuth.

## Tech Stack

- **Framework**: Next.js 16 with App Router
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **Database**: SQLite with Prisma ORM
- **Authentication**: NextAuth.js v5
- **Testing**: Browser testing and TestSprite MCP
- **UI Components**: shadcn/ui (to be configured)


## Getting Started

### Prerequisites

- Node.js 18+ and npm

### Installation

1. Clone the repository
2. Install dependencies:

```bash
npm install
```

3. Set up environment variables:

```bash
cp .env.example .env
```

4. Initialize the database:

```bash
npm run prisma:migrate
npm run prisma:generate
```

### Development

Run the development server:

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

### Available Scripts

- `npm run dev` - Start development server with Turbopack
- `npm run build` - Build for production
- `npm run start` - Start production server
- `npm run lint` - Run ESLint
- `npm run type-check` - Run TypeScript type checking
- `npm run prisma:generate` - Generate Prisma Client
- `npm run prisma:migrate` - Run database migrations
- `npm run prisma:studio` - Open Prisma Studio


## Project Structure

```
kiro-instagram/
├── app/                  # Next.js App Router pages
├── components/           # React components (to be created)
├── lib/                  # Utility functions and configurations
├── prisma/              # Prisma schema and migrations
│   └── schema.prisma    # Database schema
├── public/              # Static assets
└── __tests__/           # Test files (to be created)
```

## Database Schema

The application uses the following models:

- **User**: User accounts with authentication
- **Post**: User posts with images and captions
- **Like**: Post likes
- **Comment**: Post comments
- **Follow**: User follow relationships

## Features (Planned)

- [ ] User authentication (sign up, sign in, sign out)
- [ ] User profiles with bio and avatar
- [ ] Create posts with images and captions
- [ ] Like and unlike posts
- [ ] Comment on posts
- [ ] Follow and unfollow users
- [ ] Personalized feed based on followed users
- [ ] Responsive design for mobile and desktop

## License

MIT

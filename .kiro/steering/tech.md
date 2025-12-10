# Technology Stack

## Framework & Runtime

- **Next.js 16+** with App Router and TypeScript
- **Node.js** runtime environment
- **React** for UI components

## Database & ORM

- **SQLite** for local development and simple deployment
- **Prisma ORM** for database operations and schema management
- Database models: User, Post, Like, Comment, Follow

## Authentication & Security

- **NextAuth.js** with JWT tokens
- Password hashing for secure storage
- Session management and expiration handling

## UI & Styling

- **shadcn/ui** component library
- **Tailwind CSS** for responsive design
- Custom components for social media features

## File Storage

- **Local file system** (development)
- **Vercel Blob** (production deployment)
- Image processing and optimization

## Testing

- **Vitest** for unit testing
- **Test Sprite MCP** for property-based testing
- **Playwright** for end-to-end testing
- **React Testing Library** for component testing

## Common Commands

### Development
```bash
npm run dev          # Start development server
npm run build        # Build for production
npm run start        # Start production server
```

### Database
```bash
npx prisma generate  # Generate Prisma client
npx prisma db push   # Push schema changes
npx prisma studio    # Open database GUI
npx prisma db seed   # Seed development data
```

### Testing
```bash
npm run test         # Run unit tests
npm run test:watch   # Run tests in watch mode
npm run test:e2e     # Run end-to-end tests
```

### Code Quality
```bash
npm run lint         # Run ESLint
npm run type-check   # Run TypeScript checks
npm run format       # Format code with Prettier
```
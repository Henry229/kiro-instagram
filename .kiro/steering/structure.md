# Project Structure

## Next.js App Router Organization

```
/
├── app/                    # Next.js App Router
│   ├── (auth)/            # Auth route group
│   │   ├── login/         # Login page
│   │   └── register/      # Registration page
│   ├── api/               # API routes
│   │   ├── auth/          # Authentication endpoints
│   │   ├── posts/         # Post management
│   │   ├── users/         # User management
│   │   └── upload/        # File upload
│   ├── feed/              # Main feed page
│   ├── profile/           # User profiles
│   │   └── [id]/          # Dynamic user profiles
│   ├── upload/            # Post creation page
│   ├── layout.tsx         # Root layout
│   ├── page.tsx           # Home page
│   └── globals.css        # Global styles
├── components/            # Reusable UI components
│   ├── ui/               # shadcn/ui components
│   ├── auth/             # Authentication forms
│   ├── feed/             # Feed-related components
│   ├── post/             # Post components
│   └── profile/          # Profile components
├── lib/                  # Utility functions
│   ├── auth.ts           # NextAuth configuration
│   ├── db.ts             # Database connection
│   ├── utils.ts          # General utilities
│   └── validations.ts    # Input validation schemas
├── prisma/               # Database schema and migrations
│   ├── schema.prisma     # Database schema
│   └── seed.ts           # Database seeding
├── public/               # Static assets
│   └── uploads/          # User uploaded images
└── types/                # TypeScript type definitions
    └── index.ts          # Shared types
```

## Key Conventions

### File Naming
- Use kebab-case for directories and files
- Component files use PascalCase (e.g., `UserProfile.tsx`)
- API routes follow REST conventions (`/api/posts/[id]/route.ts`)

### Component Organization
- Group related components in feature directories
- Keep UI components separate from business logic
- Use barrel exports (`index.ts`) for clean imports

### API Structure
- Follow RESTful patterns for endpoints
- Use Next.js route handlers (`route.ts`)
- Implement proper HTTP methods (GET, POST, PUT, DELETE)
- Group related endpoints in feature directories

### Database Models
- All models defined in `prisma/schema.prisma`
- Use consistent naming: PascalCase for models, camelCase for fields
- Establish clear relationships between entities
- Include timestamps (`createdAt`, `updatedAt`) on all models

### Testing Organization
- Unit tests alongside source files (`*.test.ts`)
- Property-based tests in `__tests__/properties/`
- Integration tests in `__tests__/integration/`
- E2E tests in `__tests__/e2e/`

### Environment Configuration
- Use `.env.local` for development secrets
- Document required environment variables
- Separate configs for development/production
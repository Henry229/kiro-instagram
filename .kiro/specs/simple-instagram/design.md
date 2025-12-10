# Design Document

## Overview

This design document outlines the architecture and implementation approach for a simple Instagram-like social media application. The system will be built as a web application with a React frontend and Node.js backend, using a relational database for data persistence and cloud storage for image files.

The application follows a three-tier architecture pattern with clear separation between presentation, business logic, and data layers. The design emphasizes scalability, maintainability, and user experience while keeping the implementation straightforward.

## Architecture

### System Architecture

The application uses a modern full-stack architecture with the following components:

- **Full-Stack Framework**: Next.js 16+ with App Router for both frontend and backend
- **Database**: SQLite for local development and simple deployment
- **File Storage**: Local file system or Vercel Blob for images
- **Authentication**: NextAuth.js with JWT tokens
- **UI Components**: shadcn/ui with Tailwind CSS for responsive design

### Technology Stack

- **Framework**: Next.js 16+ with TypeScript and App Router
- **Database**: SQLite with Prisma ORM
- **UI Library**: shadcn/ui components with Tailwind CSS
- **Authentication**: NextAuth.js
- **File Storage**: Local file system (development) / Vercel Blob (production)
- **Testing**: Test Sprite MCP for property-based testing, Vitest for unit tests

## Components and Interfaces

### Frontend Components

#### Core Components
- `App`: Main application component with routing
- `AuthProvider`: Context provider for authentication state
- `Feed`: Main feed displaying posts from followed users
- `Post`: Individual post component with image, caption, and interactions
- `Profile`: User profile page with posts grid
- `UploadForm`: Photo upload and caption input form
- `LoginForm` / `RegisterForm`: Authentication forms

#### UI Components (shadcn/ui based)
- `Button`: shadcn/ui Button component with variants
- `Input`: shadcn/ui Input component for forms
- `Dialog`: shadcn/ui Dialog component for modals
- `Card`: shadcn/ui Card component for post display
- `Avatar`: shadcn/ui Avatar component for user profiles
- `Badge`: shadcn/ui Badge component for counts and status
- `Textarea`: shadcn/ui Textarea for captions and comments
- `ImageGrid`: Custom grid layout for profile posts
- `CommentList`: Custom list component for post comments

### Next.js API Routes

#### Authentication (NextAuth.js)
- `/api/auth/[...nextauth]`: NextAuth.js authentication endpoints
- `/api/auth/register`: Custom user registration endpoint

#### Users
- `GET /api/users/[id]`: Get user profile
- `PUT /api/users/[id]`: Update user profile
- `POST /api/users/[id]/follow`: Follow a user
- `DELETE /api/users/[id]/follow`: Unfollow a user
- `GET /api/users/[id]/followers`: Get user followers
- `GET /api/users/[id]/following`: Get users being followed

#### Posts
- `GET /api/posts/feed`: Get personalized feed
- `POST /api/posts`: Create new post
- `GET /api/posts/[id]`: Get specific post
- `DELETE /api/posts/[id]`: Delete post
- `POST /api/posts/[id]/like`: Like/unlike a post
- `GET /api/posts/[id]/likes`: Get post likes

#### Comments
- `GET /api/posts/[id]/comments`: Get post comments
- `POST /api/posts/[id]/comments`: Add comment to post
- `DELETE /api/comments/[id]`: Delete comment

#### File Upload
- `POST /api/upload`: Handle image uploads

## Data Models

### User Model
```typescript
interface User {
  id: string;
  username: string;
  email: string;
  passwordHash: string;
  profilePicture?: string;
  bio?: string;
  createdAt: Date;
  updatedAt: Date;
}
```

### Post Model
```typescript
interface Post {
  id: string;
  userId: string;
  imageUrl: string;
  caption?: string;
  createdAt: Date;
  updatedAt: Date;
  user: User;
  likes: Like[];
  comments: Comment[];
}
```

### Like Model
```typescript
interface Like {
  id: string;
  userId: string;
  postId: string;
  createdAt: Date;
  user: User;
  post: Post;
}
```

### Comment Model
```typescript
interface Comment {
  id: string;
  userId: string;
  postId: string;
  content: string;
  createdAt: Date;
  updatedAt: Date;
  user: User;
  post: Post;
}
```

### Follow Model
```typescript
interface Follow {
  id: string;
  followerId: string;
  followingId: string;
  createdAt: Date;
  follower: User;
  following: User;
}
```

## Correctness Properties

*A property is a characteristic or behavior that should hold true across all valid executions of a system-essentially, a formal statement about what the system should do. Properties serve as the bridge between human-readable specifications and machine-verifiable correctness guarantees.*

### Property Reflection

After analyzing all acceptance criteria, several properties can be consolidated to eliminate redundancy:

- Properties 1.1 and 1.3 can be combined into a single registration property that covers both account creation and automatic login
- Properties 5.1 and 5.2 can be combined into a single like toggle property
- Properties 6.1 and 6.3 can be combined into a single follow property that covers both relationship creation and feed integration
- Properties 6.2 and 6.4 can be combined into a single unfollow property
- Properties 7.2 and 7.5 can be combined into a single profile display property

### Core Properties

**Property 1: User registration creates account and authenticates**
*For any* valid unique user credentials (username, email, password), registering should create a new user account and automatically authenticate the user
**Validates: Requirements 1.1, 1.3**

**Property 2: Duplicate registration prevention**
*For any* existing user credentials, attempting to register with the same username or email should be rejected
**Validates: Requirements 1.2**

**Property 3: Input validation rejects invalid data**
*For any* invalid registration data (malformed email, weak password, empty fields), the system should reject the registration attempt
**Validates: Requirements 1.4**

**Property 4: Password security**
*For any* user account, the stored password should be hashed and not stored in plaintext
**Validates: Requirements 1.5**

**Property 5: Authentication with correct credentials**
*For any* existing user, providing correct credentials should grant access to the application
**Validates: Requirements 2.1**

**Property 6: Authentication rejection for incorrect credentials**
*For any* authentication attempt with incorrect credentials, access should be denied
**Validates: Requirements 2.2**

**Property 7: Session expiration requires re-authentication**
*For any* expired session token, accessing protected resources should require re-authentication
**Validates: Requirements 2.4**

**Property 8: Logout terminates session**
*For any* authenticated user, logging out should invalidate their session token
**Validates: Requirements 2.5**

**Property 9: Post creation with valid data**
*For any* valid image file and caption, creating a post should store the post with correct metadata (author, timestamp)
**Validates: Requirements 3.1, 3.3**

**Property 10: Invalid file type rejection**
*For any* non-image file type, attempting to create a post should be rejected
**Validates: Requirements 3.2**

**Property 11: Image processing and optimization**
*For any* uploaded image, the system should process and optimize it for display
**Validates: Requirements 3.4**

**Property 12: Post visibility in feeds**
*For any* newly created post, it should appear in the author's profile and all followers' feeds
**Validates: Requirements 3.5**

**Property 13: Feed displays followed users' posts chronologically**
*For any* user with follow relationships, their feed should contain posts from followed users ordered by creation time (newest first)
**Validates: Requirements 4.1**

**Property 14: Feed updates with new posts**
*For any* new post from a followed user, it should appear in the follower's feed
**Validates: Requirements 4.3**

**Property 15: Feed pagination**
*For any* feed request with pagination parameters, the system should return the correct subset of posts
**Validates: Requirements 4.4**

**Property 16: Post display completeness**
*For any* displayed post, it should include image, caption, author, timestamp, and interaction counts
**Validates: Requirements 4.5**

**Property 17: Like toggle functionality**
*For any* post and user, liking an unliked post should add a like, and liking a liked post should remove the like
**Validates: Requirements 5.1, 5.2**

**Property 18: Comment creation**
*For any* valid comment text and post, adding a comment should store it with author and timestamp information
**Validates: Requirements 5.3**

**Property 19: Empty comment rejection**
*For any* empty or whitespace-only comment, submission should be rejected
**Validates: Requirements 5.4**

**Property 20: Comment display ordering**
*For any* post with comments, comments should be displayed in chronological order with author names
**Validates: Requirements 5.5**

**Property 21: Follow relationship creation and feed integration**
*For any* two users, creating a follow relationship should include the followed user's posts in the follower's feed
**Validates: Requirements 6.1, 6.3**

**Property 22: Unfollow relationship removal and feed exclusion**
*For any* existing follow relationship, removing it should exclude the unfollowed user's posts from the follower's feed
**Validates: Requirements 6.2, 6.4**

**Property 23: Profile statistics accuracy**
*For any* user profile, the displayed follower count, following count, and post count should match the actual data
**Validates: Requirements 6.5, 7.2**

**Property 24: Profile content completeness**
*For any* user profile, it should display user information and all posts by that user
**Validates: Requirements 7.1, 7.3**

**Property 25: Profile edit permissions**
*For any* user viewing a profile, edit options should only be available when viewing their own profile
**Validates: Requirements 7.4**

**Property 26: Follow button state accuracy**
*For any* user viewing another user's profile, the follow/unfollow button should reflect the current follow relationship status
**Validates: Requirements 7.5**

## Error Handling

### Client-Side Error Handling
- Form validation with real-time feedback
- Network error handling with retry mechanisms
- Image upload error handling (file size, format validation)
- Authentication error handling (expired tokens, invalid credentials)

### Server-Side Error Handling
- Input validation and sanitization
- Database constraint violations
- File upload errors (storage failures, invalid formats)
- Authentication and authorization errors
- Rate limiting and abuse prevention

### Error Response Format
```typescript
interface ErrorResponse {
  error: {
    code: string;
    message: string;
    details?: any;
  };
}
```

## Testing Strategy

### Dual Testing Approach

The application will use both unit testing and property-based testing to ensure comprehensive coverage:

- **Unit tests** verify specific examples, edge cases, and error conditions
- **Property tests** verify universal properties that should hold across all inputs
- Together they provide comprehensive coverage: unit tests catch concrete bugs, property tests verify general correctness

### Unit Testing

Unit tests will cover:
- Specific examples that demonstrate correct behavior
- Integration points between components
- Error conditions and edge cases
- API endpoint functionality
- Database operations

### Property-Based Testing

Property-based testing will be implemented using **Test Sprite MCP** which provides advanced property-based testing capabilities. Each property-based test will:
- Run a minimum of 100 iterations to ensure thorough testing
- Be tagged with comments explicitly referencing the correctness property from this design document
- Use the format: `**Feature: simple-instagram, Property {number}: {property_text}**`
- Each correctness property will be implemented by a single property-based test

### Test Organization

- Component tests: Vitest + React Testing Library for Next.js components
- API tests: Vitest + Next.js test utilities for API routes
- Property tests: Test Sprite MCP for universal properties
- Integration tests: Playwright for end-to-end testing
- Database tests: SQLite in-memory database for isolated testing

### Test Data Generation

Property-based tests using Test Sprite MCP will use smart generators that:
- Generate valid user data (usernames, emails, passwords)
- Create realistic post content (images, captions)
- Generate follow relationships and social graphs
- Produce edge cases (empty data, boundary values)
- Simulate various user interaction patterns
- Leverage Test Sprite's advanced generation capabilities for complex social media scenarios
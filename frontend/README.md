# Mini Feed App

A simple full-stack feed application built with Next.js where users can create posts, like/dislike them, and add comments.

## Features

- ✅ View a list of posts (text only)
- ✅ Create new posts
- ✅ Like/Dislike posts with counters
- ✅ Comment on posts (bonus feature)
- ✅ Show/Hide comments functionality
- ✅ Posts sorted by most recent
- ✅ In-memory data storage (Data base operations are also saved)
- ✅ Responsive design

## Tech Stack

- **Frontend**: Next.js 14, React, TypeScript, Tailwind CSS, shadcn/ui
- **Backend**: Next.js API Routes
- **Storage**: In-memory (global variable)

## Getting Started

### Prerequisites

- Node.js 18+ 
- npm or yarn

### Installation

1. Clone or download the project
2. Install dependencies:

\`\`\`bash
npm install
\`\`\`

3. Run the development server:

\`\`\`bash
npm run dev
\`\`\`

4. Open [http://localhost:3000](http://localhost:3000) in your browser

## API Endpoints

### Posts
- \`GET /api/posts\` - Get all posts (sorted by most recent)
- \`POST /api/posts\` - Create a new post

### Interactions
- \`POST /api/posts/[id]/like\` - Like a post
- \`POST /api/posts/[id]/dislike\` - Dislike a post
- \`POST /api/posts/[id]/comments\` - Add a comment to a post

## Project Structure

\`\`\`
├── app/
│   ├── api/
│   │   └── posts/
│   │       ├── route.ts              # Posts CRUD
│   │       └── [id]/
│   │           ├── like/route.ts     # Like functionality
│   │           ├── dislike/route.ts  # Dislike functionality
│   │           └── comments/route.ts # Comments functionality
│   ├── globals.css
│   ├── layout.tsx
│   └── page.tsx                      # Main feed page
├── components/
│   ├── ui/                          # shadcn/ui components
│   ├── create-post-form.tsx         # Post creation form
│   └── post-card.tsx                # Individual post component
├── lib/
│   ├── utils.ts
│   └── store.ts                     # In-memory store utilities
└── README.md
\`\`\`

## Features Walkthrough

### 1. Feed Page
- Displays all posts sorted by most recent
- Shows post text, like/dislike counts, and comment count
- Responsive design that works on mobile and desktop

### 2. Create Post
- Simple form with textarea for post content
- Real-time validation (submit button disabled for empty posts)
- Posts appear immediately in the feed after creation

### 3. Like/Dislike System
- Independent like and dislike counters
- Instant feedback with optimistic updates
- Clean button design with icons and counts

### 4. Comments System (Bonus)
- Expandable comments section for each post
- Add new comments with real-time updates
- Show/hide functionality to keep the feed clean
- Comments are sorted by creation time

## Data Storage

The application uses in-memory storage via a global variable. This means:
- Data persists during the session
- Data is lost when the server restarts
- Perfect for development and testing
- Easy to replace with a database later

## Demo Instructions

1. Start the application with \`npm run dev\`
2. Create a few posts using the form at the top
3. Like/dislike posts to see counters update
4. Click the comment button to expand comments section
5. Add comments to posts
6. Refresh the page to see posts persist (until server restart)

## Future Enhancements

- Add user authentication
- Implement persistent database storage
- Add post editing and deletion
- Include user profiles and avatars
- Add real-time updates with WebSockets
- Implement post categories or tags
\`\`\`


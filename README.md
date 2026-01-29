# Tager Client - Frontend Application

A modern, responsive marketplace frontend built with Next.js 16, featuring real-time chat, advanced search, and a credit-based posting system.

## 🚀 Tech Stack

- **Framework**: Next.js 16 (App Router)
- **Language**: TypeScript
- **UI Library**: React 19
- **Styling**: Tailwind CSS v4
- **Internationalization**: next-intl (Arabic/English)
- **State Management**:
  - Zustand (global state)
  - TanStack Query (server state)
- **Real-time**: Socket.IO Client
- **HTTP Client**: Axios
- **Form Validation**: Zod
- **Icons**: React Icons
- **Animations**: Motion (Framer Motion)

## 📋 Prerequisites

- Node.js 20+
- npm or yarn
- Backend server running (see `tager_server`)

## 🛠️ Installation

1. **Clone the repository** (if not already done)

   ```bash
   git clone <repository-url>
   cd Tager/tager_client
   ```

2. **Install dependencies**

   ```bash
   npm install
   ```

3. **Configure environment variables**

   Create a `.env.development` file in the root directory:

   ```env
   NEXT_PUBLIC_API_URL=http://localhost:3001
   ```

4. **Run the development server**

   ```bash
   npm run dev
   ```

   The application will be available at [http://localhost:3000](http://localhost:3000)

## 📁 Project Structure

```
src/
├── app/                          # Next.js App Router
│   ├── (auth)/                   # Auth routes (signin, signup)
│   │   ├── signin/
│   │   └── signup/
│   ├── (with-sidebar)/           # Main app routes with sidebar
│   │   ├── chats/                # Chat list and individual chats
│   │   │   └── [id]/             # Individual chat page
│   │   ├── credits/              # Credits purchase page
│   │   ├── new-post/             # Create new post
│   │   ├── post/                 # Post details
│   │   │   └── [id]/             # Individual post page
│   │   ├── profile/              # User profile
│   │   │   └── posts/            # User's posts
│   │   ├── search/               # Search page
│   │   └── page.tsx              # Home page
│   ├── layout.tsx                # Root layout
│   ├── globals.css               # Global styles
│   └── not-found.tsx             # 404 page
├── cache/                        # React Query hooks
│   ├── useChat.tsx
│   ├── useChats.tsx
│   ├── useLoadCredits.tsx
│   ├── usePosts.tsx
│   └── useUser.tsx
├── components/                   # React components
│   ├── layout/                   # Layout components
│   │   ├── containers/           # Container components
│   │   ├── footer/               # Footer
│   │   ├── header/               # Header/navbar
│   │   ├── hero/                 # Hero section
│   │   └── sidebars/             # Sidebar components
│   ├── protectedRoute/           # Auth protection wrapper
│   └── ui/                       # Reusable UI components
├── constants/                    # App constants
│   └── categories.ts             # Post categories
├── hooks/                        # Custom React hooks
│   ├── useChatSocket.ts          # Chat WebSocket hook
│   ├── useNotificationSocket.ts  # Notification WebSocket
│   └── usePathChange.ts          # Route change detection
├── lib/                          # Utilities
│   └── utils.ts
├── providers/                    # Context providers
│   ├── NotificationProvider.tsx
│   ├── QueryProvider.tsx
│   └── SocketProvider.ts
├── socket/                       # Socket.IO client
│   └── client.ts
├── stores/                       # Zustand stores
│   ├── useNotificationStore.ts
│   └── useSidebarStore.ts
└── utils/                        # Helper functions
    ├── Date.ts                   # Date formatting
    ├── money.ts                  # Price calculations
    └── validator.ts              # Zod schemas
```

## 🎯 Key Features

### Authentication

- Local authentication (email/password)
- Google OAuth 2.0 integration
- Protected routes with automatic redirects
- Session management

### Post Management

- Create posts with image uploads
- Edit existing posts
- Browse posts with infinite scroll
- Advanced search and filtering
- Category-based organization (26+ categories)
- Related posts suggestions

### Real-time Chat

- One-to-one messaging between buyers and sellers
- Real-time message delivery via Socket.IO
- Message read status tracking
- Unread message count
- Chat history persistence

### Credits System

- View credit balance (free vs paid)
- Purchase credit packages
- Track credit usage
- 5 credits required per post

### User Profile

- Update personal information
- Upload profile picture
- View posted items
- Track credit balance

### Search & Filter

- Text-based search
- Filter by category
- Sort by: newest, price (low-high, high-low)
- Infinite scroll pagination

### Internationalization

- **Languages**: Arabic and English
- **First Launch Dialog**: Automatic language selection on first visit
- **localStorage Tracking**: Remembers language preference
- **RTL Support**: Full right-to-left layout for Arabic
- **Locale Routing**: Separate routes for each language (`/en/*`, `/ar/*`)
- **Translation Files**: JSON-based message files for all UI text

## 🔧 Available Scripts

```bash
# Development
npm run dev          # Start development server (port 3000)

# Production
npm run build        # Build for production
npm start            # Start production server

# Linting
npm run lint         # Run ESLint
```

## 🌐 Route Structure

### Public Routes

- `/` - Home page (post listings)
- `/search` - Search page with filters
- `/post/[id]` - Post details
- `/signin` - Sign in page
- `/signup` - Sign up page

### Protected Routes (require authentication)

- `/new-post` - Create new post
- `/profile` - User profile
- `/profile/posts` - User's posts
- `/pricing` - Load credits
- `/chats` - Chat list
- `/chats/[id]` - Individual chat

## 🔌 API Integration

The frontend communicates with the backend API at `NEXT_PUBLIC_API_URL` (default: `http://localhost:3001`).

### HTTP Requests

- Axios is used for all HTTP requests
- Credentials are included for session management
- Error handling with custom error messages

### WebSocket Connection

- Socket.IO client connects automatically on app load
- Real-time updates for chat and notifications
- Automatic reconnection on disconnect

## 📦 State Management

### Server State (TanStack Query)

- User data caching and synchronization
- Post data with pagination
- Chat messages and history
- Automatic refetching and cache invalidation

### Client State (Zustand)

- Sidebar toggle state
- Notification state
- UI preferences

## 🎨 Styling

- **Tailwind CSS v4** for utility-first styling
- **Custom CSS** in `globals.css` for global styles
- **Motion** for smooth animations and transitions
- **Responsive design** for mobile and desktop
- **Dark mode support** (if implemented)

## 🔐 Environment Variables

| Variable              | Description     | Default                 |
| --------------------- | --------------- | ----------------------- |
| `NEXT_PUBLIC_API_URL` | Backend API URL | `http://localhost:3001` |

## 🐛 Troubleshooting

### Common Issues

**Port already in use**

```bash
# Kill the process using port 3000
npx kill-port 3000
# Or use a different port
PORT=3001 npm run dev
```

**API connection errors**

- Ensure backend server is running on the correct port
- Check `NEXT_PUBLIC_API_URL` in `.env.development`
- Verify CORS settings in backend

**Socket.IO connection issues**

- Verify backend Socket.IO server is running
- Check browser console for connection errors
- Ensure session cookies are being sent

**Build errors**

```bash
# Clear Next.js cache
rm -rf .next
# Reinstall dependencies
rm -rf node_modules package-lock.json
npm install
```

## 📱 Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)

## 🤝 Contributing

1. Create a feature branch
2. Make your changes
3. Test thoroughly
4. Submit a pull request

## 📄 License

This project is private and proprietary.

## 🔗 Related

- [Backend Documentation](../tager_server/README.md)
- [Project Documentation](../PROJECT_DOCUMENTATION.md)

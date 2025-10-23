# QubicBall Frontend Test — Dashboard Application

## 🚀 Features

### 1. API Integration (SSR + API Routes)
- Fetches user and post data from JSONPlaceholder (https://jsonplaceholder.typicode.com)
- Uses Next.js Server Components for SSR data fetching
- Implements API Routes for handling data (/api/users, /api/users/[id]/posts)
- Includes error handling and loading states
- Uses caching and no-store fetch policies for performance control

### 2. Dashboard UI
- Responsive layout built with Tailwind CSS and Shadcn UI
- Includes: 
    - Sidebar navigation (collapsible on mobile)
    - Header with breadcrumb navigation
    - User table with sorting, filtering, and search functionality
    - Pagination for user and post tables
- Supports dark mode toggle with persistence

### 3. Dynamic Routing
- Dynamic user detail pages at /dashboard/users/[id]
- Displays :
    - User information
    - Associated posts fetched via user ID

### 4. Forms & Validation
- Editable form for updating user information
- Uses React Hook Form + Zod schema validation
- Real-time field validation with helpful error messages

### 5. JWT Authentication (using jose)
- Mock login credentials:
```bash
    Username: testuser
    Password: testpass
```
- Tokens generated and verified using jose
- Middleware protects /dashboard and /dashboard/users/[id] routes
- Logout functionality clears JWT tokens

### 6. Performance & Type Safety
- Fully typed with TypeScript, no any used
- Uses useMemo and useCallback for optimized rendering
- Reusable components:
    - Sidebar, Header, UserTable, PostTable, SearchBar, Pagination, FormField

## 🧱 Tech Stack

- **Framework**: Next.JS (v.14) App Router
- **Language**: TypeScript
- **Styling**: Tailwind CSS + Shadcn UI
- **Icons**: Lucide React
- **Validation**: Zod
- **Form**: React Hook Form
- **Auth**: JWT with jose
- **Deployment**: Vercel (serverless)


## ⚙️ Installation & Setup

1. Clone the repository: 
```bash
git clone https://github.com/edoGultom/qubicball-frontend-test
cd qubicball-frontend-test
```

2. Install dependencies:
```bash
npm install
```

3. Create **.env.local**:
```bash
    NEXT_PUBLIC_API_URL=https://jsonplaceholder.typicode.com
    NEXT_PUBLIC_JWT_SECRET=abcd1234
    NEXT_PUBLIC_BASE_URL=http://localhost:3000
```

4. Run the development server:
```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

# Multi-step Blog

## Features

### 1. Multi-Step Blog Creation Wizard
- Guided, step-by-step process to create a blog post
- Includes 4 clear stages
    - **Blog Metadata** – Input blog title and author name
    - **Blog Summary & Category** – Write a brief summary and choose a category (Tech, Lifestyle, Business, etc.)
    - **Blog Content** – Write the full blog post in a text area.
    - **Review & Submit** – Review all data before submission, with the option to go back and edit
- Each step includes validation for required fields
- Smooth navigation using Next and Back buttons
- Maintains form state across steps using useState

### 2. Blog List Page
- Displays a list of created blog posts with:
    - Title
    - Author
    - Summary
    - Category
    - Created Date
- Clicking a post navigates to its detail page.

### 3. Blog Detail Page
- Shows full blog content with metadata: Title, Author, Summary, Category, Content, and Date
- Clean and readable layout for an optimal reading experience

## Tech Stack

- **Framework**: Next.JS (v.15)
- **Storage**: Local Storage
- **Icons**: Lucide
- **components**: Shadcn
- **Language**: TypeScript


## Installation & Setup

1. Clone the repository: 
```bash
git clone https://github.com/edoGultom/
cd 
```

2. Install dependencies:
```bash
npm install
```

3. Run the development server:
```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

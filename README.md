# Windows 11 Portfolio Website

A fully interactive portfolio website designed as a Windows 11 desktop environment. Explore projects, experience, and skills through a realistic file system interface.

## Features

### 🖥️ Authentic Windows 11 Experience
- **Fluent Design**: Acrylic blur effects, mica materials, and modern UI components
- **Centered Taskbar**: Windows 11-style taskbar with running apps and system tray
- **Start Menu**: Searchable app launcher with pinned applications
- **Theme Toggle**: Switch between light and dark modes
- **Boot Sequence**: Realistic startup animation on first visit

### 📁 Virtual File System
- **Desktop**: Shortcuts to key portfolio sections
- **About Me**: Personal interests, resume, skills (JSON), and philosophy
- **Projects**: Executable files (.exe) that launch interactive project viewers
- **Experience**: Company folders with role descriptions and achievements
- **Contact**: Links to email, LinkedIn, GitHub, and meeting scheduler

### 🪟 Window Management
- **Draggable Windows**: Click and drag windows around the desktop
- **Minimize/Maximize**: Full window control with smooth animations
- **Multiple Windows**: Open and manage multiple applications simultaneously
- **Z-Index Management**: Automatic window layering and focus

### 🎯 Built-in Applications
- **File Explorer**: Browse the virtual file system with breadcrumb navigation
- **Notepad**: View and edit text files (TXT, MD, JSON)
- **Calculator**: Fully functional calculator app
- **Browser**: Simulated browser for additional content
- **Settings**: Theme customization and system information
- **Project Viewer**: Rich project showcase with technologies and links

### ⌨️ Keyboard Shortcuts
- **Windows/Cmd Key**: Open Start Menu
- **Escape**: Close Start Menu
- **Click Desktop**: Close context menus

## Tech Stack

- **Framework**: Next.js 16 (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **Animations**: Framer Motion
- **State Management**: Zustand
- **Icons**: Lucide React

## Getting Started

### Installation

```bash
# Install dependencies
npm install

# Run development server
npm run dev

# Build for production
npm run build

# Start production server
npm start
```

Open [http://localhost:3000](http://localhost:3000) to view the portfolio.

## Project Structure

```
portfolio-website/
├── app/                    # Next.js app directory
│   ├── layout.tsx         # Root layout with fonts
│   ├── page.tsx           # Main page with desktop environment
│   └── globals.css        # Global styles and utilities
├── components/            # React components
│   ├── apps/             # Application components
│   │   ├── FileExplorer.tsx
│   │   ├── Notepad.tsx
│   │   ├── Calculator.tsx
│   │   ├── Browser.tsx
│   │   ├── Settings.tsx
│   │   └── ProjectViewer.tsx
│   ├── Desktop.tsx       # Desktop with icons
│   ├── DesktopIcon.tsx   # Desktop icon component
│   ├── Taskbar.tsx       # Windows 11 taskbar
│   ├── StartMenu.tsx     # Start menu with apps
│   ├── Window.tsx        # Window wrapper with controls
│   ├── WindowManager.tsx # Manages all open windows
│   ├── ContextMenu.tsx   # Right-click context menu
│   └── BootSequence.tsx  # Startup animation
├── store/                # Zustand state management
│   ├── useWindowStore.ts # Window state management
│   ├── useThemeStore.ts  # Theme preferences
│   └── useUIStore.ts     # UI state (menus, etc.)
├── data/                 # Data and content
│   ├── filesystem.ts     # Virtual file system structure
│   └── apps.ts          # Installed applications
├── types/                # TypeScript type definitions
│   └── index.ts
└── public/              # Static assets
```

## Customization

### Update Portfolio Content

Edit the file system structure in `data/filesystem.ts`:

```typescript
// Add new projects
{
  id: 'my-project',
  name: 'My Project.exe',
  type: 'exe',
  metadata: {
    description: 'Project description',
    technologies: ['React', 'Node.js'],
    projectUrl: 'https://project.com',
    githubUrl: 'https://github.com/user/project'
  }
}
```

### Change Personal Information

Update the following files:
- `data/filesystem.ts` - Skills, interests, philosophy, experience
- `data/apps.ts` - Skills displayed in Start Menu
- `components/StartMenu.tsx` - User name and avatar

### Customize Theme Colors

Modify `tailwind.config.ts` to change the color scheme:

```typescript
colors: {
  win11: {
    accent: {
      light: '#0067C0',  // Your brand color
      dark: '#4CC2FF',
    }
  }
}
```

## Features to Add

- [ ] Virtual desktops for different focuses
- [ ] Widget panel with live stats
- [ ] Search functionality across all files
- [ ] Right-click context menus for files
- [ ] Window snap layouts
- [ ] Notification system for achievements
- [ ] Mobile responsive adaptations
- [ ] Analytics tracking

## Browser Compatibility

- ✅ Chrome/Edge (Recommended)
- ✅ Firefox
- ✅ Safari
- ⚠️ Mobile browsers (limited functionality)

## Performance

- **First Load**: ~3 second boot sequence
- **Bundle Size**: Optimized with Next.js
- **Animations**: 60 FPS with Framer Motion
- **State**: Efficient Zustand store management

## License

MIT License - Feel free to use this as a template for your own portfolio!

## Credits

Designed and developed as a creative portfolio showcase.
Inspired by the Windows 11 operating system.


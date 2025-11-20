import { FileSystemItem } from '@/types'

export const fileSystem: FileSystemItem[] = [
  // Desktop Items
  {
    id: 'desktop-aboutme',
    name: 'About Me',
    type: 'folder',
    path: '/Desktop/About Me',
    icon: 'folder',
    dateCreated: new Date('2024-01-01'),
    dateModified: new Date('2024-01-15'),
    children: [
      {
        id: 'interests-txt',
        name: 'Interests.txt',
        type: 'txt',
        path: '/Desktop/About Me/Interests.txt',
        dateCreated: new Date('2024-01-01'),
        dateModified: new Date('2024-01-10'),
        size: 1024,
        readOnly: true,
        content: `My Interests and Passions
=============================

Creative Pursuits                   ******       ******
- UI/UX design                    **      **   **      **
- Digital art and graphics       **        ** **        **
- Photography                    **         ***         **
- Writing                         **         *         **
                                   **                 **
                                    **               **
Learning & Growth                     **           **
- Continuous learning                   **       **
- Teaching and mentoring                  **   **
- Building side projects                    ***
- Contributing to developer communities
- Attending tech conferences and meetups

Outside Tech
- Love diving into sci-fi movies and books
- Hiking and outdoor activities
- Coffee enthusiast
- Boxing
- Gaming`,
      },
      {
        id: 'resume-pdf',
        name: 'Resume.pdf',
        type: 'pdf',
        path: '/Desktop/About Me/Resume.pdf',
        dateCreated: new Date('2024-01-01'),
        dateModified: new Date('2024-01-20'),
        size: 245760,
        content: 'PDF_PLACEHOLDER', // This would link to actual PDF
      },
      {
        id: 'skills-json',
        name: 'Skills.json',
        type: 'json',
        path: '/Desktop/About Me/Skills.json',
        dateCreated: new Date('2024-01-01'),
        dateModified: new Date('2024-01-15'),
        size: 2048,
        content: {
          languages: ['JavaScript', 'TypeScript', 'Python', 'Java', 'Go', 'SQL'],
          frameworks: ['React', 'Next.js', 'Node.js', 'Express', 'Django', 'Spring Boot'],
          tools: ['Git', 'Docker', 'Kubernetes', 'AWS', 'Azure', 'MongoDB', 'PostgreSQL'],
          design: ['Figma', 'Adobe XD', 'Photoshop', 'Illustrator'],
          concepts: [
            'RESTful APIs',
            'GraphQL',
            'Microservices',
            'CI/CD',
            'Agile/Scrum',
            'Test-Driven Development',
          ],
        },
      },
      {
        id: 'philosophy-md',
        name: 'Personal_Philosophy.md',
        type: 'md',
        path: '/Desktop/About Me/Personal_Philosophy.md',
        dateCreated: new Date('2024-01-01'),
        dateModified: new Date('2024-01-12'),
        size: 1536,
        readOnly: true,
        content: `# My Development Philosophy

## Code is Communication
I believe that code should be written primarily for humans to read, and only incidentally for computers to execute. Clear, well-documented code is a gift to your future self and your team.

## User-Centric Design
Technology exists to serve people. Every line of code should ultimately contribute to a better user experience. Performance, accessibility, and intuitive design are not optional features.

## Continuous Learning
The tech landscape evolves rapidly. Staying curious, embracing new technologies, and being willing to unlearn outdated practices is essential for growth.

## Quality Over Speed
While shipping fast is important, shortcuts that compromise quality create technical debt. I prioritize sustainable development practices that pay dividends over time.

## Collaboration and Community
The best solutions emerge from diverse perspectives. I value open communication, constructive feedback, and contributing to the broader developer community.

## Problem-Solving First
Before jumping to code, I invest time in understanding the problem deeply. The right solution often comes from asking better questions.`,
      },
    ],
  },
  {
    id: 'desktop-projects',
    name: 'Projects',
    type: 'folder',
    path: '/Desktop/Projects',
    icon: 'folder',
    dateCreated: new Date('2024-01-01'),
    dateModified: new Date('2024-02-01'),
    children: [
      {
        id: 'project-ecommerce',
        name: 'E-Commerce Platform.exe',
        type: 'exe',
        path: '/Desktop/Projects/E-Commerce Platform.exe',
        dateCreated: new Date('2023-06-01'),
        dateModified: new Date('2023-09-15'),
        size: 15360000,
        metadata: {
          description:
            'A full-stack e-commerce platform with real-time inventory management, payment processing, and admin dashboard. Features include product search, filtering, shopping cart, and order tracking.',
          technologies: ['Next.js', 'TypeScript', 'Node.js', 'PostgreSQL', 'Stripe', 'Redis', 'AWS'],
          projectUrl: 'https://demo-ecommerce.example.com',
          githubUrl: 'https://github.com/username/ecommerce-platform',
          tags: ['Full Stack', 'E-Commerce', 'Real-time'],
        },
      },
      {
        id: 'project-taskmanager',
        name: 'Task Manager Pro.exe',
        type: 'exe',
        path: '/Desktop/Projects/Task Manager Pro.exe',
        dateCreated: new Date('2023-10-01'),
        dateModified: new Date('2024-01-20'),
        size: 8192000,
        metadata: {
          description:
            'A collaborative task management application with drag-and-drop kanban boards, team collaboration features, time tracking, and productivity analytics. Built with real-time synchronization.',
          technologies: ['React', 'TypeScript', 'Firebase', 'Material-UI', 'WebSockets'],
          projectUrl: 'https://taskmanager-pro.example.com',
          githubUrl: 'https://github.com/username/task-manager-pro',
          tags: ['Productivity', 'Real-time', 'Collaboration'],
        },
      },
      {
        id: 'project-weatherapp',
        name: 'Weather Dashboard.exe',
        type: 'exe',
        path: '/Desktop/Projects/Weather Dashboard.exe',
        dateCreated: new Date('2023-03-01'),
        dateModified: new Date('2023-05-10'),
        size: 4096000,
        metadata: {
          description:
            'An interactive weather dashboard with beautiful visualizations, hourly/daily forecasts, weather maps, and location-based alerts. Includes historical data analysis and weather pattern predictions.',
          technologies: ['React', 'D3.js', 'OpenWeather API', 'Chart.js', 'Tailwind CSS'],
          projectUrl: 'https://weather-dash.example.com',
          githubUrl: 'https://github.com/username/weather-dashboard',
          tags: ['Data Visualization', 'API Integration', 'PWA'],
        },
      },
      {
        id: 'project-portfolio',
        name: 'Portfolio Website.exe',
        type: 'exe',
        path: '/Desktop/Projects/Portfolio Website.exe',
        dateCreated: new Date('2024-01-01'),
        dateModified: new Date('2024-02-01'),
        size: 6144000,
        metadata: {
          description:
            'This very website! A creative portfolio designed as a Windows 11 desktop environment with a fully functional file system, draggable windows, and interactive applications.',
          technologies: ['Next.js', 'TypeScript', 'Tailwind CSS', 'Framer Motion', 'Zustand'],
          projectUrl: 'https://portfolio.example.com',
          githubUrl: 'https://github.com/username/portfolio-website',
          tags: ['Creative', 'Interactive', 'Portfolio'],
        },
      },
    ],
  },
  {
    id: 'desktop-experience',
    name: 'Experience',
    type: 'folder',
    path: '/Desktop/Experience',
    icon: 'folder',
    dateCreated: new Date('2024-01-01'),
    dateModified: new Date('2024-01-25'),
    children: [
      {
        id: 'exp-techcorp',
        name: 'TechCorp Inc',
        type: 'folder',
        path: '/Desktop/Experience/TechCorp Inc',
        dateCreated: new Date('2022-01-01'),
        dateModified: new Date('2024-01-01'),
        children: [
          {
            id: 'exp-techcorp-role',
            name: 'Senior Full Stack Developer.txt',
            type: 'txt',
            path: '/Desktop/Experience/TechCorp Inc/Senior Full Stack Developer.txt',
            dateCreated: new Date('2022-01-01'),
            dateModified: new Date('2024-01-01'),
            size: 2048,
            readOnly: true,
            metadata: {
              company: 'TechCorp Inc',
              role: 'Senior Full Stack Developer',
              duration: 'Jan 2022 - Present',
            },
            content: `TechCorp Inc - Senior Full Stack Developer
Duration: January 2022 - Present
Location: San Francisco, CA (Remote)

Key Responsibilities:
- Led development of microservices architecture serving 2M+ daily active users
- Architected and implemented real-time notification system using WebSockets
- Mentored team of 5 junior developers through code reviews and pair programming
- Reduced API response time by 60% through optimization and caching strategies
- Implemented CI/CD pipeline reducing deployment time from hours to minutes

Achievements:
- Spearheaded migration from monolith to microservices, improving scalability
- Developed internal developer tools that increased team productivity by 40%
- Received "Innovation Award" for implementing AI-powered code review assistant
- Successfully delivered 15+ major features on time and under budget

Technologies:
- Frontend: React, Next.js, TypeScript, Redux
- Backend: Node.js, Python, Django, GraphQL
- Infrastructure: AWS, Docker, Kubernetes, Terraform
- Databases: PostgreSQL, MongoDB, Redis`,
          },
          {
            id: 'techcorp-docs',
            name: 'Documents',
            type: 'folder',
            path: '/Desktop/Experience/TechCorp Inc/Documents',
            dateCreated: new Date('2023-05-15'),
            dateModified: new Date('2023-06-20'),
            children: [
              {
                id: 'techcorp-private',
                name: 'Private',
                type: 'folder',
                path: '/Desktop/Experience/TechCorp Inc/Documents/Private',
                dateCreated: new Date('2023-05-15'),
                dateModified: new Date('2023-06-20'),
                children: [
                  {
                    id: 'private-cc',
                    name: 'creditcards.txt',
                    type: 'txt',
                    path: '/Desktop/Experience/TechCorp Inc/Documents/Private/creditcards.txt',
                    dateCreated: new Date('2023-05-15'),
                    dateModified: new Date('2023-06-20'),
                    size: 1024,
                    readOnly: true,
                    content: 'Cmon you cant be serious!',
                  },
                  {
                    id: 'private-btc',
                    name: 'bitcoin address.txt',
                    type: 'txt',
                    path: '/Desktop/Experience/TechCorp Inc/Documents/Private/bitcoin address.txt',
                    dateCreated: new Date('2023-05-15'),
                    dateModified: new Date('2023-06-20'),
                    size: 1024,
                    readOnly: true,
                    content: "Fool me once, shame on you. Fool me twice... you're still not getting my crypto.",
                  },
                  {
                    id: 'private-pass',
                    name: 'passwords.txt',
                    type: 'txt',
                    path: '/Desktop/Experience/TechCorp Inc/Documents/Private/passwords.txt',
                    dateCreated: new Date('2023-05-15'),
                    dateModified: new Date('2023-06-20'),
                    size: 1024,
                    readOnly: true,
                    content: 'hunter2',
                  },
                  {
                    id: 'private-secrets',
                    name: 'secrets.txt',
                    type: 'txt',
                    path: '/Desktop/Experience/TechCorp Inc/Documents/Private/secrets.txt',
                    dateCreated: new Date('2023-05-15'),
                    dateModified: new Date('2023-06-20'),
                    size: 1024,
                    readOnly: true,
                    content: 'Nice try, but I keep the real secrets in production',
                  },
                  {
                    id: 'private-donotopen',
                    name: 'do_not_open.txt',
                    type: 'txt',
                    path: '/Desktop/Experience/TechCorp Inc/Documents/Private/do_not_open.txt',
                    dateCreated: new Date('2023-05-15'),
                    dateModified: new Date('2023-06-20'),
                    size: 1024,
                    readOnly: true,
                    content: 'Sorry about all that',
                  },
                ],
              },
            ],
          },
        ],
      },
      {
        id: 'exp-startup',
        name: 'StartupXYZ',
        type: 'folder',
        path: '/Desktop/Experience/StartupXYZ',
        dateCreated: new Date('2020-01-01'),
        dateModified: new Date('2021-12-31'),
        children: [
          {
            id: 'exp-startup-role',
            name: 'Full Stack Developer.txt',
            type: 'txt',
            path: '/Desktop/Experience/StartupXYZ/Full Stack Developer.txt',
            dateCreated: new Date('2020-01-01'),
            dateModified: new Date('2021-12-31'),
            size: 1536,
            readOnly: true,
            metadata: {
              company: 'StartupXYZ',
              role: 'Full Stack Developer',
              duration: 'Jan 2020 - Dec 2021',
            },
            content: `StartupXYZ - Full Stack Developer
Duration: January 2020 - December 2021
Location: New York, NY

Key Responsibilities:
- Built responsive web applications from concept to deployment
- Collaborated with designers to implement pixel-perfect UI components
- Developed RESTful APIs and integrated third-party services
- Implemented authentication and authorization systems
- Conducted user testing and iterated based on feedback

Achievements:
- Helped grow user base from 0 to 50,000+ users
- Reduced page load time by 70% through performance optimization
- Implemented A/B testing framework that improved conversion by 25%
- Built reusable component library adopted across all products

Technologies:
- Frontend: React, Vue.js, JavaScript, SCSS
- Backend: Node.js, Express, MongoDB
- Tools: Git, Jenkins, AWS, Firebase`,
          },
        ],
      },
      {
        id: 'exp-agency',
        name: 'Digital Agency Co',
        type: 'folder',
        path: '/Desktop/Experience/Digital Agency Co',
        dateCreated: new Date('2018-06-01'),
        dateModified: new Date('2019-12-31'),
        children: [
          {
            id: 'exp-agency-role',
            name: 'Frontend Developer.txt',
            type: 'txt',
            path: '/Desktop/Experience/Digital Agency Co/Frontend Developer.txt',
            dateCreated: new Date('2018-06-01'),
            dateModified: new Date('2019-12-31'),
            size: 1024,
            readOnly: true,
            metadata: {
              company: 'Digital Agency Co',
              role: 'Frontend Developer',
              duration: 'Jun 2018 - Dec 2019',
            },
            content: `Digital Agency Co - Frontend Developer
Duration: June 2018 - December 2019
Location: Boston, MA

Key Responsibilities:
- Developed responsive websites for diverse client portfolio
- Collaborated with UX designers to create engaging user experiences
- Ensured cross-browser compatibility and accessibility standards
- Maintained and updated existing client websites
- Communicated directly with clients to understand requirements

Achievements:
- Delivered 20+ client projects ranging from landing pages to full websites
- Improved website accessibility scores to 95+ across all projects
- Reduced development time by creating reusable component library
- Received multiple client commendations for quality and timeliness

Technologies:
- HTML5, CSS3, JavaScript, jQuery
- React, Bootstrap, Tailwind CSS
- WordPress, PHP
- Figma, Adobe Creative Suite`,
          },
        ],
      },
    ],
  },
  {
    id: 'desktop-contact',
    name: 'Contact',
    type: 'folder',
    path: '/Desktop/Contact',
    icon: 'folder',
    dateCreated: new Date('2024-01-01'),
    dateModified: new Date('2024-01-05'),
    children: [
      {
        id: 'contact-email',
        name: 'Email.lnk',
        type: 'shortcut',
        path: '/Desktop/Contact/Email.lnk',
        target: 'mailto:developer@example.com',
        dateCreated: new Date('2024-01-01'),
        dateModified: new Date('2024-01-01'),
        size: 512,
      },
      {
        id: 'contact-linkedin',
        name: 'LinkedIn.lnk',
        type: 'shortcut',
        path: '/Desktop/Contact/LinkedIn.lnk',
        target: 'https://linkedin.com/in/developer',
        dateCreated: new Date('2024-01-01'),
        dateModified: new Date('2024-01-01'),
        size: 512,
      },
      {
        id: 'contact-github',
        name: 'GitHub.lnk',
        type: 'shortcut',
        path: '/Desktop/Contact/GitHub.lnk',
        target: 'https://github.com/developer',
        dateCreated: new Date('2024-01-01'),
        dateModified: new Date('2024-01-01'),
        size: 512,
      },
      {
        id: 'contact-calendar',
        name: 'Schedule_Meeting.exe',
        type: 'exe',
        path: '/Desktop/Contact/Schedule_Meeting.exe',
        target: 'https://calendly.com/developer',
        dateCreated: new Date('2024-01-01'),
        dateModified: new Date('2024-01-01'),
        size: 1024,
        metadata: {
          description: 'Schedule a meeting with me',
        },
      },
    ],
  },
  {
    id: 'desktop-thispc',
    name: 'This PC',
    type: 'shortcut',
    path: '/Desktop/This PC',
    target: '/Computer',
    icon: 'pc',
    dateCreated: new Date('2024-01-01'),
    dateModified: new Date('2024-01-01'),
  },
  // Game Icons
  {
    id: 'game-alien',
    name: 'Alien Isolation',
    type: 'exe',
    path: '/Desktop/Alien Isolation.exe',
    icon: 'game',
    gridPosition: { col: 10, row: 1 },
    dateCreated: new Date('2024-01-01'),
    dateModified: new Date('2024-01-01'),
  },
  {
    id: 'game-dyinglight',
    name: 'Dying Light',
    type: 'exe',
    path: '/Desktop/Dying Light.exe',
    icon: 'game',
    gridPosition: { col: 11, row: 1 },
    dateCreated: new Date('2024-01-01'),
    dateModified: new Date('2024-01-01'),
  },
  {
    id: 'game-lfd2',
    name: 'Left 4 Dead 2',
    type: 'exe',
    path: '/Desktop/Left 4 Dead 2.exe',
    icon: 'game',
    gridPosition: { col: 10, row: 2 },
    dateCreated: new Date('2024-01-01'),
    dateModified: new Date('2024-01-01'),
  },
  {
    id: 'game-swbf',
    name: 'Star Wars Battlefront',
    type: 'exe',
    path: '/Desktop/Star Wars Battlefront.exe',
    icon: 'game',
    gridPosition: { col: 11, row: 2 },
    dateCreated: new Date('2024-01-01'),
    dateModified: new Date('2024-01-01'),
  },
]

export function findFileByPath(path: string): FileSystemItem | null {
  const searchInItems = (items: FileSystemItem[]): FileSystemItem | null => {
    for (const item of items) {
      if (item.path === path) return item
      if (item.children) {
        const found = searchInItems(item.children)
        if (found) return found
      }
    }
    return null
  }
  return searchInItems(fileSystem)
}

export function getDesktopItems(): FileSystemItem[] {
  return fileSystem
}

export function getAllFiles(): FileSystemItem[] {
  const allFiles: FileSystemItem[] = []
  const collectFiles = (items: FileSystemItem[]) => {
    items.forEach((item) => {
      allFiles.push(item)
      if (item.children) {
        collectFiles(item.children)
      }
    })
  }
  collectFiles(fileSystem)
  return allFiles
}


# Varun Tyagi - Portfolio Website

A modern, interactive portfolio website built with React, TypeScript, and Three.js.

## Overview

This portfolio website showcases my skills, projects, experience, and achievements in an engaging and interactive way. The website features a modern design with 3D elements, particle effects, and smooth animations.

## Features

- **Responsive Design**: Fully responsive layout that works on mobile, tablet, and desktop devices
- **Interactive 3D Background**: Dynamic 3D elements using Three.js for larger screens
- **Particle Effects**: Beautiful particle animations that respond to user interaction
- **Modern UI**: Clean, modern interface with smooth animations and transitions
- **Contact Form**: EmailJS integration for sending messages directly from the website
- **Project Showcase**: Highlight of key projects with detailed information
- **Experience Timeline**: Visual representation of professional experience
- **Skills Section**: Overview of technical skills and expertise
- **Achievements Display**: Showcase of certifications and notable accomplishments

## Technologies Used

- **Frontend**: React, TypeScript, Vite
- **Styling**: Tailwind CSS, shadcn/ui component library
- **3D Graphics**: Three.js, React Three Fiber, React Three Drei
- **Animations**: React Spring
- **Form Handling**: EmailJS for contact form submission
- **Routing**: React Router for navigation
- **Deployment**: Vercel

## Getting Started

### Prerequisites

- Node.js 16+ and npm installed

### Installation

1. Clone the repository
```sh
git clone https://github.com/yourusername/portfolio.git
cd portfolio
```

2. Install NPM packages
```sh
npm install --legacy-peer-deps
```

3. Start the development server
```sh
npm run dev
```

4. Open [http://localhost:8080](http://localhost:8080) to view it in the browser

### Building for Production

```sh
npm run build
```

## Project Structure

```
src/
├── components/        # UI components
│   ├── ui/            # Base UI components from shadcn
│   ├── three/         # 3D related components
│   ├── projects/      # Projects section components
│   ├── contact/       # Contact section components
│   └── achievements/  # Achievements section components
├── hooks/             # Custom React hooks
├── lib/               # Utility functions
├── pages/             # Page components
└── main.tsx           # Application entry point
```

## Deployment

This site is configured for deployment on Vercel. When deploying, make sure to:

1. Add the environment variable `NPM_FLAGS` with the value `--legacy-peer-deps` in your Vercel project settings
2. Connect your repository to Vercel for automatic deployments

## Contact

Varun Tyagi - [varun28082001@gmail.com](mailto:varun28082001@gmail.com)

Project Link: [https://github.com/yourusername/portfolio](https://github.com/yourusername/portfolio)

## License

Distributed under the MIT License. See `LICENSE` for more information.

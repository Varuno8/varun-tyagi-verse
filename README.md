
# Varun Tyagi - Portfolio Website

A modern, interactive portfolio website built with React, TypeScript, and Three.js.
It now includes an experimental [Living Resume](docs/LivingResume.md) page powered by a conversational AI avatar.

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
- **Living Resume**: Conversational AI avatar that answers questions about my experience

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
   If you update the repository later and new dependencies were added,
   run `npm install` again so the server has everything it needs.

3. In **one terminal**, start the Ollama server so that it exposes the HTTP API used by the chat backend. Be sure to use `ollama serve` (not `ollama run`):
```sh
ollama serve
```

4. In a **second terminal**, pull the model (only needed the first time) and then run the chat API which proxies to your local Llama model. Leave this terminal running:
```sh
ollama pull llama3.2:latest
npm run server
```

   The server should log `Chat server listening on 3001`. Keep this terminal running so the frontend can talk to it.

   Verify the API is responding:
   ```sh
   curl -X POST http://localhost:3001/api/chat \
     -H 'Content-Type: application/json' \
     -d '{"message":"ping"}'
   ```
Make sure the Ollama server is running and serving a model such as `llama3.2:latest`.

5. Start the Vite dev server
```sh
npm run dev
```

6. Open [http://localhost:8080](http://localhost:8080) to view it in the browser.

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

## Troubleshooting

If you see an `ECONNREFUSED` error when chatting with the avatar, ensure that:

1. The Ollama server is running (`ollama serve`).
2. You have started the API server with `npm run server`.
3. You can verify the Llama API is reachable with `curl http://localhost:11434/api/generate`.
4. Test the chat endpoint itself: `curl -X POST http://localhost:3001/api/chat -H 'Content-Type: application/json' -d '{"message":"ping"}'`.

## Contact

Varun Tyagi - [varun28082001@gmail.com](mailto:varun28082001@gmail.com)

Project Link: [https://github.com/yourusername/portfolio](https://github.com/yourusername/portfolio)

## License

Distributed under the MIT License. See `LICENSE` for more information.

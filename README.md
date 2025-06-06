````markdown
# Varun Tyagi - Portfolio Website

A modern, interactive portfolio website built with React, TypeScript, and Three.js.  
It now includes an experimental [Living Resume](docs/LivingResume.md) page powered by a conversational AI avatar.

---

## Overview

This portfolio website showcases my skills, projects, experience, and achievements in an engaging and interactive way. The site features a modern design with 3D elements, particle effects, and smooth animations.

---

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
- **Project List via Chat**: Ask the avatar for my portfolio projects and it will list them  
- **Experience & Education via Chat**: Ask about my background and the avatar shares a quick summary  
- **Personal Bio via Chat**: Ask “Who is Varun?” and the avatar responds with a short introduction  
- **Voice Controls**: Pause, resume, or stop the avatar’s speech while chatting  

---

## Technologies Used

- **Frontend**: React, TypeScript, Vite  
- **Styling**: Tailwind CSS, shadcn/ui component library  
- **3D Graphics**: Three.js, React Three Fiber, React Three Drei  
- **Animations**: React Spring  
- **Form Handling**: EmailJS for contact form submission  
- **Routing**: React Router for navigation  
- **Deployment**: Vercel  

---

## Getting Started

### Prerequisites

- Node.js 16+ and npm installed

### Installation

1. **Clone the repository**  
   ```sh
   git clone https://github.com/yourusername/portfolio.git
   cd portfolio
````

2. **Install NPM packages**

   ```sh
   npm install --legacy-peer-deps
   ```

   If you update the repository later and new dependencies were added, run `npm install` again.

3. **Start the Ollama server**

   ```sh
   ollama serve
   ```

   (*Be sure to use `ollama serve`, not `ollama run`.*)

4. **Run the chat API** (in a second terminal)

   ```sh
   ollama pull llama3.2:latest
   npm run server
   ```

   The server should log `Chat server listening on 3001`. Keep this terminal open.

5. **Verify the chat endpoint**

   ```sh
   curl -X POST http://localhost:3001/api/chat \
     -H 'Content-Type: application/json' \
     -d '{"message":"ping"}'
   ```

6. **Start the Vite dev server**

   ```sh
   npm run dev
   ```

7. **Open in your browser**
   Navigate to [http://localhost:8080](http://localhost:8080) to view the portfolio locally.

---

### Building for Production

To create an optimized, production-ready build, run:

```sh
npm run build
```

---

## Project Structure

```
src/
├── components/        # UI components
│   ├── ui/            # Base UI components from shadcn/ui
│   ├── three/         # 3D-related components
│   ├── projects/      # Project showcase components
│   ├── contact/       # Contact form components
│   └── achievements/  # Achievements display components
├── hooks/             # Custom React hooks
├── lib/               # Utility functions
├── pages/             # Page components (Home, About, Living Resume, etc.)
└── main.tsx           # Application entry point
```

---

## Deployment

This site is configured for deployment on Vercel.

1. In your Vercel dashboard, add an environment variable `NPM_FLAGS` with the value `--legacy-peer-deps`.
2. Connect your GitHub repository to Vercel for automatic deployments.

---

## Troubleshooting

If you encounter an `ECONNREFUSED` error when chatting with the avatar, check:

1. **Ollama server**:

   ```sh
   ollama serve
   ```

2. **Chat API server**:

   ```sh
   npm run server
   ```

3. **Ollama API connectivity**:

   ```sh
   curl http://localhost:11434/api/generate
   ```

4. **Chat endpoint**:

   ```sh
   curl -X POST http://localhost:3001/api/chat \
     -H 'Content-Type: application/json' \
     -d '{"message":"ping"}'
   ```

---

## Contact

Varun Tyagi – [varun28082001@gmail.com](mailto:varun28082001@gmail.com)
Project Link: [https://github.com/yourusername/portfolio](https://github.com/yourusername/portfolio)

---

## License

Distributed under the MIT License. See `LICENSE` for more information.

```
```

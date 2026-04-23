@tailwind base;
@tailwind components;
@tailwind utilities;

@layer base {
  :root {
    --sky-blue: #4ECDC4;
    --deep-ocean: #1A535C;
    --warm-amber: #FFD166;
    --bright-orange: #FF6B35;
    --soft-cloud: #F7FFF7;
    --near-black: #0A0F0D;

    --background: 0 0% 100%;
    --foreground: 150 20% 4%;
    --card: 0 0% 100%;
    --card-foreground: 150 20% 4%;
    --popover: 0 0% 100%;
    --popover-foreground: 150 20% 4%;
    --primary: 174 60% 55%;
    --primary-foreground: 0 0% 100%;
    --secondary: 174 55% 23%;
    --secondary-foreground: 0 0% 100%;
    --muted: 150 100% 97%;
    --muted-foreground: 150 10% 40%;
    --accent: 40 100% 70%;
    --accent-foreground: 150 20% 4%;
    --destructive: 0 84.2% 60.2%;
    --destructive-foreground: 0 0% 98%;
    --border: 150 20% 88%;
    --input: 150 20% 88%;
    --ring: 174 60% 55%;
    --radius: 0.625rem;
  }

  * {
    @apply border-border;
  }

  html {
    scroll-behavior: auto;
  }

  body {
    font-family: 'Inter', sans-serif;
    @apply bg-[#0A0F0D] text-[#F7FFF7];
    overflow-x: hidden;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
  }

  h1, h2, h3, h4, h5, h6 {
    text-wrap: balance;
    word-break: keep-all;
  }
}

@layer components {
  .glass-card {
    @apply backdrop-blur-xl bg-white/[0.06] border border-white/[0.15] rounded-2xl;
  }

  .glass-card-hover {
    @apply transition-all duration-300 ease-out;
  }

  .glass-card-hover:hover {
    @apply -translate-y-2 border-white/40;
    box-shadow: 0 25px 50px -12px rgba(78, 205, 196, 0.1);
  }

  .section-padding {
    @apply py-[clamp(80px,12vh,160px)] px-[clamp(1.5rem,5vw,3rem)];
  }

  .content-max {
    @apply max-w-[1200px] mx-auto;
  }

  .text-gradient-sky {
    background: linear-gradient(135deg, #4ECDC4, #1A535C);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    background-clip: text;
  }

  .text-gradient-amber {
    background: linear-gradient(135deg, #FFD166, #FF6B35);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    background-clip: text;
  }

  .gradient-orb {
    @apply absolute rounded-full pointer-events-none;
    filter: blur(120px);
  }
}

@layer utilities {
  .font-display {
    font-family: 'Inter', sans-serif;
    font-weight: 800;
    letter-spacing: -0.03em;
    line-height: 0.95;
  }

  .font-mono-label {
    font-family: 'JetBrains Mono', monospace;
    font-weight: 400;
    letter-spacing: 0.08em;
    font-size: 0.75rem;
    line-height: 1.4;
    text-transform: uppercase;
  }
}

/* Scroll indicator animation */
@keyframes scrollPulse {
  0%, 100% {
    transform: translateY(0);
    opacity: 1;
  }
  50% {
    transform: translateY(8px);
    opacity: 0.5;
  }
}

.scroll-dot {
  animation: scrollPulse 1.5s ease-in-out infinite;
}

/* Section entrance animations */
@keyframes fadeInUp {
  from {
    opacity: 0;
    transform: translateY(40px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

.animate-fade-in-up {
  animation: fadeInUp 0.8s cubic-bezier(0.16, 1, 0.3, 1) forwards;
}

/* Smooth scrollbar styling */
::-webkit-scrollbar {
  width: 6px;
}

::-webkit-scrollbar-track {
  background: #0A0F0D;
}

::-webkit-scrollbar-thumb {
  background: #1A535C;
  border-radius: 3px;
}

::-webkit-scrollbar-thumb:hover {
  background: #4ECDC4;
}

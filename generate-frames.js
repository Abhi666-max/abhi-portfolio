const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

// Install sharp locally if not present
try {
  require.resolve('sharp');
} catch (e) {
  console.log('Installing sharp...');
  execSync('npm install sharp --no-save', { stdio: 'inherit' });
}

const sharp = require('sharp');

const FRAMES_DIR = path.join(__dirname, 'public', 'frames');
const NUM_FRAMES = 120;
const WIDTH = 1920;
const HEIGHT = 1080;

if (!fs.existsSync(FRAMES_DIR)) {
  fs.mkdirSync(FRAMES_DIR, { recursive: true });
}

async function generateFrames() {
  console.log(`Generating ${NUM_FRAMES} WebP frames...`);
  
  for (let i = 1; i <= NUM_FRAMES; i++) {
    // Calculate animation progress (0 to 1)
    const t = i / NUM_FRAMES;
    
    // Abstract animation: Moving, rotating gradients and glassmorphic spheres
    const cx = WIDTH / 2 + Math.sin(t * Math.PI * 2) * 300;
    const cy = HEIGHT / 2 + Math.cos(t * Math.PI * 2) * 200;
    
    const cx2 = WIDTH / 2 + Math.sin((t + 0.5) * Math.PI * 2) * 400;
    const cy2 = HEIGHT / 2 + Math.cos((t + 0.5) * Math.PI * 2) * 300;

    const angle = t * 360;

    const svg = `
      <svg width="${WIDTH}" height="${HEIGHT}" xmlns="http://www.w3.org/2000/svg">
        <defs>
          <linearGradient id="bg" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stop-color="#050505" />
            <stop offset="100%" stop-color="#0a0a0a" />
          </linearGradient>
          
          <radialGradient id="glow1" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stop-color="rgba(100, 50, 255, 0.15)" />
            <stop offset="100%" stop-color="rgba(0, 0, 0, 0)" />
          </radialGradient>

          <radialGradient id="glow2" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stop-color="rgba(50, 200, 255, 0.1)" />
            <stop offset="100%" stop-color="rgba(0, 0, 0, 0)" />
          </radialGradient>
        </defs>

        <!-- Background -->
        <rect width="100%" height="100%" fill="url(#bg)" />

        <!-- Moving Glows -->
        <circle cx="${cx}" cy="${cy}" r="600" fill="url(#glow1)" />
        <circle cx="${cx2}" cy="${cy2}" r="800" fill="url(#glow2)" />

        <!-- Rotating abstract wireframe element -->
        <g transform="translate(${WIDTH/2}, ${HEIGHT/2}) rotate(${angle})">
          <rect x="-200" y="-200" width="400" height="400" fill="none" stroke="rgba(255,255,255,0.05)" stroke-width="2" />
          <rect x="-150" y="-150" width="300" height="300" fill="none" stroke="rgba(255,255,255,0.1)" stroke-width="2" transform="rotate(15)" />
          <rect x="-100" y="-100" width="200" height="200" fill="none" stroke="rgba(255,255,255,0.2)" stroke-width="2" transform="rotate(30)" />
          <circle cx="0" cy="0" r="250" fill="none" stroke="rgba(255,255,255,0.03)" stroke-width="4" stroke-dasharray="10 20" />
        </g>
        
        <!-- Scrollytelling visual markers (subtle) -->
        <g transform="translate(100, ${HEIGHT / 2})">
           <circle cx="0" cy="${(t - 0.5) * 800}" r="4" fill="#fff" />
           <line x1="0" y1="-400" x2="0" y2="400" stroke="rgba(255,255,255,0.1)" stroke-width="1" />
        </g>
      </svg>
    `;

    const fileName = `frame_${String(i).padStart(4, '0')}.webp`;
    const filePath = path.join(FRAMES_DIR, fileName);

    await sharp(Buffer.from(svg))
      .webp({ quality: 80 })
      .toFile(filePath);
      
    if (i % 10 === 0) console.log(`Generated ${i}/${NUM_FRAMES}`);
  }
  
  console.log('Done generating frames!');
}

generateFrames().catch(console.error);

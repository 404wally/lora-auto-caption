# PASTE THIS ENTIRE PROMPT INTO CLAUDE CODE:

I need you to create and deploy a Node.js web app called "lora-auto-caption" - an AI-powered caption generator for LoRA training.

## What the app does:
Users upload images of a character, Claude AI analyzes each image and generates training captions, users can review/edit/approve captions, then export a ZIP with resized images and matching .txt caption files ready for Civitai LoRA training.

## Tech stack:
- Node.js + Express server
- Vanilla HTML/JS frontend (no React build step)
- Tailwind CSS via CDN
- JSZip via CDN for ZIP export
- Anthropic API for image analysis

## Project structure:
lora-auto-caption/
├── package.json
├── .env
├── .env.example
├── .gitignore
├── README.md
├── src/
│   └── server.js
└── public/
    └── index.html

## Server (src/server.js):
- Express server on PORT 3000 (or process.env.PORT for Render)
- Serve static files from /public
- POST /api/analyze-image endpoint that:
  - Accepts: { imageBase64, mediaType, triggerWord }
  - Calls Anthropic API (claude-sonnet-4-20250514) with the image
  - Prompt tells Claude to generate a LoRA training caption starting with the trigger word, comma-separated tags describing visual elements (character features, colors, pose, expression, clothing, background), under 50 words, no full sentences
  - Returns: { caption }
- GET /api/health endpoint for health checks
- Use dotenv for environment variables
- Set express.json limit to 50mb for large images

## Frontend (public/index.html):

Include these CDN scripts in head:
- Tailwind CSS: https://cdn.tailwindcss.com
- JSZip: https://cdnjs.cloudflare.com/ajax/libs/jszip/3.10.1/jszip.min.js

### Header:
- Logo area with ⚡ emoji
- "LoRA Auto Caption" as the title in pink/gradient
- Subtitle: "AI-powered captions for LoRA training"
- Step indicators on the right (1-Upload, 2-Review, 3-Export) with circles that fill in as you progress

### Step 1 - Upload:
- Text input for trigger word (default: "my_character")
- Explanation text: "This word will start every caption and activate your character when generating"
- Drag-and-drop zone for images (accepts multiple, accepts jpg/png/webp)
- Drop zone text: "Drop images here or click to upload" with subtext "Supports JPG, PNG, WebP • Recommended: 20-40 images"
- Grid preview of uploaded images (4-6 columns) with remove buttons on hover
- Image count display: "X images ready"
- "Clear all" link button
- "Generate Captions" button with lightning icon, gradient pink-to-purple
- Small text: "Claude AI will analyze each image and generate training captions"

### Step 2 - Review:
- Header showing "Review Captions" with "X of Y approved" count
- Back button, Approve All button (appears when all done processing), Continue to Export button (disabled until at least 1 approved)
- List of images, each showing:
  - Thumbnail (96x96) with index badge (01, 02, etc)
  - Filename
  - Caption text (or "Analyzing image..." with spinner while processing, or error message in red)
  - Action buttons: regenerate (refresh icon), edit (pencil icon), delete (trash icon)
  - Approve checkbox/button on the right (teal when approved)
- Cards have colored borders: teal for approved, red for error, slate-700 for default
- Process images sequentially with a small delay between each, update UI after each one completes

### Step 3 - Export:
- Celebration emoji 🎉 and "Ready to Export!" heading
- Summary text: "X images with captions ready for training"
- Card with "Your package includes":
  - X approved images (resized to selected dimensions)
  - X caption .txt files  
  - Trigger word: [show trigger word in code style]
- Dropdown to select output size: 512×512, 768×768, 1024×1024 (default 1024×1024)
- Preview card showing scrollable list of captions with their filenames (01.txt, 02.txt, etc.)
- Two buttons: "← Back to Review" (slate) and "Download ZIP" (gradient pink-purple)
- Yellow/amber info box with "Next steps:" header:
  1. Go to civitai.com → Create → Train a LoRA
  2. Upload the ZIP contents (images + caption files)
  3. Recommended settings: Rank 32, Alpha 16, Epochs 15-20
  4. Your trigger word: [trigger word]

### Image Resize Function (client-side):
Create a resizeImage function that:
- Takes an image blob/file and target size (e.g., 1024)
- Creates an offscreen canvas at target dimensions (square)
- Calculates scaling to cover the canvas (like CSS object-fit: cover)
- Centers the image and draws it cropped to fill the square
- Returns a Promise that resolves to a PNG blob

### ZIP Export Function:
When "Download ZIP" is clicked:
- Show loading state on button ("Creating ZIP...")
- Create new JSZip instance
- Create "images" folder in zip
- For each approved image (in order):
  - Resize to selected dimensions using canvas
  - Add to zip as images/01.png, images/02.png, etc.
  - Add caption as 01.txt, 02.txt, etc. (in root of zip)
- Add README.txt with:
  - "LoRA Auto Caption - Training Package"
  - Generation date
  - Trigger word
  - Total images
  - Instructions for Civitai training
- Generate zip and trigger download as "lora-training-package.zip"
- Reset button state when done

## Styling:
- Dark theme background: #0f172a (slate-900)
- Card backgrounds: #1e293b (slate-800)
- Borders: #334155 (slate-700)
- Primary accent: pink-500 (#ec4899)
- Success accent: teal-500 (#14b8a6)
- Gradient buttons: from-pink-500 to-purple-500
- Step indicators show checkmark when complete, filled circle when active, empty circle when pending
- Rounded corners on everything (rounded-xl for cards, rounded-lg for buttons)
- Smooth transitions on hover states
- Spinner animation for loading states (use CSS animation)
- Max width container (max-w-6xl) centered on page

## Package.json:
{
  "name": "lora-auto-caption",
  "version": "1.0.0",
  "description": "AI-powered captions for LoRA training",
  "main": "src/server.js",
  "scripts": {
    "start": "node src/server.js",
    "dev": "node src/server.js"
  },
  "dependencies": {
    "express": "^4.18.2",
    "cors": "^2.8.5",
    "dotenv": "^16.3.1"
  },
  "engines": {
    "node": ">=18.0.0"
  }
}

## .gitignore:
node_modules/
.env
.DS_Store

## .env.example:
ANTHROPIC_API_KEY=your-api-key-here

## .env (create this with the actual key):
ANTHROPIC_API_KEY=your-actual-api-key-here

## README.md should include:
- Project title and description
- Features list
- Local development instructions
- Deployment instructions for Render
- How to use the app
- Tech stack

## After creating all files:

1. Run npm install
2. Run npm start  
3. Test locally at http://localhost:3000 - upload a test image and verify:
   - Image upload works
   - Caption generation works (calls the API successfully)
   - Editing captions works
   - Approving works
   - ZIP download works with resized images
4. Once working, initialize git: git init
5. Create GitHub repo: gh repo create lora-auto-caption --public --source=. --remote=origin
6. Commit and push: git add . && git commit -m "Initial commit - LoRA Auto Caption" && git push -u origin main
7. Walk me through deploying to Render.com:
   - Create new Web Service
   - Connect the GitHub repo
   - Build command: npm install
   - Start command: npm start
   - Add environment variable ANTHROPIC_API_KEY

Let's start building this step by step. Create the project directory and all the files first, then we'll test and deploy.

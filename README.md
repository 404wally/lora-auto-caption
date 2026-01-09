# LoRA Auto Caption

AI-powered caption generator for LoRA training. Upload images of your character, let Claude AI analyze each one and generate training captions, then export a ZIP ready for Civitai.

## Features

- **Drag & Drop Upload** - Upload multiple images at once (JPG, PNG, WebP)
- **AI-Powered Captions** - Claude analyzes each image and generates optimized training captions
- **Custom Trigger Word** - Set your character's activation word that starts every caption
- **Review & Edit** - Review generated captions, edit as needed, approve the ones you want
- **One-Click Export** - Download a ZIP with resized images and matching caption files
- **Multiple Output Sizes** - Choose 512x512, 768x768, or 1024x1024 for your training images

## Local Development

1. Clone the repository:
   ```bash
   git clone https://github.com/yourusername/lora-auto-caption.git
   cd lora-auto-caption
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Create a `.env` file with your Anthropic API key:
   ```bash
   cp .env.example .env
   # Edit .env and add your API key
   ```

4. Start the server:
   ```bash
   npm start
   ```

5. Open http://localhost:3000 in your browser

## Deployment to Render

1. Push your code to GitHub
2. Go to [render.com](https://render.com) and create a new Web Service
3. Connect your GitHub repository
4. Configure:
   - **Build Command:** `npm install`
   - **Start Command:** `npm start`
5. Add environment variable:
   - `ANTHROPIC_API_KEY` = your API key
6. Deploy!

## How to Use

1. **Upload** - Enter your trigger word and upload 20-40 images of your character
2. **Review** - Claude will analyze each image and generate captions. Edit or regenerate as needed, then approve the captions you want to use
3. **Export** - Select your output size and download the ZIP file
4. **Train** - Upload the ZIP contents to Civitai's LoRA trainer

## Tech Stack

- Node.js + Express
- Vanilla HTML/JS frontend
- Tailwind CSS (CDN)
- JSZip (CDN)
- Anthropic Claude API

## License

MIT

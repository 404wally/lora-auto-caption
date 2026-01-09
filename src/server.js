require('dotenv').config();
const express = require('express');
const cors = require('cors');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(cors());
app.use(express.json({ limit: '50mb' }));
app.use(express.static(path.join(__dirname, '../public')));

// Health check endpoint
app.get('/api/health', (req, res) => {
  res.json({ status: 'ok', timestamp: new Date().toISOString() });
});

// Analyze image endpoint
app.post('/api/analyze-image', async (req, res) => {
  try {
    const { imageBase64, mediaType, triggerWord } = req.body;

    if (!imageBase64 || !mediaType) {
      return res.status(400).json({ error: 'Missing imageBase64 or mediaType' });
    }

    if (!process.env.ANTHROPIC_API_KEY) {
      return res.status(500).json({ error: 'ANTHROPIC_API_KEY not configured' });
    }

    const prompt = `You are a LoRA training caption generator. Analyze this image and generate a training caption.

Rules:
- Start the caption with the trigger word: ${triggerWord || 'my_character'}
- Follow with comma-separated tags describing visual elements
- Include: character features, colors, pose, expression, clothing, background, lighting, art style
- Keep it under 50 words total
- Use only lowercase tags
- No full sentences, just comma-separated descriptive tags
- Be specific and detailed about what you see

Example format:
${triggerWord || 'my_character'}, blonde hair, blue eyes, smiling, casual outfit, white t-shirt, jeans, standing, arms crossed, indoor, living room, natural lighting, photorealistic

Generate the caption for this image:`;

    const response = await fetch('https://api.anthropic.com/v1/messages', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'x-api-key': process.env.ANTHROPIC_API_KEY,
        'anthropic-version': '2023-06-01'
      },
      body: JSON.stringify({
        model: 'claude-sonnet-4-20250514',
        max_tokens: 200,
        messages: [
          {
            role: 'user',
            content: [
              {
                type: 'image',
                source: {
                  type: 'base64',
                  media_type: mediaType,
                  data: imageBase64
                }
              },
              {
                type: 'text',
                text: prompt
              }
            ]
          }
        ]
      })
    });

    if (!response.ok) {
      const errorData = await response.json();
      console.error('Anthropic API error:', errorData);
      return res.status(response.status).json({
        error: errorData.error?.message || 'Failed to analyze image'
      });
    }

    const data = await response.json();
    const caption = data.content[0]?.text?.trim() || '';

    res.json({ caption });
  } catch (error) {
    console.error('Error analyzing image:', error);
    res.status(500).json({ error: 'Failed to analyze image' });
  }
});

// Start server
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});

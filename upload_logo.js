const fs = require('fs');
const path = require('path');

async function uploadToImgbb() {
  const apiKey = process.env.IMGBB_API_KEY; // set in Server/.env
  const imagePath = path.join(__dirname, 'Client/public/logo.png');
  const base64Image = fs.readFileSync(imagePath, { encoding: 'base64' });

  const formData = new URLSearchParams();
  formData.append('image', base64Image);

  try {
    const response = await fetch(`https://api.imgbb.com/1/upload?key=${apiKey}`, {
      method: 'POST',
      body: formData,
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded'
      }
    });

    const data = await response.json();
    console.log(JSON.stringify(data, null, 2));
  } catch (error) {
    console.error('Error uploading image:', error);
  }
}

uploadToImgbb();

const axios = require('axios');
const formData = require('form-data');
require('dotenv').config();

const uploadToImgBB = async (fileBuffer, fileName) => {
    try {
        const form = new formData();
        form.append('image', fileBuffer.toString('base64'));

        const response = await axios.post(`https://api.imgbb.com/1/upload?key=${process.env.IMGBB_API_KEY}`, form, {
            headers: {
                ...form.getHeaders(),
            },
        });

        return response.data.data.url;
    } catch (error) {
        console.error('ImgBB Upload Error:', error.response?.data || error.message);
        throw new Error('Failed to upload image to ImgBB');
    }
};

module.exports = { uploadToImgBB };

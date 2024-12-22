import axios from 'axios';

const API_BASE_URL = 'http://localhost:3000/api'; // Update this with your backend URL

export const api = {
  async encryptImage(file: File, encryptionKey: string): Promise<string> {
    const formData = new FormData();
    formData.append('image', file);
    formData.append('key', encryptionKey);

    const response = await axios.post(`${API_BASE_URL}/encrypt`, formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });

    return response.data.encryptedData;
  },

  async decryptImage(encryptedData: string, decryptionKey: string): Promise<string> {
    const response = await axios.post(`${API_BASE_URL}/decrypt`, {
      encryptedData,
      key: decryptionKey,
    });

    return response.data.decryptedImage;
  },
};
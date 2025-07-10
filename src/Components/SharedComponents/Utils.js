import axios from "axios"

// upload photo
// export const uploadPhoto = async (image) => {
//     const formdata = new FormData()
//     formdata.append('image', image);
//     formData.append('upload_preset', 'salman');

//     const cloudName = 'dobtto17a';

//     const { data } = await axios.post(`https://api.cloudinary.com/v1_1/${cloudName}/image/upload`, formdata)
//     return data?.data.display_url
// }
// utils/uploadPhoto.js

export const uploadPhoto = async (image) => {
  const formData = new FormData(); 
  formData.append('file', image); 
  formData.append('upload_preset', 'salman');

  const cloudName = 'dobtto17a';

  const response = await axios.post(
    `https://api.cloudinary.com/v1_1/${cloudName}/image/upload`,
    formData
  );

  return response?.data?.secure_url; // ✅ This is the image URL
};


// save user in DB
export const saveUser = async (userData) => {
    const { data } = await axios.post(`${import.meta.env.VITE_BASE_URL}/register`, userData)
    console.log(data);
}

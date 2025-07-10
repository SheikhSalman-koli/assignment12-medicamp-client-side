import axios from "axios"

// upload photo
export const uploadPhoto =async (image)=>{
    const formdata =new FormData()
    formdata.append('image', image)
    const {data}= await axios.post(`https://api.imgbb.com/1/upload?key=${import.meta.env.VITE_IMGBB_KEY}`, formdata)
    return data?.data.display_url
}
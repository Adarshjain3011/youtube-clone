import cloudinary from 'cloudinary';

export default async  function cloudinaryConnect(){
    
  try {

    (cloudinary as any).config({

      cloud_name: process.env.CLOUD_NAME,
      api_key: process.env.API_KEY,
      api_secret: process.env.API_SECRET,

    });

    console.log('cloudiary running');

  } catch (error) {

    console.log('cloudiary failed');
    console.log(error);
  }

};
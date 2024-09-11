import djangoApiConnection from "../django_api.js";

const getQRCode = async () => {
    try {
      //sends GET request to create qrcode for user
      const response = await djangoApiConnection.get("qrcode/");
    }
    catch (error) {
      console.log(error);
    }
}

export default getQRCode;
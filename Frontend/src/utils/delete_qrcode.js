import djangoApiConnection from "../django_api.js";

const deleteQRCode = async () => {
    try {
      //sends DELETE request to delete qrcode
      const response = await djangoApiConnection.delete("qrcode/delete/");
    }
    catch (error) {
      console.log(error);
    }
}

export default deleteQRCode;
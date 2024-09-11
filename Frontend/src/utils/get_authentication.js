import djangoApiConnection from "../django_api.js";

const getAuthentication = async (setAuthentication) => {
    try {
      //sends GET request to get authentication
      const response = await djangoApiConnection.get("profile/authentication/");

      setAuthentication(response.data);
    }
    catch (error) {
      console.log(error);
    }
}

export default getAuthentication;
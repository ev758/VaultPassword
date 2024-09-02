import djangoApiConnection from "../django_api.js";

const getPasswordStorages = async (setPasswordStorages) => {
    try {
        //sends GET request to get password storages
        const response = await djangoApiConnection.get("password-storage/");

        setPasswordStorages(response.data);
    }
    catch (error) {
        console.log(error);
    }
}

export default getPasswordStorages;
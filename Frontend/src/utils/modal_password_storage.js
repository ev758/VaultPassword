import djangoApiConnection from "../django_api.js";

const modalPasswordStorage = async (setPasswordStorage, storageId) => {
    try {
        //sends GET request to get password storage
        const response = await djangoApiConnection.get(`modal-password-storage/${storageId}/`);

        setPasswordStorage(response.data);
    }
    catch (error) {
        console.log(error);
    }
}

export default modalPasswordStorage;
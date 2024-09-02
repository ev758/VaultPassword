import djangoApiConnection from "../django_api.js";

const getProfile = async (setProfile) => {
    try {
        //sends GET request to get profile
        const response = await djangoApiConnection("profile/");

        setProfile(response.data);
    }
    catch (error) {
        console.log(error);
    }
}

export default getProfile;
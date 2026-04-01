import axios from "axios";
import { type FinalUserData } from "../interfaces/appInterfaces.ts";

const testBaseUrl = 'http://localhost:5800';

export const getUserDataFromSource = async (token: string, game_id: string
): Promise<FinalUserData | false | undefined > => {
     try {   
        const response = await axios.get(`${process.env.service_base_url}/service/user/detail`, {
        // const response = await axios.get(`${testBaseUrl}/service/user/detail`, {
            headers: {
                token: token,
                game_id: game_id,
            },
        });
        
        console.log("UserData:", response.data.user);

        const userData : FinalUserData | undefined = response?.data?.user;
        
        if (userData) {
            // if the value in not valid as URI compo then it converts it into one 
            userData.user_id = encodeURIComponent(userData.user_id);

            const id = `${userData.operatorId}:${userData.user_id}`;

            const finalData: FinalUserData = {
                ...userData,
                id,
                game_id,
                token,
            }
            return finalData;
        };

        return;

    } catch(error :any) {
        console.error(error);
        return false;
    }
}
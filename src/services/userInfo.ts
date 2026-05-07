import axios from "axios";
import { type FinalUserData } from "../interfaces/appInterfaces.js";
import chalk from "chalk";

const testBaseUrl = 'http://localhost:5800';

export const getUserDataFromSource = async (token: string, game_id: string
): Promise<FinalUserData | false | undefined  | any > => {
     try {   
        console.log(chalk.red("REACHING THE AXIOS SERVICES FOR  PLAYER DETAILS"))
        const response = await axios.get(`${process.env.service_base_url}/service/user/detail`, {
        // const response = await axios.get(`${testBaseUrl}/service/user/detail`, {
            headers: {
                token: token,
                game_id: game_id,
            },
            timeout: 1000
        });
        
        console.log(chalk.red("The response from the admin services"))
        console.log("UserData:", response.data.user);
        // console.log("UserData:", response.data.user);

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
     
        return response.data;

    } catch(error :any) {
        if(error.response){
            if(error.response.status === 401){
               return error.response.data
            }
            return {status: false, msg: "Internal Server Error" }
        }

        // 2. No response (network issue, timeout)
        if (error.request) {
            return {
                status:false,
                type: "NETWORK_ERROR",
                msg: "Admin service not reachable"
            };
        }

        return {
            status:false,
            type: "UNKNOWN_ERROR",
            msg: error.message
        };

    }
}
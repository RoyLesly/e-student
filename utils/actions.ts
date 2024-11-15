import AsyncStorage from "@react-native-async-storage/async-storage";
import { RefreshUrl } from "./apiLinks";
import { protocol } from "./config";
import { axiosRequest } from "./functions";
import { defaultSession, JwtPayload } from "./inter";
import { SchemaLogin, SchemaRefresh } from "./schema";
import { jwtDecode } from 'jwt-decode';


export const ActionLogin = async (loginData: unknown, url: string) => {
    var config = {}
    const result = SchemaLogin.safeParse(loginData);
    if (!result.success) {
        let errorMessage = "";

        result.error.issues.forEach((issue: any) => {
            errorMessage = errorMessage + issue.path[0] + ": " + issue.message + ". ";
        });

        return {
            error: errorMessage
        }
    }

    const response = await axiosRequest<any>({
        method: "post",
        url: url,
        payload: result.data,
        params: "remove_payload",
        token: config
    })
        
    if (response) {
        console.log(response?.data, 34)

        if (response?.data) {
            if (response?.data.access) {
                const token = jwtDecode(response.data.access)
                const session = defaultSession    
                session.user_id = token.user_id
                session.username = token.username
                session.role = token.role
                session.is_superuser = token.is_superuser
                session.dept = token.dept
                session.page = token.page
                session.school = token.school
                session.exp = new Date(token.exp ? token.exp : 1 * 1000)
                session.created_at = new Date(token.iat ? token.iat : 1 * 1000)
                session.isLoggedIn = true
                session.access = response.data.access
                session.refresh = response.data.refresh
                // await session.save();
                // save to async storage

                return session
            }
            if (response.data.detail){
                return { detail: response.data.detail }
            } 
            if (response?.data.error) {
                return { error: response.data.error }
            }           
        }
        return response;
    } else {
        return { detail: "NETWORK ERROR"}
    }
}

export const ActionRefresh = async (loginData: unknown, url: string) => {
    var config = {}
    const result = SchemaRefresh.safeParse(loginData);
    if (!result.success) {
        let errorMessage = "";

        result.error.issues.forEach((issue: any) => {
            errorMessage = errorMessage + issue.path[0] + ": " + issue.message + ". ";
        });

        return {
            error: errorMessage
        }
    }

    const response = await axiosRequest<any>({
        method: "post",
        url: url,
        payload: result.data,
        params: "remove_payload",
        token: config
    })
        
    if (response) {
        if (response?.data) {
            if (response?.data.access) {
                await AsyncStorage.setItem("access", response.data.access)
                return jwtDecode(response.data.access)
            }
            if (response.data.detail){
                return { detail: response.data.detail }
            } 
            if (response?.data.error) {
                return { error: response.data.error }
            }           
        }
        return response;
    } else {
        return { detail: "NETWORK ERROR"}
    }
}

export const isTokenExpired = async (token: string, ref: string, domain: string) => {
    try {
      const accessDecoded: JwtPayload = jwtDecode(token);
      const currentTime = Math.floor(Date.now() / 1000); // Current time in seconds
      const checkAccess =  accessDecoded.exp ? accessDecoded.exp < currentTime : false;
      if (checkAccess){
          const response = await ActionRefresh({refresh: ref}, protocol + "api" + domain + RefreshUrl )
          if (response.user_id){
            return { ...response, expired: false}
          }
        }
      return { ...accessDecoded, expired: checkAccess}
    } catch (error) {
      return { expired: true, message: "invalid_token" };
    }
  }
  
  export default isTokenExpired;
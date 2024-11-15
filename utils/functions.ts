import { API_URL, API_KEY } from '@env';
import Axios, { AxiosResponse } from "axios";
import axios from "axios";
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Alert } from 'react-native';



export interface DataProps {
    [key: string]: string | boolean | number | null | any | React.ReactElement
}

interface AxiosRequestProps {
    method?: 'get' | 'post' | 'put' | 'patch' | 'delete' | 'update' | 'check'
    url: string
    payload?: DataProps | FormData
    hasAuth?: boolean
    showError?: boolean
    errorObject?: {
        message: string,
        description?: string
    }
    file?: boolean
    params?: any
    token?: any
}


export const axiosRequest = async <T>({
    method = 'get',
    url,
    payload,
    hasAuth = false,
    showError = true,
    file = false,
    params = {},
    errorObject,
    token
}: AxiosRequestProps): Promise<AxiosResponse<T> | null | any> => {

    let headers: any = hasAuth ? {} : {}
    if (file) {
        headers = { 
            ...headers, 
            'content-type': 'multipart/form-data',
            'X-API-KEY': API_KEY
        }
    } else {
        headers = { ...headers, 
            'content-type': 'application/json', 
            'media_type': 'application/json',
            'X-API-KEY': API_KEY
        }
    }

    if (token && Object.keys(token).length > 0) {
        headers = { ...headers, ...token }
    }

    if (params == "remove_payload") {
        payload = payload
        params = {}
    }
    else {
        payload = { payload: payload }
    }
    
    if (Object.keys(token).length > 0) {
        const response = await Axios({
            method,
            url,
            params: params,
            data: payload,
            headers: { ...token.headers }
        }).catch(
            (e: any) => {
                if (!showError) return
                return e.response
            }
        ) as AxiosResponse<T>
        if (response) { return response }
    } else {
        const response = await Axios({
            method,
            url,
            params: params,
            data: payload,
            headers: { ...headers }
        }).catch(
            (e: any) => {
                console.log(e, 91)
                console.log(url, 92)
                console.log(showError, 93)
                if (!showError) return
                return e?.response ? e.response : e
            }
        ) as AxiosResponse<T>
        if (response) { return response }
    }

    return null
}


export const getData = async (url: string, searchParams: any, page?: string | null) => {

    const session: any = await AsyncStorage.getItem("access");

    if (session && session.length > 10) {
        var config = { headers: { 
            Authorization: `Bearer ${session}`,
            'X-API-KEY': API_KEY
        } }

        if (Object.keys(searchParams).length > 0) {

            var Searchkeys = Object.keys(searchParams)

            if (Searchkeys) {
                var newUrl = `${url}?`
                Searchkeys.forEach(key => {
                    newUrl = `${newUrl}${key}=${searchParams[key]}&`
                });

                try {
                    const response = await axios.get(
                        newUrl,
                        config
                    )
                    if (response?.data) {
                        return response.data;
                    }
                    return { error: "error" }
                } catch (error: any) {
                    var errObj = Object.keys(error)
                    if (errObj && errObj.length > 0) {
                        if (errObj?.includes("code") && error.code == "ERR_BAD_RESPONSE") { console.log("error.code", 104, error.code); return { error: "ERR_BAD_RESPONSE" } }
                        if (errObj?.includes("code") && error.code == "ECONNRESET") { console.log("error.code", 104, error.code); return { error: "ECONNRESET" } }
                        if (errObj?.includes("name") && error.name == "Error") { console.log("error.name", 105, error.name,); return { error: "Error" } }
                        if (errObj?.includes("message") && error.message.includes("Client network")) { console.log("error.message", 106, error.message,); return { error: error.message } }
                        if (errObj?.includes("cause") && error.cause.code) { console.log("error.cause", 107, error.cause.code); return { error: "ECONNRESET" } }
                        if (errObj?.includes("response") && error.response.data) {
                            if (error.response?.data?.code == "token_not_valid") { return { unauthorized: error.response.data.code } }
                            return { error: error.response.data }
                        }
                    }

                    if (error.response?.data?.code == "token_not_valid") { 
                        Alert.alert("Expired Session", "Please Login Again")
                        return { unauthorized: error.response.data.code } 
                    }
                    if (error && Object.keys(error).length > 0)
                        if (error.response?.data.detail) { return { error: error.response.data.detail } }
                    return { error: error }
                    return error;
                }
            }
        }
        if (Object.keys(searchParams).length == 0 && !page) {
            console.log(Object, "object 160")
            try {
                console.log(url, config, 159)
                const response = await axios.get(
                    url,
                    config
                )
                console.log(response, 119)
                return response.data;
            } catch (error: any) {
                if (error.response?.data?.code == "token_not_valid") { return { unauthorized: error.response.data.code } }
                if (error && Object.keys(error).length > 0)
                    if (error.response?.data.detail) { return { error: error.response.data.detail } }
                return error.cause?.code
                // return error;
            }
        }
    }
}


export const gradeCheck = (mark: number, limit: number) => {
    const st = mark > (limit - 0.1)
    let gp = 0
    let gd = "F"
    if (mark > 39.9) { gd = "D ", gp = 1    }
    if (mark > 44.9) { gd = "D+", gp = 1.5}
    if (mark > 49.9) { gd = "C ", gp = 2}
    if (mark > 54.9) { gd = "C+", gp = 2.5}
    if (mark > 59.9) { gd = "B ", gp = 3}
    if (mark > 69.9) { gd = "B+", gp = 3.5}
    if (mark > 79.9) { gd = "A ", gp = 4}
    return { status: st, grade: gd, gp: gp }   
}




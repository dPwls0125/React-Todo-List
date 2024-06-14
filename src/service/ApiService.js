import { API_BASE_URL } from "../app-config";
const ACCESS_TOKEN = "ACCESS_TOKEN";

export function call(api, method, request) {
    console.log("call 실행");
    let headers = new Headers({
        "Content-Type": "application/json",
    });

    const accessToken = localStorage.getItem("ACCESS_TOKEN");

    if (accessToken) {
        headers.append("Authorization", "Bearer " + accessToken);
    }

    let options = {
        headers: headers,
        url: API_BASE_URL + api,
        method: method,
    };

    if (request) {
        options.body = JSON.stringify(request);
    }

    return fetch(options.url, options)
        .then((response) => 
            {
            if (response.status === 403) {
                window.location.href = "/login";
                return Promise.reject({ status: 403, message: "Forbidden" });
            }

            const contentType = response.headers.get("content-type");
            if(contentType && contentType.includes("application/json")){
                return response.json().then((json) => {
                    if (!response.ok) {
                        return Promise.reject({ status: response.status }); // Promise.reject : catch로 매개변수 전달.
                    }
                    return json;
                });
            }else {
                return response.text().then((text) => {
                    if (!response.ok) {
                        return Promise.reject({ status: response.status });
                    }
                    return text;
                });
            }
            
        })
        .catch((error) => {
            console.log("Oops!");
            console.log(error.status);
            console.log("Oops!");

            if (error.status === 403) {
                window.location.href = "/login";
            } else if (error.status === 400) {
                console.log("400");
            }
            return Promise.reject(error);
        });
}

// Fetch api는 Promise를 이용해 http 요청을 송수신 하는 역할을 한다.

// 로그인을 위한 API 서비스 메소드 signin
export function signin(userDTO) {
    return call("/auth/signIn", "POST", userDTO)
        .then((response) => {
            if (response.token) {
                // local 스토리지에 토큰 저장
                localStorage.setItem("ACCESS_TOKEN", response.token);
                // token이 존재하는 경우 todo 화면으로 리디렉트
                window.location.href = "/";
            }
        });
}

// 회원가입 요청
export function signup(userDTO) {
    return call("/auth/signUp", "POST", userDTO)
        .then((response) => {
            if (response.status === 200) {
                window.location.href = "/";
            }
        })
        .catch((error) => {
            console.log("Oops");
            console.log(error.status);
            console.log("Ooops!");
            if (error.status === 403) {
                window.location.href = "/auth/signUp";
            }
            console.log(error);
        });
}

// 로그 아웃
export function signout() {
    // local 스토리지에 토큰 삭제
    localStorage.setItem("ACCESS_TOKEN", null);
    window.location.href = "/login";
}

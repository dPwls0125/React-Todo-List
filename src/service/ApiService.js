import { API_BASE_URL } from "../app-config";

export function call(api, method , request){
    let options = {
        headers: new Headers({
                "Content-Type" : "application/json"
            }),
        url : API_BASE_URL + api,
        method : method
    };

    if(request) {
        options.body = JSON.stringify(request);
    }

    return fetch(options.url,options)
    .then((response) =>
        response.json().then((json)=> {
            if(!response.ok) {
                return Promise.reject(json); // Promise.reject : catch로 매개변수 전달.
            }
            return json;
        }))
    .catch((error) => {
        console.log(error.status);
        if(error.status === 403){
            window.location.href = "/login"
        }
      return Promise.reject(error);
    });
}

// Fetch api는 Promise를 이용해 http 요청을 송수신 하는 역할을 한다. 
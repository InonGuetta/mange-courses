export const apiFetch = async (path, { method = "GET",body,headers } = {}) =>{
    
    const res = await fetch(path, {
        method,
        headers: {
            "Content-Type": "application/json",
            ...(headers || {}),
        },
        body: body ? JSON.stringify(body) : undefined,
    });

    let data = null;
    const contentType =  res.headers.get("content-type") || "";
    if(contentType.includes("application/json")) {
        try{
            data = await res.json();
        }catch{
            data = null;
        }
    }

    if(!res.ok){
        const message = data?.message || `Request failed (${res.status})`;
        const err = new Error(message);
        err.status = res.status;
        err.data = data;
        throw err;
    }

    return data;
}
export async function loginUser( email,password ){
    let url = `http://localhost:8080/user/login?email=${email}&password=${password}`;

    const response = await fetch(url,{
        method:'post',
        headers:{
            'Content-Type': 'application/json'
        },
    });

    if(response.ok){
       return response.json();

    }else{
        throw new Error(response.statusText);
    }

}
export async function createUser( userData ){
    let url = 'http://localhost:8080/user/register';

    const response = await fetch(url,{
        method:'post',
        headers:{
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(userData),
    });

    if(response.ok){
       return response.json();
    }else{
        throw new Error(response.statusText);
    }

}
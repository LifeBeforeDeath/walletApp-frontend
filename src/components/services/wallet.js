export async function getWallets(userId) {
    const response = await fetch('http://localhost:8080/wallet/'+userId);
    if(!response.ok){
        throw new Error(response.statusText);
    }else{
        return response.json();
    }
}

export async function getWalletById(userId,walletId) {
    const response = await fetch('http://localhost:8080/wallet/'+userId+'/'+walletId);
    if(!response.ok){
        throw new Error(response.statusText);
    }else{
        return response.json();
    }
}

export async function deleteWallet( userId,id ) {
    const response = await fetch('http://localhost:8080/wallet/' + userId +'/'+id, {
      method: 'delete'
    });
  
    if (!response.ok) {
      throw new Error(response.statusText);
    }

    return response;
}

export async function createWallet( userId,walletData ){
    let url = 'http://localhost:8080/wallet/'+userId;

    const response = await fetch(url,{
        method:'post',
        headers:{
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(walletData),
    });

    if(response.ok){
       return response.json();
    }else{
        throw new Error(response.statusText);
    }

}

export async function updateWallet(userId,id,walletData ){
    let url = `http://localhost:8080/wallet/${userId}/${id}`;

    const response = await fetch(url,{
        method:'put',
        headers:{
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(walletData),
    })


    if(response.ok){
        return response.json();
     }else{
         throw new Error(response.statusText);
     }
 
}
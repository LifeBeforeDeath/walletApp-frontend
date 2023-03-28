export async function getWallets() {
    const response = await fetch('http://localhost:8080/wallet');
    if(!response.ok){
        throw new Error(response.statusText);
    }else{
        return response.json();
    }
}

export async function deleteWallet( id ) {
    const response = await fetch('http://localhost:8080/wallet/' + id, {
      method: 'delete'
    });
  
    if (!response.ok) {
      throw new Error(response.statusText);
    }

    return response;
}

export async function createWallet( walletData ){
    let url = 'http://localhost:8080/wallet';

    const response = await fetch(url,{
        method:'post',
        headers:{
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(walletData),
    });

    if(response.ok){
        alert('success');
    }

}

export async function updateWallet( id,walletData ){
    let url = `http://localhost:8080/wallet/${id}`;

    const response = await fetch(url,{
        method:'put',
        headers:{
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(walletData),
    })


    return response.json();
}
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
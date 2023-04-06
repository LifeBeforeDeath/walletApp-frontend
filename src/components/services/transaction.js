export async function getTransaction(userId,walletId) {
    const response = await fetch(`http://localhost:8080/transaction/${userId}/${walletId}`);
    if(!response.ok){
        throw new Error(response.statusText);
    }else{
        return response.json();
    }
}


export async function createTransaction( userId,walletId,transactionData ){
    let url = `http://localhost:8080/transaction/${userId}/${walletId}`;

    const response = await fetch(url,{
        method:'post',
        headers:{
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(transactionData),
    });

    if(response.ok){
       return response.json();
    }else{
        throw new Error(response.status);
    }

}
export async function deleteTransaction( userId , walletid,TrxId ) {
    const response = await fetch(`http://localhost:8080/transaction/${userId}/${walletid}/${TrxId}`, {
      method: 'delete'
    });
  
    if (!response.ok) {
      throw new Error(response.statusText);
    }

    return response;
}
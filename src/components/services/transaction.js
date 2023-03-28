export async function getTransaction(id) {
    const response = await fetch('http://localhost:8080/transaction/'+id);
    if(!response.ok){
        throw new Error(response.statusText);
    }else{
        return response.json();
    }
}

export async function deleteTransaction( walletid,TrxId ) {
    const response = await fetch(`http://localhost:8080/transaction/${walletid}/${TrxId}`, {
      method: 'delete'
    });
  
    if (!response.ok) {
      throw new Error(response.statusText);
    }

    return response;
}
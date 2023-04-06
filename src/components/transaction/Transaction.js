import { useNavigate, useParams } from "react-router-dom";
import { Link } from "react-router-dom";
import { useEffect } from "react";
import { deleteTransaction, getTransaction } from "../services/transaction";
import { transactionActions } from "../store/transaction-slice";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import { useState } from "react";

const Transaction = () => {
    

    const [balance ,setBalance] = useState();
    // const [type,setType] = useState();

    const {id} = useParams();
    const navigate = useNavigate();
    const cancelhandler = ()=>{
        navigate('/dashboard');
    }
    const dispatch = useDispatch();

    const walletList = useSelector(state=> state.wallet.walletItems);
    const wallet =walletList.find((item) => item.id == id);

    const curUser = useSelector(state => state.user.userItem);
    const userId = curUser.userId;


    console.log(wallet);


    useEffect(
        () => {
            const helper = async () => {
                const data = await getTransaction(userId,id);
                // console.log( data );
                dispatch(transactionActions.replaceTransaction(data));
            };

            helper();

            
            
            // console.log("balance:-"+walletList);
            // setBalance(wallet.currentBalance);
           
        },
        [walletList,dispatch,id,userId]
    );

    const transactionList = useSelector(state=>state.transaction.TransactionItems);

    const deleteHandler = async (trxId) =>{
        const proceed = window.confirm('Are you sure?');

        if (proceed) {
            await deleteTransaction( userId,id, trxId);
            dispatch(transactionActions.removeItemFromTransaction(trxId));
       
        }
    }


  return (
    <div className="container">
      <span onClick={cancelhandler} className="btn btn-default btn-lg mb-3">
        Back
      </span>
      <Link to={`/transaction/add/${id}`} className="btn btn-info btn-lg mb-3">
        <i className="fas fa-plus-circle"> Record new Transaction</i>
      </Link>
      <br />
      <div className="card text-center">
        <div className="card-header bg-success text-white">
          <h4>UBL Account Balance</h4>
          <h1>Rs. {wallet.currentBalance}</h1>
        </div>
      </div>
      <hr />

      <table className="table">
        <thead className="thead-dark">
          <tr>
            <th scope="col">Date</th>
            <th scope="col">Description</th>
            <th scope="col">Amount</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          { transactionList.length === 0 ? <p className="text-primary text-center">No transactions to display</p> : (
               
                transactionList.map((trx) => (
                    <tr className="table-success" key={trx.id}>
                        <td>{trx.transactionDate}</td>
                        {trx.type === 1 ?  <td>Income</td> : trx.type === 2 ? <td>Expanse</td> :  <td>Transfer</td>}
                        {
                            trx.type === 1 ? (<td className="text-success">+ {trx.amount}</td>) : <td className="text-danger">- {trx.amount}</td> 
                        }
                        <td>
                            <span className="text-danger" onClick={()=>deleteHandler(trx.id)}>
                                <i className="fas fa-trash fa-2x"></i>
                            </span>
                        </td>
                    </tr>
                ))
            
          )}

           
        </tbody>
      </table>
    </div>
  );
};

export default Transaction;

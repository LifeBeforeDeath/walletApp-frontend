import { useNavigate, useParams } from "react-router-dom";
import { Link } from "react-router-dom";
import { useEffect } from "react";
import { deleteTransaction, getTransaction } from "../services/transaction";
import { transactionActions } from "../store/transaction-slice";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import { useState } from "react";

const Transaction = () => {
    const walletList = useSelector(state=> state.wallet.walletItems);

    const [balance ,setBalance] = useState();
    // const [type,setType] = useState();

    const {id} = useParams();
    const navigate = useNavigate();
    const cancelhandler = ()=>{
        navigate('/dashboard');
    }
    const dispatch = useDispatch();


    console.log(walletList);


    useEffect(
        () => {
            const helper = async () => {
                const data = await getTransaction(id);
                // console.log( data );
                dispatch(transactionActions.replaceTransaction(data));
            };

            helper();

            
            const wallet =walletList.filter((item) => item.id === id);
            // console.log("balance:-"+walletList);
            setBalance(wallet.currentBalance);
           
        },
        [walletList,dispatch,id]
    );

    const transactionList = useSelector(state=>state.transaction.TransactionItems);

    const deleteHandler = async (trxId) =>{
        const proceed = window.confirm('Are you sure?');

        if (proceed) {
            // submit(null, { method: 'delete', action: props.id });
            await deleteTransaction( id, trxId);
            // dispatch( walletActions.removeItemFromWallet( props.id ) );
       
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
          <h1>Rs. {balance}</h1>
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

            {
                transactionList.map((trx) => (
                    <tr className="table-success" key={trx.id}>
                        <td>{trx.transactionDate}</td>
                        {trx.type === 1 ?  <td>Income</td> : <td>Expanse</td> }
                        {
                            trx.type === 1 ? (<td className="text-success">+ {trx.amount}</td>) : <td className="text-danger">- {trx.amount}</td> 
                        }
                        <td>
                            <a className="text-info" href="updatetransactionForm.html">
                                <i className="fas fa-edit fa-2x"></i>
                            </a>
                            <span className="text-danger" onClick={()=>deleteHandler(trx.id)}>
                                <i className="fas fa-trash fa-2x"></i>
                            </span>
                        </td>
                    </tr>
                ))
            }
        </tbody>
      </table>
    </div>
  );
};

export default Transaction;

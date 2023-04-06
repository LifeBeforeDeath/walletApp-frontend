import { useEffect } from "react";
import DashboardItem from "./DashboardItem";
import { Link } from "react-router-dom";
// import { useLoaderData } from "react-router-dom";
import { useDispatch ,useSelector} from "react-redux";
import { walletActions } from "./store/wallet-slice";
// import { redirect } from "react-router-dom";
// import { useEffect } from "react";
import { getWallets } from "./services/wallet";
import { useState } from "react";

const Dashboard = ()=>{
    const dispatch = useDispatch();
    // const data = useLoaderData();
    const [curBalance,setCurBalance] = useState(0.00);

   
    const curUser = useSelector(state => state.user.userItem);
    const userId = curUser.userId;
    const userBalance = curUser.balance;
    const walletList = useSelector(state=> state.wallet.walletItems);
    // console.log(walletList);


    useEffect(
        () => {
            const helper = async () => {
                const data = await getWallets(userId);
                // console.log( data );
                dispatch(walletActions.replaceWallet(data));
            };

            helper();

            let total = userBalance;
            // for(let wallet in walletList){
            //     total += wallet.currentBalance;
            // }
            walletList.forEach(wallet => {
                total += wallet.currentBalance;
            });
            setCurBalance(total);
        },
        [walletList,dispatch,userId,userBalance]
    );

    

    // useEffect(
    //     () => {
    //         const helper = async () => {
    //             const data = await getWallets();
    //             console.log( data );
    //             dispatch(walletActions.replaceWallet(data));
    //         };

    //         helper();
    //     },
    //     []
    // );

    return (
        <div className="projects">
            <div className="container">
                <div className="row">
                    <div className="col-md-12">
                        <h1 className="display-4 text-center">My Wallet</h1>
                        <br />

                        <div className="btn-group">
                            <button type="button" className="btn btn-info btn-lg dropdown-toggle" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                                Create new
                            </button>
                            <div className="dropdown-menu">
                                <Link className="dropdown-item" to="/createwallet">Wallet</Link>
                                <button disabled className="dropdown-item">Transaction</button>
                            </div>
                        </div>
                        <br />
                        <div className="card text-center">
                            <div className="card-header bg-success text-white">
                                <h4>Current Balance (Total)</h4>
                                <h1>Rs. {curBalance}</h1>
                            </div>
                        </div>
                        <hr />
                        {
                            //<!-- Project Item Component -->
                        }
                        {
                            walletList.length === 0 ? 
                            <p className="text-danger">No wallets to display,please Add it!</p> :
                            walletList.map((item)=>(
                                <DashboardItem 
                                    key={item.id}
                                    id={item.id}
                                    name={item.name}
                                    accountNumber={item.accountNumber}
                                    description={item.description}
                                    priority={item.priority}
                                    currentBalance={item.currentBalance}
                                />
                            ))
                        }
                        
                        {
                            //<!-- End of Project Item Component -->
                        }


                    </div>
                </div>
            </div>
        </div>
    )
}

export default Dashboard;

// export const loader = async ()=>{
//     const response = await fetch('http://localhost:8080/wallet');
//     if(!response.ok){
//         // throw new Error('something went wrong');
//     }else{
//         return response.json();
//     }
// }

// export async function action({ params, request }) {
//     const id = params.id;
//     console.log(id);
//     const response = await fetch('http://localhost:8080/wallet/' + id, {
//       method: request.method
//     });
  
//     if (!response.ok) {
//       throw new Error(response.statusText);
//     }
//     // return redirect('/');
//   }


  
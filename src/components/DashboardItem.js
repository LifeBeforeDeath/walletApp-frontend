import { Link } from "react-router-dom";
import { useSubmit } from "react-router-dom";
import { useDispatch } from "react-redux";
import { walletActions } from "./store/wallet-slice";
import { deleteWallet } from "./services/wallet";
import { useSelector } from "react-redux";

const DashboardItem = (props)=>{
    // const submit = useSubmit();

    const dispatch = useDispatch();

    const curUser = useSelector(state => state.user.userItem);
    const userId = curUser.userId;

    async function startDeleteHandler() {
        const proceed = window.confirm('Are you sure?');

        if (proceed) {
            // submit(null, { method: 'delete', action: props.id });
            await deleteWallet(userId, props.id );
            dispatch( walletActions.removeItemFromWallet( props.id ) );
       
        }
    }

    return (
        <div className="container">
            <div className="card card-body bg-light mb-3">
                <div className="row" >
                    <div className="col-lg-4 col-md-3 col-6">
                        <h3>{props.name}</h3>
                        <p>Account Number: {props.accountNumber}</p>
                        <p>{props.description}</p>
                    </div>
                    <div className="col-lg-4 col-md-3 col-6 text-center">
                        <h3>Balance</h3>
                        <h1>Rs. {props.currentBalance}</h1>
                    </div>
                    <div className="col-md-4 col-12 d-lg-block">
                        <ul className="list-group">
                            <Link to={`/transaction/${props.id}`}>
                                <li className="list-group-item board text-success">
                                    <i className="fa fa-flag-checkered pr-1"> View Transactions </i>
                                </li>
                            </Link>
                            <Link to={`/updateWallet/${props.id}`}>
                                <li className="list-group-item update text-info">
                                    <i className="fa fa-edit pr-1"> Update Account Info</i>
                                </li>
                            </Link>
                            <span onClick={startDeleteHandler}>
                                <li className="list-group-item delete text-danger">
                                    <i className="fa fa-minus-circle pr-1"> Delete Account</i>
                                </li>
                            </span>
                        </ul>
                    </div>
                </div>
            </div>
        </div>
    )
}
export default DashboardItem;


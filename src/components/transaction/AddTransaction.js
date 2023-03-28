import { useNavigate,useParams } from "react-router-dom";
import { Form,redirect } from "react-router-dom";

const AddTransaction = () => {
    const navigate = useNavigate();
    const {id} = useParams();
    const cancelhandler = ()=>{
        navigate('/transaction/'+id);
    }

  return (
    <div className="add-PBI">
      <div className="container">
        <div className="row">
          <div className="col-md-8 m-auto">
            <span onClick={cancelhandler} className="btn btn-light">
              Back to Wallet
            </span>
            <h4 className="display-4 text-center">Record New Transaction</h4>
            <p className="lead text-center">UBL Account</p>
            <Form method='post' >
              <div className="form-group m-2">
                <input
                  type="number"
                  min="1"
                  className="form-control form-control-lg"
                  placeholder="Amount"
                  name="amount"
                />
              </div>
              <div className="form-group m-2">
                <textarea
                  className="form-control form-control-lg"
                  placeholder="Description"
                  name="description"
                ></textarea>
              </div>
              <div className="form-group m-2">
                <label htmlFor="exampleFormControlTextarea1">
                  Transaction Type :{" "}
                </label>
                <div className="form-check form-check-inline">
                  <input
                    className="form-check-input"
                    type="radio"
                    name="type"
                    id="income"
                    value="1"
                  />
                  <label className="form-check-label" htmlFor="income">
                    Income
                  </label>
                </div>
                <div className="form-check form-check-inline m-2">
                  <input
                    className="form-check-input"
                    type="radio"
                    name="type"
                    id="expense"
                    value="2"
                  />
                  <label className="form-check-label" htmlFor="expense">
                    Expense
                  </label>
                </div>
              </div>
              <input type="submit" className="btn btn-primary btn-block mt-4" />
            </Form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddTransaction;

export async function action({request,params}) {
    const id = params.id;
    const method = request.method;
    const data = await request.formData();

    const random = Math.random()*100000;

    const transactionData = {
        id:random,
        amount:data.get('amount'),
        description:data.get('description'),
        type:data.get('type'),
        walletId:id
    }

    let url = `http://localhost:8080/transaction/${id}`;

    const response = await fetch(url,{
        method:method,
        headers:{
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(transactionData),
    });

    if(response.ok){
        alert('success');
    }

    return redirect('/transaction/'+id);
}

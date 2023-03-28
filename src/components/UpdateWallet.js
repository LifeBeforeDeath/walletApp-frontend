import { useSelector } from "react-redux";
import { Form } from "react-router-dom";
import { redirect } from "react-router-dom";
import { useParams } from "react-router-dom";
// import { useSelector } from "react-redux";

const UpdateWallet = (props) => {

    const {id} = useParams();
    console.log("id :- "+id);
    const walletList = useSelector(state=> state.wallet.walletItems);
    const walletObject = walletList.filter((item)=> item.id === id);
    console.log(walletObject);


  return (
    <div className="project">
      <div className="container">
        <div className="row">
          <div className="col-md-8 m-auto">
            <h5 className="display-4 text-center">Update Wallet</h5>
            <hr />
            <Form method="put">
              <div className="form-group">
                <input
                  type="text"
                  className="form-control form-control-lg m-2"
                  placeholder="Account Name"
                  name="name"
                  value={walletObject.name}
                //   ref={name}
                />
              </div>
              <div className="form-group">
                <input
                  type="text"
                  className="form-control form-control-lg m-2"
                  placeholder="Account No"
                  name="accountNumber"
                //   ref={accountNumber}
                />
              </div>
              <div className="form-group">
                <textarea
                  className="form-control form-control-lg m-2"
                  placeholder="Description"
                  name="description"
                //   ref={description}
                ></textarea>
              </div>
              <div className="form-group">
                <select
                  className="form-control form-control-lg m-2"
                  name="priority"
                //   ref={priority}
                >
                  <option value={3}>Display Priority</option>
                  <option value={1}>High</option>
                  <option value={2}>Medium</option>
                  <option value={3}>Low</option>
                </select>
              </div>
              <input
                type="submit"
                className="btn btn-primary btn-block mt-4"
                value="Update"
              />
            </Form>
          </div>
        </div>
      </div>
    </div>
  );
};
export default UpdateWallet;

export async function updateAction({params,request}){
    const method = request.method;
    const data = await request.formData();
    const id = params.id;
    // const random = Math.random()*100000;

    const walletData = {
        id:id,
        name:data.get('name'),
        accountNumber:data.get('accountNumber'),
        description:data.get('description'),
        priority:data.get('priority')
    }

    let url = `http://localhost:8080/wallet/${id}`;

    const response = await fetch(url,{
        method:method,
        headers:{
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(walletData),
    })

    if(response.ok){
        alert('success');
    }

    return redirect('/dashboard');
}
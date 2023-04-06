
import { Form, redirect, useNavigate } from "react-router-dom";
import { useEffect, useRef } from "react";
import { createWallet } from "./services/wallet";
import { useDispatch, useSelector } from "react-redux";
import { walletActions } from "./store/wallet-slice";

const CreateWallet = () => {

    const navigate = useNavigate();

    const dispatch = useDispatch();

    const userObj = useSelector(state => state.user.userItem);
    const userId = userObj.userId;

    const name = useRef('');
    const accountNumber = useRef('');
    const description = useRef('');
    const priority = useRef();

    const onSubmitHandler = async (event) =>{
        event.preventDefault();

        const walletData = {
            name:name.current.value,
            accountNumber:accountNumber.current.value,
            description:description.current.value,
            priority:priority.current.value
        }
        try{
            const response =  await createWallet(userId,walletData);
            dispatch(walletActions.addItemToWallet(response));
            navigate("/dashboard");
        } catch (err){
            alert(err.message);
        }
       

    }






  return (
    <div className="project">
      <div className="container">
        <div className="row">
          <div className="col-md-8 m-auto">
            <h5 className="display-4 text-center">Create Wallet</h5>
            <hr />
            <Form method="post" onSubmit={onSubmitHandler}>
              <div className="form-group">
                <input
                  type="text"
                  className="form-control form-control-lg m-2"
                  placeholder="Account Name"
                  name="name"
                  ref={name}
                />
              </div>
              <div className="form-group">
                <input
                  type="text"
                  className="form-control form-control-lg m-2"
                  placeholder="Account No"
                  name="accountNumber"
                  ref={accountNumber}
                />
              </div>
              <div className="form-group">
                <textarea
                  className="form-control form-control-lg m-2"
                  placeholder="Description"
                  name="description"
                  ref={description}
                ></textarea>
              </div>
              <div className="form-group">
                <select
                  className="form-control form-control-lg m-2"
                  name="priority"
                  ref={priority}
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
                value="Create"
              />
            </Form>
          </div>
        </div>
      </div>
    </div>
  );
};
export default CreateWallet;

// export async function action({request}) {
//     const method = request.method;
//     const data = await request.formData();

//     const random = Math.random()*100000;

//     const walletData = {
//         id:random,
//         name:data.get('name'),
//         accountNumber:data.get('accountNumber'),
//         description:data.get('description'),
//         priority:data.get('priority')
//     }

//     let url = 'http://localhost:8080/wallet';

//     const response = await fetch(url,{
//         method:method,
//         headers:{
//             'Content-Type': 'application/json'
//         },
//         body: JSON.stringify(walletData),
//     });

//     if(response.ok){
//         alert('success');
//     }

//     return redirect('/dashboard');
// }

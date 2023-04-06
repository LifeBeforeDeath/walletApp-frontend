import { Form } from "react-router-dom";
// import { useDispatch } from "react-redux";
import { useRef } from "react";
import { createUser } from "../components/services/register";
// import { userActions } from "../components/store/user-slice";
import { useNavigate } from "react-router-dom";

const Signup = () => {
    const navigate = useNavigate();

    // const dispatch = useDispatch();

    const userName = useRef('');
    const email = useRef('');
    const password = useRef('');

    const onSubmitHandler = async (event) =>{
        event.preventDefault();

        const userData = {
            userName:userName.current.value,
            email:email.current.value,
            password:password.current.value,
        }
        try{
            const response =  await createUser(userData);
            navigate('/login');
            // dispatch(userActions.replaceUsers(response));
        } catch (err){
            alert(err.message);
        }
       

    }



  return (
    <div className="register">
      <div className="container">
        <div className="row">
          <div className="col-md-8 m-auto">
            <h1 className="display-4 text-center">Sign Up</h1>
            <p className="lead text-center">Create your Account</p>
            <Form method="post" onSubmit={onSubmitHandler}>
              <div className="form-group m-2">
                <input
                  type="text"
                  className="form-control form-control-lg"
                  placeholder="Name"
                  name="userName"
                  ref={userName}
                  required
                />
              </div>
              <div className="form-group m-2">
                <input
                  type="email"
                  className="form-control form-control-lg"
                  placeholder="Email Address"
                  name="email"
                  ref={email}
                />
              </div>
              <div className="form-group m-2">
                <input
                  type="password"
                  className="form-control form-control-lg"
                  placeholder="Password"
                  name="password"
                  ref={password}
                />
              </div>
              {/* <div className="form-group m-2">
                <input
                  type="password"
                  className="form-control form-control-lg"
                  placeholder="Confirm Password"
                  name="password2"
                />
              </div> */}
              <input type="submit" className="btn btn-info btn-block mt-4" />
            </Form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Signup;

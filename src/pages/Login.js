import { Form } from "react-router-dom";
import { useDispatch } from "react-redux";
import { userActions } from "../components/store/user-slice";
import { useRef } from "react";
import { loginUser } from "../components/services/login";
import { useNavigate } from "react-router-dom";
const Login = () => {

    const navigate = useNavigate();
    const dispatch = useDispatch();

    const email = useRef('');
    const password = useRef('');

    const onSubmitHandler = async (event) =>{
        event.preventDefault();

        try{
            const response =  await loginUser(email.current.value,password.current.value);
            localStorage.setItem("userId",response.userId);
            dispatch(userActions.replaceUsers(response));
            navigate("/dashboard");

        } catch (err){
            alert(err.message);
        }
       

    }

  return (
    <div className="login">
      <div className="container">
        <div className="row">
          <div className="col-md-8 m-auto">
            <h1 className="display-4 text-center">Log In</h1>
            <Form method="post" onSubmit={onSubmitHandler}>
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
              <input type="submit" className="btn btn-info btn-block mt-4" />
            </Form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;

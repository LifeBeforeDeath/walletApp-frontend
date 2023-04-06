import './App.css';
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min.js";
import { RouterProvider,createBrowserRouter } from 'react-router-dom';
import RootPage from './pages/Root';
import HomePage from './pages/Home';
import Dashboard from './components/Dashboard';
import CreateWallet from './components/CreateWallet';
// import { action as createWalletAction } from './components/CreateWallet';
import ErrorPage from './components/Error';
import UpdateWallet,{updateAction as updateWalletAction} from './components/UpdateWallet';
import Transaction from './components/transaction/Transaction';
import AddTransaction,{action as addTransactionActions} from './components/transaction/AddTransaction';
import Login from './pages/Login';
import Signup from './pages/Signup';
import { checkAuthLoader } from './util/auth';
import { tokenLoader } from './util/auth';
import { getAuthToken } from './util/auth';
// import DashboardItem,{action as deleteAction} from './components/DashboardItem';

const router = createBrowserRouter([
  {
    path:'/',
    element:<RootPage />,
    errorElement:<ErrorPage />,
    loader:tokenLoader,
    children:[
      {
        index:true,
        element:<HomePage />
      },
      {
        path:'dashboard',
        element:<Dashboard />,
        loader:getAuthToken,
        // loader:checkAuthLoader
      },
    
      {
        path:'createWallet',
        
        element:<CreateWallet />,
        // loader:getAuthToken
        // loader:checkAuthLoader
        // action:createWalletAction
      },
      {
        path:'updateWallet/:id',
        element:<UpdateWallet />,
        // loader:getAuthToken
        // loader:checkAuthLoader
        // action:updateWalletAction
      },
      {
        path:'transaction/:id',
        element:<Transaction />,
        // loader:getAuthToken
        // loader:checkAuthLoader
      },
      {
        path:'transaction/add/:id',
        element:<AddTransaction />,
        // loader:getAuthToken
        // loader:checkAuthLoader
        // action:addTransactionActions
      }
    ]
  },
  {
    path:'login',
    element:<Login />
  },
  {
    path:'signup',
    element:<Signup />
  }
]);

function App() {
  return (
    < >
      <RouterProvider router={router}></RouterProvider>
    </>
  );
}

export default App;

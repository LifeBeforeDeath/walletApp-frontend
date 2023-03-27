import './App.css';
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min.js";
import { RouterProvider,createBrowserRouter } from 'react-router-dom';
import RootPage from './pages/Root';
import HomePage from './pages/Home';
import Dashboard,{loader as walletLoader,action as deleteAction} from './components/Dashboard';
import CreateWallet from './components/CreateWallet';
import { action as createWalletAction } from './components/CreateWallet';
import ErrorPage from './components/Error';
// import DashboardItem,{action as deleteAction} from './components/DashboardItem';

const router = createBrowserRouter([
  {
    path:'/',
    element:<RootPage />,
    errorElement:<ErrorPage />,
    children:[
      {
        index:true,
        element:<HomePage />
      },
      {
        path:'dashboard',
        element:<Dashboard />,
        // loader:walletLoader,
        // action: deleteAction
        // children:[
        //   {
        //     path:':id',
        //     action:deleteAction
        //   }
        // ]
      },
    
      // {
      //     path:':id',
      //     action:deleteAction,
          
      // },
      {
        path:'createWallet',
        element:<CreateWallet />,
        action:createWalletAction
      }
    ]
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

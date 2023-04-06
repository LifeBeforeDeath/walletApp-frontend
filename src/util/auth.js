import { redirect } from "react-router-dom";

export const getAuthToken = () =>{
    const userId = localStorage.getItem("userId");
    return userId;
}

export function tokenLoader() {
    return getAuthToken();
  }

export function checkAuthLoader() {
    const token = getAuthToken();
  
    if (!token) {
      return redirect('/');
    }
  }
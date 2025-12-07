"use client";
import { useContext, useEffect, useRef, useState } from "react";
import api from "@/lib/api";
import "../css/login.css";
import { AtSign, Egg, Loader, ShieldAlert, SquareAsterisk } from "lucide-react";
import { redirect } from "next/navigation";
import { useRouter } from "next/navigation";
import { AuthContext } from "../../context/AuthContext";

export default function Login() {
  const router = useRouter(); 
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const { login, isLoggedIn } = useContext(AuthContext);

  
  const emailRef = useRef(null);
  const passRef = useRef(null);

  useEffect(() => {
    setTimeout(() => {
      if (emailRef.current?.value) setEmail(emailRef.current.value);
      if (passRef.current?.value) setPassword(passRef.current.value);

    }, 50);
  }, []);

  async function handleLogin() {
    if(email && password){
      try{
        setIsLoading(true);
        setErrorMessage("");
        const res = await api.post("/login", { email, password });
        await login(res.data.access_token);
        router.push("/hris");
      }catch (error){
        console.log(error)
        setErrorMessage("Account not found. ")
      }finally{
        setIsLoading(false);
      }
    }else{
      setErrorMessage("All fields required.")
    }
  }

  // if(isLoggedIn){
  //   redirect('/')
  // } 

  return (
    <div className="vh-100 vw-100 d-flex  align-items-center">
      <div className="row w-100 m-0">
        <div className="col-lg-3 mx-auto">
          <form>
            <div className={`alert alert-danger fs-6 p-2 ${errorMessage ? 'd-block' : 'd-none'}` }>
              <ShieldAlert /> { errorMessage }
            </div>
            <div className="d-flex align-items-center mb-2">
              <h5 className="m-0"> WORK NEST <Egg /> | Login </h5> 
            </div>
            <div className="d-flex align-items-center login_input_outer">
              <input 
                ref={emailRef}
                className=" custom_login_input  " 
                onChange={(e) => setEmail(e.target.value)} 
                onKeyDown={(e) => {
                  if (e.key === "Enter") handleLogin(e);
                }}
              />
              <span className={`custom_login_label ${email ? 'custom_login_active' : ''}`}>Email</span>
            </div>
            <div className="d-flex align-items-center login_input_outer">
              <input
                ref={passRef}
                className=" custom_login_input"
                type="password"
                onChange={(e) => setPassword(e.target.value)}

                onKeyDown={(e) => {
                  if (e.key === "Enter") handleLogin(e);
                }}
              />
              <span className={`custom_login_label ${password ? 'custom_login_active' : ''}`}>Password</span>
            </div>
            <button type="button" className="mt-3 login_custom_button" onClick={handleLogin}>
              {
                isLoading ? <Loader className="login_loading" /> : ''
              }
               LOGIN
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}

import AuthContext from "../store/auth-context";
import  { useContext, useState } from "react";


const useAuth = () => {
  const authCtx = useContext(AuthContext);
  const [isLoading, setIsLoading] = useState(false);
  const [hasError, setHasError] = useState('');


    const sendLoginRequest =  (data) => {
        setIsLoading(true)
        fetch(
            "https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyD3D55h9fGxH6Tntklit1653yR9UlE5fY0",
            {
              method: "POST",
              body: JSON.stringify({
                email: data.email,
                password: data.password,
                returnSecureToken: true,
              }),
              headers: {
                "Content-Type": "application/json",
              },
            }
          )
            .then((res) => {
              //setLoadingState to false cuz got the result
              if (res.ok) {
                // ..something with data
                return res.json();
              } else {
                return res.json().then((data) => {
                  let errorMessage = "Authentication Failed";
                  setHasError(errorMessage);
                  throw new Error(errorMessage);
                });
              }
            })
            .then((data) => {
              console.log(data);
              authCtx.login(data.idToken);
                setIsLoading(false)
            })
            .catch((err) => {
              return alert(err.message)
            }  );

    }

    return {
        sendLoginRequest,
        isLoading,
        hasError
    }
}

export default useAuth;
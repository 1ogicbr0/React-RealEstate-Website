import React , {useState} from 'react'
import Login from "../components/Auth/Login";
import Card from "../components/UI/Card";
import LoginSuccessCard from "../components/UI/SuccessCard";
const LoginPage = () => {

  return (
    <Card>

      <Login />
    </Card>
  );
};

export default LoginPage;

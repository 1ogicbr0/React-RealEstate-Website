import React, { useState, useContext} from "react";
import Slider from "../components/Layout/Slider";
import PropertyItems from "../components/Property/PropertyItems";
import AuthContext from "../store/auth-context";
import LoginSuccessCard from '../components/UI/SuccessCard'
import LogoutSuccessCard from '../components/UI/ErrorShowCard'

const AllProperties = () => {
    const authCtx = useContext(AuthContext)
    const [typeFilter, setTypeFilter] = useState('')
    const setType =(value) => {
        setTypeFilter(value);
    }
    console.log("ISREDIRECTED",authCtx.isRedirected)
    return (
        <React.Fragment>
            {authCtx.isRedirected === 'LoginRedirect' && <LoginSuccessCard onClose={() => {authCtx.redirection(false)}} title="Login succesfully" message="You are staff, now you can add property" />}
            {authCtx.isRedirected === 'LogoutRedirected' && <LogoutSuccessCard onClose={() => {authCtx.redirection(false)}} title="Logout succesfully" message="Dont forget to visit again" />}
            <Slider setType={setType}/>
            <PropertyItems setType={typeFilter}/>
        </React.Fragment>
    )
}

export default AllProperties;
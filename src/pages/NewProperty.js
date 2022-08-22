import React from "react";
import NewPropertyForm from "../components/Property/NewPropertyForm";
import Card from "../components/UI/Card";

const NewProperty = () => {
    return (
        <React.Fragment>
            <Card>
           <NewPropertyForm />
            </Card>
        </React.Fragment>
    )
}

export default NewProperty;
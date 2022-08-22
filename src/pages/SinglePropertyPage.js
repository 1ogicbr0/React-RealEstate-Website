import React,{ useContext,useEffect, useState } from "react";
import {useParams} from 'react-router-dom'
import SinglePropertyDisplay from "../components/Property/SinglePropertyDisplay";
import ListPropertyContext from "../store/list-property-context";
import useHttp from "../hooks/use-Http";
import EmailSent from "../components/UI/SuccessCard";
const SinglePropertyDetail = () => {
    const { id } = useParams();
    const [showEmailSentPopUp, setShowEmailSentPopUp] = useState(false);
    const propertyList = useContext(ListPropertyContext);

    const closeHandler = () => {
        setShowEmailSentPopUp(false);
    }




    let  property = propertyList.list.find(property => property.id === id)



    

    // const {isLoading,hasError:httpError,list:properties,sendRequest,setIsLoading,setHttpError} = useHttp({url:'https://react-http-91e2a-default-rtdb.firebaseio.com/properties.json',method: 'GET'})

    // useEffect( () => {
    //   sendRequest().catch((error) => {
    //     setIsLoading(false);
    //     setHttpError(error.message);
    //   });
    //   if(properties){
    //     property = properties.find(property => property.id === id)
    // }
    // }, [property,properties])

    console.log(property)
    return(
    <React.Fragment>
        {showEmailSentPopUp && <EmailSent onClose={closeHandler} title="THANKYOU" message="Email send successfully, we will contact you soon"/>}
        <SinglePropertyDisplay
        img={property?.img}
        title={property?.title}
        id={property?.id}
        price={property?.price}
        description={property?.description}
        size={property?.size}
        address={property?.address} 
        emailPopUP={setShowEmailSentPopUp}/>
        
    </React.Fragment>)
    }

export default SinglePropertyDetail;
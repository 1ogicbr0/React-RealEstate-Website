import React, {useState, useEffect} from "react";
import { createContext } from "react";
import useHttp from "../hooks/use-Http";
const ListPropertyContext = createContext({
  list: {},
  onAddProperty: (newProperty) => {},
  onRemoveProperty: (propertyId) => {}
});

export const ListPropertyContextProvider = (props) => {
  const {list:properties,sendRequest,setIsLoading,setHttpError} = useHttp({url:'https://react-http-91e2a-default-rtdb.firebaseio.com/properties.json',method: 'GET'})

  useEffect( () => {
    sendRequest().catch((error) => {
      setIsLoading(false);
      setHttpError(error.message);
    });
  }, [])
  console.log("Property",properties)
  
// eslint-disable-next-line
  const [listProperty, setListProperty] = useState(properties);

  const addPropertyHandler =(newProperty) => {
    setListProperty( prevState => { return prevState.concat(newProperty)});
  }

  const removePropertyHandler =(propertyId) => {
    setListProperty(prevState => {return prevState.filter(property => property.id !== propertyId)})
  }
  const context = { 
    list: properties ,
    onAddProperty: addPropertyHandler,
    onRemoveProperty: removePropertyHandler
  };

  return (
    <ListPropertyContext.Provider value={context}>
      {props.children}
    </ListPropertyContext.Provider>
  );
};

export default ListPropertyContext
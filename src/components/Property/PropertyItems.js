import React, { useEffect } from 'react';
import styles from "./PropertyItems.module.css";
import createPropertyItem from '../Helper/createPropertyItem';
import useHttp from '../../hooks/use-Http';
import  FadeLoader  from 'react-spinners/FadeLoader'


const PropertyItems = (props) => {


  const {isLoading,hasError:httpError,list:properties,sendRequest,setIsLoading,setHttpError} = useHttp({url:'https://react-http-91e2a-default-rtdb.firebaseio.com/properties.json',method: 'GET'})

  useEffect( () => {
    sendRequest().catch((error) => {
      setIsLoading(false);
      setHttpError(error.message);
    });
  }, [])
  let typeFilter = createPropertyItem(properties, props.setType);
  console.log( isLoading)
  let content =''
  if(isLoading) {
    content = <div className={styles.Loading}><FadeLoader  height={22} color="white" margin={10} speedMultiplier={2}/></div>
  } else {
    content = <div className={styles.items}>{typeFilter}</div>
  }
  if(httpError) {
    content = <h1 style={styles.Error}>{httpError}</h1>
  }

  return (
    <section className={styles.slide}>
      <heading className={styles.heading}><h1>HOMES</h1></heading>
          {content}
    </section>
  );
};

export default PropertyItems;






















  // const [properties, setProperties] = useState([]);
  // const [isLoading, setIsLoading] = useState(true);
  // const [httpError, setHttpError] = useState(null);
  // useEffect( () => {
  //   const fetchProperties = async() =>{
  //   const response = await fetch('https://react-http-91e2a-default-rtdb.firebaseio.com/properties.json');
  //   if(!response.ok){
  //     throw new Error('Something went Wrong')
  //   }
  //   const responseData = await response.json();

  //   const listOfProperties =[];

  //   for(const key in responseData) {
  //     listOfProperties.push({
  //       id: key,
  //       img: responseData[key].img,
  //       title: responseData[key].title,
  //       price: responseData[key].price,
  //       description: responseData[key].description,
  //       size: responseData[key].size,
  //       type: responseData[key].type
  //     })
  //   }
  //   console.log(listOfProperties)
  //   setProperties(listOfProperties)
  //   setIsLoading(false)

  //   }
    
  //     fetchProperties().catch(error => {
  //       setIsLoading(false)
  //       setHttpError(error.message)
  //     });

  // }, [])
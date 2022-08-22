import  {useState } from "react";

const useHttp = (data) => {
  const [isLoading, setIsLoading] = useState(false);
  const [httpError, setHttpError] = useState(null);
  const [properties, setProperties] = useState([]);

  if (data.method === "GET") {

    const sendRequest = async () => {
      setIsLoading(true)
      const response = await fetch(data.url);
      if (!response.ok) {
        throw new Error("Something went Wrong");
      }
      const responseData = await response.json();

      const listOfProperties = [];

      for (const key in responseData) {
        listOfProperties.push({
          id: key,
          img: responseData[key].img,
          title: responseData[key].title,
          price: responseData[key].price,
          description: responseData[key].description,
          size: responseData[key].size,
          type: responseData[key].type,
          address: responseData[key].address,
        });
      }
      setProperties(listOfProperties);
      setIsLoading(false);
      console.log("Loading",isLoading);

    };


    return {
      list: properties,
      isLoading,
      hasError: httpError,
      sendRequest,
      setIsLoading,
      setHttpError
    };
  } else if (data.method === "POST") {
    const sendRequest = async (value) => {
     setIsLoading(true)

      const response = await fetch(data.url, {
        method: data.method,
        body: JSON.stringify(value),
      });
      if (!response.ok) {
        throw new Error("Something went Wrong");
      }
      setIsLoading(false);
    };

    return {
      isLoading,
      hasError: httpError,
      sendRequest,
      setIsLoading,
      setHttpError
    };
  }
};

export default useHttp;

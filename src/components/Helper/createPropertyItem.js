
import PropertyItem from "../Property/PropertyItem";


const createPropertyItem = (propertyList, type= null) => {
  if(!type) {
    const contentPropertyItems = propertyList.map((item) => (
    <PropertyItem
          key= {item.id}
          img={item.img}
          title={item.title}
          id={item.id}
          price={item.price}
          description={item.description}
          size={item.size}
          type={item.type.toUpperCase()}
        />
      ))

      return contentPropertyItems;
    }
  else {
    const contentPropertyItems = propertyList.filter(item => item.type === type).map((item) => (
    <PropertyItem
      key= {item.id}
      img={item.img}
      title={item.title}
      id={item.id}
      price={item.price}
      description={item.description}
      size={item.size}
      type={item.type}
    />
  ))
    return contentPropertyItems
  }
}

export default createPropertyItem;
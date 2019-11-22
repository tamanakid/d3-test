export default (dataset, name, arrayNames) => {
  
  const array = dataset[name].map(element => {

    const childrenArray = arrayNames.reduce((fullArray, arrayName) => {
      return fullArray.concat(element[arrayName]);
    }, [])

    return {
      ...element,
      childrenArray,
    };
  });

  return {
    name,
    childrenArray: array,
  }
};

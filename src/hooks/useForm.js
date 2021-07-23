import { useState, useEffect } from 'react';

const useForm = (callback, calculator) => {
    const [ data, setData ] = useState({});
    const [ sleepScore, setSleepScore ] = useState('');
    const [isLoading, setIsLoading ] = useState(false);
    const [ isDisable, setIsDisable ] = useState(true);
    
    const delay = ms => new Promise(resolve => setTimeout(resolve, ms));
   
   useEffect(() => {
       
 
   if(data.durationAsleep === '' || data.durationInBed === '') {
      setIsDisable(true);
    }
        
       
    if(Object.keys(data).length === 2 && (data.durationInBed !== '' && data.durationAsleep !== '')) {
            callback();
          setIsDisable(false);
    }
  
        
  }, [data, callback]); // listen for changes the drop down values
  
  
  const handleSubmit = async (e) => {
    if (e) e.preventDefault();
    setIsLoading(true);
    await delay(1500);
    
    let response = calculator(data);
    setSleepScore(response);
    setIsLoading(false);
    
    
  };


    const handleChange = (e) => {
      setData({
        ...data,
        [e.target.name]: e.target.value,
      });
    };
  
  return {
    handleChange,
    handleSubmit,
    data,
    sleepScore,
    isDisable,
    isLoading
  };
};

export default useForm;

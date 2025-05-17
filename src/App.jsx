import {useState,useEffect} from "react";
import axios from "axios";






function App() {


    const [countries,setCountries]=useState([]);
    const [selectedCountry,setSelectedCountry]=useState("");
    const [selectedState,setSelectedState]=useState("");
    const [selectedCity,setSelectedCity]=useState("");
    const [state,setState]=useState([]);
    const [city,setCity]=useState([]);
    
    
    
   


    var fetchCountries= async()=>{
      let COUNTRYENDPOINT="https://crio-location-selector.onrender.com/countries";
      try{
          const response=await axios.get(COUNTRYENDPOINT);
          setCountries(response.data);
        }
        catch(error)
        {
          console.error("Error fetching data: ",error.message);
        }
    };

    var fetchStates= async()=>{
    
      if(selectedCountry)
      {
        let STATEENDPOINT=`https://crio-location-selector.onrender.com/country=${encodeURIComponent(selectedCountry)}/states`;
        try{
            const response=await axios.get(STATEENDPOINT);
            setState(response.data);
          }
          catch(error)
          {
            console.error("Error fetching data: ",error.message);
          }
      }
    };

    var fetchCities=async()=>{
       if(selectedCountry && selectedState)
       {
        let CITYENDPOINT=`https://crio-location-selector.onrender.com/country=${encodeURIComponent(selectedCountry)}/state=${encodeURIComponent(selectedState)}/cities`;
        try{
          const response=await axios.get(CITYENDPOINT);
          setCity(response.data);
        }
        catch(error)
        {
          console.error("Error fetching data: ",error.message);
        }
       }
    };

    useEffect(()=>{
       fetchCountries();
    },[]);

    useEffect(()=>{
       fetchStates();
    },[selectedCountry]);

    useEffect(()=>{
       fetchCities();
  }
  ,[selectedState]);


    

    const handleCountry=(e)=>{
      const selected = e.target.value;
      setSelectedCountry(selected);
      setSelectedState(""); // Clear previous state
      setSelectedCity("");  // Clear previous city
      setState([]);         // Clear previous state list
      setCity([]);   
    }

    const handleState=(e)=>{
      const selected = e.target.value;
      setSelectedState(selected);
      setSelectedCity("");  // Clear previous city
      setCity([]); 
    }

    const handleCity=(e)=>{
       setSelectedCity(e.target.value);
    }

   


  return (
    <div style={{textAlign:"center"}}>
      <h1 >Select Location</h1>
      <select  id="country-select"  value={selectedCountry} data-testid="country-select" style={{width:"350px", height:"25px",margin:"30px"}} onChange={e=>handleCountry(e)}>
        <option value="">Select Country</option>
        {
          countries.map((ctr)=>{
            return(
            <option key={ctr} value= {ctr}>{ctr}</option>
            )
          })
        }   
      </select>
      

      <select id="state-select" value={selectedState} data-testid="state-select" style={{width:"350px", height:"25px",margin:"30px"}} disabled={!selectedCountry} onChange={e=>handleState(e)} >
        <option value="" >Select State</option>
        {  
          state.map((ctr)=>{
            return(
            <option key={ctr} value={ctr}>{ctr}</option>
            )
          })
        }   
      </select>
     

      <select id="city-select" value={selectedCity} data-testid="city-select" style={{width:"350px", height:"25px",margin:"30px"}} disabled={!selectedState} onChange={e=>handleCity(e)}>
        <option value="">Select City</option>
        {
          city.map((ctr)=>{
            return(
            <option key={ctr} value={ctr}>{ctr}</option>
            )
          })
        }   
      </select>

        {(selectedCountry && selectedState && selectedCity) &&
          (<h3 style={{textAlign:"center"}}>You selected {selectedCity}, {selectedState}, {selectedCountry}</h3>)
        }

    </div>
  )
}

export default App

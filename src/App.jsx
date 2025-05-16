import {useState,useEffect} from "react";
import axios from "axios";






function App() {


    const [countries,setCountries]=useState([]);
    const [selectedCountry,setSelectedCountry]=useState("");
    const [selectedState,setSelectedState]=useState("");
    const [selectedCity,setSelectedCity]=useState("");
    const [state,setState]=useState([]);
    const [city,setCity]=useState([]);
    
    const COUNTRYENDPOINT="https://crio-location-selector.onrender.com/countries";
    const STATEENDPOINT=`https://crio-location-selector.onrender.com/country=${encodeURIComponent(selectedCountry)}/states`;
    const CITYENDPOINT=`https://crio-location-selector.onrender.com/country=${encodeURIComponent(selectedCountry)}/state=${encodeURIComponent(selectedState)}/cities`;

    useEffect(()=>{
       async function fetchCountries(){
        try{
          const response=await axios.get(COUNTRYENDPOINT);
          setCountries(response.data);
        }
        catch(error)
        {
          console.error("Error fetching data: ",error.message);
        }
       }
       fetchCountries();
    },[]);

    useEffect(()=>{
       if (!selectedCountry) return;
      async function fetchStates(){
        try{
          const response=await axios.get(STATEENDPOINT);
          setState(response.data);
        }
        catch(error)
        {
          console.error("Error fetching data: ",error.message);
        }
       }
       fetchStates();
    },[selectedCountry]);

    useEffect(()=>{
      if (!selectedCountry || !selectedState) return;
      async function fetchCities(){
        try{
          const response=await axios.get(CITYENDPOINT);
          setCity(response.data);
        }
        catch(error)
        {
          console.error("Error fetching data: ",error.message);
        }
       }
       fetchCities();
  }
  ,[selectedCountry, selectedState]);


    

    const handleCountry=(e)=>{
       setSelectedCountry(e.target.value);
    }

    const handleState=(e)=>{
       setSelectedState(e.target.value);
    }

    const handleCity=(e)=>{
       setSelectedCity(e.target.value);
    }

   


  return (
    <>
      <select name="country" id="country" style={{width:"350px", height:"25px",margin:"30px"}} onChange={e=>handleCountry(e)}>
        <option value="">Select Country</option>
        {
          countries && countries!==undefined?
          countries.map((ctr)=>{
            return(
            <option key={ctr} value= {ctr}>{ctr}</option>
            )
          }):"No Country"
        }   
      </select>
      

      <select name="state" id="state" style={{width:"350px", height:"25px",margin:"30px"}} disabled={!selectedCountry} onChange={e=>handleState(e)} >
        <option value="" >Select State</option>
        {
          state && state!==undefined?
          state.map((ctr)=>{
            return(
            <option key={ctr} value={ctr}>{ctr}</option>
            )
          }):"No State"
        }   
      </select>
     

      <select name="city" id="city" style={{width:"350px", height:"25px",margin:"30px"}} disabled={!selectedState} onChange={e=>handleCity(e)}>
        <option value="">Select City</option>
        {
          city && city!==undefined?
          city.map((ctr)=>{
            return(
            <option key={ctr} value={ctr}>{ctr}</option>
            )
          }):"No City"
        }   
      </select>

        {(selectedCountry && selectedState && selectedCity)? 
          <h3 style={{textAlign:"center"}}>You selected {selectedCity}, {selectedState}, {selectedCountry}</h3>:""
        }

    </>
  )
}

export default App

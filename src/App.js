import { useState, useEffect } from 'react';
import './App.css';
import Climate from './components/Climate';
import RingLoader from "react-spinners/RingLoader";



function App() {
const [loading, setLoading] = useState(false);

useEffect(() =>{
setLoading(true)


setTimeout(() =>{

  setLoading(false)

}, 3000);

}, [])

  return (

    <div className="App">


      { 
      
      loading ? 
<>
      <RingLoader
      size={200}
      color={'#000000'}
      loading={loading}
      

      
      />

      <p className='update'>Loading...</p>
      </>

        :
<>
        <Climate />
        <br />
        
        </>
      }



            
  
     
    </div>
  );
}

export default App;

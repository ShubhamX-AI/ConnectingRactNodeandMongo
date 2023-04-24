import './App.css';
import { useEffect,useState } from 'react';

function App() {
  const [sample_data, setsample_data] = useState([]) //for storing the fetched data

  const fetchsampledata = async()=>{
    const response = await fetch('http://localhost:8080/',{ //fetch API for getting the json file from nodeJS backend
      method : 'GET',
    });
    const parseddata = await response.json();
    setsample_data(parseddata)
  }


  //storing the nessary data from Top 10 cities
  let citydata = {}
  
  sample_data.map((data)=>{
    let city = data.city;                                
    if(citydata[city]){
      citydata[city].numberOfusers ++
      citydata[city].income += parseFloat(data.income.replace("$", "")) //convering the String variable to float for preforming the nessary function
      citydata[city].avgIncome += parseFloat(data.income.replace("$", "")) / citydata[city].numberOfusers 
    }else{
      citydata[city]={
        cityname : city,
        numberOfusers : 1,
        income : parseFloat(data.income.replace("$", "")),
        avgIncome : parseFloat(data.income.replace("$", ""))
      }
    }
    return null
  })

  //Creating an array of objects to perform Sorting operation
  let userSorted = []
  for (let city in citydata) {
    userSorted.push({city : citydata[city].cityname , numUsers: citydata[city].numberOfusers, avgIncome: citydata[city].avgIncome});
  }
  userSorted.sort(function(a,b){return b.numUsers-a.numUsers});

//use effeccthook for runnung the fetsampledata function
  useEffect(() => {
    fetchsampledata();
  }, []);   
  

let count = 0 ;
  return (
    <>
    <div className="table">
    <table>
      {/*first operation*/ }
      <tr key={1}><th key={1}>Income lower than $5 USD and have a car of brand “BMW” or “Mercedes”.</th></tr> 
      {sample_data.map((data) => {
        if (parseFloat(data.income.replace("$", "")) < 5 && (data.car === "BMW" || data.car === "Mercedes-Benz")) {
          return( 
            <tr key={data.id}><td key={data.id}>{data.first_name}  {data.last_name}</td></tr>
           )
        }else{
          return null
        }
      })}

      {/*Second operation*/ }
      <tr key={2}><th key={2}>Male Users which have phone price greater than 10,000.</th></tr>
      {sample_data.map((data) => {
        if (parseFloat(data.phone_price) > 10000 && data.gender === "Male") {
          return( 
              <tr key={data.id}><td key={data.id}>  {data.first_name}  {data.last_name}</td></tr>
           )
        }else{
          return null
        }
      })}

      {/*Third operation*/ }
      <tr key={3}><th key={3}>Users whose last name starts with “M” and has a quote character length greater than 15 and email includes his/her last name.</th></tr>
      {sample_data.map((data) => {
        if (data.last_name[0] === "M" && data.quote.length > 15 && data.email.includes(data.last_name)===true) {
          return( 
              <tr key={data.id}><td key={data.id}>{data.first_name}  {data.last_name}</td></tr>
           )
        }else{
          return null
        }
      })}

      {/*Forth operation*/ }
      <tr key={4}><th key={4}> Users which have a car of brand “BMW”, “Mercedes” or “Audi” and whose email does not include any digit.</th></tr>
      {sample_data.map((data) => {
        const hasNumber = /\d/  //regular expression equivalent to [0-9]
        if ((data.car === "BMW" || data.car === "Mercedes-Benz" || data.car === "Audi")&& hasNumber.test(data.email)===false) {
          return( 
              <tr key={data.id}><td key={data.id}> {data.first_name}  {data.last_name}</td></tr>
           )
        }else{
          return null
        }
      })}

      {/*fifth operation*/ }
      <tr key={5}><th key={5}> Data of top 10 cities which have the highest number of users and their average income.</th></tr>
      {userSorted.map((data)=>{
        if (count<10) {
          count++
          return(
            <tr key={data.id}><td key={data.id}>{data.city} - {data.avgIncome}</td></tr>
            )
        }else{
          return null
        }
      })}
      </table>
      </div>
    </>
  );
}

export default App;

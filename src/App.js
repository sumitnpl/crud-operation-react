import React, { useEffect, useState } from "react";
import { EmployeeDatas } from "./EmployeeData";
import './index.css'

function App() {
  const [data, setData] = useState([])
  const [firstName, setFirstName]=useState('');
  const [lastName, setLastName]=useState('');
  const [age, setAge]=useState();
  const [id, setId]=useState(1);
  const[isUpdate,setIsUpdate] = useState(false);

  useEffect(()=>{
  setData(EmployeeDatas)
},[])

const handleSave = (e) => {
  if (age > 0) {
    if (firstName !== '') {
      if (lastName !== '') {
        const dt = [...data];
        const maxId = dt.length > 0 ? Math.max(...dt.map((item) => item.id)) : 0;
        const newObject = {
          id: maxId + 1,
          firstName: firstName,
          lastName: lastName,
          age: age
        };
        dt.push(newObject);
        setData(dt);
      } else {
        alert('Last Name is Empty');
      }
    } else {
      alert('First Name is Empty');
    }
  } else {
    alert('Age is not Valid');
  }
};

const handleUpdate= (()=>{
  if (age > 0){
    if(firstName !=''){
      if(lastName !=''){
   const index = data.map((item) => {
     return item.id
   }).indexOf(id);
   const dt = [...data];
   dt[index].firstName= firstName;
   dt[index].lastName=lastName;
   dt[index].age=age;
   setData(dt);
   handleClear();
        
      }else{ alert('Last Name is Empty')}
    }else{ alert('First Name is empty')}
  }else{ alert('Age is not Valid')}

})
const handleClear= (()=>{
  setIsUpdate(false);
  setFirstName('');
  setLastName('');
  setAge(0);
})

const handleEdit= ((id)=>{
  const dt = data.filter(item => item.id === id)
  if(dt !==undefined){
    setIsUpdate(true);
    setId(id)
    setFirstName(dt[0].firstName);
    setLastName(dt[0].lastName);
    setAge(dt[0].age);
  }
})

const handleDelete= (id)=>{
  if(id>0){
    if(window.confirm(`are you sure to delete id: ${id}`)){   
      const dta = data.filter(item => item.id !== id);
      setData(dta);
    }
  }
}
  return (
    <div className="main-container">
    <div className="label-input">
      <div className="one-input">
        <label>First Name:</label>
        <input type="text" onChange={(e)=> setFirstName(e.target.value)} value={firstName}/>
      </div>
      <div className="two-input">
        <label>Last Name:</label>
        <input type="text" onChange={(e)=> setLastName(e.target.value)} value={lastName}/>
      </div>
      <div className="third-input">
        <label>Age:</label>
        <input type="number" onChange={(e)=> setAge(e.target.value)}value={age} />
      </div>
      {
        !isUpdate ?
        <button className="btn btn-primary" style={{width:'90px', height:'55px' }} onClick={(e)=>handleSave(e)} >Save</button> 
        :
        <button className="btn btn-primary" style={{width:'90px', height:'55px'}} onClick={()=>handleUpdate()} >Update</button> 

      }&nbsp;
      <button className="btn btn-danger" style={{width:'90px', height:'55px'}} onClick={()=>handleClear()} >Clear</button>
    </div>
     <table className="text-center table table-hover table-dark" >
      <thead>
        <tr>
          <td>S.No</td>
          <td>id</td>
          <td>First Name</td>
          <td>Last Name</td>  
          <td>Age</td>
          <td>Actions</td>
        </tr>
      </thead>
      <tbody>
        {
          data.map((item,index)=>{
            return(
              <tr key={index}>
                <td>{index+1}</td>
                <td>{item.id}</td>
                <td>{item.firstName}</td>
                <td>{item.lastName}</td>
                <td>{item.age}</td>
                <td>
                  <button className="btn btn-primary" style={{width:'90px'}} onClick={(e)=>handleEdit(item.id)}>Edit</button> &nbsp;
                  <button className="btn btn-danger" style={{width:'90px'}} onClick={()=>handleDelete(item.id)}>Delete</button>
                </td>
              </tr>
            )
          })
        }
      </tbody>
      </table>
    </div>
  );
}

export default App;
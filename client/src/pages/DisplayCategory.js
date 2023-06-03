import React,{useState,useEffect} from 'react'
import { useNavigate } from 'react-router-dom';
const DisplayCategory = () => {
  const navigate=useNavigate();
    const[categorys,setCategorys]=useState([]);
    useEffect(() => {
        const fetchCategory = async () => {
            const url = "http://localhost:4000/api/displayAllCategory";
            const response = await fetch(url);
            const data = await response.json();
            if(response.ok){
              setCategorys(data);
            }
        }      
        fetchCategory();
      }, []);

      const handleDelete=async(_id)=>{
          try{
            const url=`http://localhost:4000/api/deleteCategory/${_id}`;
            const response=await fetch(url,{
              method:'DELETE'
            })
            if(response.ok){
              setCategorys(prevCategory=>prevCategory.filter(category=>category._id!==_id))
            }
          }catch(error){
            console.log(error);
          }
      }
      const handleUpdate=(id)=>{
        navigate(`/updateCategory/${id}`);
      }
  return (
    <>
    <div className="container">
    <table className="table">
        <thead>
          <tr>
            <th scope="col">category</th>
            <th scope="col">Action</th>
          </tr>
        </thead>
    {categorys.map((category) => (
        <tbody key={category._id}>
          <tr>
            <td>{category.name}</td>
            <td><button className="btn btn-danger mx-3" onClick={()=>handleDelete(category._id)}>Delete</button>
            <button className="btn btn-primary" onClick={()=>handleUpdate(category._id)}>Update</button></td>
          </tr>
          </tbody> 
    ))}
    </table>
    </div>
    </>
  )
}

export default DisplayCategory

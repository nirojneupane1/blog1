import React,{useState,useEffect} from 'react'

const Home = () => {
  const[blogs,setBlogs]=useState([]);
  useEffect(() => {
    const fetchBlog = async () => {
        const url = "http://localhost:4000/api/displayBlog";
        const response = await fetch(url);
        const data = await response.json();
        if(response.ok){
          setBlogs(data);
        }
        console.log(data);
    }      
    fetchBlog();
  }, []);

  const handleDelete=async(_id)=>{
    try{
      const url=`http://localhost:4000/api/deleteBlog/${_id}`;
      const response=await fetch(url,{
        method:'DELETE'
      })
      if(response.ok){
        setBlogs(prevBlog=>prevBlog.filter(blog=>blog._id!==_id))
      }
    }catch(error){
      console.log(error);
    }
}
  return (
    <>
    <div className="container">
    <div className="row">
      {blogs.map((blog)=>(
        <div className="col-md-4 my-3" key={blog._id}>
            <div className="card" style={{width: "25rem"}}>
            <img src={`http://localhost:4000/uploads/${blog.image}`} className="card-img-top" width={"250px"} height={"300px"} alt="..."/>
            <div className="card-body">
            <h5 className="card-title">{blog.title}</h5>
            <p className="card-text">{blog.slug}</p>
            <p className="card-text">{blog.description}</p>
            <button className="btn btn-danger" onClick={()=>handleDelete(blog._id)}>Delete</button>
            </div>
          </div>
        </div>
      ))}
    </div>
    </div>
    </>
  )
}

export default Home

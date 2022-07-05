import React, { useState } from "react";
import { useEffect } from "react";
import { NavLink } from "react-router-dom";
import "../App.css";
import CreateIcon from "@mui/icons-material/Create";
import DeleteIcon from "@mui/icons-material/Delete";

export default function Home() {
  const [getMoviesData, setMoviesData] = useState([]);

  console.log("movies data", getMoviesData);

  async function getData() {
    const res = await fetch("https://crud-backend-surya.herokuapp.com/getmovies", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });

    const data = await res.json();
    console.log("data::", data);

    if (res.status === 500) {
      alert("error");
    } else {
      setMoviesData(data);
    }
  }

  

  async function deleteMovie(id){
    const res1 = await fetch(`https://crud-backend-surya.herokuapp.com/deletemovie/${id}`,{
        method:'DELETE',
        headers:{
            'Content-Type':'application/json'
        }
    });

    const deletedData = await res1.json();
    console.log("Deleted:",deletedData)

    if(res1.status===500){
        console.log("error")
    }else{
        alert("Data Deleted Succesfully")
        getData();
    }
  }

  useEffect(() => {
    getData();
  },[]);

  return (
    <div className="mt-5">
      <div className="container">
        <div className="add_btn mt-2">
          <NavLink to="/addmovies" className="btn btn-primary">
            Add Movie
          </NavLink>
        </div>

        <table className="table mt-2">
          <thead>
            <tr className="table-dark">
              <th scope="col">Id</th>
              <th scope="col">Name</th>
              <th scope="col">Rating</th>
              <th scope="col">Cast</th>
              <th scope="col">Genre</th>
              <th scope="col">Release Date</th>
              <th scope="col"></th>
            </tr>
          </thead>
          <tbody>
            {getMoviesData.map((eachMovie, id) => {
              return (
                <>
                  <tr>
                    <th>{id + 1}</th>
                    <td>{eachMovie.name}</td>
                    <td>{eachMovie.rating}</td>
                    <td>{eachMovie.cast}</td>
                    <td>{eachMovie.genre}</td>
                    <td>{eachMovie.release}</td>
                    <td className="d-flex justify-content-between">
                        <NavLink to={`/editmovie/${eachMovie._id}`}>
                        <button className="btn btn-primary">
                        <CreateIcon />
                      </button>
                        </NavLink>
                      
                      <button className="btn btn-danger" onClick={()=>{deleteMovie(eachMovie._id)}} >
                        <DeleteIcon />
                      </button>
                    </td>
                  </tr>
                </>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}

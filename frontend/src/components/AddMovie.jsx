import React from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { useFormik } from "formik";
import * as yup from "yup";

export default function AddMovie() {

    const navigate = useNavigate("")

    // const [inpval,setINP]=useState(
    //     {

    //     }
    // )


    async function addMovie(newMovie){
        const res = await fetch('https://crud-backend-surya.herokuapp.com/addmovie',{
            method:'POST',
            headers:{
                'Content-Type':'application/json'
            },
            body:JSON.stringify(newMovie)
        })
        const data = await res.json();
        console.log(data)
        if(res.status===404||!data){
            alert("Error")
        }else{
            alert("Data Added")
            navigate('/',{replace:true})
        }
    }

  const validations = yup.object().shape({
    name: yup.string().required("Movie Name Required"),
    rating: yup
      .number()
      .required("Rating Required")
      .max(5, "Don't exceed 5")
      .min(1, "Give More Than 1"),
    cast: yup.string().required("Cast Required"),
    genre: yup.string().required("Genre Required"),
    release: yup.date().required("Date Required"),
  });

  const movieForm = useFormik({
    initialValues: {
      name: "",
      rating: "",
      cast: "",
      genre: "",
      release: "",
    },
    validationSchema: validations,
    onSubmit: (values) => {
      console.log(values);
      const newMovie = {
        name:values.name,
        rating:values.rating,
        cast:values.cast,
        genre:values.genre,
        release:values.release
      }
      addMovie(newMovie)
    },
  });

  return (
    <div className="container">
      <NavLink to="/">Home</NavLink>
      <div className="d-flex justify-content-center">
        <div className="card login-form car mt-5 global-container">
          <div className="card-body">
            <h3 className="card-title text-center">Movie Form</h3>
            <div className="card-text">
              <form onSubmit={movieForm.handleSubmit}>
                <input
                  type="text"
                  name="name"
                  className="mb-3 col-lg-6 col-md-6 col-12"
                  placeholder="Enter Movie Name"
                  {...movieForm.getFieldProps('name')}
                />
                {movieForm.touched.name&&movieForm.errors.name?<div className="errors">{movieForm.errors.name}</div>:null}
                <br />
                <input
                  type="number"
                  name="rating"
                  className="mb-3 col-lg-6 col-md-6 col-12"
                  placeholder="Enter Rating"
                  {...movieForm.getFieldProps('rating')}
                />
                {movieForm.touched.rating&&movieForm.errors.rating?<div className="errors">{movieForm.errors.rating}</div>:null}
                <br />
                <input
                  type="text"
                  name="cast"
                  className="mb-3 col-lg-6 col-md-6 col-12"
                  placeholder="Enter Cast"
                  {...movieForm.getFieldProps('cast')}
                />
                {movieForm.touched.cast&&movieForm.errors.cast?<div className="errors">{movieForm.errors.cast}</div>:null}
                <br />
                <input
                  type="text"
                  name="genre"
                  className="mb-3 col-lg-6 col-md-6 col-12"
                  placeholder="Enter Genre"
                  {...movieForm.getFieldProps('genre')}
                />
                {movieForm.touched.genre&&movieForm.errors.genre?<div className="errors">{movieForm.errors.genre}</div>:null}
                <br />
                <input
                  type="date"
                  name="release"
                  className="mb-3 col-lg-6 col-md-6 col-12"
                  {...movieForm.getFieldProps('release')}
                />
                {movieForm.touched.release&&movieForm.errors.release?<div className="errors">{movieForm.errors.release}</div>:null}
                <br />
               <button type='submit' className="btn btn-primary">Add Button</button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

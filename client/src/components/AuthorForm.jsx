import React, { useState } from 'react'
// import axios from 'axios';
const AuthorForm = (props) => {
    //keep track of what is being typed via useState hook
    const {onSubmitProp} = props;
    const [name, setName] = useState(props.initName); 

    // * for errors
    // const [errors, setErrors] = useState([]); 
    //handler when the form is submitted
    const onSubmitHandler = e => {
        //prevent default behavior of the submit
        e.preventDefault();
        //make a post request to create a new person
        // * before
        // axios.post('http://localhost:8000/api/authors', {
        //     name,
        //     description,
        //     price
        // })
        //     .then(res=>console.log(res))
        //     .catch(err=>console.log(err))
        //* after
        onSubmitProp({name});
        if (! (name.length < 3) ) { 
            setName("");
        }
    }
    //onChange to update name and description
    return (
        <div>
            <h3>Add an Author</h3>
            <form onSubmit={onSubmitHandler}>
                <p>
                    <label className="form-label">Name</label><br/>
                    <input
                    type="text"
                    onChange={(e)=>setName(e.target.value)}
                    value={name}
                    className="form-control"/>
                </p>
                <input type="submit" className="btn btn-primary"/>
            </form>
        </div>
    )
}

export default AuthorForm;
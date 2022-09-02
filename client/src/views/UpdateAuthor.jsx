

import React, { useEffect, useState } from 'react'
import axios from 'axios';
import { useParams, useNavigate} from "react-router-dom";
import { Link} from "react-router-dom";
    
const UpdateAuthor = (props) => {
    const navigate = useNavigate();
    const { id } = useParams();
    const [name, setName] = useState(""); 
    const [errors, setErrors] = useState([]);
    
    useEffect(() => {
        axios.get('http://localhost:8000/api/authors/' + id)
            .then(res => {
                // setFirstName(res.data.firstName);
                // setLastName(res.data.lastName);
                setName(res.data.name);
                console.log(res.data);
            })
    }, [id]);
    
    const updateAuthor = e => {
        e.preventDefault();
        if (name.length < 3) {
            setErrors([...errors, "has to be 3 characters"]);
            return;
        }
        axios.put('http://localhost:8000/api/authors/' + id, {
            name
        })
            .then(res => {
                console.log(res);
                navigate("/");
            })
            .catch(err => console.error(err));
    }
    
    return (
        <div className="container">
            <div class="row">
                <div class="col">
                    <h3>Update a Author</h3>
                    <form onSubmit={updateAuthor}>
                        {errors.map((err, index) => <p key={index} className="text-danger">{err}</p>)}
                        <p>
                    
                            <label className="form-label">Name</label><br />
                            <input type="text"
                            name="name"
                            value={name}
                            className="form-control"
                            onChange={(e) => { setName(e.target.value) }} />
                        </p>
                        <div className="d-flex justify-content-end gap-3">
                            <input class="btn btn-info" type="submit" value="Update"/>
                            <Link className="btn btn-warning" to={"/"}>Cancel</Link>
                        </div>
                    </form>
                </div>
            </div>

        </div>
    )
}
    
export default UpdateAuthor;
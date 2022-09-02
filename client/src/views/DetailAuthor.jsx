import React, { useEffect, useState } from 'react'
import axios from 'axios';
import { useParams, Link } from "react-router-dom";
    
const DetailAuthor = (props) => {
    const [author, setAuthor] = useState({})
    const { id } = useParams();
    
    useEffect(() => {
        axios.get('http://localhost:8000/api/authors/' +id)
            .then(res => setAuthor(res.data))
            .catch(err => console.error(err));
    }, [id]);
    
    return (
        <div>

            <div className="card">
                <div className="card-header">Author Detail</div>

                <div className="card-body">
                    <div className="card-title">Name: {author.name}</div>
                </div>
            </div>
            <div className="d-flex gap-3 justify-content-center mt-2">
                <Link className="btn btn-warning" to={"/"}>Back</Link>
                <Link className="btn btn-primary" to={"/authors/" + author._id + "/edit"}>
                    Edit
                </Link>
            </div>
            
        </div>
    )
}
    
export default DetailAuthor;
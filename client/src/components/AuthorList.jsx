
import React from 'react'
import axios from 'axios';
import {Link} from "react-router-dom";
// import DeleteButton from './DeleteButton';
    
    
const AuthorList = (props) => {
    

    // * before modulizing DeleteButton
    const { removeFromDom } = props;
    const deleteAuthor = (authorId) => {

        axios.delete('http://localhost:8000/api/authors/' + authorId)
            .then(res => {
                removeFromDom(authorId)
            })
        }


    return (
        <div>
            <table className="table">
                <thead>
                    <tr>
                        <th>Author Name</th>
                        <th>Actions </th>
                    </tr>
                </thead>
                <tbody>
                    {props.authors.map((author, i) =>
                        <tr key={i}>
                            <td>{author.name} </td>
                            <td>  
                                <div className="d-flex justify-content-center gap-3">
                                    <Link className="btn btn-primary" to={"/authors/" + author._id}>Show Details</Link>
                                    <button className="btn btn-danger" onClick={(e) => { deleteAuthor(author._id) }}>
                                        Delete
                                    </button>
                                </div>
                            </td>
                        </tr>
                    )}
                </tbody>
            </table>
            {/* {props.authors.map( (author, i) =>
                <div key={i}>
                    {author.name}  <br/>
                    <Link className="btn btn-primary" to={"/authors/" + author._id}>{author.name}</Link> |
                    <button className="btn btn-danger" onClick={(e) => { deleteAuthor(author._id) }}>
                        Delete
                    </button>
                    {/* <DeleteButton authorId={author._id} successCallback={()=> { deleteAuthor(author._id) }}/> */}

                {/* </div> */}
            {/* )}  */}
        </div>
    )
}
    
export default AuthorList;
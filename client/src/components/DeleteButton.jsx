import React from 'react'
import axios from 'axios';
    
const DeleteButton = props => {
    const { productId, successCallback } = props;
    
    const deleteProduct = e => {
        axios.delete('http://localhost:8000/api/products/' + productId)
            .then(res=>{
                successCallback();
            })
    }
    
    return (
        <button className="btn btn-danger" onClick={deleteProduct}>
            Delete
        </button>
    )
}

export default  DeleteButton;
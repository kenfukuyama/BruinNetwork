
import React, { useEffect, useState } from 'react'
import axios from 'axios';
import AuthorForm from '../components/AuthorForm';
import AuthorList from '../components/AuthorList';


const Events = () => {
    const [authors, setAuthors] = useState([]);
    const [loaded2, setLoaded2] = useState(false);
    const [initName, setInitName] = useState("");

    // * initial message
    // const [ message, setMessage ] = useState("Loading...")


    // useEffect(()=>{
    //     axios.get("http://localhost:8000/api")
    //         .then(res=>setMessage(res.data.message))       
    // }, []);

    // * for errors
    // const [errors, setErrors] = useState([]);
    const [errors1, setErrors1] = useState([]);
    

    // * for people
    useEffect(()=>{
        // axios.get('http://localhost:8000/api/people')
        //     .then(res=>{
        //         setPeople(res.data);
        //         setLoaded(true);
        //     })
        //     .catch(err => console.error(err));

        // axios.get('http://localhost:8000/api/products')
        //     .then(res=>{
        //         setProducts(res.data);
        //         setLoaded1(true);
        //     })
        //     .catch(err => console.error(err));



        axios.get('http://localhost:8000/api/authors')
            .then(res => {
                setAuthors(res.data);
                setLoaded2(true);
            })
            .catch(err => console.error(err));
    },[authors]);


    // const createPerson = person => {
    //     axios.post('http://localhost:8000/api/people', person)
    //         .then(res=>{
    //             setPeople([...people, res.data]);
    //         })
            
    // }

    // const createProduct = product => {
    //     axios.post('http://localhost:8000/api/products', product)
    //         .then(res=>{
    //             setProducts([...products, res.data]);
    //         })
    //         .catch(err=>{
    //             const errorResponse = err.response.data.errors; // Get the errors from err.response.data
    //             const errorArr = []; // Define a temp error array to push the messages in
    //             for (const key of Object.keys(errorResponse)) { // Loop through all errors and get the messages
    //                 errorArr.push(errorResponse[key].message)
    //             }
    //             // Set Errors
    //             setErrors(errorArr);
    //         })    
    // }


        const createAuthor = Author => {
        axios.post('http://localhost:8000/api/Authors', Author)
            .then(res=>{
                setAuthors([...authors, res.data]);
                setInitName("");

            })
            .catch(err=>{
                const errorResponse = err.response.data.errors; // Get the errors from err.response.data
                const errorArr = []; // Define a temp error array to push the messages in
                for (const key of Object.keys(errorResponse)) { // Loop through all errors and get the messages
                    errorArr.push(errorResponse[key].message)
                }
                // Set Errors
                setErrors1(errorArr);
            })    
    }
    // * removeFrom
    // const removeFromDom = productId => {
    //     setProducts(products.filter(product => product._id !== productId));
    // }

    const removeFromDom = authorId => {
        setAuthors(authors.filter(author => author._id !== authorId));
    }



    return (
        <div>
            {/* <h2>Message from the backend: {message}</h2> */}
            
            {/* <PersonForm onSubmitProp={createPerson} initialFirstName="" initialLastName=""/>
            <hr/>
            {loaded && <PersonList people={people}/>}
            <hr/> */}

            {/* {errors.map((err, index) => <p key={index} className="text-danger">{err}</p>)}
            <ProductForm onSubmitProp={createProduct}/>
            <hr/>
            {loaded1 && <ProductList products={products} removeFromDom={removeFromDom}/>}
            <hr/> */}
            
            <div className="container">
                <div className="d-flex vh-100 align-items-center justify-content-center flex-column fade-in">
                    <div class="d-flex justify-content-center">
                        <div class="input-group search-bar p-4 w-md-75 w-lg-50">
                            <input type="text" class="form-control rounded live-search-box regular" placeholder="Search Events" aria-label="Search Events"
                                aria-describedby="search-addon" />
                            <button type="button" class="btn btn-primary"><i class="bi bi-search"></i></button>
                        </div>
                    </div>
                    <div className="row">
                        <div className="col">{errors1.map((err, index) => <p key={index} className="text-danger">{err}</p>)}
                            <AuthorForm onSubmitProp={createAuthor} initName={initName} />
                        </div>
                        <div className="col">
                            {loaded2 && <AuthorList authors={authors} removeFromDom={removeFromDom} />}
                        </div>
                    </div>
                </div>
            </div>

        </div>
    )
}
export default Events;
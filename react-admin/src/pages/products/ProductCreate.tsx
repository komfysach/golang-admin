import axios from 'axios';
import React, { useState, SyntheticEvent } from 'react';
import Wrapper from '../../components/Wrapper';
import { Redirect } from 'react-router';
import ImageUpload from '../../components/ImageUpload';

const ProductCreate = () => {
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [image, setImage] = useState('');
    const [price, setPrice] = useState('');
    const [redirect, setRedirect] = useState(false);

    const submit = async (e: SyntheticEvent) => {
        e.preventDefault();

        await axios.post('products', {
            title,
            description,
            image,
            price
        })
        setRedirect(true);
    }

    if (redirect) {
        return <Redirect to="/products" />
    }

    return (
        <Wrapper>
            <form onSubmit={submit}>
                <div className="mb-3">
                    <label>Title</label>
                    <input className="form-control"
                        onChange={e => setTitle(e.target.value)} />

                </div>
                <div className="mb-3">
                    <label>Description</label>
                    <textarea className="form-control"
                        onChange={e => setDescription(e.target.value)} />
                </div>

                <div className="mb-3">
                    <label>Image</label>
                    <input type="email" className="form-control"
                        value={image}
                        onChange={e => setImage(e.target.value)} />
                    <ImageUpload uploaded={setImage} />
                </div>
                <div className="mb-3">
                    <label>Price</label>
                    <input type="email" className="form-control"
                        onChange={e => setPrice(e.target.value)} />
                </div>
                <button className="w-100 btn btn-lg btn-primary" type="submit">Add</button>
            </form>
        </Wrapper>
    );
}

export default ProductCreate;

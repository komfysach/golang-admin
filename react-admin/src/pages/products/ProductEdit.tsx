import axios from 'axios';
import React, { useState, SyntheticEvent, useEffect, useRef } from 'react';
import Wrapper from '../../components/Wrapper';
import { Redirect } from 'react-router';
import ImageUpload from '../../components/ImageUpload';

const ProductEdit = (props: any) => {
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [image, setImage] = useState('');
    const [price, setPrice] = useState('');
    const [redirect, setRedirect] = useState(false);
    const ref = useRef<HTMLInputElement>(null);

    useEffect(() => {
        (
            async () => {

                const { data } = await axios.get(`products/${props.match.params.id}`);

                setTitle(data.title);
                setDescription(data.description);
                setImage(data.image);
                setPrice(data.price);

            }
        )()
    }, [props.match.params.id]);

    const submit = async (e: SyntheticEvent) => {
        e.preventDefault();

        await axios.put(`products/${props.match.params.id}`, {
            title,
            description,
            image,
            price
        })
        setRedirect(true);
    }

    const updatedImage = (url: string) => {
        if (ref.current) {
            ref.current.value = url;
        }
        setImage(url);


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
                        defaultValue={title}
                        onChange={e => setTitle(e.target.value)} />

                </div>
                <div className="mb-3">
                    <label>Description</label>
                    <textarea className="form-control"
                        defaultValue={description}
                        onChange={e => setDescription(e.target.value)} />
                </div>

                <div className="mb-3">
                    <label>Image</label>
                    <input type="email" className="form-control"
                        ref={ref}
                        defaultValue={image}
                        onChange={e => setImage(e.target.value)} />
                    <ImageUpload uploaded={updatedImage} />
                </div>
                <div className="mb-3">
                    <label>Price</label>
                    <input type="email" className="form-control"
                        defaultValue={price}
                        onChange={e => setPrice(e.target.value)} />
                </div>
                <button className="w-100 btn btn-lg btn-primary" type="submit">Add</button>
            </form>
        </Wrapper>
    );
}

export default ProductEdit;

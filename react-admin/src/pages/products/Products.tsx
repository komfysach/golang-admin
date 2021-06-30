import axios from 'axios';
import React, { useState, useEffect } from 'react';
import Wrapper from '../../components/Wrapper';
import { Product } from '../../models/products';
import { Link } from 'react-router-dom';
import Paginator from '../../components/Paginator';


const Products = () => {
    const [products, setProducts] = useState([]);
    const [page, setPage] = useState(1);
    const [lastPage, setLastPage] = useState(0);


    useEffect(() => {
        (
            async () => {
                const { data } = await axios.get(`products?page=${page}`);
                setProducts(data.data);
                setLastPage(data.meta.lat_page);
            }
        )()
    }, [page])



    const del = async (id: number) => {
        if (window.confirm('Are you sure you want to delete this product?')) {
            await axios.delete(`products/${id}`);
            setProducts(products.filter((p: Product) => p.id !== id))
        }
    }

    return (
        <Wrapper>
            <div className="table-responsive">
                <table className="table table-striped table-sm">
                    <thead>
                        <tr>
                            <th scope="col">#</th>
                            <th scope="col">Image</th>
                            <th scope="col">Price</th>
                            <th scope="col">Description</th>
                            <th scope="col">Price</th>
                            <th scope="col">Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {products.map((p: Product) => {
                            return (
                                <tr key={p.id}>
                                    <td>{p.id}</td>
                                    <td><img src={p.image} width="58" /></td>
                                    <td>{p.title}</td>
                                    <td>{p.description}</td>
                                    <td>{p.price}</td>
                                    <td>
                                        <div className="btn-group mr-2">
                                            <Link to={`/products/${p.id}/edit`} className="btn btn-sm btn-outline-secondary">Edit</Link>
                                            <a href="#" className="btn btn-sm btn-outline-secondary"
                                                onClick={() => del(p.id)}>Delete</a>
                                        </div>
                                    </td>
                                </tr>
                            )
                        })}
                    </tbody>
                </table>
            </div>
            <Paginator page={page} lastPage={lastPage} pageChanged={page => setPage(page)} />
        </Wrapper>
    );
}

export default Products;

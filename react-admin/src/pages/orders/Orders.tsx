import React, { useState, useEffect } from 'react';
import Wrapper from '../../components/Wrapper';
import Paginator from '../../components/Paginator';
import axios from 'axios';
import { Order } from '../../models/orders';
import { OrderItem } from '../../models/order-item';

const hide = {
    maxHeight: 0,
    transition: "100ms ease-in"
}

const show = {
    maxHeight: "150px",
    transition: "100ms ease-out"
}

const Orders = () => {
    const [orders, setOrders] = useState([]);
    const [page, setPage] = useState(1);
    const [lastPage, setLastPage] = useState(0);
    const [selected, setSelected] = useState(0);

    useEffect(() => {
        (
            async () => {
                const { data } = await axios.get(`orders?page=${page}`);
                setOrders(data.data)
                setLastPage(data.meta.last_page);
            }
        )()
    }, [page])

    const select = (id: number) => {
        setSelected(selected === id ? 0 : id);
    }

    return (
        <Wrapper>
            <div className="table-responsive">
                <table className="table table-sm">
                    <thead>
                        <tr>
                            <th scope="col">#</th>
                            <th scope="col">Name</th>
                            <th scope="col">Email</th>
                            <th scope="col">Total</th>
                            <th scope="col">Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {orders.map((o: Order) => {
                            return (
                                <>
                                    <tr key={o.id}>
                                        <tr>{o.id}</tr>
                                        <tr>{o.name}</tr>
                                        <tr>{o.email}</tr>
                                        <tr>{o.total}</tr>
                                        <tr>
                                            <div className="btn-group mr-2">
                                                <a href="#" className="btn btn-sm btn-outline-secondary"
                                                    onClick={() => { o.id }}
                                                >View</a>
                                            </div>
                                        </tr>
                                    </tr>
                                    <tr>
                                        <td colSpan={5}>
                                            <div className="overflow-hidden" style={selected === o.id ? show : hide}>
                                                <table className="table table-sm">
                                                    <thead>
                                                        <tr>
                                                            <th>#</th>
                                                            <th>Product Title</th>
                                                            <th>Quantity</th>
                                                            <th>Price</th>
                                                        </tr>
                                                    </thead>
                                                    <tbody>
                                                        {o.order_items.map((i: OrderItem) => {
                                                            return (
                                                                <tr>
                                                                    <td>{i.id}</td>
                                                                    <td>{i.product_title}</td>
                                                                    <td>{i.quantity}</td>
                                                                    <td>{i.price}</td>
                                                                </tr>
                                                            )
                                                        })}
                                                    </tbody>
                                                </table>
                                            </div>
                                        </td>
                                    </tr>
                                </>
                            )
                        })}
                    </tbody>
                </table>
            </div>
            <Paginator page={page} lastPage={lastPage} pageChanged={page => setPage(page)} />
        </Wrapper>
    );
}

export default Orders;


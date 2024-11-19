import React, { useEffect, useState } from "react";
import { Footer, Navbar } from "../components";
import { Link } from "react-router-dom";
import { convertImage, convertDate } from "../helpers/functions";
import { orderHistory } from "../apis/order";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

const OrderHistory = () => {
    const [orders, setOrders] = useState([])
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        const getOrders = async () => {
            setOrders(await orderHistory())
            setLoading(false)
        }

        getOrders()
    }, [])

    const EmptyOrderHistory = () => {
        return (
            <div className="container">
                <div className="row">
                    <div className="col-md-12 py-5 bg-light text-center">
                        <h4 className="p-3 display-5">No Orders</h4>
                        <Link to="/" className="btn  btn-outline-dark mx-4">
                            <i className="fa fa-arrow-left"></i> Continue Shopping
                        </Link>
                    </div>
                </div>
            </div>
        );
    };

    const Loading = () => {
        return (
          <>
            <div className="col-12 py-5 text-center">
              <Skeleton height={40} width={560} />
            </div>
            <div className="col-md-4 col-sm-6 col-xs-8 col-12 mb-4">
              <Skeleton height={592} />
            </div>
            <div className="col-md-4 col-sm-6 col-xs-8 col-12 mb-4">
              <Skeleton height={592} />
            </div>
            <div className="col-md-4 col-sm-6 col-xs-8 col-12 mb-4">
              <Skeleton height={592} />
            </div>
            <div className="col-md-4 col-sm-6 col-xs-8 col-12 mb-4">
              <Skeleton height={592} />
            </div>
            <div className="col-md-4 col-sm-6 col-xs-8 col-12 mb-4">
              <Skeleton height={592} />
            </div>
            <div className="col-md-4 col-sm-6 col-xs-8 col-12 mb-4">
              <Skeleton height={592} />
            </div>
          </>
        );
      };

    const ShowOrderHistory = () => {
        return (
            <>
                <section className="h-100 gradient-custom">
                    <div className="container py-5">
                        <div className="row d-flex justify-content-center my-4">
                            <div className="col-md-10">
                                <div className="card mb-4">
                                    <div className="card-header py-3">
                                        <h5 className="mb-0">Item List</h5>
                                    </div>
                                    <div className="card-body">
                                        {orders.map((order) => {
                                            return (
                                                <div key={order.id}>
                                                    <div className="container">
                                                        <div className="row">
                                                            <div className="col-md-3 text-center">
                                                                <p><strong>Order Number</strong></p>
                                                                <p>{order.id}</p>
                                                            </div>
                                                            <div className="col-md-3 text-center">
                                                                <p><strong>Date Placed</strong></p>
                                                                <p>{convertDate(order.createdAt)}</p>
                                                            </div>
                                                            <div className="col-md-3 text-center">
                                                                <p><strong>Items</strong></p>
                                                                <p>{order.orderItems.length}</p>
                                                            </div>
                                                            <div className="col-md-3 text-center">
                                                                <p><strong>Total Amount</strong></p>
                                                                <p>{order.total_price}</p>
                                                            </div>
                                                        </div>
                                                    </div>

                                                    <div className="d-flex justify-content-center">
                                                        <a className="text-dark fs-4" data-bs-toggle="collapse" href={`#collapse-${order.id}`} target="_blank" aria-expanded="false" aria-controls={`collapse-${order.id}`}>
                                                            <i className="fa fa-solid fa-caret-down"></i>
                                                        </a>
                                                    </div>
                                                    <div className="collapse" id={`collapse-${order.id}`}>
                                                        {order.orderItems.map((orderItem) => {
                                                            return (
                                                                <div className="row m-2 d-flex align-items-center" key={orderItem.id}>
                                                                    <div className="col-lg-5 col-md-5">
                                                                        <div
                                                                            className="bg-image rounded"
                                                                            data-mdb-ripple-color="light"
                                                                        >
                                                                            <img
                                                                                src={convertImage(orderItem.product.image)}
                                                                                // className="w-100"
                                                                                alt={orderItem.product.name}
                                                                                height={150}
                                                                            />
                                                                        </div>
                                                                    </div>

                                                                    <div className="col-lg-7 col-md-7">
                                                                        <p>
                                                                            <strong>{orderItem.product.name}</strong>
                                                                        </p>
                                                                        <p>
                                                                            Quantity {orderItem.quantity}
                                                                        </p>
                                                                        <p className="text-start">
                                                                            ${orderItem.price}
                                                                        </p>
                                                                    </div>
                                                                    <hr className="my-4" style={{ width: "75%", margin: "0 auto" }} />
                                                                </div>
                                                            )
                                                        })}
                                                    </div>

                                                    <hr className="my-4" />
                                                </div>
                                            );
                                        })}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>
            </>
        )
    };

    return (
        <>
            <Navbar />
            <div className="container my-3 py-3">
                <h1 className="text-center">Orders</h1>
                <hr />
                {loading ? <Loading /> : (orders.length > 0 ? <ShowOrderHistory /> : <EmptyOrderHistory />)}
            </div>
            <Footer />
        </>
    );
};

export default OrderHistory;

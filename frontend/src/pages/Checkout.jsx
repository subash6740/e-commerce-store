import React from "react";
import { Footer, Navbar } from "../components";
import { useDispatch, useSelector } from "react-redux";
import { Link, useLocation } from "react-router-dom";
import { emptyCart } from "../redux/slices/cartSlice";
import { emptyCart as emptyCartApi } from "../apis/cart";
import { createOrder } from "../apis/order";

const Checkout = () => {
  const state = useSelector((state) => state.cart);
  const location = useLocation();
  const { cartItems } = location.state || {};
  const dispatch = useDispatch();

  const handleCheckout = async (e) => {
    e.preventDefault()
    try {
      await createOrder({
        firstName: e.target.elements.firstName.value,
        lastName: e.target.elements.lastName.value,
        email: e.target.elements.email.value,
        address: e.target.elements.address.value,
        address2: e.target.elements.address2.value,
        country: e.target.elements.country.value,
        state: e.target.elements.state.value,
        pinCode: e.target.elements.pinCode.value,
        cardName: e.target.elements.cardName.value,
        cardNumber: e.target.elements.cardNumber.value,
        cardExpiration: e.target.elements.cardExpiration.value,
        cardCvv: e.target.elements.cardCvv.value,
        items: cartItems.map((item) => ({
          productId: item.id,
          quantity: item.quantity,
          price: item.price
        })),
      });
      await emptyCartApi()
      dispatch(emptyCart())
      alert('Order created successfully');
    } catch (error) {
      console.error('Failed to create order:', error);
      alert('Failed to create order', error);
    }
  };

  const EmptyCart = () => {
    return (
      <div className="container">
        <div className="row">
          <div className="col-md-12 py-5 bg-light text-center">
            <h4 className="p-3 display-5">No item in Cart</h4>
            <Link to="/" className="btn btn-outline-dark mx-4">
              <i className="fa fa-arrow-left"></i> Continue Shopping
            </Link>
          </div>
        </div>
      </div>
    );
  };

  const ShowCheckout = () => {
    let subtotal = 0;
    let shipping = 30.0;
    let totalItems = 0;
    state.map((item) => {
      return (subtotal += item.price * item.quantity);
    });

    state.map((item) => {
      return (totalItems += item.quantity);
    });
    return (
      <>
        <div className="container py-5">
          <div className="row my-4">
            <div className="col-md-5 col-lg-4 order-md-last">
              <div className="card mb-4">
                <div className="card-header py-3 bg-light">
                  <h5 className="mb-0">Order Summary</h5>
                </div>
                <div className="card-body">
                  <ul className="list-group list-group-flush">
                    <li className="list-group-item d-flex justify-content-between align-items-center border-0 px-0 pb-0">
                      Products ({totalItems})<span>${Math.round(subtotal)}</span>
                    </li>
                    <li className="list-group-item d-flex justify-content-between align-items-center px-0">
                      Shipping
                      <span>${shipping}</span>
                    </li>
                    <li className="list-group-item d-flex justify-content-between align-items-center border-0 px-0 mb-3">
                      <div>
                        <strong>Total amount</strong>
                      </div>
                      <span>
                        <strong>${Math.round(subtotal + shipping)}</strong>
                      </span>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
            <div className="col-md-7 col-lg-8">
              <div className="card mb-4">
                <div className="card-header py-3">
                  <h4 className="mb-0">Billing address</h4>
                </div>
                <div className="card-body">
                  <form className="needs-validation" novalidate onSubmit={handleCheckout}>
                    <div className="row g-3">
                      <div className="col-sm-6 my-1">
                        <label htmlFor="firstName" className="form-label">
                          First name
                        </label>
                        <input
                          type="text"
                          className="form-control"
                          id="firstName"
                          placeholder=""
                          required
                        />
                        <div className="invalid-feedback">
                          Valid first name is required.
                        </div>
                      </div>

                      <div className="col-sm-6 my-1">
                        <label htmlFor="lastName" className="form-label">
                          Last name
                        </label>
                        <input
                          type="text"
                          className="form-control"
                          id="lastName"
                          placeholder=""
                          required
                        />
                        <div className="invalid-feedback">
                          Valid last name is required.
                        </div>
                      </div>

                      <div className="col-12 my-1">
                        <label htmlFor="email" className="form-label">
                          Email
                        </label>
                        <input
                          type="email"
                          className="form-control"
                          id="email"
                          placeholder="you@example.com"
                          required
                        />
                        <div className="invalid-feedback">
                          Please enter a valid email address for shipping
                          updates.
                        </div>
                      </div>

                      <div className="col-12 my-1">
                        <label htmlFor="address" className="form-label">
                          Address
                        </label>
                        <input
                          type="text"
                          className="form-control"
                          id="address"
                          placeholder="1234 Main St"
                          required
                        />
                        <div className="invalid-feedback">
                          Please enter your shipping address.
                        </div>
                      </div>

                      <div className="col-12">
                        <label htmlFor="address2" className="form-label">
                          Address 2{" "}
                          <span className="text-muted">(Optional)</span>
                        </label>
                        <input
                          type="text"
                          className="form-control"
                          id="address2"
                          placeholder="Apartment or suite"
                        />
                      </div>

                      <div className="col-md-5 my-1">
                        <label htmlFor="country" className="form-label">
                          Country
                        </label>
                        <br />
                        <select className="form-select" id="country" required>
                          <option value="">Choose...</option>
                          <option>India</option>
                        </select>
                        <div className="invalid-feedback">
                          Please select a valid country.
                        </div>
                      </div>

                      <div className="col-md-4 my-1">
                        <label htmlFor="state" className="form-label">
                          State
                        </label>
                        <br />
                        <select className="form-select" id="state" required>
                          <option value="">Choose...</option>
                          <option>Punjab</option>
                        </select>
                        <div className="invalid-feedback">
                          Please provide a valid state.
                        </div>
                      </div>

                      <div className="col-md-3 my-1">
                        <label htmlFor="pinCode" className="form-label">
                          Pin Code
                        </label>
                        <input
                          type="text"
                          className="form-control"
                          id="pinCode"
                          placeholder=""
                          required
                        />
                        <div className="invalid-feedback">
                          pin code required.
                        </div>
                      </div>
                    </div>

                    <hr className="my-4" />

                    <h4 className="mb-3">Payment</h4>

                    <div className="row gy-3">
                      <div className="col-md-6">
                        <label htmlFor="cardName" className="form-label">
                          Name on card
                        </label>
                        <input
                          type="text"
                          className="form-control"
                          id="cardName"
                          placeholder=""
                          required
                        />
                        <small className="text-muted">
                          Full name as displayed on card
                        </small>
                        <div className="invalid-feedback">
                          Name on card is required
                        </div>
                      </div>

                      <div className="col-md-6">
                        <label htmlFor="cardNumber" className="form-label">
                          Credit card number
                        </label>
                        <input
                          type="text"
                          className="form-control"
                          id="cardNumber"
                          placeholder=""
                          required
                        />
                        <div className="invalid-feedback">
                          Credit card number is required
                        </div>
                      </div>

                      <div className="col-md-3">
                        <label htmlFor="cardExpiration" className="form-label">
                          Expiration
                        </label>
                        <input
                          type="text"
                          className="form-control"
                          id="cardExpiration"
                          placeholder=""
                          required
                        />
                        <div className="invalid-feedback">
                          Expiration date required
                        </div>
                      </div>

                      <div className="col-md-3">
                        <label htmlFor="cardCvv" className="form-label">
                          CVV
                        </label>
                        <input
                          type="text"
                          className="form-control"
                          id="cardCvv"
                          placeholder=""
                          required
                        />
                        <div className="invalid-feedback">
                          Security code required
                        </div>
                      </div>
                    </div>

                    <hr className="my-4" />

                    <button
                      className="w-100 btn btn-primary "
                      type="submit"
                    >
                      Continue to checkout
                    </button>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>
      </>
    );
  };
  return (
    <>
      <Navbar />
      <div className="container my-3 py-3">
        <h1 className="text-center">Checkout</h1>
        <hr />
        {state.length ? <ShowCheckout /> : <EmptyCart />}
      </div>
      <Footer />
    </>
  );
};

export default Checkout;

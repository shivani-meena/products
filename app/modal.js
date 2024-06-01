import React, { useState, useEffect } from 'react';
import Select from 'react-select';
import { products, customers } from './data';
import './modal.css';

function Modal({ handleFormSubmit, entry, editMode }) {
    const [selectedCustomer, setSelectedCustomer] = useState(null);
    const [selectedProduct, setSelectedProduct] = useState(null);
    const [quantity, setQuantity] = useState('');
    const [price, setPrice] = useState('');
    const [isPaid, setIsPaid] = useState(false);

    useEffect(() => {
        if (editMode && entry) {
            setSelectedCustomer({
                value: entry.customer.customer_profile.id,
                label: entry.customer.customer_profile.name
            });
            setSelectedProduct({
                value: entry.products.name,
                label: entry.products.name
            });
            setQuantity(entry.quantity);
            setPrice(entry.price);
            setIsPaid(entry.isPaid);
        } else {
            setSelectedCustomer(null);
            setSelectedProduct(null);
            setQuantity('');
            setPrice('');
            setIsPaid(false);
        }
    }, [editMode, entry]);

    const handleSubmit = (e) => {
        e.preventDefault();

        if (!selectedCustomer) {
            alert('Customer not found');
            return;
        }

        const customer = customers.find(c => c.customer_profile.id === selectedCustomer.value);
        const productDetails = products.find(p => p.name === selectedProduct.value);

        if (!productDetails) {
            alert('Product not found');
            return;
        }

        const newEntry = {
            products: productDetails,
            customer: customer,
            quantity: quantity,
            price: price,
            isPaid: isPaid
        };

        handleFormSubmit(newEntry);
    };

    const customerOptions = customers.map(customer => ({
        value: customer.customer_profile.id,
        label: customer.customer_profile.name
    }));

    const productOptions = products.map(product => ({
        value: product.name,
        label: product.name
    }));

    return (
        <div className="modal" tabIndex="-1" role="dialog" style={{ display: 'block' }}>
            <div className="modal-dialog" role="document">
                <div className="modal-content">
                    <div className="modal-header">
                        <h5 className="modal-title">{editMode ? 'Edit Entry' : 'Add Entry'}</h5>
                    </div>
                    <div className="modal-body">
                        <form onSubmit={handleSubmit}>
                            <div className="form-group">
                                <label htmlFor="customerSelect">Customer Name</label>
                                <Select
                                    id="customerSelect"
                                    options={customerOptions}
                                    value={selectedCustomer}
                                    onChange={setSelectedCustomer}
                                    placeholder="Select customer..."
                                />
                            </div>
                            <div className="form-group">
                                <label htmlFor="productSelect">Product Name</label>
                                <Select
                                    id="productSelect"
                                    options={productOptions}
                                    value={selectedProduct}
                                    onChange={setSelectedProduct}
                                    placeholder="Select product..."
                                />
                            </div>
                            <div className="form-group">
                                <label htmlFor="quantity">Quantity</label>
                                <input
                                    type="number"
                                    className="form-control"
                                    id="quantity"
                                    value={quantity}
                                    onChange={(e) => setQuantity(e.target.value)}
                                />
                            </div>
                            <div className="form-group">
                                <label htmlFor="price">Price</label>
                                <input
                                    type="number"
                                    className="form-control"
                                    id="price"
                                    value={price}
                                    onChange={(e) => setPrice(e.target.value)}
                                />
                            </div>
                            <div className="form-group form-check">
                                <input
                                    type="checkbox"
                                    className="form-check-input"
                                    id="isPaid"
                                    checked={isPaid}
                                    onChange={(e) => setIsPaid(e.target.checked)}
                                />
                                <label className="form-check-label" htmlFor="isPaid">Is Paid</label>
                            </div>
                            <button type="submit" className="btn btn-primary">Submit</button>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Modal;

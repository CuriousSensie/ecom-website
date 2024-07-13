import React, { useState, useContext } from 'react';
import "./CheckOut.scss";
import { AppContext } from '../../App';
import emailjs from 'emailjs-com';


// Custom Alert Component for Missing Fields
const MissingFieldsAlert = () => (
    <div className="custom-alert missing-fields">
        <span>⚠️ Please fill out all fields and select a payment method.</span>
    </div>
);

// Custom Alert Component for Successful Submission
const SuccessfulSubmissionAlert = () => (
    <div className="custom-alert success">
        <span>✅ Your Order Has been Placed. You will be notified of further progress.</span>
    </div>
);

// Custom Alert Component for Payment Method Alert
const PaymentMethodAlert = () => (
    <div className="custom-alert missing-fields">
        <span>⚠️ Debit/Credit is not available yet! Please Select COD.</span>
    </div>
);

// Create entry in Strapi backend
async function createEntry(data) {
    const url = 'http://localhost:1337/api/orders';

    try {
        const response = await fetch(url, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${process.env.REACT_APP_STRIPE_APP_KEY}`,
            },
            body: JSON.stringify({ data }),
        });

        console.log('Data being sent:', JSON.stringify({ data }));

        if (!response.ok) {
            const errorData = await response.json();
            throw new Error(`Error: ${response.status} ${response.statusText} - ${JSON.stringify(errorData)}`);
        }

        const result = await response.json();
        console.log('Entry created successfully:', result);
    } catch (error) {
        console.error('Error creating entry:', error);
    }
}

const CheckOut = () => {
    const [selectedPaymentMethod, setSelectedPaymentMethod] = useState('');
    const [fullName, setFullName] = useState('');
    const [contactNumber, setContactNumber] = useState('');
    const [province, setProvince] = useState('');
    const [city, setCity] = useState('');
    const [address, setAddress] = useState('');
    const [showMissingFieldsAlert, setShowMissingFieldsAlert] = useState(false);
    const [showSuccessfulSubmissionAlert, setShowSuccessfulSubmissionAlert] = useState(false);
    const [showPaymentMethodAlert, setShowPaymentMethodAlert] = useState(false);

    const { cartItems, cartSubTotal, clearCart } = useContext(AppContext);
    const deliveryCharges = 159.00; // Example delivery charges

    const handlePaymentMethodChange = (event) => {
        setSelectedPaymentMethod(event.target.id);
        if (event.target.id === 'dot-2') {
            setShowPaymentMethodAlert(true);
        } else {
            setShowPaymentMethodAlert(false);
        }
    };

    const handleCheckOut = async (event) => {
        window.scrollTo(0,0)
        event.preventDefault();
        setShowMissingFieldsAlert(false);
        setShowSuccessfulSubmissionAlert(false);

        if (!fullName || !contactNumber || !province || !city || !address || selectedPaymentMethod !== 'dot-1') {
            setShowMissingFieldsAlert(true);
        } else {
            const orderItems = cartItems.map(item => ({
                id: item?.id,
                name: item?.attributes?.title,
                quantity: item?.attributes?.quantity,
                price: item?.attributes?.price
            }));
    
            const data = {
                name: fullName,
                address: `Province: ${province}\nCity: ${city}\nAddress: ${address}`,
                contact: contactNumber,
                invoice: (String) (cartSubTotal + deliveryCharges),
                orderdesc: orderItems,
            };

            try {
                await createEntry(data);
                setShowSuccessfulSubmissionAlert(true);
                // Reset form fields after successful submission

                // send an email 
                emailjs.send('service_6k0psye', 'template_e0izvwi', data, 'VRccmYuR916_YerE-')
                    .then((response) => {
                        console.log('SUCCESS!', response.status, response.text);
                    }, (error) => {
                        console.log('FAILED...', error);
                    });
                // clear the cart
                clearCart();
                
                setFullName('');
                setContactNumber('');
                setProvince('');
                setCity('');
                setAddress('');
                setSelectedPaymentMethod('');
            } catch (error) {
                console.error('Error during checkout:', error);
            }
        }
    };

    const totalAmount = cartSubTotal + deliveryCharges;

    return (
        <div className="checkout">
        <div className="alerts">
        {showMissingFieldsAlert && <MissingFieldsAlert />}
            {showSuccessfulSubmissionAlert && <SuccessfulSubmissionAlert />}
            {showPaymentMethodAlert && <PaymentMethodAlert />}
        </div>
            <div className="top">
                <div className="top-title">CheckOut</div>
            </div>
            <div className="content">
                <form>
                    <div className="input-box">
                        <span className="details">Full Name</span>
                        <input 
                            required
                            type="text" 
                            placeholder="Enter your Full Name" 
                            value={fullName}
                            onChange={(e) => setFullName(e.target.value)}
                        />
                    </div>
                    <div className="input-box">
                        <span className="details">Contact Number</span>
                        <input 
                            required
                            type="number" 
                            maxLength="11"
                            placeholder="03001234567"
                            value={contactNumber}
                            onChange={(e) => setContactNumber(e.target.value)}
                        />
                    </div>
                    <div className="input-box">
                        <span className="details">Province</span>
                        <select 
                            value={province} 
                            required
                            onChange={(e) => setProvince(e.target.value)}
                        >
                            <option value="" disabled>Select your province</option>
                            <option value="Province1">Punjab</option>
                            <option value="Province2">Sindh </option>
                            <option value="Province3">GB </option>
                            <option value="Province4">KPK</option>
                        </select>
                    </div>
                    <div className="input-box">
                        <span className="details">City</span>
                        <input 
                            type="text" 
                            placeholder="City" 
                            required
                            value={city}
                            onChange={(e) => setCity(e.target.value)}
                        />
                    </div>
                    <div className="input-box">
                        <span className="details">Address</span>
                        <input 
                            required
                            type="text" 
                            placeholder="Enter your shipping address" 
                            value={address}
                            onChange={(e) => setAddress(e.target.value)}
                        />
                    </div>

                    <div className="payment-method">
                        <span className="payment-method-title">Mode of Payment</span>
                        <div className="category">
                            <label htmlFor="dot-1">
                                <input
                                    type="radio"
                                    name="method"
                                    id="dot-1"
                                    onChange={handlePaymentMethodChange}
                                />
                                <span className="dot"></span>
                                <span className="method">COD</span>
                            </label>
                            <label htmlFor="dot-2">
                                <input
                                    type="radio"
                                    name="method"
                                    id="dot-2"
                                    onChange={handlePaymentMethodChange}
                                />
                                <span className="dot"></span>
                                <span className="method">Debit/Credit Card</span>
                            </label>
                        </div>
                    </div>
                </form>
            </div>
            <div className="bottom">
                <div className="invoice">
                    <div className="amount">
                        <span>Amount:</span>
                        <span>{"Rs "}{cartSubTotal.toFixed(2)}</span>
                    </div>
                    <div className="delivery-charges">
                        <span>Delivery Charges:</span>
                        <span>{"Rs "}{deliveryCharges.toFixed(2)}</span>
                    </div>
                    <div className="total-amount">
                        <span>Total Amount:</span>
                        <span>{"Rs "}{totalAmount.toFixed(2)}</span>
                    </div>
                </div>
                <div className="button">
                    <input type="submit" value="CheckOut" onClick={handleCheckOut}/>
                </div>
            </div>
        </div>
    );
}

export default CheckOut;

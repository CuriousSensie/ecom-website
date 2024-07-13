import React, { useState } from 'react';
import emailjs from 'emailjs-com';
import "./Contact.scss";

const Contact = () => {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        number: '',
        message: '',
    });

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        emailjs.send('service_6k0psye', 'template_qiqe397', formData, 'VRccmYuR916_YerE-')
            .then((response) => {
                console.log('SUCCESS!', response.status, response.text);
                alert('Your message has been sent!');
                setFormData({ name: '', email: '', contact: '', message: '' });
            }, (error) => {
                console.log('FAILED...', error);
                alert('Failed to send the message, please try again.');
            });
    };

    return (
        <div className="contact-container">
            <form className="contact-form" onSubmit={handleSubmit}>
                <label>
                    Name:
                    <input 
                        type="text" 
                        name="name" 
                        value={formData.name} 
                        onChange={handleChange} 
                        required 
                    />
                </label>
                <label>
                    Email:
                    <input 
                        type="email" 
                        name="email" 
                        value={formData.email} 
                        onChange={handleChange} 
                        required 
                    />
                </label>
                <label>
                    Contact:
                    <input 
                        type="number" 
                        name="number" 
                        value={formData.number} 
                        onChange={handleChange} 
                        required
                    />
                </label>
                <label>
                    Message:
                    <textarea 
                        name="message" 
                        value={formData.message} 
                        onChange={handleChange} 
                        required 
                    />
                </label>
                <button type="submit">Send</button>
            </form>
        </div>
    );
};

export default Contact;

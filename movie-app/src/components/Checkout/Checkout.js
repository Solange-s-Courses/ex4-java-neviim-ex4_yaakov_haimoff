import React, { useState } from 'react';
import { useLocation } from 'react-router-dom';

const Checkout = () => {
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [email, setEmail] = useState('');
    const [errorMessage, setErrorMessage] = useState('');

    const location = useLocation();
    const queryParams = new URLSearchParams(location.search);
    const movies = queryParams.getAll('movies');
    const total = queryParams.get('total');
    const totalPrice = Number(total);

    const handleFirstNameChange = (event) => {
        setFirstName(event.target.value);
    };

    const handleLastNameChange = (event) => {
        setLastName(event.target.value);
    };

    const handleEmailChange = (event) => {
        setEmail(event.target.value);
    };

    const handleSubmit = (event) => {
        event.preventDefault();

        if (!firstName || !lastName || !email) {
            setErrorMessage('Please fill in all fields.');
            return;
        }

        const purchaseData = {
            firstName,
            lastName,
            email,
            totalPrice,
        };

        fetch('/api/purchase', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(purchaseData),
        })
            .then((response) => {
                if (!response.ok) {
                    throw new Error(`Error: ${response.status} ${response.statusText}`);
                }
                // Handle successful response here
                console.log('Purchase data submitted successfully');
                // Reset form fields and error message
                setFirstName('');
                setLastName('');
                setEmail('');
                setErrorMessage('');
            })
            .catch((error) => {
                // Handle error here
                console.error('Error submitting purchase data:', error);
            });
    };

    return (
        <form className="needs-validation" noValidate onSubmit={handleSubmit}>
            <br/>
            <div className="form-row">
                <div className="col-md-4 mb-3">
                    <input
                        type="text"
                        className="form-control"
                        id="validationTooltip01"
                        placeholder="First name"
                        required
                        value={firstName}
                        onChange={handleFirstNameChange}
                    />
                    <div className="valid-tooltip">Looks good!</div>
                </div>
                <div className="col-md-4 mb-3">
                    <input
                        type="text"
                        className="form-control"
                        id="validationTooltip02"
                        placeholder="Last name"
                        required
                        value={lastName}
                        onChange={handleLastNameChange}
                    />
                    <div className="valid-tooltip">Looks good!</div>
                </div>
                <div className="col-md-4 mb-3">
                    <div className="input-group">
                        <div className="input-group-prepend">
                            <span className="input-group-text" id="validationTooltipUsernamePrepend">
                                @
                            </span>
                        </div>
                        <input
                            type="text"
                            className="form-control"
                            id="validationTooltipUsername"
                            placeholder="Username"
                            aria-describedby="validationTooltipUsernamePrepend"
                            required
                            value={email}
                            onChange={handleEmailChange}
                        />
                        <div className="invalid-tooltip">Please choose a unique and valid username.</div>
                    </div>
                </div>
            </div>
            <button className="btn btn-primary" type="submit">
                Submit form
            </button>
        </form>
    );
};

export default Checkout;
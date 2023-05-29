import React, {useContext, useState} from 'react';
import {useLocation} from 'react-router-dom';
import {CartContext} from '../Context/CartContext';


/**
 * A component that renders a form to checkout
 * @returns {JSX.Element}
 */
const Checkout = () => {
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [email, setEmail] = useState('');
    const [errorMessage, setErrorMessage] = useState('');

    const {cartSize} = useContext(CartContext);

    const queryParams = new URLSearchParams(useLocation().search);
    const total = queryParams.get('total');
    const totalPrice = Number(total);

    /**
     * A function that handles the change of the first name field
     * @param event - the event that triggered the change
     * @returns {void}
     */
    const handleFirstNameChange = (event) => {
        setFirstName(event.target.value);
    };

    /**
     * A function that handles the change of the last name field
     * @param event - the event that triggered the change
     * @returns {void}
     */
    const handleLastNameChange = (event) => {
        setLastName(event.target.value);
    };

    /**
     * A function that handles the change of the email field
     * @param event - the event that triggered the change
     * @returns {void}
     */
    const handleEmailChange = (event) => {
        setEmail(event.target.value);
    };

    /**
     * A function that handles the submission of the form
     * It sends a POST request to the server with the purchase data
     * and handles the response
     * @param event - the event that triggered the change
     * @returns {void}
     */
    const handleSubmit = (event) => {
        event.preventDefault();
        return
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
        <div>
            {cartSize === 0 ? (
                <div className="alert alert-warning" role="alert">
                    You must fill the cart before checking out. Please go to search and add a movie.
                </div>
            ) : (
                <form className="needs-validation" noValidate onSubmit={handleSubmit}>
                    <br/>
                    <div className="form-row">
                        Total Price: {totalPrice}$
                        <br/>
                        <br/>
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
                <span className="input-group-text" id="validationTooltipUsernamePrepend">@</span>
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
            )}
        </div>
    );
};

export default Checkout;
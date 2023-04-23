import { useState, useEffect } from 'react';
import { useEth } from '../../contexts/EthContext';


function AddUser() {
    const { state: { contract, accounts } } = useEth();
    const [isAdmin, setIsAdmin] = useState(false);
    const [Fetching, setFetching] = useState(false);
    const [inputValue, setInputValue] = useState("");
    const [inputValue2, setInputValue2] = useState("");

    const handleInputChange = e => {
        if (/^\d+$|^$/.test(e.target.value)) {
            setInputValue(e.target.value);
        }
    };

    const handleInputChange2 = e => {
        setInputValue2(e.target.value);
    };

    const handleSubmit = async e => {
        if (inputValue === "") {
            alert("Please enter a value to write.");
            return;
        }
        const v = await contract.methods.verifyUser(inputValue, inputValue2).send({ from: accounts[0] });
        if (v) {
            setInputValue("");
            setInputValue2("");
        }
        console.log(v);
        alert("User Added Successfully");
    };

    const checkAdmin = async () => {
        const value = await contract.methods.isAdmin().call({ from: accounts[0] });
        setFetching(true);
        if (value) setIsAdmin(true);
    }

    useEffect(() => {
        checkAdmin();
        console.log(isAdmin);
    }, []);

    return (
        <div>
            <hr />
            <div className="Auth-form-container">
                <div className="Auth-form">

                    <div className="Auth-form-content">
                        <h3 className="Auth-form-title">ADMIN PORTAL</h3>
                    </div>
                    {isAdmin ? (<>
                        <input
                            type="text"
                            placeholder="Enter Aadhar Number"
                            style={{ width: "60%", fontSize: "25px", padding: "5px", margin: "8px 0px" }}
                            value={inputValue}
                            onChange={handleInputChange} />

                        <input
                            type="text"
                            placeholder="Enter Password"
                            style={{ width: "60%", fontSize: "25px", padding: "5px", margin: "8px 0px" }}
                            value={inputValue2}
                            onChange={handleInputChange2} />

                        <button class="menu-button" onClick={handleSubmit}>ADD USER</button>
                    </>) : (<p style={{ fontSize: "30px" }}>⚠️ Only Admin can Access</p>)}

                </div>

            </div>
            <hr />
        </div>
    );
}

export default AddUser;
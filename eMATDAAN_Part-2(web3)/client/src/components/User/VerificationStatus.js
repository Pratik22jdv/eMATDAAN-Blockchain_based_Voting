import { useState } from 'react';
import { useNavigate } from 'react-router-dom';


function VerificationStatus() {
    const navigate = useNavigate();
    const [inputValue, setInputValue] = useState("");

    const handleInputChange = e => {
        if (/^\d+$|^$/.test(e.target.value)) {
            setInputValue(e.target.value);
        }
    };

    const handleSubmit = async e => {
        if (inputValue === "") {
            alert("Please enter a value to write.");
            return;
        }
        const value = await contract.methods.isVerified(inputValue).call({ from: accounts[0] });
        setInputValue("");
        console.log(value);
        if(value)alert("USER is Verified");
        else alert("USER is Not Verified");
    };


    return (
        <div>
            <hr />
            <div className="Auth-form-container">
                <div className="Auth-form">

                    <div className="Auth-form-content">
                        <h3 className="Auth-form-title">eMATDAAN DAPP</h3>
                    </div>
                    <>
                        <input
                            type="text"
                            placeholder="Enter Aadhar Number"
                            style={{ width: "60%", fontSize: "25px", padding: "5px", margin: "8px 0px" }}
                            value={inputValue}
                            onChange={handleInputChange} />

                        <button class="menu-button" onClick={handleSubmit}>CHECK STATUS</button>
                        <button class="menu-button" onClick={()=>{navigate(-1)}}>BACK</button>
                    </>

                </div>

            </div>
            <hr />
        </div>
    );
}

export default VerificationStatus;
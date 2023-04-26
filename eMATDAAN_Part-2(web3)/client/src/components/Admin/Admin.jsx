import { useState, useEffect } from 'react';
import { useEth } from '../../contexts/EthContext';
import { useNavigate } from 'react-router-dom';

function Admin() {
    const navigate = useNavigate();
    const { state: { contract, accounts } } = useEth();
    const [isAdmin, setIsAdmin] = useState(false);
    const [Fetching, setFetching] = useState(false);

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
                        <h3 className="Auth-form-title">eMATDAAN DAPP</h3>
                    </div>
                    {isAdmin ? (<>
                        <button class="menu-button" onClick={() => { navigate("/admin/addUser") }}>ADD USER</button>
                        <button class="menu-button" onClick={() => { navigate("/admin/startEndElection") }}>START/END ELECTION</button>
                        <button class="menu-button" onClick={() => { navigate("/admin/result") }}>Declare Result</button>
                        <button class="menu-button" onClick={() => { navigate("/user/vote") }}>VOTE</button>
                        <button class="menu-button" onClick={() => { navigate(-1) }}>BACK</button></>) :
                        (<div>
                            <p style={{ fontSize: "30px" }}>⚠️ Only Admin can Access</p>
                            <button class="menu-button" onClick={() => { navigate(-1) }}>BACK</button>
                        </div>)
                    }

                </div>

            </div>
            <hr />
        </div>
    );
}

export default Admin;
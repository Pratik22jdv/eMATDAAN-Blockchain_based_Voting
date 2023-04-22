import {useState, useEffect} from 'react';
import { useEth } from '../../contexts/EthContext';

function Admin() {
    const { state: { contract, accounts } } = useEth();
    const [isAdmin, setIsAdmin] = useState(false);
    const [Fetching, setFetching] = useState(false);

    const checkAdmin = async() =>{
        const value = await contract.methods.isAdmin().call({ from: accounts[0] });
        setFetching(true);
        // console.log("v",value);
        if(value) setIsAdmin(true);
    }

    useEffect(() => {
        checkAdmin();
        console.log(isAdmin);
      }, [Fetching]);

    return (
        <div>
            <hr />
            <div className="Auth-form-container">
                <div className="Auth-form">

                    <div className="Auth-form-content">
                        <h3 className="Auth-form-title">eMATDAAN DAPP</h3>
                    </div>
                    {isAdmin?(<>
                    <button class="menu-button">ADD USER</button>
                    <button class="menu-button">START/END ELECTION</button>
                    <button class="menu-button">VOTE</button></>):(<p style={{fontSize: "30px"}}>⚠️ Only Admin can Access</p>)}

                </div>

            </div>
            <hr />
        </div>
    );
}

export default Admin;
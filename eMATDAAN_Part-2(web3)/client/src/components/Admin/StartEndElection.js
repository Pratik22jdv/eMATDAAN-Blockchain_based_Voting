import { useState, useEffect } from 'react';
import { useEth } from '../../contexts/EthContext';


function StartEndElection() {
    const { state: { contract, accounts } } = useEth();
    const [isAdmin, setIsAdmin] = useState(false);
    const [electionActivated, setElectionActivated] = useState(false);
    const [Fetching, setFetching] = useState(false);
    const [Fetching2, setFetching2] = useState(false);


    const handleSubmit = async e => {
        const v = await contract.methods.startEndElection().send({ from: accounts[0] });
        if(v) setElectionActivated((!electionActivated));
        console.log(v);
        alert("Action performed Successfully");
    };

    const checkAdmin = async () => {
        const value = await contract.methods.isAdmin().call({ from: accounts[0] });
        setFetching(true);
        if (value) setIsAdmin(true);
    }

    const checElectionStatus = async () => {
        const value = await contract.methods.activatedElection().call({ from: accounts[0] });
        setFetching2(true);
        if (value) setElectionActivated(true);
    }

    useEffect(() => {
        checkAdmin();
        checElectionStatus();
        console.log(electionActivated);
    }, []);

    return (
        <div>
            <hr />
            <div className="Auth-form-container">
                <div className="Auth-form">

                    <div className="Auth-form-content">
                        <h3 className="Auth-form-title">ADMIN PORTAL</h3>
                    </div>
                    {isAdmin ? (<div style={{ fontSize: "30px" }}>
                        
                        Election Status: <>{electionActivated?<>Activated</>:<>Terminated</>}</>

                        <button class="menu-button" onClick={handleSubmit}>{electionActivated?<>Terminate</>:<>Activate</>}</button>
                    </div>) : (<p style={{ fontSize: "30px" }}>⚠️ Only Admin can Access</p>)}

                </div>

            </div>
            <hr />
        </div>
    );
}

export default StartEndElection;
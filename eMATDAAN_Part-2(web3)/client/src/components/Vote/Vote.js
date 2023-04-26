import { from } from 'form-data';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useEth } from '../../contexts/EthContext';
import CircularProgress from "@mui/material/CircularProgress";
import { TableHeader, CustomizedTables } from './Table';

function Vote() {
    const navigate = useNavigate();
    const { state: { contract, accounts } } = useEth();
    const [inputValue, setInputValue] = useState("");
    const [inputValue2, setInputValue2] = useState("");
    const [verified, setVerified] = useState(false);
    const [Auth, setAuth] = useState(false);
    const [isFetching, setIsFetching] = useState(false);
    const [candidateFetched, setCandidateFetched] = useState(false);
    const [allCandidates, setAllCandidates] = useState([]);
    const [hasVoted, setHasVoted] = useState(false);
    const [candidateId, setCandidateId] = useState(0);

    const handleInputChange = e => {
        if (/^\d+$|^$/.test(e.target.value)) {
            setInputValue(e.target.value);
        }
    };

    const handleInputChange2 = e => {
        setInputValue2(e.target.value);
    };

    // const isVerified = async()=>{
    //     const value = await contract.methods.isVerified(inputValue).call({ from: accounts[0] });
    //     if(value) return true; 
    // }

    // const authUser = async() =>{
    //     const value = await contract.methods.authUser(inputValue, inputValue2).call({ from: accounts[0] });
    //     if(value) return true;
    // }

    const handleSubmit = async () => {
        const value = await contract.methods.isVerified(inputValue).call({ from: accounts[0] });
        if (!value) {
            alert("Not verified!! Please check aadhar number")
            return;
        }
        else setVerified(true);

        const value2 = await contract.methods.authUser(inputValue, inputValue2).call({ from: accounts[0] });
        if (!value2) {
            alert("Authentication failed!! Please check Credentials");
            return;
        }
        else setAuth(true);

        //Vote component (candidate list)
        setIsFetching(true);
        const res = await contract.methods.candidatesCount().call({ from: accounts[0] });
        const candidateCount = Number(res);
        const getCandidates = [];
        for (var i = 1; i <= candidateCount; i++) {
            const candidate = await contract.methods.candidates(i).call({ from: accounts[0] });
            const vote = Number(candidate.voteCount);
            getCandidates.push({
                id: candidate.id,
                name: candidate.name,
                party: candidate.party,
                votes: vote,
            });
        }

        setAllCandidates(getCandidates);
        setIsFetching(false);
        setCandidateFetched(true);

        //Check if user Voted
        const ifVoted = await contract.methods.hasVoted(inputValue).call({ from: accounts[0] });
        if(ifVoted) setHasVoted(true);
    }

    const submitVote = async () => {
        setIsFetching(true);
        const v = await contract.methods.vote(inputValue, inputValue2, Number(candidateId)).send({ from: accounts[0] });
        setHasVoted(true);
        setIsFetching(false);
    }

    return (
        <div>
            {!Auth ?
                (<>
                    <hr />
                    <div className="Auth-form-container">
                        <div className="Auth-form">

                            <div className="Auth-form-content">
                                <h3 className="Auth-form-title">eMATDAAN DAPP</h3>
                            </div>

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

                            <button class="menu-button" onClick={handleSubmit}>Next</button>
                        </div>
                    </div>
                    <hr /></>)

                :

                <>{isFetching ?
                    (<><div style={{ width: "80px", margin: "auto", marginTop:"20%", backgroundColor: "white", padding: "20px", borderRadius:"20px" }}>
                         <CircularProgress />
                    </div></>)

                    : (<div style={{ marginTop: "80px" }}>
                        <div className="table-container" style={{ backgroundColor: "white", padding: "10px" }}>
                            {candidateFetched ? (
                                <>
                                    <TableHeader />
                                </>
                            ) : (
                                <></>
                            )}
                            {candidateFetched ? (
                                <>
                                    {" "}
                                    {allCandidates.map((candidateObj) => {
                                        return (
                                            <CustomizedTables
                                                idd={candidateObj.id}
                                                name={candidateObj.name}
                                                party={candidateObj.party}
                                                votes={candidateObj.votes}
                                            />
                                        );
                                    })}
                                </>
                            ) : (
                                <></>
                            )}

                            {!hasVoted ? (
                                <div>
                                    <input
                                        type="number"
                                        style={{ width: "10%", fontSize: "20px", padding: "5px", margin: "8px 0px" }}
                                        onChange={(e) => {
                                            setCandidateId(e.target.value);
                                        }}
                                    ></input>{" "}
                                    <button
                                        class="menu-button"
                                        style={{ width: "10%",padding:"10px"}}
                                        onClick={() => {
                                            submitVote();
                                        }}
                                    >
                                        Vote
                                    </button>
                                </div>
                            ) : (
                                <div style={{width:"40%", fontSize:"25px", margin:"auto", marginTop:"20px"}} className="alert alert-danger" role="alert">
                                    You have already voted
                                </div>
                            )}
                        </div>
                        )

                    </div>)
                }</>
            }
        </div >
    );
}

export default Vote;
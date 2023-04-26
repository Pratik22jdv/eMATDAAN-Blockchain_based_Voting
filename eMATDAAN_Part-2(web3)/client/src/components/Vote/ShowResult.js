import { useState, useEffect } from 'react';
// import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useEth } from '../../contexts/EthContext';
import CircularProgress from "@mui/material/CircularProgress";
import { TableHeader, CustomizedTables } from './TableResult';

function ShowResult() {
    const navigate = useNavigate();
    const { state: { contract, accounts } } = useEth();
   
    const [isFetching, setIsFetching] = useState(false);
    const [candidateFetched, setCandidateFetched] = useState(false);
    const [allCandidates, setAllCandidates] = useState([]);
    
    const [candidateId, setCandidateId] = useState(0);

    

    // const isVerified = async()=>{
    //     const value = await contract.methods.isVerified(inputValue).call({ from: accounts[0] });
    //     if(value) return true; 
    // }

    // const authUser = async() =>{
    //     const value = await contract.methods.authUser(inputValue, inputValue2).call({ from: accounts[0] });
    //     if(value) return true;
    // }

    const handleSubmit = async () => {
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

    useEffect(() => {
        handleSubmit();
        
    }, []);

    return (
        <div>
            

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

                           
                        </div>
                        )

                    </div>)
                }</>
            
        </div >
    );
}

export default ShowResult;
// SPDX-License-Identifier: MIT

pragma solidity >=0.4.21 <8.10.0;

contract Election {
    // Model a Candidate
    struct Candidate {
        uint256 id;
        string name;
        string party;
        uint256 voteCount;
    }

    // Store accounts that have voted
    mapping(address => bool) public voters;
    // Store Candidates
    // Fetch Candidate
    mapping(uint256 => Candidate) public candidates;
    // Store Candidates Count
    uint256 public candidatesCount;
    //end time of election
    uint256 public end;
    //store aadhar of accounts that have voted
    mapping(string => bool) private voted;
    mapping(string => bool) private verified;
    // voted event
    // event votedEvent(uint256 indexed _candidateId);
    //addres of the user who has deployed the contract
    address public owner;

    modifier restricted() {
        if (msg.sender == owner) 
        _;
    }

    function endTimeFunc(uint endTime) public restricted{
        end = endTime;
    }

    function verifyUser(string memory _aadhar) public restricted{
        verified[_aadhar]=true;
    }

    constructor() {
         owner = msg.sender;
        addCandidate("J.P Nada", "Bharatiya Janata Party");
        addCandidate("Rahul Gandhi", "Indian National Congress");
        addCandidate("Saman Pathak", "Communist Party Of India (Marxist)");
        addCandidate("Arvind Kejriwal", "Aam Aadmi Party");
        addCandidate("Uddhav Thackeray", "Shiv Sena");
        addCandidate("Akhilesh Yadav", "Samajwadi Party");
        addCandidate("Nitish Kumar", "Janta Dal United");
        addCandidate("NOTA", "None of the above");
        // end=1650057285000;

    }

    function addCandidate(string memory name, string memory party) private {
        candidatesCount++;
        candidates[candidatesCount] = Candidate(
            candidatesCount,
            name,
            party,
            0
        );
    }

    function vote(uint256 _candidateId) public {
        // require that they haven't voted before
        require(!voters[msg.sender]);
        // require(!voted[aadhar]);
        // require(currentTime <= end);

        // require a valid candidate
        require(_candidateId > 0 && _candidateId <= candidatesCount);

        // record that voter has voted
        voters[msg.sender] = true;
        // voted[aadhar] = true;

        // update candidate vote Count
        candidates[_candidateId].voteCount++;

        // trigger voted event
        // emit votedEvent(_candidateId);
    }

    function hasVoted(string memory _aadhar) public view returns (bool) {
        return voted[_aadhar];
    }

    function isVerified(string memory _aadhar) public view returns (bool){
        return verified[_aadhar];
    }

    function isAdmin() public view returns (bool) {
        return msg.sender == owner;
    }

    function hasElectionEnded(uint currentTime) public view returns (bool) {
        return end < currentTime;
    }
}
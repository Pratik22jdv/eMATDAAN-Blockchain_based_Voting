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


    //Store verified aadhar by admin
    mapping(string => bool) private verifiedAadhar;

    //Auth user
    mapping(string => string) private aadharPassword;

    // Store accounts that have voted
    mapping(address => bool) public votersAcc;
    mapping(string => bool) private votersAadhar;


    // Store Candidates
    // Fetch Candidate
    mapping(uint256 => Candidate) public candidates;
    // Store Candidates Count
    uint256 public candidatesCount;

    //Election process activated or not
    bool public activeElection;

    // event votedEvent(uint256 indexed _candidateId);
    //addres of the user who has deployed the contract
    address public owner;

    modifier restricted() {
        if (msg.sender == owner) 
        _;
    }

    function startEndElection() public restricted{
        if(activeElection==true) activeElection=false;
        else activeElection = true;
    }

    function verifyUser(string memory _aadhar, string memory _pass) public restricted{
        verifiedAadhar[_aadhar]=true;
        aadharPassword[_aadhar] = _pass;
    }

    function authUser(string memory _aadhar, string memory _pass) public view returns (bool)
    {
        require(verifiedAadhar[_aadhar]);
        return ( keccak256(abi.encodePacked(aadharPassword[_aadhar])) == keccak256(abi.encodePacked(_pass)) );
    }

    constructor() {
         owner = msg.sender;
         activeElection =false;
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

    function vote(string memory _aadhar, string memory _pass, uint256 _candidateId) public {
        // require that they haven't voted before
        // require(!voters[msg.sender]);
        require(activeElection);
        require(verifiedAadhar[_aadhar]);
        require( keccak256(abi.encodePacked(aadharPassword[_aadhar])) == keccak256(abi.encodePacked(_pass)) );
        require(!votersAadhar[_aadhar]);

        // require a valid candidate
        require(_candidateId > 0 && _candidateId <= candidatesCount);

        // update candidate vote Count
        candidates[_candidateId].voteCount++;

        // record that voter has voted
        votersAcc[msg.sender] = true;
        votersAadhar[_aadhar] = true;

        // trigger voted event
        // emit votedEvent(_candidateId);
    }

    function hasVoted(string memory _aadhar) public view returns (bool) {
        return votersAadhar[_aadhar];
    }

    function isVerified(string memory _aadhar) public view returns (bool){
        return verifiedAadhar[_aadhar];
    }

    function isAdmin() public view returns (bool) {
        return msg.sender == owner;
    }

    function activatedElection() public view returns (bool) {
        return activeElection;
    }
}
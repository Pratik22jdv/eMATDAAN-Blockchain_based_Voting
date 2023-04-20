import { useState } from "react";
import useEth from "../../contexts/EthContext/useEth";

function ContractBtns({ setValue }) {
  const { state: { contract, accounts } } = useEth();
  const [inputValue, setInputValue] = useState("");
  const [inputValue2, setInputValue2] = useState("");
  const [isAdmin, setIsAdmin] = useState(false);
  const [isAdminCheck, setIsadminCheck] = useState(false);
  const [verifyMsg, setVerifyMsg] = useState("");

  const handleInputChange = e => {
    if (/^\d+$|^$/.test(e.target.value)) {
      setInputValue(e.target.value);
    }
  };

  const handleInputChange2 = e => {
    if (/^\d+$|^$/.test(e.target.value)) {
      setInputValue2(e.target.value);
    }
  };

  const read = async () => {
    const value = await contract.methods.isAdmin().call({ from: accounts[0] });
    console.log("v", value);
    if(value){
      setValue("Yes");
      setIsAdmin(true);
    }
    else setValue("No");
    // setIsAdminCheck(true);
  };

  const allowUserByAdmin = async e => {
    if (e.target.tagName === "INPUT") {
      return;
    }
    if (inputValue === "") {
      alert("Please enter a value to write.");
      return;
    }
    // const newValue = parseInt(inputValue);
    await contract.methods.verifyUser(inputValue).send({ from: accounts[0] });
  };

  const checkVerify = async e => {
    if (e.target.tagName === "INPUT") {
      return;
    }
    if (inputValue2 === "") {
      alert("Please enter a value to write.");
      return;
    }
    // const newValue = parseInt(inputValue);
    const check = await contract.methods.isVerified(inputValue2).call({ from: accounts[0] });
    if(check) console.log("Verified")
    else console.log("Not Verified!!");
  };



  return (
    <div className="btns">

      <button onClick={read}>
        isAdmin()
      </button>

      {/* <div onClick={write} className="input-btn">
        write(<input
          type="text"
          placeholder="uint"
          value={inputValue}
          onChange={handleInputChange}
        />)
      </div> */}

    

    {isAdmin && (<div onClick={allowUserByAdmin} className="input-btn">
      <input 
      className="input-btn"
      type="text" 
      placeholder="Enter Aadhar" 
      value = {inputValue}
      onChange={handleInputChange} />
    </div>)}


    {isAdmin==false && (<div onClick={checkVerify} className="input-btn">
      <input 
      className="input-btn"
      type="text" 
      placeholder="check verified" 
      value = {inputValue2}
      onChange={handleInputChange2} /></div>)}

    </div>
  );
}

export default ContractBtns;

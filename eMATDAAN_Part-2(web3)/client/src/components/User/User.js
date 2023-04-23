import { useNavigate } from 'react-router-dom';

function User() {
    const navigate = useNavigate();
    
    return (
        <div>
            <hr />
            <div className="Auth-form-container">
                <div className="Auth-form">

                    <div className="Auth-form-content">
                        <h3 className="Auth-form-title">eMATDAAN DAPP</h3>
                    </div>

                    <button class="menu-button" onClick={()=>{navigate("/user/verifyStatus")}}>VERIFICATION STATUS</button>
                    <button class="menu-button">VOTE</button>
                    <button class="menu-button" onClick={()=>{navigate(-1)}}>BACK</button>

                </div>

            </div>
            <hr />
        </div >
    );
}

export default User;
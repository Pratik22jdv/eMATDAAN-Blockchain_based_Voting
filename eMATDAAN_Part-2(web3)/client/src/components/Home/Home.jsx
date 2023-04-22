import { Link, useNavigate } from 'react-router-dom';


function Home() {
    const navigate = useNavigate();
    return (

        <div>
            <hr />
            <div className="Auth-form-container">
                <div className="Auth-form">

                    <div className="Auth-form-content">
                        <h3 className="Auth-form-title">eMATDAAN DAPP</h3>
                    </div>

                    <button class="menu-button">USER</button>
                    <button class="menu-button" onClick={() => { navigate("/admin") }}>ADMIN</button>

                </div>

            </div>
            <hr />
        </div>

    )
}

export default Home;
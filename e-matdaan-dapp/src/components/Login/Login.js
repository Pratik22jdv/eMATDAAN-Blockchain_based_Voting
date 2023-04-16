import { React, useRef, useState } from 'react';
import {
  MDBBtn,
  MDBContainer,
  MDBCard,
  MDBCardBody,
  MDBCardImage,
  MDBRow,
  MDBCol,
  MDBIcon,
  MDBInput
}
  from 'mdb-react-ui-kit';
import axios from 'axios';

function Login() {

  const emailRef = useRef();
  const passwordRef = useRef();
  const [isAuth, setIsAuth] = useState(false);
  // 
  // const email = "";

  // const fun = ()=>{
  //   console.log(email.current.value);
  //   console.log(password);
  // }


  const loginCall = () => {
    const data = {
      email: emailRef.current.value,
      password: passwordRef.current.value
    }

    axios.post("http://localhost:3000/users/login", {}, {
      headers: {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*'
      },
      params: data
    }).then(function (response) {
      console.log(response.data);
      console.log(response.data.token);
      setIsAuth(true);
      localStorage.setItem("token", response.data.token);
    }).catch(function (error) {
      console.log(error)
    })
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    loginCall();
  }

  const userAuthenticated = () => {
    const data={
      token:localStorage.getItem("token"),
      extra: "Pratik"
    }
    // console.log(token);
    axios.get("http://localhost:3000/users/isAuth", {}, {
      headers: {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*'
      },
      params: data
    }).then(function (response) {
      console.log(response.data);
      console.log(response.data.token);
      setIsAuth(true);
      localStorage.setItem("token", response.data.token);
    }).catch(function (error) {
      console.log(error)
    })
  }

  return (
    <div >
      <MDBContainer className="my-5" style={{ height: "500px" }}>

        <MDBCard>
          <MDBRow className='g-0'>

            <MDBCol md='6' lg='6' sm='6'>
              <MDBCardImage src='https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-login-form/img1.webp' alt="login form" className='rounded-start w-75' />
            </MDBCol>

            <MDBCol md='6'>
              <MDBCardBody className='d-flex flex-column'>

                <div className='d-flex flex-row mt-2'>
                  <MDBIcon fas icon="cubes fa-3x me-3" style={{ color: '#ff6219' }} />
                  <span className="h1 fw-bold mb-0">ADMIN PORTAL</span>
                </div>

                <h5 className="fw-normal my-4 pb-3" style={{ letterSpacing: '1px' }}>Sign into your account</h5>

                <input
                  placeholder="Email"
                  type="email"
                  required
                  style={{ height: "100px" }, { borderRadius: "10px" }, { borderRadius: "10px" }, { margin: "15px" }}
                  ref={emailRef}
                />
                <input
                  placeholder="Password"
                  type="password"
                  required
                  style={{ padding: "20px" }, { borderRadius: "10px" }, { borderRadius: "10px" }, { margin: "15px" }}
                  ref={passwordRef}
                />
                {/* <MDBInput wrapperClass='mb-4' label='Password' id='formControlLg' type='password' size="lg" ref={password} onChange={fun}/> */}

                <MDBBtn className="mb-12 px-5" color='dark' size='lg' onClick={handleSubmit}>Login</MDBBtn>
                {isAuth ? <><button onClick={userAuthenticated}>checkIfAuth</button></> : <div></div>}
                <a className="small text-muted" href="#!">Forgot password?</a>
                <p className="mb-5 pb-lg-2" style={{ color: '#393f81' }}>Don't have an account? <a href="#!" style={{ color: '#393f81' }}>Register here</a></p>

                <div className='d-flex flex-row justify-content-start'>
                  <a href="#!" className="small text-muted me-1">Terms of use.</a>
                  <a href="#!" className="small text-muted">Privacy policy</a>
                </div>

              </MDBCardBody>
            </MDBCol>

          </MDBRow>
        </MDBCard>

      </MDBContainer>
    </div>
  );
}

export default Login;
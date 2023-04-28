import {
    Button,
    Card,
    CardContent,
    CardHeader,
    Paper,
  } from '@material-ui/core';
  import React, { useState } from 'react';
  import { Input, Spinner } from 'reactstrap';
  import Error from '@mui/icons-material/Error';
  import CheckCircleRounded from '@mui/icons-material/CheckCircleRounded';
  import CancelRoundedIcon from '@mui/icons-material/CancelRounded';
  function Status() {
    const [user, setUser] = useState();
    const [id, setId] = useState();
    const [isFetching, setFetching] = useState();
  
    const handleInputChange = (e) => {
      setId(e.target.value);
    };
    const handleSubmit = () => {
      setFetching(true);
      fetch(`http://localhost:8000/users/status/${id}`).then((res) => {
        res.json().then((res) => {
          console.log(res);
          setUser(res);
          setFetching(false);
        });
      });
    };
    return (
      <div className='bgImg cover-container hello d-flex p-3 mx-auto flex-column round mainDiv hello'>
        <div className='row '>
          <div className='col-3'></div>
          <div className='col-6'>
            <Card style={{ height: '500px' }}>
              <CardHeader
                title='User Account Status'
                subheader='Get Status of your account approval here'
              />
              <CardContent
                style={{ height: '100%' }}
                className='d-flex justify-content-start align-item-center'>
                {user ? (
                  <div className='container' style={{ height: '60%' }}>
                    {user._id ? (
                      <>
                        <div className='row'>
                          <h4>User Details</h4>
                        </div>
                        <div className='row'>
                          <div className='col-5 m-2'>
                            First Name : {user.firstName}
                          </div>
  
                          <div className='col-5 m-2 '>
                            Last Name : {user.lastName}
                          </div>
                          <div className='col-12 m-2'>
                            Mobile: {user.phoneNumber}
                          </div>
                          <div className='col-12 m-2'>Email: {user.email}</div>
                          <div className='col-12 m-2'>
                            Address:{' '}
                            {user.address1
                              ? user.address1 + ' ' + user.address2
                              : 'No address Provided'}
                          </div>
                          <div className='col-12 m-2'>
                            <div className='row'>
                              <div className='col-12'>
                                {user.approved ? (
                                  <div>
                                    <>Status: </>
                                    <>Approved</>
                                    <>
                                      <CheckCircleRounded
                                        className='mb-1'
                                        style={{ color: 'green' }}
                                      />
                                    </>
                                  </div>
                                ) : (
                                  <div>
                                    <>Status: </>
                                    <>Not Approved</>
                                    <>
                                      <CancelRoundedIcon
                                        className='mb-1'
                                        style={{ color: 'red' }}
                                      />
                                    </>
                                  </div>
                                )}
                              </div>
                            </div>
                          </div>
                        </div>
                      </>
                    ) : (
                      <div
                        className='row  align-items-center'
                        style={{ height: '60%' }}>
                        <div className='col-12'>
                          <div className='d-flex justify-content-center align-items-center'>
                            <Error
                              style={{
                                color: '#a62828',
                                height: '5rem',
                                width: '5rem',
                              }}></Error>
                          </div>
                          <div className='d-flex justify-content-center align-items-center'>
                            <h2>User Not Found</h2>
                          </div>
                        </div>
                      </div>
                    )}
                  </div>
                ) : (
                  <div className='container' style={{ height: '60%' }}>
                    <div className='row  align-items-center'>
                      <div className='col'>
                        <Input
                          placeholder='Enter Your Id here'
                          onChange={handleInputChange}></Input>
                        {isFetching ? (
                          <Button className='mt-3' variant='contained'>
                            <Spinner></Spinner>
                          </Button>
                        ) : (
                          <Button
                            className='mt-3'
                            variant='contained'
                            onClick={handleSubmit}>
                            Submit
                          </Button>
                        )}
                      </div>
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>
          </div>
          <div className='col-3'></div>
        </div>
      </div>
    );
  }
  
  export default Status;
  
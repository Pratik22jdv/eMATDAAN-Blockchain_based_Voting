import { React, useState, useEffect } from "react";
import axios from 'axios';

import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
// import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { styled } from '@mui/material/styles';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import { CircularProgress } from "@mui/material";
import toast, { Toaster } from "react-hot-toast";
import { Button, Typography } from "@mui/material";
import {Box, Modal} from "@mui/material";
import { Link } from "react-router-dom";



function Admin({ user }) {
    const [userList, setUserList] = useState([]);
    const [isFetching, setFetching] = useState({});
    const [open, setOpen] = useState(false);
    const [userData, setUserData] = useState(null);


    const style = {
        position: "absolute",
        top: "50%",
        left: "50%",
        transform: "translate(-50%, -50%)",
        width: "wrap-content",
        bgcolor: "background.paper",
        border: "2px solid #000",
        boxShadow: 24,
        p: 4,
      };


    // const notifySuccess = (message) => toast.success(message);

    const apiFetchList = () => {
        return fetch(
            `http://localhost:3000/users/all?adminEmail=${user.email}`,
            {
                method: 'GET',
            }
        )
            .then((response) => {
                return response.json();
            })
            .catch((err) => console.log(err));
    };

    const fetchUserList = () => {
        apiFetchList().then((data) => {
            setUserList(data);
        })
    };

    // function createData(
    //     name: string,
    //     calories: string,
    //     fat: string,
    //     carbs: string,
    //     protein: Boolean,
    // ) {
    //     return { name, calories, fat, carbs, protein };
    // }

    const StyledTableCell = styled(TableCell)(({ theme }) => ({
        [`&.${tableCellClasses.head}`]: {
            backgroundColor: theme.palette.common.black,
            color: theme.palette.common.white,
        },
        [`&.${tableCellClasses.body}`]: {
            fontSize: 14,
        },
    }));

    const StyledTableRow = styled(TableRow)(({ theme }) => ({
        '&:nth-of-type(odd)': {
            backgroundColor: theme.palette.action.hover,
        },
        // hide last border
        '&:last-child td, &:last-child th': {
            border: 0,
        },
    }));

    // const rows = [
    //     createData('Frozen yoghurt', 159, 6.0, 24, 4.0),
    //     createData('Ice cream sandwich', 237, 9.0, 37, 4.3),
    //     createData('Eclair', 262, 16.0, 24, 6.0),
    //     createData('Cupcake', 305, 3.7, 67, 4.3),
    //     createData('Gingerbread', 356, 16.0, 49, 3.9),
    // ];

    

    //Modal open with user details
    const handleOpen = (user) => {
        setUserData(user);
        setOpen(true);
    };

    const handleClose = () => setOpen(false);


    const setUserApproved = async (userObj) => {
        
        setFetching({ ...isFetching, user: userObj._id });
        const res = await axios.put("http://localhost:3000/users/approvalChange/" + userObj._id);
        
        const pass = res.data.votePassword;
        let editedUser = userList.filter((user) => {
            return user._id === userObj._id;
        });

        let editedUserIndex;

        for (
            editedUserIndex = 0;
            editedUserIndex < userList.length;
            editedUserIndex++
        ) {
            if (userList[editedUserIndex]?._id === userObj._id) {
                break;
            }
        }
        
        let newUserList = [
            ...userList.slice(0, editedUserIndex),
            { ...editedUser[0], approved: true , votePassword: pass},
            ...userList.slice(editedUserIndex + 1, userList.length),
        ];
        setFetching({ ...isFetching, user: "" });
        setUserList(newUserList);
        toast.success(userObj._id + " has been approved");

    }


    useEffect(() => {
        fetchUserList();
    }, []);

    return (
        <div style={{ margin: "20px", marginTop: "10px" }}>
            {userList.length > 0 ?
                (<><TableContainer component={Paper}>
                    <Table sx={{ minWidth: 650 }} aria-label="simple table">
                        <TableHead>
                            <TableRow>
                                <TableCell>Email</TableCell>
                                <TableCell >User&nbsp;Name</TableCell>
                                <TableCell >Aadhar&nbsp;Number</TableCell>
                                <TableCell >Approved&nbsp;</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {userList.map((userObj) => (
                                <TableRow
                                    key={userObj.email}
                                    sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                                >
                                    <StyledTableCell onClick={()=>{handleOpen(userObj)}} component="th" scope="row">
                                        <Link>{userObj.email}</Link>
                                    </StyledTableCell>
                                    <StyledTableCell >{userObj.firstName + " " + userObj.lastName}</StyledTableCell>
                                    <StyledTableCell >{userObj.aadharNumber}</StyledTableCell>
                                    <StyledTableCell >
                                        {isFetching.user == userObj._id ?
                                            (<CircularProgress />) :
                                            (<>
                                                {
                                                    userObj.approved ?
                                                        (<Button variant="contained" disabled >
                                                            Approved
                                                        </Button>) :
                                                        (<Button variant="contained" onClick={() => setUserApproved(userObj)}>
                                                            Approve
                                                        </Button>)
                                                }
                                            </>
                                            )
                                        }
                                    </StyledTableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </TableContainer>

                    <Modal
                        open={open}
                        onClose={handleClose}
                        aria-labelledby="modal-modal-title"
                        aria-describedby="modal-modal-description"
                    >
                        <Box sx={style}>
                            <div>
                                <Typography id="modal-modal-title" variant="h4" component="h2">
                                    User Details
                                </Typography>

                                <Typography id="modal-modal-description" sx={{ mt: 2 }}>
                                    <span className="me-4">Name: {" "}{userData?.firstName? userData?.firstName: null}{" "}
                                    {userData?.lastName ?userData.lastName : " "}</span>
                                </Typography>

                                <Typography id="modal-modal-description" sx={{ mt: 2 }}>
                                    <span className="me-4">Aadhar Number : {userData?.aadharNumber}</span>
                                </Typography>

                                <Typography>
                                    <span className="me-4">
                                       Vote Password:
                                        {userData?.votePassword ? userData.votePassword : "Not Provided"}
                                    </span>
                                </Typography>

                                <Typography id="modal-modal-description" sx={{ mt: 2 }}>
                                    Address:
                                    {userData?.address1 + " " + userData?.address2}
                                </Typography>

                                <Typography>
                                    District:{" "}
                                    {userData?.userDistrict ? userData.userDistrict : "" + " "}
                                </Typography>

                                <Typography>
                                    State:{userData?.userState ? userData.userState : "" + " "}
                                </Typography>

                                <img
                                    src={userData?.aadharImage}
                                    style={{ width: "400px", height: "300px" }}
                                    alt="userImage"
                                />
                            </div>
                        </Box>
                    </Modal>
                </>

                ) :
                (<div style={{ width: "80px", margin: "auto", marginTop: "20%", backgroundColor: "white", padding: "20px", borderRadius: "20px" }}>
                    <CircularProgress />
                </div>)
            }
            <Toaster />
        </div>
    );
}

export default Admin;
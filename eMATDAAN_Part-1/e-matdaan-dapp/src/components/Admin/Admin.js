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



function Admin({ user }) {
    const [userList, setUserList] = useState([]);
    const [isFetching, setFetching] = useState({});

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

    const setUserApproved = async (userObj) => {
        console.log(userObj);
        setFetching({ ...isFetching, user: userObj._id });
        const res = await axios.put("http://localhost:3000/users/approvalChange/" + userObj._id);
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
        console.log(editedUserIndex);
        let newUserList = [
            ...userList.slice(0, editedUserIndex),
            { ...editedUser[0], approved: true },
            ...userList.slice(editedUserIndex + 1, userList.length),
        ];
        setFetching({ ...isFetching, user: "" });
        setUserList(newUserList);
        toast.success(userObj._id + " has been approved");

    }


    useEffect(() => {
        fetchUserList(user);
    }, []);

    return (
        <div style={{ margin: "20px", marginTop: "10px" }}>
            {userList.length > 0 ? (<TableContainer component={Paper}>
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
                                <StyledTableCell component="th" scope="row">
                                    {userObj.email}
                                </StyledTableCell>
                                <StyledTableCell >{userObj.firstName + " " + userObj.lastName}</StyledTableCell>
                                <StyledTableCell >{userObj.aadharNumber}</StyledTableCell>
                                <StyledTableCell >
                                    {isFetching.user == userObj._id ?
                                        (<CircularProgress />) :
                                        (<>
                                            {
                                                userObj.approved ?
                                                    (<Button variant="contained" disabled onClick={() => setUserApproved(userObj)}>
                                                        Approved
                                                    </Button>) :
                                                    (<Button variant="contained" disabled onClick={() => setUserApproved(userObj)}>
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
            </TableContainer>) :
                (<div style={{ width: "80px", margin: "auto", marginTop: "20%", backgroundColor: "white", padding: "20px", borderRadius: "20px" }}>
                    <CircularProgress />
                </div>)
            }
            <Toaster />
        </div>
    );
}

export default Admin;
import LinaerStepper from "./LinearStepper";
import { CssBaseline, Container, Paper, Box } from "@material-ui/core";

function Registration() {
    return (
        <>
            <CssBaseline />
            <Container component={Box} p={6} fixed style={{width:"70%",margin:"auto", marginTop:"100px"}}>
                <Paper component={Box} p={3} style={{ border: "1px solid blue", borderRadius: "20px", padding: "20px"}}>
                    <LinaerStepper />
                </Paper>
            </Container>
        </>
    );
}

export default Registration;
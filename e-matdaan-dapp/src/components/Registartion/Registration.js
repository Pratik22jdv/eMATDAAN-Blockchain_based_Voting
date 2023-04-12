import LinaerStepper from "./LinearStepper";
import { CssBaseline, Container, Paper, Box } from "@material-ui/core";

function Registration() {
    return (
        <>
            <CssBaseline />
            <Container component={Box} p={6} fixed style={{margin:"auto"}, {marginTop :"80px"}}>
                <Paper component={Box} p={3} style={{ boxShadow: "5px 10px #888888" }, { border: "1px solid blue" }, { borderRadius: "50px blue" }}>
                    <LinaerStepper />
                </Paper>
            </Container>
        </>
    );
}

export default Registration;
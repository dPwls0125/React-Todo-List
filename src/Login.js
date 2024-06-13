import React from "react";
import { signin } from "./service/ApiService";
import {Button, TextField, Grid, Link, Container, Typography} from "@material-ui/core";

class Login extends React.Component {

    constructor(props){
        super(props);
        this.handleSubmit = this.handleSubmit.bind(this)
    }
    handleSubmit(event){
        console.log("event was detected");
        event.preventDefault();
        const data = new FormData(event.target);
        const email = data.get("email");
        const password = data.get("password");
        
        // ApiService의 signin 메소드를 통해 로그인
        signin({email:email, password:password});
        console.log("signin success!!");
    }
    render() {
        return (
            <Container component="main" maxWidth="xs" style={{marginTop :"8%"}}>
            <Grid container spacing={2} direction="column" alignItems="center">
                <Typography component="h1" variant="h5" align ="center">
                    로그인
                </Typography>
            </Grid>
            <form noValidate onSubmit={this.handleSubmit}>
                {" "}
                {/* submit 버튼을 클릭하면 handleSubmit이 실행됨 */}
                <Grid container spacing={2} >
                    <Grid item xs={12} >
                        <TextField
                            variant="outlined"
                            required
                            fullWidth
                            id="email"
                            label="이메일 주소"
                            name = "email"
                            autoComplete = "email"
                            />
                    </Grid>
                    <Grid item xs = {12}>
                        <TextField 
                    variant="outlined"
                    required
                    fullWidth
                    id="password"
                    label = "패스워드"
                    name = "password"
                    autoComplete="password"
                        />
                    </Grid>
                    <Grid item xs = {12}>
                        <Button
                        type = "submit"
                        fullWidth
                        variant="contained"
                        color="primary"
                        >
                            로그인
                        </Button>
                    </Grid>
                    <Link href = "/signup" variant="body2">
                        <Grid item>계정이 없습니까? 여기서 가입하세요.
                        </Grid>
                    </Link>
                    <Grid item xs={12}>
                            <Button
                                fullWidth
                                variant="contained"
                                href="http://localhost:8080/oauth2/authorization/kakao"
                                style={{
                                    backgroundColor: "#FEE500", // 카카오 노란색
                                    color: "#000000", // 검은색 텍스트
                                    marginTop: "10px",
                                    display: "flex",
                                    alignItems: "center",
                                    justifyContent: "center",
                                }}
                            >
                                <img 
                                    src="https://developers.kakao.com/assets/img/about/logos/kakaolink/kakaolink_btn_small.png" 
                                    alt="Kakao logo" 
                                    style={{ marginRight: "8px", height: "24px" }} 
                                />
                                카카오로 로그인
                            </Button>
                        </Grid>
                    </Grid>
                </form>
            </Container>
        );
    }
}


export default Login;
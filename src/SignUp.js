import { API_BASE_URL } from "./app-config";
import React from "react";
import {
    Button,
    TextField,
    Link,
    Grid,
    Container,
    Typography,
} from "@material-ui/core";

import { signup } from "./service/ApiService";

class SignUp extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            email: "",
            certNum: ""
        };
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleEmailChange = this.handleEmailChange.bind(this);
        this.handleCertNumChange = this.handleCertNumChange.bind(this);
        this.requestCertNum = this.requestCertNum.bind(this);
        this.validateCertNum = this.validateCertNum.bind(this);
    }

    handleSubmit(event) {
        event.preventDefault();
        const data = new FormData(event.target);
        const username = data.get("username");
        const email = data.get("email");
        const password = data.get("password");

        signup({ email: email, username: username, password: password }).then(
            (response) => {
                window.location.href = "/login";
            }
        );
    }

    handleEmailChange(event) {
        this.setState({ email: event.target.value });
    }

    handleCertNumChange(event) {
        this.setState({ certNum: event.target.value });
    }

    requestCertNum() {

        fetch(`${API_BASE_URL}/certification/mail/request/certNum?email=${encodeURIComponent(this.state.email)}`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
            },
        })
            .then((response) => {
                if (response.ok) {
                    alert("인증번호가 이메일로 전송되었습니다.");
                } else {
                    alert("인증번호 전송에 실패했습니다.");
                }
            })
            .catch((error) => {
                console.error("Error:", error);
                alert("인증번호 전송 중 오류가 발생했습니다.");
            });
    }

    validateCertNum() {
        fetch(API_BASE_URL+"/certification/mail/validate", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ email: this.state.email, num: this.state.certNum }),
        })
            .then((response) => {
                // 응답이 비어 있는지 확인
                if (!response.ok) {
                   alert("인증번호가 일치하지 않습니다.");
                }else if (response.ok) {
                    alert("인증번호 확인 완료");
                }
            })
            .catch((error) => {
                console.error("Error:", error);
            });
    }

    render() {
        return (
            <Container component="main" maxWidth="xs" style={{ marginTop: "8%" }}>
                <form noValidate onSubmit={this.handleSubmit}>
                    <Grid container spacing={2}>
                        <Grid item xs={12}>
                            <Typography component="h1" variant="h5">
                                계정 생성
                            </Typography>
                        </Grid>
                        <Grid item xs={8}>
                            <TextField
                                autoComplete="email"
                                name="email"
                                variant="outlined"
                                required
                                fullWidth
                                id="email"
                                label="이메일 주소"
                                value={this.state.email}
                                onChange={this.handleEmailChange}
                            />
                        </Grid>
                        <Grid item xs={4}>
                            <Button
                                fullWidth
                                variant="contained"
                                style={{ backgroundColor: "#75C1FF", color: "white" }}
                                onClick={this.requestCertNum}
                            >
                                인증번호 받기
                            </Button>
                        </Grid>
                        <Grid item xs={8}>
                            <TextField
                                autoComplete="certNum"
                                name="certNum"
                                variant="outlined"
                                required
                                fullWidth
                                id="certNum"
                                label="인증번호"
                                value={this.state.certNum}
                                onChange={this.handleCertNumChange}
                            />
                        </Grid>
                        <Grid item xs={4}>
                            <Button
                                fullWidth
                                variant="contained"
                                style={{ backgroundColor: "#75C1FF", color: "white" }}
                                onClick={this.validateCertNum}
                            >
                                인증번호 확인
                            </Button>
                        </Grid>
                        <Grid item xs={12}>
                            <TextField
                                autoComplete="username"
                                name="username"
                                variant="outlined"
                                required
                                fullWidth
                                id="username"
                                label="사용자 이름"
                                autoFocus
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <TextField
                                autoComplete="current-password"
                                name="password"
                                variant="outlined"
                                required
                                fullWidth
                                id="password"
                                label="비밀번호"
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <Button
                                type="submit"
                                fullWidth
                                variant="contained"
                                color="primary"
                            >
                                계정생성
                            </Button>
                        </Grid>
                    </Grid>
                    <Grid container justifyContent="flex-end">
                        <Grid item>
                            <Link href="/login" variant="body2">
                                이미 계정이 있습니까? 로그인 하세요.
                            </Link>
                        </Grid>
                    </Grid>
                </form>
            </Container>
        );
    }
}

export default SignUp;

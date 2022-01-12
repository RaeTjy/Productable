import React, { useState } from "react";
import {
  Card,
  CardContent,
  Box,
  FormControl,
  Button,
  Typography,
  InputAdornment,
  IconButton,
  OutlinedInput,
  FormHelperText,
  CircularProgress,
} from "@material-ui/core";
import { Visibility, VisibilityOff } from "@material-ui/icons";
import axios from "axios";
import { useSnackbar } from "notistack";
import { useNavigate } from "react-router-dom";
import CustomHeading from "../../components/CustomHeading";

const Login = () => {
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const [showPw, setShowPw] = useState(false);
  const [showError, setShowError] = useState({ email: false, password: false });
  const [loading, setLoading] = useState(false);

  const { enqueueSnackbar, closeSnackbar } = useSnackbar();
  let navigate = useNavigate();

  const onPwChange = (event) => {
    let value = event.target.value;

    setShowError({
      ...showError,
      password: false,
    });

    setPassword(value);
  };

  const onEmailChange = (event) => {
    let value = event.target.value;
    setShowError({
      ...showError,
      email: false,
    });
    setEmail(value);
  };

  const onShowPasswordClick = (event) => {
    setShowPw(!showPw);
  };
  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

  const handleLoginClick = async () => {
    let errorToBeShown = { ...showError };
    let isComplete = true;
    if (password === "") {
      isComplete = false;
      errorToBeShown = {
        ...errorToBeShown,
        password: true,
      };
    }
    if (email === "") {
      isComplete = false;
      errorToBeShown = {
        ...errorToBeShown,
        email: true,
      };
    }
    setShowError(errorToBeShown);

    if (isComplete) {
      try {
        const config = {
          headers: {
            "Content-type": "application/json",
          },
        };
        setLoading(true);

        const { data } = await axios.post(
          "/api/users/login",
          {
            email: email,
            password: password,
          },
          config
        );
        setLoading(false);
        navigate("/products");
      } catch (error) {
        setLoading(false);
        enqueueSnackbar("Incorrect Email or Password. Please try again.", {
          variant: "error",
        });
      }
    }
  };
  return (
    <Box
      display="flex"
      alignItems="center"
      justifyContent="center"
      padding="50px"
      flexDirection="column"
    >
      <Box marginBottom={5}>
        <CustomHeading label={"Productable"} />
      </Box>
      <Card
        elevation={2}
        style={{
          width: "400px",
          minHeight: "350px",
        }}
      >
        <CardContent
          style={{
            padding: "10px",
          }}
        >
          <Box style={{ position: "relative", margin: 20 }}>
            <Typography variant="h3" noWrap={true}>
              {"Login"}
            </Typography>

            <Box
              marginTop={2}
              display="flex"
              flexDirection="column"
              //   justifyContent="space-between"
            >
              <form noValidate>
                <FormControl
                  variant="outlined"
                  fullWidth
                  size="small"
                  color="primary"
                  fullWidth
                >
                  <OutlinedInput
                    id="email"
                    placeholder={"Email"}
                    value={email}
                    onInput={onEmailChange}
                    autoFocus
                  />
                </FormControl>
                <Box display="flex" minHeight={25}>
                  {showError.email && (
                    <FormHelperText error>
                      {"Please enter your Email."}
                    </FormHelperText>
                  )}
                </Box>
                <FormControl
                  variant="outlined"
                  fullWidth
                  size="small"
                  color="primary"
                  fullWidth
                >
                  <OutlinedInput
                    id="password"
                    placeholder={"Password"}
                    type={showPw ? "text" : "password"}
                    value={password}
                    onInput={onPwChange}
                    endAdornment={
                      <InputAdornment position="end">
                        <IconButton
                          color="primary"
                          onClick={onShowPasswordClick}
                          onMouseDown={handleMouseDownPassword}
                          edge="end"
                        >
                          {showPw ? (
                            <Visibility fontSize="small" />
                          ) : (
                            <VisibilityOff fontSize="small" />
                          )}
                        </IconButton>
                      </InputAdornment>
                    }
                  />
                </FormControl>
                <Box display="flex" minHeight={25}>
                  {showError.password && (
                    <FormHelperText error>
                      {"Please enter your password."}
                    </FormHelperText>
                  )}
                </Box>
              </form>
            </Box>
            <Box>
              <Button
                id="login"
                type="submit"
                color="primary"
                variant="contained"
                disableElevation
                fullWidth
                onClick={handleLoginClick}
                disabled={loading}
              >
                {loading ? <CircularProgress size={24} /> : "Login"}
              </Button>
            </Box>
          </Box>
        </CardContent>
      </Card>
    </Box>
  );
};

export default Login;

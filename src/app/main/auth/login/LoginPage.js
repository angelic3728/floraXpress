import FuseAnimate from '@fuse/core/FuseAnimate';
import { useForm } from '@fuse/hooks';
import Button from '@material-ui/core/Button';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Checkbox from '@material-ui/core/Checkbox';
import FormControl from '@material-ui/core/FormControl';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import { makeStyles } from '@material-ui/core/styles';
import { darken } from '@material-ui/core/styles/colorManipulator';
import TextField from '@material-ui/core/TextField';
import Typography from '@material-ui/core/Typography';
import clsx from 'clsx';
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { withRouter } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { showMessage } from 'app/store/fuse/messageSlice';
import firebase from 'app/services/firebaseService';
import { LoginWithFireBase } from 'app/auth/store/loginSlice';
import { CircularProgress } from '@material-ui/core';

const useStyles = makeStyles(theme => ({
    root: {
        background: `linear-gradient(to left, ${theme.palette.primary.dark} 0%, ${darken(
            theme.palette.primary.dark,
            0.5
        )} 100%)`,
        color: theme.palette.primary.contrastText
    },
    leftSection: {},
    rightSection: {
        background: `linear-gradient(to right, ${theme.palette.primary.dark} 0%, ${darken(
            theme.palette.primary.dark,
            0.5
        )} 100%)`,
        color: theme.palette.primary.contrastText
    },
    logo_icon: {
        width: (window.innerWidth > 960) ? "100px" : "64px"
    }
}));

function LoginPage(props) {
    const classes = useStyles();
    const dispatch = useDispatch();
    const { form, handleChange, resetForm } = useForm({
        email: '',
        password: '',
        remember: false
    });
    const [authenticatingFlag, setAuthenticatingFlag] = useState(false);

    function isFormValid() {
        return form.email.length > 0 && form.password.length > 0;
    }

    function handleSubmit(ev) {
		ev.preventDefault();
		resetForm();
        setAuthenticatingFlag(true);
		const { email, password } = form;
		firebase
			.auth
			.signInWithEmailAndPassword(email, password)
			.then(async user => {
				setAuthenticatingFlag(true);
				await dispatch(LoginWithFireBase(user));
				setAuthenticatingFlag(false);
				if (!props.location.state) {
					props.history.push('/dashboard');
				}
			})
			.catch(error => {
                setAuthenticatingFlag(false);
				dispatch(showMessage({
					message: error.message,//text or html
					autoHideDuration: 3000,//ms
					anchorOrigin: {
						vertical: 'top',//top bottom
						horizontal: 'right'//left center right
					},
					variant: error//success error info warning null
				}));
			});
	}

    // var googleProvider = firebase.googleProvider;
    // var facebookProvider = firebase.facebookProvider;
    // function googleSignin() {
    // 	firebase.auth
    // 		.signInWithPopup(googleProvider).then(async function (result) {
    // 			setAuthenticatingFlag(true);
    // 			await dispatch(LoginWithFireBase(result.user));
    // 			setAuthenticatingFlag(false);
    // 			if (!props.location.state) {
    // 				props.history.push('/home');
    // 			}
    // 		}).catch(function (error) {
    // 			dispatch(showMessage({
    // 				message: error.message,//text or html
    // 				autoHideDuration: 3000,//ms
    // 				anchorOrigin: {
    // 					vertical: 'top',//top bottom
    // 					horizontal: 'right'//left center right
    // 				},
    // 				variant: error//success error info warning null
    // 			}));
    // 		});
    // }

    // function facebookSignin() {
    // 	firebase
    // 		.auth
    // 		.signInWithPopup(facebookProvider)
    // 		.then(async (result) => {
    // 			setAuthenticatingFlag(true);
    // 			await dispatch(LoginWithFireBase(result.user));
    // 			setAuthenticatingFlag(false);
    // 			if (!props.location.state) {
    // 				props.history.push('/home');
    // 			}
    // 		})
    // 		.catch((error) => {
    // 			dispatch(showMessage({
    // 				message: error.message,//text or html
    // 				autoHideDuration: 3000,//ms
    // 				anchorOrigin: {
    // 					vertical: 'top',//top bottom
    // 					horizontal: 'right'//left center right
    // 				},
    // 				variant: error//success error info warning null
    // 			}));
    // 		});
    // }

    return (
        <div
            className={clsx(
                classes.root,
                'flex flex-col flex-auto items-center justify-center flex-shrink-0 p-16 md:p-24'
            )}
        >
            <FuseAnimate animation="transition.expandIn">
                <div className="flex w-full max-w-400 md:max-w-3xl rounded-12 shadow-2xl overflow-hidden">
                    <Card
                        className={clsx(
                            classes.leftSection,
                            'flex flex-col w-full max-w-sm items-center justify-center'
                        )}
                        square
                        elevation={0}
                    >
                        <CardContent className="flex flex-col items-center justify-center w-full py-12 md:py-96 max-w-320">
                            <FuseAnimate delay={300}>
                                <div className="flex items-center mb-48">
                                    <img className="logo-icon w-48" src="assets/images/logos/fuse.svg" alt="logo" />
                                    <div className="border-l-1 mr-4 w-1 h-40" />
                                    <div>
                                        <Typography className="text-24 font-800 logo-text" color="inherit">
                                            Flora
										</Typography>
                                        <Typography
                                            className="text-16 tracking-widest -mt-8 font-700"
                                            color="textSecondary"
                                        >
                                            Xpress
										</Typography>
                                    </div>
                                </div>
                            </FuseAnimate>

                            <form
                                name="loginForm"
                                noValidate
                                className="flex flex-col justify-center w-full"
                                onSubmit={handleSubmit}
                            >
                                <TextField
                                    className="mb-16"
                                    label="Email"
                                    autoFocus
                                    type="email"
                                    name="email"
                                    value={form.email}
                                    initialvalue=""
                                    onChange={handleChange}
                                    variant="outlined"
                                    required
                                    fullWidth
                                    inputProps={{
                                        className: 'h-20 py-12 mt-2'
                                    }}
                                />

                                <TextField
                                    className="mb-16"
                                    label="Password"
                                    type="password"
                                    name="password"
                                    value={form.password}
                                    initialvalue=""
                                    onChange={handleChange}
                                    variant="outlined"
                                    required
                                    fullWidth
                                    inputProps={{
                                        className: 'h-20 py-12 mt-2'
                                    }}
                                />

                                {/* <div className="flex items-center justify-between">
                                    <FormControl>
                                        <FormControlLabel
                                            control={
                                                <Checkbox
                                                    name="remember"
                                                    checked={form.remember}
                                                    onChange={handleChange}
                                                />
                                            }
                                            label="Remember Me"
                                        />
                                    </FormControl>

                                    <Link className="font-medium" to="/auth/forgot-password">
                                        Forgot Password?
									</Link>
                                </div> */}

                                <Button
                                    variant="contained"
                                    color="primary"
                                    className="w-full mx-auto mt-16"
                                    aria-label="LOG IN"
                                    disabled={!isFormValid() || authenticatingFlag}
                                    type="submit"
                                >
                                    {authenticatingFlag && <CircularProgress size={12} className="mr-4" />} LOGIN
								</Button>
                            </form>
                        </CardContent>

                        <div className="flex flex-col items-center justify-center pb-32">
                            <span className="font-medium">Don't have an account?</span>
                            <Link className="font-medium" to="/auth/register">
                                <h4 style={{ fontWeight: "bold" }}>Create an account</h4>
                            </Link>
                        </div>
                    </Card>

                    <div
                        className={clsx(classes.rightSection, 'hidden md:flex flex-1 items-center justify-center p-64')}
                    >
                        <div className="max-w-320">
                            <FuseAnimate animation="transition.slideUpIn" delay={400}>
                                <Typography variant="h3" color="inherit" className="font-800 leading-tight">
                                    Welcome to <br />the FloraXpress <br /> Website
								</Typography>
                            </FuseAnimate>
                        </div>
                    </div>
                </div>
            </FuseAnimate>
        </div>
    );
}

export default withRouter(LoginPage);

import FuseAnimate from '@fuse/core/FuseAnimate';
import { useForm } from '@fuse/hooks';
import Button from '@material-ui/core/Button';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import { makeStyles } from '@material-ui/core/styles';
import { darken } from '@material-ui/core/styles/colorManipulator';
import TextField from '@material-ui/core/TextField';
import TextareaAutosize from '@material-ui/core/TextareaAutosize';
import Typography from '@material-ui/core/Typography';
import clsx from 'clsx';
import React from 'react';
import { Link } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { showMessage } from 'app/store/fuse/messageSlice';
import { CircularProgress } from '@material-ui/core';
import firebase from 'app/services/firebaseService';

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
    }
}));

function RegisterPage() {
    const classes = useStyles();
    const dispatch = useDispatch();

    const [createAccountFlag, setCreateAccountFlag] = React.useState(false);

    const { form, handleChange, resetForm } = useForm({
        company: '',
        email: '',
        nif_vat: '',
        phone: '',
        address: '',
        description: '',
        password: '',
        passwordConfirm: '',
    });

    function customizeMessage(msg, type, duration) {
        dispatch(showMessage({
            message: msg,//text or html
            autoHideDuration: duration,//ms
            anchorOrigin: {
                vertical: 'top',//top bottom
                horizontal: 'right'//left center right
            },
            variant: type//success error info warning null
        }));
    }

    function isFormValid() {
        return (
            form.company.length > 0 &&
            form.email.length > 0 &&
            form.nif_vat.length > 0 &&
            form.phone.length > 0 &&
            form.address.length > 0 &&
            form.description.length > 0 &&
            form.password.length > 0 &&
            form.password.length > 5 &&
            form.password === form.passwordConfirm
        );
    }

    function handleSubmit(ev) {
        ev.preventDefault();
        setCreateAccountFlag(true);
        firebase.auth.createUserWithEmailAndPassword(form.email, form.password)
        .then(async function (res) {
            await firebase.firestore.collection("users").doc(res.user.uid).set({
                uid: res.user.uid,
                company: form.company,
                email: form.email,
                nif_vat: form.nif_vat,
                phone: form.phone,
                address: form.address,
                description: form.description,
                status: false,
                role: 1,
                createdAt: res.user.metadata.creationTime,
            })
                .then(function () {
                    resetForm();
                    setCreateAccountFlag(false);
                    customizeMessage('Successfully registered! Please wait until your account is checked.', 'success', 4000);
                })
                .catch(function (error) {
                    customizeMessage(error.message, 'error', 4000);
                });
        }).catch(async function (error) {
            customizeMessage(error.message, 'error', 4000);
        });
    }

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
                        <CardContent className="flex flex-col items-center justify-center w-full py-48 max-w-320">
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
                                name="registerForm"
                                noValidate
                                className="flex flex-col justify-center w-full"
                                onSubmit={handleSubmit}
                            >
                                <TextField
                                    className="mb-16"
                                    label="Company"
                                    autoFocus
                                    type="name"
                                    name="company"
                                    value={form.company}
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
                                    label="Email"
                                    type="email"
                                    name="email"
                                    value={form.email}
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
                                    label="NIF/VAT"
                                    type="number"
                                    name="nif_vat"
                                    value={form.nif_vat}
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
                                    label="Phone"
                                    type="phone"
                                    name="phone"
                                    value={form.phone}
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
                                    label="Address"
                                    type="name"
                                    name="address"
                                    value={form.address}
                                    onChange={handleChange}
                                    variant="outlined"
                                    required
                                    fullWidth
                                    inputProps={{
                                        className: 'h-20 py-12 mt-2'
                                    }}
                                />

                                <TextareaAutosize
                                    className="mb-16 border-1 p-8"
                                    name="description"
                                    value={form.description}
                                    onChange={handleChange}
                                    required
                                    rowsMin={3}
                                    placeholder="Company Description"
                                />

                                <TextField
                                    className="mb-16"
                                    label="Password"
                                    type="password"
                                    name="password"
                                    placeholder="must be more than 6 characters"
                                    value={form.password}
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
                                    label="Password (Confirm)"
                                    type="password"
                                    name="passwordConfirm"
                                    value={form.passwordConfirm}
                                    onChange={handleChange}
                                    variant="outlined"
                                    required
                                    fullWidth
                                    inputProps={{
                                        className: 'h-20 py-12 mt-2'
                                    }}
                                />

                                <Button
                                    variant="contained"
                                    color="primary"
                                    className="w-full mx-auto mt-16"
                                    aria-label="Register"
                                    disabled={(!isFormValid())}
                                    type="submit"
                                >
                                    {createAccountFlag && <CircularProgress size={12} className="mr-4" />}CREATE AN ACCOUNT
								</Button>
                            </form>
                        </CardContent>

                        <div className="flex flex-col items-center justify-center pb-32">
                            <span className="font-medium">Already have an account?</span>
                            <Link className="font-medium" to="/auth/login">
                                Login
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

export default RegisterPage;

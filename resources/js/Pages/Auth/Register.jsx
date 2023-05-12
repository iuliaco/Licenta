import React, { useEffect } from 'react';
import OrButton from '@/Components/OrButton';
import Button from '@/Components/Button';
import Guest from '@/Layouts/Guest';
import Input from '@/Components/Input';
import Label from '@/Components/Label';
import ValidationErrors from '@/Components/ValidationErrors';
import { Head, Link, useForm } from '@inertiajs/react';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import GoogleButton from 'react-google-button'


export default function Register() {
    const { data, setData, post, processing, errors, reset } = useForm({
        name: '',
        email: '',
        password: '',
        password_confirmation: '',
    });

    useEffect(() => {
        return () => {
            reset('password', 'password_confirmation');
        };
    }, []);

    const onHandleChange = (event) => {
        setData(event.target.name, event.target.type === 'checkbox' ? event.target.checked : event.target.value);
    };

    const submit = (e) => {
        e.preventDefault();

        post(route('register'));
    };

    return (
        <Guest>
            <Head title="Register" />

            <Grid container justifyContent="center" alignItems="center" spacing={2} >
                <Grid item container direction='column' mt={2} xs={12} md={10} justifyContent="center" alignItems="center">
                    <Typography variant="h5" fontWeight={700} gutterBottom >
                        Sign up
                    </Typography>
                    <Typography variant="caption" fontWeight={400} fontSize={16}>
                        Enter your credentials to continue
                    </Typography>
                </Grid>

                <Grid item container xs={12} mt={3} justifyContent="center" alignItems="center">
                    <GoogleButton type="light"  md={10} 
                    onClick={() => { router.visit(window.location.replace("/auth/google")); console.log('Google button clicked'); }}
                    />
                </Grid>

                <OrButton/>
                
                <Grid item xs={12} md={10} mt={2}>


                    <ValidationErrors errors={errors} />

                    <form onSubmit={submit}>
                        <div>
                            <Label forInput="name" value="Name" />

                            <Input
                                type="text"
                                name="name"
                                value={data.name}
                                className="mt-1 block w-full"
                                autoComplete="name"
                                isFocused={true}
                                handleChange={onHandleChange}
                                required
                            />
                        </div>

                        <div className="mt-4">
                            <Label forInput="email" value="Email" />

                            <Input
                                type="email"
                                name="email"
                                value={data.email}
                                className="mt-1 block w-full"
                                autoComplete="username"
                                handleChange={onHandleChange}
                                required
                            />
                        </div>

                        <div className="mt-4">
                            <Label forInput="password" value="Password" />

                            <Input
                                type="password"
                                name="password"
                                value={data.password}
                                className="mt-1 block w-full"
                                autoComplete="new-password"
                                handleChange={onHandleChange}
                                required
                            />
                        </div>

                        <div className="mt-4">
                            <Label forInput="password_confirmation" value="Confirm Password" />

                            <Input
                                type="password"
                                name="password_confirmation"
                                value={data.password_confirmation}
                                className="mt-1 block w-full"
                                handleChange={onHandleChange}
                                required
                            />
                        </div>

                        <Grid item container  xs={12} md={12} mt={2}>
                            <Button variant="outlined" color="primary" size="large" fullWidth={true}  type="submit" processing={processing}>
                                Register
                            </Button>
                        </Grid>

                        <Grid item container  xs={12} md={12} mt={2}>
                            <Link href={route('login')} className="underline text-sm text-gray-600 hover:text-gray-900">
                                Already registered?
                            </Link>
                        </Grid>

                    </form>
                </Grid>
            </Grid>
        </Guest>
    );
}

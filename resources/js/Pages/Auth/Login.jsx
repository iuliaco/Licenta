import React, { useEffect } from 'react';
import OrButton from '@/Components/OrButton';
import Button from '@/Components/Button';
import Checkbox from '@/Components/Checkbox';
import Guest from '@/Layouts/Guest';
import Input from '@/Components/Input';
import Label from '@/Components/Label';
import ValidationErrors from '@/Components/ValidationErrors';
import { Head, Link, useForm, router } from '@inertiajs/react';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import GoogleButton from 'react-google-button'
import { Layout } from '@/Layouts/Layout';

export default function Login({ status, canResetPassword }) {
    const { data, setData, post, processing, errors, reset } = useForm({
        email: '',
        password: '',
        remember: '',
    });

    useEffect(() => {
        return () => {
            reset('password');
        };
    }, []);

    const onHandleChange = (event) => {
        setData(event.target.name, event.target.type === 'checkbox' ? event.target.checked : event.target.value);
    };

    const submit = (e) => {
        e.preventDefault();

        post(route('login'));
    };

    return (
        <Guest>
            <Head>
            <title>Log in</title>
            {/* <script src="https://accounts.google.com/gsi/client" async defer></script> */}
            </Head>

            <Grid container justifyContent="center" alignItems="center" spacing={2} >
                <Grid item container direction='column' mt={2} xs={12} md={10} justifyContent="center" alignItems="center">
                    <Typography variant="h5" fontWeight={700} gutterBottom >
                        Hi, Welcome Back
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

                    {status && <div className="mb-4 font-medium text-sm text-green-600">{status}</div>}

                    <ValidationErrors errors={errors} />

                    <form onSubmit={submit}>
                        <div>
                            <Label forInput="email" value="Email" />

                            <Input
                                type="text"
                                name="email"
                                value={data.email}
                                className="mt-1 block w-full"
                                autoComplete="username"
                                isFocused={true}
                                handleChange={onHandleChange}
                            />
                        </div>

                        


                        <div className="mt-4">
                            <Label forInput="password" value="Password" />

                            <Input
                                type="password"
                                name="password"
                                value={data.password}
                                className="mt-1 block w-full"
                                autoComplete="current-password"
                                handleChange={onHandleChange}
                            />
                        </div>

                        <div className="block mt-4">
                            <label className="flex items-center">
                                <Checkbox name="remember" value={data.remember} handleChange={onHandleChange} />

                                <span className="ml-2 text-sm text-gray-600">Remember me{status}</span>
                            </label>
                        </div>

                        <Grid item container  xs={12} md={12} mt={2}>
                            {canResetPassword && (
                                <Link
                                    href={route('password.request')}
                                    className="underline text-sm text-gray-600 hover:text-gray-900"
                                >
                                    Forgot your password?
                                </Link>
                            )}
                            <Link href={route('register')} style={{marginLeft:'auto'}} className="underline text-sm text-gray-600 hover:text-gray-900">
                                Don't have an accout?
                            </Link>
                        </Grid>

                        <Grid item container  xs={12} md={12} mt={2}>
                            <Button variant="outlined" color="primary" size="large" fullWidth={true}  type="submit" processing={processing}>
                                Log in
                            </Button>
                        </Grid>
                    </form>
                </Grid>
            </Grid>
        
        </Guest>
    );
}

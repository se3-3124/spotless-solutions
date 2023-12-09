import {Link} from 'react-router-dom';
import {useState} from 'react';

import './login-page.scss';
import PageContentCommons from '../../Components/PageContentCommons.tsx';

import facebookLogo from '../../assets/facebook.png';
import googleLogo from '../../assets/google.png';
import houseCleaningImage from '../../assets/house-cleaning-service.jpeg';
import {createInstance, postRequest} from "../../lib/fetch.ts";

type LoginState = {
    email: string;
    password: string;
}

type AuthenticationResponse = {
    token: string;
    refreshToken: string;
    firstName: string;
    lastName: string;
    isAdmin: boolean;
}

export default function LogIn() {
    const [data, setData] = useState<LoginState>({
        email: '',
        password: ''
    });

    const submit = async () => {
        try {
            const result = await postRequest<AuthenticationResponse>(createInstance(), '/api/auth/login', {
                email: data.email,
                password: data.password
            });
            
            localStorage.setItem('sst', result.token);
            localStorage.setItem('ssr', result.refreshToken);
            localStorage.setItem('ssfn', result.firstName);
            localStorage.setItem('ssln', result.lastName);
            localStorage.setItem('ssad', result.isAdmin ? "1" : "0");

            document.location = '/dashboard';
        } catch (e) {
            console.error(e);
        }
    }

    const submitBtnOnClick = () => {
        submit().catch(console.error);
    }

    const updateText = (targetKey: keyof LoginState, value: string) => {
        setData(l => {
            return {
                ...l,
                [targetKey]: value,
            }
        });
    }

    return (
        <PageContentCommons active={-1}>
            <section className='signupSize bg-midnightblue'>
                <div className="py-16">
                    <div className="flex bg-white rounded-lg shadow-lg overflow-x-auto mx-auto max-w-sm lg:max-w-4xl">
                        <div
                            className="hidden lg:block lg:w-1/2 bg-cover"
                            style={{
                               background: `#fff url(${houseCleaningImage}) no-repeat center center`,
                               backgroundSize: 'cover' 
                            }} />
                        <div className="w-full p-8 lg:w-1/2">
                            <h2 className="text-2xl font-semibold text-gray-700 text-center">Hello</h2>
                            <h2 className="text-2xl font-semibold text-gray-700 text-center">Welcome Back!</h2>
                            <h2 className="text-2xl font-semibold text-gray-700 text-center mt-8">Log In</h2>
                            <div className="mt-4">
                                <input
                                    className="bg-gray-200 text-gray-700 focus:outline-none focus:shadow-outline border border-gray-300 rounded py-2 px-4 block w-full appearance-none"
                                    type="email"
                                    placeholder='Email'
                                    onInput={(e) => {
                                        updateText('email', e.currentTarget.value);
                                    }}
                                    value={data.email}
                                />
                            </div>
                            <div className="mt-4">
                                <input
                                    className="bg-gray-200 text-gray-700 focus:outline-none focus:shadow-outline border border-gray-300 rounded py-2 px-4 block w-full appearance-none"
                                    type="password"
                                    placeholder='Password'
                                    onInput={(e) => {
                                        updateText('password', e.currentTarget.value);
                                    }}
                                    value={data.password}
                                />
                            </div>
                            <div className="mt-8">
                                <button
                                    onClick={submitBtnOnClick}
                                    className="bg-midnightblue text-fruityorange font-bold py-2 px-4 w-full rounded hover:bg-fruityorange hover:text-midnightblue">
                                    Log In
                                </button>
                            </div>
                            <div className="mt-8">
                                <p className='text-center'>
                                    Forgot?&nbsp;
                                    <Link to="/recovery"><b className='text-fruityorange'>Reset here</b></Link>.
                                </p>
                            </div>
                            <div className="mt-4 flex items-center justify-between">
                                <span className="border-b w-1 md:w-1/3"></span>
                                <p className="text-xs text-gray-500 uppercase">OR</p>
                                <span className="border-b w-1 md:w-1/3"></span>
                            </div>
                            <div className='grid gap-1 mb-1 md:grid-cols-2 mt-4'>
                                <a href="/oauth2/google/request"  className="flex justify-center mt-4 hover:bg-gray-100">
                                    <div className="px-4 py-3">
                                        <img src={googleLogo} alt="Login via Google" className=" h-8 w-8" />
                                    </div>
                                </a>
                                <a href="#" className="flex justify-center mt-4 hover:bg-gray-100">
                                    <div className="px-4 py-3">
                                        <img src={facebookLogo} alt="Login via Facebook" className=" h-8 w-8" />
                                    </div>
                                </a>
                            </div>
                            <p className='flex justify-center mt-4 text-sm'>
                                Don’t have an account?&nbsp;
                                <Link to="/signup"><b className='text-fruityorange'>Sign Up</b></Link>
                            </p>
                        </div>
                    </div>
                </div>
            </section>
        </PageContentCommons>
    )
}
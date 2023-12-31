import {useState} from 'react';

import '../login-page/login-page.scss';
import PageContentCommons from '../../Components/PageContentCommons.tsx';
import houseCleaningImage from "../../assets/house-cleaning-service.jpeg";
import {useSearchParams} from "react-router-dom";
import {createInstance, postRequest} from "../../lib/fetch.ts";

type RecoveryState = {
    password: string;
    confirmPassword: string;
    ready: boolean;
}

export default function RecoveryRecover() {
    const [qs, _] = useSearchParams();
    const [data, setData] = useState<RecoveryState>({
        password: '',
        confirmPassword: '',
        ready: false,
    });

    const submit = async () => {
        if (data.password !== data.confirmPassword) {
            alert('Check password');
            return;
        }

        try {
            await postRequest(createInstance(), '/api/auth/recovery/change', {
                password: data.password,
                token: qs.get('token'),
            });

            alert('Password change success!');
            document.location = '/login';
        } catch (e) {
            alert('Error');
        }
    }

    const submitBtnOnClick = () => {
        submit().catch(console.error);
    }

    const updateText = (targetKey: keyof RecoveryState, value: string) => {
        setData(l => {
            return {
                ...l,
                [targetKey]: value,
            }
        });
    }

    return (
        <PageContentCommons active={-1}>
            <section className='signupSize bg-midnightblue' style={{height: '80vh'}}>
                <div className="py-16">
                    <div className="flex bg-white rounded-lg shadow-lg overflow-x-auto mx-auto max-w-sm lg:max-w-4xl">
                        <div
                            className="hidden lg:block lg:w-1/2 bg-cover"
                            style={{
                                background: `#fff url(${houseCleaningImage}) no-repeat center center`,
                                backgroundSize: 'cover'
                            }} />
                        <div className="w-full p-8 lg:w-1/2">
                            <h2 className="text-2xl font-semibold text-gray-700 text-center">Recovery</h2>
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
                            <div className="mt-4">
                                <input
                                    className="bg-gray-200 text-gray-700 focus:outline-none focus:shadow-outline border border-gray-300 rounded py-2 px-4 block w-full appearance-none"
                                    type="password"
                                    placeholder='Confirm Password'
                                    onInput={(e) => {
                                        updateText('confirmPassword', e.currentTarget.value);
                                    }}
                                    value={data.confirmPassword}
                                />
                            </div>
                            <div className="mt-8">
                                <button
                                    onClick={submitBtnOnClick}
                                    className="bg-midnightblue text-fruityorange font-bold py-2 px-4 w-full rounded hover:bg-fruityorange hover:text-midnightblue">
                                    Reset Account
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </PageContentCommons>
    )
}

import {useEffect} from 'react';
import './dashboard.css';
import {authenticationRequest, getRequest} from "../../lib/fetch.ts";
import PageContentCommons from "../../Components/PageContentCommons.tsx";

export default function Dashboard() {
    useEffect(() => {
        async function check () {
            await authenticationRequest<{}>(getRequest, '/api/check');
        }

        check().catch(console.error);
    }, []);

    return (
        <PageContentCommons active={-1}>
            <section className='loginSize bg-midnightblue'>
                <div className="py-16">
                    <div className="flex bg-white rounded-lg shadow-lg overflow-x-auto mx-auto max-w-sm lg:max-w-4xl">
                        <div className="loginBg hidden lg:block lg:w-1/2 bg-cover">
                        </div>
                        <div className="w-full p-8 lg:w-1/2">
                            <h2 className="text-2xl font-semibold text-gray-700 text-center">dashboard</h2>
                            <h2 className="text-2xl font-semibold text-gray-700 text-center">
                                test
                            </h2>
                        </div>
                    </div>
                </div>
            </section>
        </PageContentCommons>
    )
}

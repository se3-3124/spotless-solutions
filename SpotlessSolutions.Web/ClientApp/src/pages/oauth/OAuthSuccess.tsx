import {useContext, useEffect} from 'react';
import {useNavigate, useSearchParams} from 'react-router-dom';

import './OAuthGenericDesign.scss';

import PageContentCommons from '../../Components/PageContentCommons.tsx';
import AuthContext from "../../contexts/AuthContext.ts";

export default function OAuthSuccess() {
    const context = useContext(AuthContext);
    const navigate = useNavigate();
    const [searchParams, _] = useSearchParams();

    useEffect(() => {
        if (searchParams.get('state') === 'registration_state')
        {
            setInterval(() => {
                navigate('/');
            }, 2000);

            return;
        }
        
        setInterval(() => {
            navigate('/dashboard');
        }, 2000);
    }, []);
    
    return (
        <PageContentCommons active={-1} user={context.user ?? undefined}>
            <section className="oauth-container">
                <div className="wrapper">
                    <div className="inner-wrapper">
                        <div className="image"></div>
                        <div className="text-container">
                            <h2>Success!</h2>
                            <h2>
                                Please wait while you'll be redirected.
                            </h2>
                        </div>
                    </div>
                </div>
            </section>
        </PageContentCommons>
    )
}

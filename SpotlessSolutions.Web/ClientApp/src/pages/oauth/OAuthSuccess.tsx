import PageContentCommons from '../../Components/PageContentCommons.tsx';
import {useSearchParams} from 'react-router-dom';
import {useEffect} from 'react';
import './OAuthGenericDesign.scss';

export default function OAuthSuccess() {
    const [searchParams, _] = useSearchParams();

    useEffect(() => {
        if (searchParams.get('state') === 'registration_state')
        {
            setInterval(() => {
                document.location = '/';
            }, 2000);

            return;
        }
        
        setInterval(() => {
            document.location = '/dashboard';
        }, 2000);
    }, []);
    
    return (
        <PageContentCommons active={-1}>
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

import {useEffect} from "react";
import {useSearchParams} from "react-router-dom";
import {createInstance, getRequest} from "../../lib/fetch.ts";

type UserInformationResponse = {
    firstName: string;
    lastName: string;
    isAdmin: boolean;
}

export default function OAuthCatcher() {
    const [tokenParam, _] = useSearchParams();
    
    useEffect(() => {
        async function getUserInformation() {
            const instance = createInstance();
            instance.defaults.headers.Authorization = `Bearer ${tokenParam.get('t')}`;
            
            try {
                const request = await getRequest<UserInformationResponse>(
                    instance, '/oauth2/google/user-info');
                
                localStorage.setItem('ssfn', request.firstName);
                localStorage.setItem('ssln', request.lastName);
                localStorage.setItem('ssad', request.isAdmin ? "1" : "0");
            } catch (e) {
                throw e;
            }
        }
        
        if (tokenParam.get('t') && tokenParam.get('r'))
        {
            localStorage.setItem('sst', tokenParam.get('t') as string);
            localStorage.setItem('ssr', tokenParam.get('r') as string);
            
            getUserInformation()
                .then(() => {
                    document.location = '/auth/oauth/success';
                })
                .catch(() => {
                    document.location = '/auth/oauth/failure';

                    // Remove tokens when user information fetch fails.
                    localStorage.removeItem('sst');
                    localStorage.removeItem('ssr');
                });
        }
    }, []);
    
    return (
        <>
            Please wait...
        </>
    )
}

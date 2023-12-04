import {useEffect} from "react";
import {useSearchParams} from "react-router-dom";

export default function OAuthCatcher() {
    const [tokenParam, _] = useSearchParams();
    
    useEffect(() => {
        if (tokenParam.get('t') && tokenParam.get('r'))
        {
            localStorage.setItem('sst', tokenParam.get('t') as string);
            localStorage.setItem('ssr', tokenParam.get('r') as string);
            
            setTimeout(() => {
                document.location = '/api/oauth/success'
            }, 100);
        }
    }, []);
    
    return (
        <>
            Please wait...
        </>
    )
}

import {useContext, useEffect} from "react";
import {useNavigate, useSearchParams} from "react-router-dom";
import AuthContext from "../../contexts/AuthContext.ts";

export default function OAuthCatcher() {
    const navigate = useNavigate();
    const context = useContext(AuthContext);
    const [tokenParam, _] = useSearchParams();
    
    useEffect(() => {
        if (tokenParam.get('t') && tokenParam.get('r'))
        {
            const result = context
                .setAuthenticatedUser(tokenParam.get('t') as string, tokenParam.get('r') as string);
            
            if (result) {
                navigate('/auth/oauth/success');
                return;
            }
            
            navigate('/auth/oauth/failure');
        }
    }, []);
    
    return (
        <>
            Please wait...
        </>
    )
}

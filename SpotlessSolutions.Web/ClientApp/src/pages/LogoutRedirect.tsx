import {useEffect} from "react";

export default function LogoutRedirect() {
    useEffect(() => {
        localStorage.removeItem('sst');
        localStorage.removeItem('ssr');
        localStorage.removeItem('ssad');
        localStorage.removeItem('ssfn');
        localStorage.removeItem('ssln');
        
        setInterval(() => {
            document.location = '/';
        }, 1000);
    }, []);

    return (
        <p>Please wait...</p>
    )
}

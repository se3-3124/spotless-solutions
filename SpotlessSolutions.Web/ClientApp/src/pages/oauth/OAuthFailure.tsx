import PageContentCommons from "../../Components/PageContentCommons.tsx";
import './OAuthGenericDesign.scss';

export default function OAuthFailure() {
    return (
        <PageContentCommons active={-1}>
            <section className="oauth-container">
                <div className="wrapper">
                    <div className="inner-wrapper">
                        <div className="image"></div>
                        <div className="text-container">
                            <h2>Failed to Authenticate</h2>
                            <h2>
                                Authentication using third-party provider failed. Please try again.
                            </h2>
                        </div>
                    </div>
                </div>
            </section>
        </PageContentCommons>
    )
}

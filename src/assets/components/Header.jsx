import WikiSearch from "./WikiSearch";
import Logo from '../images/logo.webp'

function Header(){
    return(
        <>
            <main className="headerCont d-flex flex-column justify-content-center">
                <div className="container">
                    <div className="row">
                        <div className="col-lg-6 left d-flex justify-content-center flex-column">
                                <h1>ICT Students'  Best Friend</h1>
                                <p>
                                    This website is made by Christian James Santos originally for
                                    a high-school project. My vision is to provide an all-in-one tool
                                    for ICT students.
                                </p>
                                <div className="buttonCont">
                                    <a href="/wiki-search" className="px-3 py-2 btn btn-primary rounded-3">Try ICTWiki Search</a>
                                </div>
                        </div>
                        <div className="col-lg-6 right d-flex justify-content-center align-items-center">
                            <img className="img-fluid w-50" src={Logo} alt="logo" />
                        </div>
                    </div>
                </div>
            </main>
        </>
    );  
}

export default Header
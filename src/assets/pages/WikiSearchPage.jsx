import Nav from "../components/Nav";
import WikiSearch from "../components/WikiSearch";
import Logo from '../images/logo.webp'

function WikiSearchPage(){
    return(
        <>
            <Nav />
            <main className="container d-flex justify-content-center align-items-center">
                <div className="w-100 flex-column justify-content-center">
                    <div className="d-flex justify-content-center">
                            <img src={Logo} alt="logo" className="me-2" style={{height: '5rem'}}/>
                            <h1 className="text-center wikiSearchH1">ICTPEDIA</h1>
                    </div>
                    <WikiSearch />
                </div>
            </main>
        </>
    );
}

export default WikiSearchPage
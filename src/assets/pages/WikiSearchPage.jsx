import Nav from "../components/Nav";
import WikiSearch from "../components/WikiSearch";

function WikiSearchPage(){
    return(
        <>
            <Nav />
            <main className="container d-flex justify-content-center align-items-center">
                <div className="w-100">
                    <h1 className="text-center">ICTPEDIA</h1>
                    <WikiSearch />
                </div>
            </main>
        </>
    );
}

export default WikiSearchPage
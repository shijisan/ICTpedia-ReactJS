import Nav from "../components/Nav";
import LoginComponent from "../components/LoginComponent";
import ParticlesComponent from '../components/Particles'

function LoginPage(){
    return(
        <>
            <Nav />
            <ParticlesComponent id="particles" />
            <main>
                <LoginComponent />
            </main>
        </>
    );
}

export default LoginPage
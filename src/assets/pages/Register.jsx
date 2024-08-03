import Nav from "../components/Nav";
import RegisterComponent from "../components/RegisterComponent";
import ParticlesComponent from '../components/Particles'


function RegisterPage(){
    return(
        <>
            <Nav />
            <ParticlesComponent id="particles" />
            <main>
                <RegisterComponent />
            </main>
        </>
    );
}

export default RegisterPage
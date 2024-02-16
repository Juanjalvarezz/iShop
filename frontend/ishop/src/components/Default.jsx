import { Link } from "react-router-dom";
import '../assets/css/App.css';
import logo from "../assets/image/logoApple.png"

export default function Default ({children}) {
    return (
        <div>
            <header >
                <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
                <img className="App-logo" src={logo} alt="logo" width={130}/>
                    <ul>
                        <li><Link className="nav-link"  to="/login">Acceder</Link></li>
                    </ul>
                    <ul>
                        <li><Link className="nav-link"  to="/">Registro</Link></li>
                    </ul>
                </nav>
            </header>

            <main>
                {children}
            </main>
        </div>
    );
}
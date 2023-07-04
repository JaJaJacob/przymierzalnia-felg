import '../Navbar/Navbar.css';

export const NavigationBar = () =>
{
    return <div className = "NavigationBarStrip">
                <a href = "/">
                home
                </a>
                <a href = "/przymierzalnia-felg">
                przymierzalnia
                </a>
                <a href = "/katalog-felg">
                katalog felg
                </a>
                <a href = "/umow-wizyte">
                umów wizytę
                </a>
                <a href = "/odwolaj-wizyte">
                odwołaj wizytę
                </a>
            </div>
}
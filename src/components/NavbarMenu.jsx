import { disableBodyScroll, enableBodyScroll } from "body-scroll-lock";
import Hamburger from "hamburger-react"
import { Link } from "react-router-dom"

export default function NavbarMenu(props) {
    const {isOpen, setIsOpen} = props;

    function changeState(){
        setIsOpen(!isOpen);
    }


    isOpen ? disableBodyScroll(document) : enableBodyScroll(document);

    return(
        <div className={isOpen ? "navbar-menu relative z-50 block" : "hidden"}>
        <div onClick={changeState} className="navbar-backdrop fixed inset-0 bg-gray-800 opacity-25"></div>
        <nav className="fixed top-0 left-0 bottom-0 flex flex-col w-5/6 max-w-sm py-6 px-6 bg-white border-r overflow-y-auto">
            <div className="flex items-center mb-8">
                <Hamburger color="black" toggled={isOpen} toggle={setIsOpen}/>
            </div>
            <div>
                <ul>
                    <li className="mb-1">
                        <Link to={"/"} onClick={changeState} className="block p-4 text-sm font-semibold text-gray-400 hover:bg-blue-50 hover:text-blue-600 rounded">Home</Link>
                    </li>
                    <li className="mb-1">
                        <Link to={"/profile"} onClick={changeState} className="block p-4 text-sm font-semibold text-gray-400 hover:bg-blue-50 hover:text-blue-600 rounded">Profile</Link>
                    </li>
                    <li className="mb-1">
                        <Link to={"/cart"} onClick={changeState} className="block p-4 text-sm font-semibold text-gray-400 hover:bg-blue-50 hover:text-blue-600 rounded">Cart</Link>
                    </li>
                </ul>
            </div>
            {/* <div className="mt-auto">
                <div className="pt-6">
                    <Link to={"/login"} onClick={changeState} className="block px-4 py-3 mb-3 leading-loose text-xs text-center font-semibold bg-gray-50 hover:bg-gray-100 rounded-xl">Sign in</Link>
                    <Link to={"/signup"} onClick={changeState} className="block px-4 py-3 mb-2 leading-loose text-xs text-center text-white font-semibold bg-blue-600 hover:bg-blue-700  rounded-xl">Sign Up</Link>
                </div>
                <p className="my-4 text-xs text-center text-gray-400">
                    <span>Copyright © {new Date().getFullYear()}</span>
                </p>
            </div> */}
        </nav>
    </div>
    )

}
import { Navbar, Button } from "keep-react";
import { NavLink } from "react-router-dom";
import { Link } from "react-router-dom";
import image from "../../../public/logo.png"
const Navber = () => {

    return (
        <div>
            <Navbar className="bg-slate-800 drop-shadow-xl shadow-md shadow-slate-300" fluid={true}>
                <Navbar.Container className="flex items-center justify-between">
                    <Navbar.Container className="flex items-center">
                        <Navbar.Brand>
                            <img src={image} alt="" />
                        </Navbar.Brand>
                        <Navbar.Divider></Navbar.Divider>
                        <Navbar.Container
                            tag="ul"
                            className="lg:flex hidden text-white items-center justify-between gap-8"
                        >

                            <li >
                                <NavLink
                                    to="/"
                                    className={({ isActive, isPending }) =>
                                        isPending ? "pending" : isActive ? "text-orange-400" : ""
                                    }
                                >
                                    Home
                                </NavLink>
                            </li>
                            <li >
                                <NavLink
                                    to="/addcontacts"
                                    className={({ isActive, isPending }) =>
                                        isPending ? "pending" : isActive ? "text-orange-400" : ""
                                    }
                                >
                                   Add Contacts
                                </NavLink>
                            </li>
                            <li >
                                <NavLink
                                    to="/allcontacts"
                                    className={({ isActive, isPending }) =>
                                        isPending ? "pending" : isActive ? "text-orange-400" : ""
                                    }
                                >
                                   All Contacts
                                </NavLink>
                            </li>

                           </Navbar.Container>
                        <Navbar.Collapse collapseType="sidebar bg-white">
                            <Navbar.Container tag="ul" className="flex flex-col gap-5">
                                <Navbar.Link linkName="Home" />
                                <Navbar.Link linkName="Projects" />
                                <Navbar.Link linkName="Blogs" />
                                <Navbar.Link linkName="News" />
                                <Navbar.Link linkName="Resources" />
                            </Navbar.Container>
                        </Navbar.Collapse>
                    </Navbar.Container>

                    <Navbar.Container className="flex gap-2">

                        <Navbar.Toggle className="text-white rounded bg-white">tttt</Navbar.Toggle>
                    </Navbar.Container>
                </Navbar.Container>
            </Navbar>
        </div>
    );
};

export default Navber;
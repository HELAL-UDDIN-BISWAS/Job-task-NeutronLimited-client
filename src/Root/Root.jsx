import { Outlet } from 'react-router-dom';
import Naveber from '../Components/Navebar/Naveber';
import Home from '../Page/Home/Home';

const Root = () => {
    return (
        <div>
            <Naveber></Naveber>
            <Outlet>
<Home></Home>
            </Outlet>
        </div>
    );
};

export default Root;
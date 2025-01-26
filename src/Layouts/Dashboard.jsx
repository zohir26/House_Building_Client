import { NavLink, Outlet } from "react-router-dom";


const Dashboard = () => {
    return (
        <div>
            {/* Side bar */}
            <div className="w-64 min-h-full bg-orange-400">
            <ul className="menu">
                <li><NavLink to= '/dashboard/cart'> My cart </NavLink></li>
            </ul>

            </div>
            {/* Dashboard Content */}
            <div className="flex-1">
                <Outlet></Outlet>
            </div>

        </div>
    );
};

export default Dashboard;
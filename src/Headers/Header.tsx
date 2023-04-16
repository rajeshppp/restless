import Menu from "../component/Menu";
import React from "react";
//import UserDropdown from './ProfileDropDown';
//import Logo from "../img/FedEx_Logo_white.png";

const Header: React.FC = () => {
  return (
    <div className="Header">
      <header>
        <div className="logo">
          <img src={Logo} alt="" />
        </div>
        <div className="version">
          <p>ADDRESS MANAGEMENT SYSTEM </p>
          <span> Version 6.7.4 EAI 3538041 </span>
        </div>
        <div className="logout">
          <div className="userdetails">
            <Menu />
            <p className="user">James</p>
            <span className="role">Sr.Developer</span>
          </div>
          <span>
            <UserDropdown />
            {/* <MdiIcon path={mdiAccountDetails}  size={'1.5em'} /> */}
          </span>
          {/*                 <span className="logout-icon"><MdiIcon path={mdiLogoutVariant}  size={'1.5em'} /></span>
                <p>Logout</p> */}
        </div>
      </header>
    </div>
  );
};

export default Header;

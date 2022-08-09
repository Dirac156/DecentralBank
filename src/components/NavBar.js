import React, { Component } from "react";
import bank from "../bank.png";

class NavBar extends Component {
    render() {
        return (
            <nav 
                className="navbar navbar-dark fixed-top shadow p-0"
                style={{ backgroundColor: "black", height: "50px"}}
            > 
                <a 
                    href="/#"
                    className="navbar-brand col-sm-3 col-md-2 mr-0"
                    style={{ color: "white"}}
                >
                    <img src={bank} alt="logo" width='30' height='25'
                        className="d-inline-block align-top mr-2 mt-1"
                    />
                    DAPP Yield Staking (Decentralized Banking)
                </a>
                <ul className="navbar-nav px-3">
                    <li className="text-nowrap d-none nav-item d-sm-none d-sm-block">
                        <small style={{color: "white"}}>Account Number: {this.props.account}</small>
                    </li>
                </ul>
            </nav>
        )
    }
}

export default NavBar;
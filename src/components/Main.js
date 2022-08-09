import React, { Component} from "react";
import tetherImg from "../tether.png";

export default class Main extends Component {
    render(){
        return (
            <div id="content" className="mt-3">
                <table className="table text-muted text-center">
                    <thead>
                        <tr style={{ color: 'black' }}>
                            <th>Staking Balance</th>
                            <th>Reward Balance</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr style={{color: 'black'}}>
                            <td>USDT</td>
                            <td>RWD</td>
                        </tr>
                    </tbody>
                </table>

                <div className="card mb-2" style={{ opacity: '.9'}}>
                    <form className="mb-3">
                        <div style={{ borderSpacing: '0 1em'}}>
                            <label className="float-left" style={{ marginLeft: '15px'}}>
                                <b>Stake Tokens</b>
                            </label>
                            <span className="float-right" style={{ marginRight: '8px'}}>
                                Balance: 
                            </span>
                            <div className="input-group mb-4">
                                <input 
                                    type="text"
                                    placeholder="0"
                                    required
                                />
                                <div className="input-group-open">
                                    <div className="input-group-text">
                                        <img src={tetherImg} alt="tether" height='32'/>
                                         &nbsp;&nbsp;&nbsp;USDT
                                    </div>
                                </div>
                            </div>
                            {/*  */}
                            <button type="submit" className="btn btn-primary btn-lg btn-block">DEPOSIT</button>
                        </div>
                    </form>
                    <button type="submit" className="btn btn-primary btn-lg btn-block">WITHDRAW</button>
                    <div className="card-body text-center" style={{ color: 'Blue'}}>
                        AIRDROP
                    </div>
                </div>
            </div>
        )
    }
}
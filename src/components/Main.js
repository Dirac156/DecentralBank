import React, { Component} from "react";
import Web3 from 'web3';
import tetherImg from "../tether.png";

export default class Main extends Component {

    toWei = number => Web3.utils.toWei(number, 'ether');
    fromWei = number => Web3.utils.fromWei(number, 'ether');

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
                            <td>{ this.fromWei(this.props.stakingBalance)} USDT</td>
                            <td>{ this.fromWei(this.props.rewardBalance)} RWD</td>
                        </tr>
                    </tbody>
                </table>

                <div className="card mb-2" style={{ opacity: '.9'}}>
                    <form className="mb-3" 
                        onSubmit={event => {
                            event.preventDefault();
                            let amount = this.toWei(this.input.value.toString())
                            this.props.stakeTokens(amount);
                        }}
                    >
                        <div style={{ borderSpacing: '0 1em'}}>
                            <label className="float-left" style={{ marginLeft: '15px'}}>
                                <b>Stake Tokens</b>
                            </label>
                            <span className="float-right" style={{ marginRight: '8px'}}>
                                Balance: { this.fromWei(this.props.tetherBalance) }
                            </span>
                            <div className="input-group mb-4">
                                <input 
                                    ref={ input => this.input = input }
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
                    <button 
                        className="btn btn-primary btn-lg btn-block" 
                        onClick={this.props.unstakeTokens}
                    >WITHDRAW</button>
                    <div className="card-body text-center" style={{ color: 'Blue'}}>
                        AIRDROP
                    </div>
                </div>
            </div>
        )
    }
}
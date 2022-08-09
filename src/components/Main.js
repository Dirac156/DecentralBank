import React, { Component} from "react";

export default class Main extends Component {
    render(){
        return (
            <div id="content" className="mt-3">
                <table className="table text-muted text-center">
                    <thead>
                        <tr style={{ color: 'white' }}>
                            <th>Staking Balance</th>
                            <th>Reward Balance</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr style={{color: 'white'}}>
                            <td>USDT</td>
                            <td>RWD</td>
                        </tr>
                    </tbody>
                </table>
            </div>
        )
    }
}
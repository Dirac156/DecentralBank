import React, { Component } from 'react';
import Web3 from 'web3';
import NavBar from './NavBar';

import './App.css';

class App extends Component {

    async loadWeb3() {
        if (window.ethereum) {
            window.web3 = new Web3(window.ethereum)
            await window.ethereum.enable();
        } else if (window.web3) {
            window.web3 = new Web3(window.web3.currentProvider);
        } else {
            window.alert('No ethereum browser detected! You can check your Metamask');
        }
    }

    async loadBlockchainData(){
        const web3 = window.web3;
        const account =await  web3.eth.getAccounts();
        this.setState({ account: account[0] })
    }

    constructor(props) {
        super(props);
        this.state = {
            account: '0x01',
            tether: {},
            rwd: {},
            decentralBank: {},
            tetherBalance: '0',
            rewardBalance: '0',
            stakingBalance: '0',
            isLoading: false
        }
        // "0xF771c25B628425Bde1720b12346b683b476A8c48"
    }

    async UNSAFE_componentWillMount() {
        await this.loadWeb3()
        await this.loadBlockchainData();
    }

    render() {
        return (
            <div>
                <NavBar account={this.state.account}/>
            </div>
        )
    }
}

export default App;
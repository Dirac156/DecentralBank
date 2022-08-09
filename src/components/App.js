import React, { Component } from 'react';
import Web3 from 'web3';
import NavBar from './NavBar';
import Tether from "../truffle_abis/Tether.json";
import Rwd from "../truffle_abis/RWD.json";
import DecentralBank from "../truffle_abis/DecentralBank.json";

import Main from './Main';

import './App.css';

class App extends Component {

    tokens = number => Web3.utils.toWei(number, 'ether');
    fromWei = number => Web3.utils.fromWei(number, 'ether');

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
        this.setState({ isLoading: true });
        const web3 = window.web3;
        const account =await  web3.eth.getAccounts();
        this.setState({ account: account[0] })
        const networkId = await web3.eth.net.getId();

        // Load tether contract
        const tetherData = Tether.networks[networkId];
        if (tetherData) {
            const tether = new web3.eth.Contract(Tether.abi, tetherData.address);
            let tetherBalance = await tether.methods.balanceOf(this.state.account).call();
            this.setState({ tether, tetherBalance: tetherBalance.toString() });
        } else {
            window.alert('Error! Tether contract not deployed - no detected network!');
        }

        const rwdData = Rwd.networks[networkId];
        if (rwdData){
            const rwd = new web3.eth.Contract(Rwd.abi, rwdData.address);
            let rewardBalance = await rwd.methods.balanceOf(this.state.account).call();
            this.setState({ rwd, rewardBalance: rewardBalance.toString()});
        }else {
            window.alert('Error! Tether contract not deployed - no detected network!');
        }

        const decentralBankData = DecentralBank.networks[networkId];
        if (decentralBankData) {
            const decentralBank = new web3.eth.Contract(DecentralBank.abi, decentralBankData.address);
            let stakingBalance = await decentralBank.methods.stakingBalance(this.state.account).call();
            this.setState({ decentralBank, stakingBalance: stakingBalance.toString() });
        }else {
            window.alert('Error! Tether contract not deployed - no detected network!');
        }

        this.setState({ isLoading: false });
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
    }

    async UNSAFE_componentWillMount() {
        await this.loadWeb3()
        await this.loadBlockchainData();
    }

    render() {
        return (
            <div>
                <NavBar account={this.state.account}/>
                <div className='container-fluid mt-5'>
                    <div className='row'>
                        <main role='main' className='col-lg-12 ml-auto mr-auto' style={{ maxWidth: '600px', minHeight: '100vh'}}>
                            <div>
                                <Main />
                            </div>
                        </main>
                    </div>
                </div>
            </div>
        )
    }
}

export default App;
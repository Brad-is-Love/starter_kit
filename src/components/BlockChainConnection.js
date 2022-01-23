import React, {useState} from 'react'
import Web3 from 'web3';
import ConnectMetamask from './ConnectMetamask';
import Color from '../abis/Color.json'
import Navtwo from './Navtwo';
import Home from './Home';
import About from './About.js';
import { BrowserRouter, Route} from 'react-router-dom';
import LifeAdvice from './LifeAdvice';
//import siteIcon from "../NFTIcon.png"
import Roadmap from './RoadMap';
import MyNFTs from './MyNFTs';
import GoodNFTimers from './GoodNFTimers';

const BlockChainConnection = () => {

    const [errorMessage, setErrorMessage] = useState(null);
    const [defaultAccount, setDefaultAccount] = useState('Not Connected');
    const [userBalance, setUserBalance] = useState(null);
    // const [connButtonText, setConnButtonText] = useState('Connect Wallet');
    const web3 = new Web3(window.ethereum)
    const [networkID, setNetworkID] = useState(null);

    const connectWalletHandler = () =>{
        if(window.ethereum) {
            window.ethereum.request({
            method: "eth_requestAccounts"}).then(result => {
                accountChangedHandler(result[0]);
            })
        } else {
            setErrorMessage('Please install Metamask')
        }
    }

    const accountChangedHandler = (newAccount) => {
        setDefaultAccount(newAccount);
        // getUserBalance(newAccount.toString());
        getChainID();
    }

    // const getUserBalance = (address) => {
    //     window.ethereum.request({method: 'eth_getBalance', params: [address, 'latest']})
    //     .then(balance => {
    //         setUserBalance(web3.utils.fromWei(balance))
    //     })
    // }

    const chainChangedHandler = () => {
        window.location.reload();
    }

    window.ethereum.on('accountsChanged', accountChangedHandler);
    window.ethereum.on('chainChanged', chainChangedHandler);

    const getChainID = () => {
        window.ethereum.request({ method: 'eth_chainId' })
        .then(chainID => compareChains(chainID))
    }
        
    const compareChains = (chainID) => {
        const networkId = Web3.utils.toBN(chainID).toString()
        setNetworkID(networkId)
        console.log("the network:" + networkId)
        if(networkId !== "1666600000") {
        window.alert("You're on the wrong Network! Get on Harmony, Mate!")
        }
    }

    return (
     <BrowserRouter>
        <div className="sitebackground pr-4 pl-4 pb-5">
        <div className="generalfont">
          <div className='row sticky-top'>
            <div className='col'>
              <Navtwo />
            </div>
            <div className='col'>
              <ConnectMetamask account={defaultAccount} connectToMeta={connectWalletHandler}/>
            </div>


          </div>
                  <br /><br />
            <div className="container rounded bg-transparent px-4" >

              {/* <Switch>   */}
                <Route path = "/" exact><Home account={defaultAccount} networkID={networkID}/></Route>
                <Route path = "/home" exact><Home account={defaultAccount} networkID={networkID}/></Route>
                <Route path = "/good-nf-timers" exact><GoodNFTimers account={defaultAccount} networkID={networkID}/></Route>
                <Route path = "/about" component={About} exact/>
                <Route path = "/life-advice" exact><LifeAdvice account={defaultAccount} networkID={networkID}/></Route>
                <Route path = "/roadmap" component={Roadmap} exact/>
                <Route path = "/mynfts" exact><MyNFTs account={defaultAccount} networkID={networkID}/></Route>
              {/* </Switch> */}
              
            </div>
          </div>
        </div>

    </BrowserRouter>
    )
        
}

export default BlockChainConnection
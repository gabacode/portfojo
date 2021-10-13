import React, {useState} from 'react'
import Ticker from './components/Ticker'

export default function Home() {

  const [fiat] = useState('EUR');
 
  let pairs = ['BTC','ETH','BNB','ADA', 'DOT', 'DOGE']

  return (
    <div className="container mt-3 mb-3">
      <div className="mt-2 mb-3 text-center">
        <h1>Live Crypto Prices</h1>    
      </div>
      <div className="row">
        {
          pairs.map((pair) => (
            <div className='col-12 col-md-6 col-lg-4' key={pair}>
              <Ticker pair={pair} fiat={fiat} />
            </div>
          ))
        }
      </div>
    </div>
  );
}
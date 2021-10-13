import React, { useState, useEffect, useCallback } from 'react';
import styled from 'styled-components';
import axios from 'axios';

const url = 'https://api.binance.com/api/v3/avgPrice';

export default function Ticker({pair, fiat}) {

    let symbol;

    if(fiat === 'EUR'){symbol = '€'}
    else
    if(fiat === 'USDT'){symbol = '$'}
    else
    if(fiat === 'GBP'){symbol = '£'}
    
    function toCrypto(e) {
        setCryptoValue((e.target.value / data).toFixed(2));
    }
    function toFiat(e) {
        setFiatValue((e.target.value * data).toFixed(2));
    }

    const [data, setResponseData] = useState(null);
    const [status, setStatus] = useState(null);
    const [cryptoValue, setCryptoValue] = useState(0);
    const [fiatValue, setFiatValue] = useState(0);
    
    const fetchData = useCallback(() => {
        axios({
            url: url,
            method: 'get',
            params: {
                symbol: pair+fiat
            }
        })
        .then((response) => {
            setStatus(response.status)
            setResponseData(response.data.price)
            setTimeout(() => {fetchData()}, 1000);
        })
        .catch((error) => {
        alert(error)
        })
    },[pair, fiat])
    
    useEffect(() => {
        fetchData()
    }, [fetchData])
  
    return (
      data &&
        <Box>
            <div className='text-center'>
                <h3 style={{color:'#171924'}}>
                    {pair}: {symbol}{parseFloat(data).toFixed(2)}
                </h3>
            </div>
            <Form>
                <input type="number" min="1" onChange={toCrypto} placeholder={`Insert amount in ${fiat}`}/>
                <p>{cryptoValue} {pair}</p>
                <input type="number" min="1" onChange={toFiat} placeholder={`Insert amount in ${pair}`}/>
                <p>{fiatValue} {fiat}</p>
            </Form>
            <Status>
                STATUS: {status}
            </Status>
        </Box>
  );
}

const Box = styled.div`
    box-shadow: rgb(88 102 126 / 8%) 0px 4px 24px, rgb(88 102 126 / 12%) 0px 1px 2px;
    padding: 5px;
    margin: 5px auto;
    border-radius: 5px;
`
const Status = styled.div`
    text-align: center;
    font-size:10px;
    border-radius: 50px;
    color:green;
`
const Form = styled.form`
    text-align:center
`
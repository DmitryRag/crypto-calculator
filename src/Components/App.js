import React, { useState, useEffect } from 'react'
import axios from 'axios'
import './App.css'
import {today} from '../utils/date'

function App() {
    const [amount, setAmount] = useState(0)
    const [coin, setCoin] = useState([])
    const [coins, setCoins] = useState(0)
    const [coinToday, setCoinToday] = useState([])
    const [coinsToday, setCoinsToday] = useState(0)
    const [profit, setProfit] = useState(0)

    /* 28-04-2013 */
    useEffect(() => {
        axios.get('https://api.coingecko.com/api/v3/coins/bitcoin/history?date=28-04-2013')
        .then(res => {
            setCoin(res.data.market_data.current_price.rub)
        })
        .catch(error => console.log(error));
    }, [])

    useEffect(() => {
        axios.get('https://api.coingecko.com/api/v3/coins/bitcoin/history?date=11-03-2021')
        .then(res => {
            setCoinToday(res.data.market_data.current_price.rub)
        })
        .catch(error => console.log(error));
    }, [])

    function handlePlusClick(e) {
        e.preventDefault()
        setAmount(amount + 1)
        setCoins(coins + coin)
        setCoinsToday(coinsToday + coinToday)

    }

    function handleMinusClick(e) {
        e.preventDefault()
        if (amount < 1) {
            setAmount(0)
            setCoins(0)
            setCoinsToday(0)
        } else {
            setAmount(amount - 1)
            setCoins(coins - coin)
            setCoinsToday(coinsToday - coinToday)
        }
    }

    function handleProfitClick(e) {
        e.preventDefault()
        setProfit(coinsToday - coins)
    }

    console.log(today)
  
    return (
        <div className='coin__app'>
            <div className='coin__container'>
                <h1 className='coin__title'>Search a currency</h1>
                <form className='coin__form'>
                <div className='coin__input-cryptoname__container'>
                    <label className='coin__input-cryptoname-title'>название криптовалюты:</label>
                    <input className='coin__input-cryptoname'/>
                </div>

                <div className='coin__input-cryptoname__container'>
                    <label className='coin__input-cryptoname-title'>дата покупки:</label>
                    <input className='coin__input-cryptoname'/>
                </div>

                <div className='coin__amount_container'>
                    <div className='coin__amount'>
                        <p className='coin__crypto_amount'>ед криптовалюты:</p>
                        <div className='coin__container-section'>
                            <p className='coin__crypto_amount-value'>{amount}</p>
                            <p className='coin__crypto_amount-value-v'>{parseFloat(coin).toFixed()}&#8381;</p>
                        </div>
                    </div>
                    
                    <div className='coin__amount-btn'>
                        <button className='coin__amount_plus coin__btn' onClick={handlePlusClick}>+</button>
                        <button className='coin__amount_minus coin__btn' onClick={handleMinusClick}>-</button>
                    </div>
                </div>
                <div className='coin__total-container'>
                    <p className='coin__crypto_total-value-title'>Итого: </p>
                    <p className='coin__crypto_total-value-price'>{parseFloat(coins).toFixed()} &#8381;</p>
                </div>
                <div className='coin__total-container'>
                    <p className='coin__crypto_total-title'>Разница: </p>
                    <p className='coin__crypto_total-price'>{new Intl.NumberFormat('ru-RU').format(parseFloat(profit).toFixed())} &#8381;</p>
                </div>

                <button className='coin__form-submit' onClick={handleProfitClick}>total</button>
                {/* <p className='coin__crypto_value-today'>курс: {new Intl.NumberFormat('ru-RU').format(parseFloat(coinToday).toFixed())} &#8381;</p> */}
                    
                    
                    {/* <p className='coin__crypto_total-value-today'>цена битков сегодня: </p>
                    <p className='coin__crypto_total-value-today'>{new Intl.NumberFormat('ru-RU').format(parseFloat(coinsToday).toFixed())} &#8381;</p> */}
                    
                </form>
            </div>
        </div>
    )
}

export default App

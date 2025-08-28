import React from 'react'

import stayls from './NotFaundBlock.module.scss';

const NotFaundBlock: React.FC = () => {
    return (

        <div className={stayls.root}>
            <h1>
                <span>{"\u{1F615}"}</span>
                <br />
                ничего не найдено
            </h1>
            <p className={stayls.descirption}>К сожалению данная страница отсутствует в нашем интернет-магазине  </p>
        </div>

    )
}

export default NotFaundBlock;

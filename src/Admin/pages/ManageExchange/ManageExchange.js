import React, {Component, useState, useEffect} from 'react';

import { AddStockExchangeModal } from '../../components/ManageExchange/AddStockExchangeModal/AddStockExchangeModal';
import "./ManageExchange.css";

import { BASE_URL } from '../../../services/url';
import { getRequest } from '../../../services/NetworkRequests';

export const ManageExchange = () => {
    
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [data, setData] = useState([]);

    const toggleAddStockExchangeModal = (value) => {
        setIsModalOpen(value);
    } 

    useEffect(() => {
        getRequest(BASE_URL + '/stockExchanges').then(
            (data) => {
                console.log(data);
                setData(data);
            }
        ).catch(
            error => console.log(error)
        )
    }, [])

    return (
      <div>
        <AddStockExchangeModal
          isOpen={isModalOpen}
          toggle={toggleAddStockExchangeModal}
        />
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            margin: 20,
          }}
        >
          List of Stock Exchange
        </div>
        {data.map((item, index) => (
          <div>
            <div className="stock-exchange-list-container">
              <div>{item.stockExchangeName}</div>
              <div>{item.brief}</div>
              <div>{item.address}</div>
              <div>{item.remarks}</div>
            </div>
          </div>
        ))}
        <button
          onClick={() => {
            toggleAddStockExchangeModal(true);
          }}
        >
          Add Stock Exchange
        </button>
      </div>
    );
}
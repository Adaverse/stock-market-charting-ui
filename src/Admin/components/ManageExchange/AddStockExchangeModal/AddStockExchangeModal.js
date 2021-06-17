import React, { useState } from 'react';
import Modal from 'react-modal';

import { postRequest, putRequest } from "../../../../services/NetworkRequests";
import { BASE_URL } from "../../../../services/url";

import './AddStockExchange.css'

const customStyles = {
    content: {
      top: '40%',
      left: '50%',
      right: 'auto',
      bottom: 'auto',
      marginRight: '-50%',
      transform: 'translate(-50%, -50%)',
      minWidth: window.innerWidth*0.3 
    },
  };

  export function AddStockExchangeModal({isOpen, toggle}) {

    const [formData, setFormData] = useState({stockExchangeName: '', brief: '', address: '', remarks: ''});

    const AddStockExchange = (formData) => {
        postRequest(BASE_URL + "/addStockExchange", formData).then(
            (data) => {
                console.log(data);
            }
        ).catch(
            error => console.log(error)
        )
    }

    return (
      <div>
        <Modal
          isOpen={isOpen}
          style={customStyles}
          contentLabel="Example Modal"
        >
          <div className="heading-modal">Add new stock Exchange</div>
          <div>
              <div className="single-input-container">
                <div>
                    Stock Exchange Name
                </div>
                <div style={{paddingTop:1}}>
                    <input
                        type = 'text'
                        onChange= {(e) => setFormData((data) => ({...data, stockExchangeName: e.target.value}))}
                    />
                </div>
              </div>
              <div className="single-input-container">
                <div>
                    Brief
                </div>
                <div style={{paddingTop:1}}>
                    <textarea
                        type = 'text'
                        onChange= {(e) => setFormData((data) => ({...data, brief: e.target.value}))}
                    />
                </div>
              </div>
              <div className="single-input-container">
                <div>
                    Address
                </div>
                <div style={{paddingTop:1}}>
                    <textarea
                        type = 'text'
                        onChange= {(e) => setFormData((data) => ({...data, address: e.target.value}))}
                    />
                </div>
              </div>
              <div className="single-input-container">
                <div>
                    Remarks
                </div>
                <div style={{paddingTop:1}}>
                    <textarea
                        type = 'text'
                        onChange= {(e) => setFormData((data) => ({...data, remarks: e.target.value}))}
                    />
                </div>
              </div>
          </div>
          <button onClick={() => AddStockExchange(formData)}>Submit</button>
          <button onClick={() => toggle(false)}>Close</button>
        </Modal>
      </div>
    );
  }
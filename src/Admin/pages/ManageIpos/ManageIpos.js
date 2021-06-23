import React, {Component, useState, useEffect} from 'react';

import { AddIpoModal } from '../../components/ManageIpos/AddIpoModal/AddIpoModal';

import { BASE_URL } from '../../../services/url';
import { getRequest } from '../../../services/NetworkRequests';

export const ManageIpos = () => {
    
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [data, setData] = useState([]);

    const toggleAddSector = (value) => {
        setIsModalOpen(value);
    } 

    useEffect(() => {
        getRequest(BASE_URL + '/ipos').then(
            (data) => {
                var temp = [];
                for(let i = 0; i < data.length; i++) {
                    if(data[i].company){
                        temp.push(data[i]);
                    }
                }
                setData((data) => ([...data, ...temp]));
            }
        ).catch(
            error => console.log(error)
        )
    }, [])
    
    return (
      <div>
        <AddIpoModal
          isOpen={isModalOpen}
          toggle={toggleAddSector}
        />
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            margin: 20,
          }}
        >
          List of Ipos
        </div>
        <div class="container">
          <div class="row" style={{ backgroundColor: "lightblue" }}>
            <div class="col">Total Shares</div>
            <div class="col">Price Per Share</div>
            <div class="col">Open Date Time</div>
            <div class="col">Remarks</div>
            <div class="col">Company</div>
          </div>
        </div>
        {data.map((item, index) => (
          <div class="container">
            <div class="row">
              <div class="col">{item.totalShares}</div>
              <div class="col">{item.pricePerShare}</div>
              <div class="col">{item.openDateTime}</div>
              <div class="col">{item.remarks}</div>
              <div class="col">{item.company.companyName}</div>
            </div>
          </div>
        ))}
        <div class="container">
          <div class="row">
            <div class = "col-12">
              <button
                onClick={() => {
                  toggleAddSector(true);
                }}
                class="btn btn-primary"
              >
                Add Ipo
              </button>
            </div>
          </div>
        </div>
      </div>
    );
}
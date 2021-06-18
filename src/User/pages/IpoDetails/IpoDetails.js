import React, {Component, useState, useEffect} from 'react';

import { BASE_URL } from '../../../services/url';
import { getRequest } from '../../../services/NetworkRequests';

export const IpoDetails = () => {

    const [data, setData] = useState([]);

    useEffect(() => {
        getRequest(BASE_URL + "/ipos").then(
            (data) => {
                console.log(data);
                setData(data);
            }
        ).catch((error) => {
            console.log(error);
        })
    }, [])

    return (
      <div>
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
            <div class="col">Comapny Name</div>
            <div class="col">Price/Share</div>
            <div class="col">Total Shares</div>
            <div class="col">Open Date time</div>
            <div class="col">remarks</div>
          </div>
        </div>
        <div>
          {data.map((item, index) => (
            <div className="ipo-list-container" key={index}>
              <div class="container">
                <div class="row">
                  <div class="col">{item.company.companyName}</div>
                  <div class="col">{item.pricePerShare}</div>
                  <div class="col">{item.totalShares}</div>
                  <div class="col">{item.openDateTime}</div>
                  <div class="col">{item.remarks}</div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    );
}

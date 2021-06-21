import React, {Component, useState, useEffect} from 'react';

import { AddSectorModal } from '../../components/ManageSectors/AddSectorModal/AddSectorModal';

import { BASE_URL } from '../../../services/url';
import { getRequest } from '../../../services/NetworkRequests';

export const ManageSectors = () => {
    
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [data, setData] = useState([]);

    const toggleAddSector = (value) => {
        setIsModalOpen(value);
    } 

    useEffect(() => {
        getRequest(BASE_URL + '/getSectors').then(
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
        <AddSectorModal
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
          List of Stock Exchange
        </div>
        <div class="container">
          <div class="row" style={{ backgroundColor: "lightblue" }}>
            <div class="col">Sector Name</div>
            <div class="col">Brief</div>
          </div>
        </div>
        {data.map((item, index) => (
          <div class="container">
            <div class="row">
              <div class="col">{item.sectorName}</div>
              <div class="col">{item.brief}</div>
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
                Add Sector
              </button>
            </div>
          </div>
        </div>
      </div>
    );
}
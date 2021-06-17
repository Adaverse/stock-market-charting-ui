import React, { useState, useEffect} from 'react';

import { AddCompanyModal } from '../../components/ManageCompanies/AddCompanyModal/AddCompanyModal';
import "./ManageCompanies.css"

import { BASE_URL } from '../../../services/url';
import { getRequest } from '../../../services/NetworkRequests';

export const ManageCompanies = () => {

    const [isModalOpen, setIsModalOpen] = useState(false);
    const [data, setData] = useState([]);
    const [mode, setMode] = useState('add');
    const [editData, setEditData] = useState({});

    const toggleAddCompanyModal = (value) => {
        setIsModalOpen(value);
    }

    useEffect(() => {
        getRequest(BASE_URL + "/companies").then(
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
          <AddCompanyModal isOpen = {isModalOpen} toggle={toggleAddCompanyModal} mode = {mode} editData = {editData}/>
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            margin:20
          }}
        >
          List of Companies
        </div>
        {data.map((item, index) => (<div className="company-list-container" key = {index}>
          <div>{item.companyName}</div>
          <div>{item.ceo}</div>
          <div>{item.boardDirectors}</div>
          <div>{item.briefWriteup}</div>
          <div>
            <button onClick={
                () => {
                    setMode("edit");
                    setEditData(item);
                    toggleAddCompanyModal(true);
                }
            }>Edit</button>
          </div>
        </div>))}
        <div>
            <button onClick={() => {
                    setMode("add");
                    toggleAddCompanyModal(true);
                }}>
                Add Company
            </button>
        </div>
      </div>
    );
}
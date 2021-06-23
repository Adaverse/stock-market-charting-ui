import React, { useState, useEffect} from 'react';
import Modal from 'react-modal';

import { postRequest, putRequest, getRequest } from "../../../../services/NetworkRequests";
import { BASE_URL } from "../../../../services/url";

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

  export function AddIpoModal({isOpen, toggle}) {

    const [companyList, setCompanyList] = useState([]);
    const [formData, setFormData] = useState({pricePerShare: '', totalShares: '', openDateTime: '', remarks:'', companyName: ''});

    const addIpo = (formData) => {
        console.log(formData);
        postRequest(BASE_URL + "/addIpo", formData).then(
            (data) => {
                console.log(data);
            }
        ).catch(
            error => console.log(error)
        )
    }

    
    useEffect(() => {
        getRequest(BASE_URL + "/companies").then(
            (data) => {
                console.log(data);
                var temp = [];
                for(let i = 0; i < data.length; i++) {
                    temp.push(data[i].companyName);
                }
                setCompanyList(temp);
                setFormData((data) => ({...data, companyName:temp[0]}))
            }
        ).catch((error) => {
            console.log(error);
        })
    }, [])

    return (
      <div>
        <Modal
          isOpen={isOpen}
          style={customStyles}
          contentLabel="Example Modal"
        >
          <div className="heading-modal">Add Ipo</div>
          <div>
            <div className="single-input-container">
              <div>Total Shares</div>
              <div style={{ paddingTop: 3 }}>
                <input
                  type="text"
                  onChange={(e) =>
                    setFormData((data) => ({
                      ...data,
                      totalShares: e.target.value,
                    }))
                  }
                />
              </div>
            </div>
            <div className="single-input-container">
              <div>Price Per Share</div>
              <div style={{ paddingTop: 1 }}>
                <input
                  type="text"
                  onChange={(e) =>
                    setFormData((data) => ({
                      ...data,
                      pricePerShare: e.target.value,
                    }))
                  }
                />
              </div>
            </div>
            <div className="single-input-container">
              <div>Open Date Time</div>
              <div style={{ paddingTop: 1 }}>
                <input
                  type="text"
                  onChange={(e) =>
                    setFormData((data) => ({
                      ...data,
                      openDateTime: e.target.value,
                    }))
                  }
                />
              </div>
            </div>
            <div className="single-input-container">
              <div>Remarks</div>
              <div style={{ paddingTop: 1 }}>
                <input
                  type="text"
                  onChange={(e) =>
                    setFormData((data) => ({
                      ...data,
                      remarks: e.target.value,
                    }))
                  }
                />
              </div>
            </div>
            <div className="single-input-container">
              <div>Company</div>
              <div style={{ paddingTop: 1 }}>
                <select
                  class="form-select"
                  aria-label="Default select example"
                  onChange={(e) =>
                    setFormData((data) => ({
                      ...data,
                      companyName: e.target.value,
                    }))
                  }
                >
                  {/* <option selected>Select Company</option>
                  <option value="1">One</option>
                  <option value="2">Two</option>
                  <option value="3">Three</option> */}
                  {companyList.map((item, index) => (
                    <option value={item} key={index}>
                      {item}
                    </option>
                  ))}
                </select>
              </div>
            </div>
          </div>
          <button class="btn btn-success" onClick={() => addIpo(formData)}>Submit</button>
          <button class="btn btn-warning" onClick={() => toggle(false)}>Close</button>
        </Modal>
      </div>
    );
  }
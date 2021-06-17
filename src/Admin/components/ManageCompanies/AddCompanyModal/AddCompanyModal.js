import React, { useState, useEffect} from 'react';
import Modal from 'react-modal';

import { postRequest, putRequest } from "../../../../services/NetworkRequests";
import { BASE_URL } from "../../../../services/url";

import './AddCompanyModal.css'

const customStyles = {
    content: {
      top: '40%',
      left: '50%',
      right: 'auto',
      bottom: 'auto',
      marginRight: '-50%',
      transform: 'translate(-50%, -50%)',
      minWidth: window.innerWidth*0.25
    },
  };

  export function AddCompanyModal({isOpen, toggle, mode, editData}) {

    const [formData, setFormData] = useState({companyName: '', turnOver: '', ceo: '', boardDirectors: '', briefWriteup: ''});

    const addCompany = (formData) => {
        postRequest(BASE_URL + "/addCompany", formData).then(
            (data) => {
                console.log(data);
            }
        ).catch(
            error => console.log(error)
        )
    }

    const updateCompany = (formData) => {
        console.log(formData);
        putRequest(BASE_URL + "/updateCompany", formData).then(
            (data) => {
                console.log(data);
            }
        ).catch(
            error => console.log(error)
        )
    }

    useEffect(() => {
        console.log('this is edit data', editData)
        if(mode === 'edit') {
            setFormData({companyName: editData.companyName, turnOver: editData.turnOver, ceo: editData.ceo, boardDirectors: editData.boardDirectors, briefWriteup: editData.briefWriteup})
        } else {
            setFormData({companyName: '', turnOver: '', ceo: '', boardDirectors: '', briefWriteup: ''})
        }
    }, [mode])

    const onSubmit = () => {
        if(mode === 'add') {
            addCompany(formData);
        } else {
            let tempData = formData;
            tempData['id'] = editData.id;
            updateCompany(tempData);
        }
    }

    return (
      <div>
        <Modal
          isOpen={isOpen}
          style={customStyles}
          contentLabel="Example Modal"
        >
          <div className="heading-modal">Create new company</div>
          <div>
              <div className="single-input-conatainer">
                <div>
                    Comapany Name
                </div>
                <div>
                    <input
                        type = 'text'
                        value = {formData.companyName}
                        onChange= {(e) => setFormData((data) => ({...data, companyName: e.target.value}))}
                    />
                </div>
              </div>
              <div className="single-input-conatainer">
                <div>
                    CEO
                </div>
                <div>
                    <input
                        type = 'text'
                        value = {formData.ceo}
                        onChange= {(e) => setFormData((data) => ({...data, ceo: e.target.value}))}
                    />
                </div>
              </div>
              <div className="single-input-conatainer">
                <div>
                    Board Members
                </div>
                <div>
                    <input
                        type = 'text'
                        value = {formData.boardDirectors}
                        onChange= {(e) => setFormData((data) => ({...data, boardDirectors: e.target.value}))}
                    />
                </div>
              </div>
              <div className="single-input-conatainer">
                <div>
                    Turn Over
                </div>
                <div>
                    <input
                        type = 'text'
                        value = {formData.turnOver}
                        onChange= {(e) => setFormData((data) => ({...data, turnOver: e.target.value}))}
                    />
                </div>
              </div>
              <div className="single-input-conatainer">
                <div>
                    Brief Description
                </div>
                <div>
                    <textarea
                        type = 'text'
                        value = {formData.briefWriteup}
                        onChange= {(e) => setFormData((data) => ({...data, briefWriteup: e.target.value}))}
                    />
                </div>
              </div>
          </div>
          <button onClick={() => {onSubmit()}}>Submit</button>
          <button onClick={() => toggle(false)}>Close</button>
        </Modal>
      </div>
    );
  }
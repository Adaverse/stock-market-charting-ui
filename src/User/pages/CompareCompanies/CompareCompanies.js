import React, {Component, useState, useEffect} from 'react';
import { Bar, Line } from "react-chartjs-2";

import { BASE_URL } from '../../../services/url';
import { getRequest } from '../../../services/NetworkRequests';

export const CompareCompanies = () => {

    const [data, setData] = useState([

        ]
    );

    const [formData, setFormData] = useState({companyCode_ : '', to : '', from : ''});
    const [showForm, setShowForm] = useState(false);

    const [company, setCompany] = useState(0);

    function getRandomColor() {
        var letters = '0123456789ABCDEF';
        var color = '#';
        for (var i = 0; i < 6; i++) {
          color += letters[Math.floor(Math.random() * 16)];
        }
        return color;
      }
      const sorter = (a, b) => {
        return new Date(a).getTime() - new Date(b).getTime();
      }

    const [labels, setLabels] = useState([])
    
    const l = [
        'January',
        'February',
        'March',
        'April',
        'May',
        'June',
        "July",
        "b",
    ]

    const height = 100;
    
    const options = {
        legend: {
            display: true,
            postition: "left",
        },
        maintainAspectRatio: true,
        scales: {
            xAxes: [
                {
                    gridLines: {
                        color: "white",
                    },
                },
            ],
        },
    };

    const getData = (companyCode, from, to, callNumber) => {
        console.log(BASE_URL + "/getCompanyStockPrice" + "/" + companyCode + "/" + from + "/" + to);
        getRequest(BASE_URL + '/getCompanyStockPrice' + "/" + companyCode + "/" + from + "/" + to).then(
            (data1) => {
                var dataPoint = [];
                var color = getRandomColor();
                var label = "Company " + callNumber;
                var tempLabels = labels;
                for(let i = 0; i < data1.length; i++) {
                    dataPoint.push(data1[i].stockPrice)
                    var tempDate = new Date(data1[i].date)
                    if(!tempLabels.includes(tempDate.getTime())){
                        tempLabels.push(tempDate.getTime());
                    }
                }
                tempLabels.sort();
                var tempData = {label: label, borderColor: color, data: dataPoint};
                setData(data => [...data, tempData]);
                setLabels((data) => [...tempLabels]);
                setCompany(company + 1);
                setFormData({companyCode_ : '', to : '', from : ''});
            }
        ).catch(
            error => console.log(error)
        )
    }

    // useEffect(() => {
    //     getData(500101, "01-01-2012", "31-12-2019", company);
    //     setCompany((data) => (data + 1));
    // }, [])

    return (
      <div>
        This is Compare Companies screen.
        <Line
          data={{
            labels: labels,
            datasets: data,
          }}
          height={height}
          width={window.innerWidth * 0.5}
          options={options}
        />
        <button onClick={() => {setShowForm(!showForm)}}>Add Company</button>
        { showForm && <div>
          <div class="container">
            <div class="row">
              <div class="col">Company Code </div>
              <div class="col">
                <input
                  type="text"
                  value={formData.companyCode_}
                  onChange={(e) => {setFormData((data) => ({...formData, companyCode_: e.target.value}))}}
                />
              </div>
              <div class="col"></div>
              <div class="col"></div>
            </div>
          </div>
          <div class="container">
            <div class="row">
              <div class="col">To </div>
              <div class="col">
                <input
                  type="text"
                  value={formData.to}
                  onChange={(e) => {setFormData((data) => ({...formData, to: e.target.value}))}}
                />
              </div>
              <div class="col"></div>
              <div class="col"></div>
            </div>
          </div>
          <div class="container">
            <div class="row">
              <div class="col">From </div>
              <div class="col">
                <input
                  type="text"
                  value={formData.from}
                  onChange={(e) => {setFormData((data) => ({...formData, from: e.target.value}))}}
                />
              </div>
              <div class="col"></div>
              <div class="col"></div>
            </div>
          </div>
          <div class="container">
            <div class="row">
              <div class="col">
                <button onClick={() => getData(formData.companyCode_, formData.to, formData.from, company + 1)}>Submit</button>      
            </div>
              <div class="col"></div>
              <div class="col"></div>
              <div class="col"></div>
            </div>
          </div>
        </div>}
      </div>
    );
}
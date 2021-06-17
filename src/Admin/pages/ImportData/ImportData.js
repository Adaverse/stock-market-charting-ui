import React, { useState, useEffect} from 'react';
import * as XLSX from "xlsx";

import { postRequest } from '../../../services/NetworkRequests';
import { BASE_URL } from '../../../services/url';

export const ImportData = () => {

    const [items, setItems] = useState([]);
    const [uploadSummary, setUploadSummary] = useState({to:'', from: '', companyName: '', stockExchange: '', records: ''});

    var dateList = [];
    var stockExchangeList = [];

    const readExcel = (file) => {

      const promise = new Promise((resolve, reject) => {
        const fileReader = new FileReader();
        fileReader.readAsArrayBuffer(file);

        fileReader.onload = (e) => {
          const bufferArray = e.target.result;

          const wb = XLSX.read(bufferArray, { type: "buffer" });

          const wsname = wb.SheetNames[0];

          const ws = wb.Sheets[wsname];

          const data = XLSX.utils.sheet_to_json(ws, { header: 1 ,raw:false,dateNF:'dd-mm-yyyy'});
            console.log(data);
          resolve(data);
        };

        fileReader.onerror = (error) => {
          reject(error);
        };
      });

      promise.then((d) => {
        setItems(d);
      });
    };
    
    useEffect(() => {
        if(items.length > 1){
            // find date index
            var dateIndex = null;
            var stockExchangeIndex = null;

            for (let i = 0; i < items[0].length; i ++) {
                if(items[0][i].includes("Date")){
                    dateIndex = i;
                }
            }

            for (let i = 0; i < items[0].length; i++) {
                if(items[0][i].includes("Stock Exchange")){
                    stockExchangeIndex = i;
                }
            }

            for (let i = 1; i < items.length; i++) {
                let split = items[i][dateIndex].split("/")
                if(split.length === 3){
                    dateList.push(split[1] + "/" + split[0] + "/" + split[2]);
                }
                // console.log(items[i][dateIndex]);
                // console.log(dateList[i - 1]);

                items[i][dateIndex] = new Date(dateList[i - 1] + items[i][4]).toJSON()
            }

            for (let i = 1; i < items.length; i++) {
                if(!stockExchangeList.includes(items[i][stockExchangeIndex])){
                    stockExchangeList.push(items[i][stockExchangeIndex]);
                }
            }

            const sorter = (a, b) => {
                return new Date(a).getTime() - new Date(b).getTime();
             }
            
            var to = new Date(dateList[dateList.length - 1]);
            setUploadSummary((data) => ({...data, to: to.getDate() + "/" + (to.getMonth() + 1) + "/" + to.getFullYear()}));
            var from = new Date(dateList[0]);
            setUploadSummary((data) => ({...data, from: from.getDate() + "/" + (from.getMonth() + 1) + "/" + from.getFullYear()}));
            setUploadSummary((data) => ({...data, stockExchange: stockExchangeList.join(','), records: items.length - 1}));
        }
    }, [items])

    const convertData = (date, time) => {
        // data = "10/10/2020"
        // time = "10:30:00"
        var split = date.split("/");
        var _date = split[2] + "-" + split[1] + "-" + split[0] + "T" + time;
        return _date.split(" ").join("");
    }

    const getData = () => {
        var _data = [];
        if(items.length > 1){
            for(let i = 1; i < items.length; i++) {
                // let date = items[i][3].replaceAll("/", "-")

                _data.push({
                    "stockPrice": parseFloat(items[i][2]),
                    "date": items[i][3],
                    "companyCode": {
                        "companyCode": items[i][0]
                    },
                    "stockExchange": items[i][1]
                })
            }
        }
        return _data;
    }

    useEffect(() => {
        console.log(uploadSummary);
        getData();
    }, [uploadSummary])

    const onUpload = () => {
        console.log(getData());
        postRequest(BASE_URL + '/addStockPrice', getData()).then(
            (data) => {
                console.log(data);
            }
        ).catch(
            error => console.log(error)
        )
    }
      
    return (
      <div>
        <input
          type="file"
          onChange={(e) => {
            const file = e.target.files[0];
            readExcel(file);
          }}
        />
        {/* {items.length > 0 ? (
          <table class="table container">
            <thead>
              <tr>
                {items[0].map((item, index) => (
                  <th scope="col" key={index}>
                    {item}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {items.slice(1, items.length).map((d) => (
                <tr key={d.Item}>
                  <td>{d[0]}</td>
                  <td>{d[1]}</td>
                  <td>{d[2]}</td>
                  <td>{d[3]}</td>
                  <td>{d[4]}</td>
                </tr>
              ))}
            </tbody>
          </table>
        ) : (
          <></>
        )} */}
        {items.length > 0 ? (
          <div>
            <div>
              <div>Summary of upload</div>
              <div>Stock Exchange: {uploadSummary.stockExchange}</div>
              <div>No. of records imported: {uploadSummary.records}</div>
              <div>From data: {uploadSummary.from}</div>
              <div>To data: {uploadSummary.to}</div>
            </div>
            <button onClick={() => onUpload()}>Upload</button>
          </div>
        ) : (
          <></>
        )}
      </div>
    );
}
const express = require('express');
const app = express();
const port = 3000;

app.use(express.json());

const filterData = (data) => {
     return data.filter(el=>el!='' && el!=null)
  }

const insert = (str, index, value) => {
    return str.substr(0, index) + value + str.substr(index);
}
app.post('/api/v1/parse', (req,res)=>{
    const requestData = req.body.data.split('0');
    const filteredData = filterData(requestData);
    console.log('filterdata',filteredData);
    const resPayload = {
         "statusCode": 200,
         data : {
            'firstName': filteredData[0] + '0000',
            'lastName': filteredData[1] + '000',
            'clientId': filteredData[2]
         }
       
    }
    res.json(resPayload)
})
app.post('/api/v2/parse', (req,res)=>{
    const requestData = req.body.data.split('0');
    const filteredData = filterData(requestData);
    const clientId = insert(filteredData[2],3,'-');
    const resPayload = {
        "statusCode": 200,
         data : {
            'firstName': filteredData[0],
            'lastName': filteredData[1],
            'clientId': clientId
         }
    }
    res.json(resPayload)
})

app.listen(port, ()=>{
    console.log('server listing on 3000')
})
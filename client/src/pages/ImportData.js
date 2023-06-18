import React, { useState } from 'react';
import axios from '../api/axios';
const ImportData = () => {
    const [dataFile,setDataFile]=useState("")
    const handleSubmit = async () => {
        const formData = new FormData();
        formData.append("dataFile", dataFile);
        await axios.post("http://localhost:3500/uploadImportData", formData, {
            params: { userId: localStorage.getItem("userName") },
          });
      };
  return (
    <div>
       {<input
        onChange={(e) => {
            setDataFile(e.target.files[0]);
        }}
        type="file"
      />}
      {<button onClick={handleSubmit}>Upload</button>}
    </div>
  );
}

export default ImportData;


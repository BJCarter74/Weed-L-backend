const axios = require("axios");
const Strain = require("./models/Strain");

async function fetchData() {
  try {
    const response = await axios.get("https://weed-strain1.p.rapidapi.com/", {
      params: {
        ordering: "-strain",
      },
      headers: {
        "X-RapidAPI-Key": "d60903208emsh84fb3d16ba36ba0p1e2b13jsn25327163d27e",
        "X-RapidAPI-Host": "weed-strain1.p.rapidapi.com",
      },
    });
    const data = response.data;
    await insertData(data);
  } catch (error) {
    console.error("Error fetching data:", error);
  }
}

async function insertData(data) {
  try {
    const processedData = data.map((item) => ({
      ...item,
      thc: item.thc === "NaN" ? null : parseFloat(item.thc),
      cbd: item.cbd === "NaN" ? null : parseFloat(item.cbd),
      cbg: item.cbg === "NaN" ? null : parseFloat(item.cbg),
    }));
    await Strain.bulkCreate(processedData);
    console.log("Data inserted successfully");
  } catch (error) {
    console.error("Error inserting data:", error);
  }
}

module.exports = fetchData;

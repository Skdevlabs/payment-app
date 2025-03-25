import axios from "axios";

const api = axios.create({
    baseURL: 'https://api.sandbox.bvnk.com/api/v1/pay'
})

export const getQuoteData = async (uuid) => {
    try {
        const response = await api.get(`/${uuid}/summary`);
        return response.data;
    } catch (err) {
        console.error("Error fetching summary:", err);
        throw err;
    }

}

export const getQuoteDataForCoin = async (selectedCurrency, uuid) => {
  try {
    const response = await api.put(`/${uuid}/update/summary`, {
      currency: selectedCurrency,
      payInMethod: "crypto",
    });
    return response.data;
  } catch (err) {
    console.error("Error updating summary:", err);
    throw err;
  }
};

export const getAcceptQuoteData = async (uuid) => {
  try {
    const response = await api.put(`/${uuid}/accept/summary`, {
      successUrl: "no_url",
    });
    return response.data;
  } catch (err) {
    console.error("Error accepting summary:", err);
    throw err;
  }
};

import { axiosInstance } from 'api/axiosInstance';
import axios from 'axios';

// ACCOUTN GROUP
export const getAllAccountGroups = async () => {
  try {
    const response = await axiosInstance.get(`/get_AllAccountGroup`, {
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded'
      }
    });
    return response.data;
  } catch (error) {
    throw error;
  }
};

//GET LEDGER
export const getAllLedger = async () => {
  try {
    const response = await axiosInstance.get(`/get_AllLedger?CompanyID=1`, {
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded'
      }
    });
    return response.data;
  } catch (error) {
    throw error;
  }
};

//GET PARTIES
export const getAllParty = async () => {
  try {
    const response = await axiosInstance.get(`/get_AllParty?CompanyID=1`, {
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded'
      }
    });
    return response.data;
  } catch (error) {
    throw error;
  }
};




//GET SalesInvoice
export const getAllSalesInvoice = async () => {
  try {
    const response = await axios.get('https://assurelite.datacubeglobal.com/Api/index.php/Entries/get_AllBills?companyid=1',{
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded'
      }
    });
    return response.data;
  } catch (error) {
    throw error;
  }
};


//GET SalesInvoice
export const getAllSalesQuotation = async () => {
  try {
    const response = await axios.get('https://assurelite.datacubeglobal.com/Api/index.php/Entries/get_AllQuotation?companyid=1',{
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded'
      }
    });
    return response.data;
  } catch (error) {
    throw error;
  }
};




//GET SalesOrder
export const getAllSalesOrder = async () => {
  try {
    const response = await axios.get('https://assurelite.datacubeglobal.com/Api/index.php/Entries/get_AllSalesOrder?companyid=1',{
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded'
      }
    });
    return response.data;
  } catch (error) {
    throw error;
  }
};




//GET journal
export const getAllSalesJournal = async () => {
  try {
    const response = await axios.get('https://assurelite.datacubeglobal.com/Api/index.php/Entries/get_AllJournal?companyid=1',{
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded'
      }
    });
    return response.data;
  } catch (error) {
    throw error;
  }
};



//GET Sales Return
export const getAllSalesReturn = async () => {
  try {
    const response = await axios.get('https://assurelite.datacubeglobal.com/Api/index.php/Entries/get_AllSalesReturn?companyid=1',{
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded'
      }
    });
    return response.data;
  } catch (error) {
    throw error;
  }
};



export const getAllPayment = async () => {
  try {
    const response = await axios.get('https://assurelite.datacubeglobal.com/Api/index.php/Entries/get_AllPayments?companyid=1',
      {
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded'
        }
      }
    );
    return response.data;
  } catch (error) {
    throw error;
  }
};


export const getAllReceipt = async () => {
  try {
    const response = await axios.get('https://assurelite.datacubeglobal.com/Api/index.php/Entries/get_AllReceipts?companyid=1',
      {
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded'
        }
      }
    );
    return response.data;
  } catch (error) {
    throw error;
  }
};

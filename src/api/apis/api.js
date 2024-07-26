import axios from 'axios';
import { axiosInstance } from './axiosInstance';

// =========== Company ============ //
export const addCompany = async (values) => {
  try {
    const jsonDataa = JSON.stringify(values);
    const data = `data=${jsonDataa}`;

    const response = await axiosInstance.post('/add_company', data, {
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded'
      }
    });
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const getAllCompanyDetails = async () => {
  try {
    const response = await axiosInstance.get(`/get_AllCompany`, {
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded'
      }
    });
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const companyDetailById = async (CompanyID) => {
  try {
    const response = await axiosInstance.get(`get_AllCompanyByID?companyid=${CompanyID}`, {
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded'
      }
    });
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const updateCompany = async (values) => {
  try {
    const jsonDataa = JSON.stringify(values);
    const data = `data=${jsonDataa}`;

    const response = await axiosInstance.post('/update_company', data, {
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded'
      }
    });
    return response.data;
  } catch (error) {
    throw error;
  }
};

//ACCOUNT GROUP
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

//GET PRODUCT
export const getAllProduct = async () => {
  try {
    const response = await axiosInstance.get(`/get_AllProducts?CompanyID=1`, {
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

//GET UNIT
export const getAllUnit = async () => {
  try {
    const response = await axiosInstance.get(`/get_AllUnits`, {
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded'
      }
    });
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const getAllCategory = async () => {
  try {
    const response = await axiosInstance.get(
      `/get_AllCategory?CompanyID=1
`,
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

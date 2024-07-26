import { axiosInstance } from 'api/axiosInstance';

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

export const GetAllTaxSchedule = async () => {
  try {
    const response = await axiosInstance.get(
      `/get_AllTaxSchedule
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

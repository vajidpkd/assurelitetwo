import { useState, useEffect } from 'react';
import PageHead from '../../components/PageHead';
import { TextField, Autocomplete } from '@mui/material';
import ClearIcon from '@mui/icons-material/Clear';
import { Button } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

function AddSalesInvoice() {
  const [todays, setToday] = useState('');
  const [rows, setRows] = useState([]);
  const [taxType, setTaxType] = useState('');
  const [invoiceData, setInvoiceData] = useState({
    invoiceNumber: '',
    customer: '',
    address: '',
    contact: '',
    remarks: '',
  });
  const navigate = useNavigate();

  useEffect(() => {
    const today = new Date();
    const formattedDate = today.toISOString().split('T')[0];
    setToday(formattedDate);
  }, []);

  const addRow = () => {
    setRows((prevRows) => [
      ...prevRows,
      {
        slNo: prevRows.length + 1,
        barcode: '',
        productName: '',
        mrp: '',
        uom: '',
        Qty: '',
        rate: '',
        grossAmount: '',
        discountPercent: '',
        discountAmount: '',
        addlDiscountPercent: '',
        addlDiscountAmount: '',
        netAmount: '',
        tax: '',
        cgst: '',
        sgst: '',
        igst: '',
        cess: '',
        total: ''
      }
    ]);
  };

  const handleInputChange = (index, field, value) => {
    const updatedRows = rows.map((row, i) => (i === index ? { ...row, [field]: value } : row));
    setRows(updatedRows);
  };

  const deleteRow = (index) => {
    setRows((prevRows) =>
      prevRows
        .filter((_, i) => i !== index)
        .map((row, i) => ({
          ...row,
          slNo: i + 1
        }))
    );
  };

  const taxtypes = [{ label: 'Unregistered' }, { label: 'Local' }, { label: 'Inter' }];

  const handleChange = (e) => {
    const { name, value } = e.target;
    setInvoiceData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const payload = {
        ...invoiceData,
        date: todays,
        taxType,
        rows,
      };
      const response = await axios.post('https://assurelite.datacubeglobal.com/Api/index.php/Entries/add_sales_invoice', payload);
      if (response.data.status) {
        // Handle success
        alert('Invoice added successfully');
        navigate('/path-to-redirect');
      } else {
        // Handle error
        alert('Failed to add invoice');
      }
    } catch (error) {
      console.error('Error adding invoice:', error);
    }
  };

  return (
    <div>
      <div className="main-content">
        <div className="page-content">
          <div className="container-fluid">
            <PageHead master="Sales" head="Add Sales Invoice" />
            <div className="row">
              <div className="col-lg-12">
                <div className="card">
                  <div className="card-body">
                    <form onSubmit={handleSubmit}>
                      <div className="col-lg-12">
                        <div className="row">
                          <div className="col-sm-3 mb-2">
                            <label htmlFor="invoiceNumber" className="form-label">
                              Invoice Number
                            </label>
                            <TextField
                              type="text"
                              size="small"
                              fullWidth
                              name="invoiceNumber"
                              value={invoiceData.invoiceNumber}
                              onChange={handleChange}
                              placeholder="Invoice Number"
                            />
                          </div>
                          <div className="col-sm-3 mb-2">
                            <label htmlFor="date" className="form-label">
                              Date
                            </label>
                            <TextField
                              size="small"
                              fullWidth
                              type="date"
                              value={todays}
                              onChange={(e) => setToday(e.target.value)}
                            />
                          </div>
                          <div className="col-sm-3">
                            <label htmlFor="customer" className="form-label">
                              Customers
                            </label>
                            <Autocomplete
                              disablePortal
                              size="small"
                              fullWidth
                              options={taxtypes}
                              name="customer"
                              renderInput={(params) => (
                                <TextField
                                  {...params}
                                  placeholder="Select Customer"
                                  name="customer"
                                  value={invoiceData.customer}
                                  onChange={handleChange}
                                />
                              )}
                            />
                          </div>
                          <div className="col-sm-3 mb-2">
                            <label htmlFor="address" className="form-label">
                              Address
                            </label>
                            <TextField
                              type="text"
                              size="small"
                              fullWidth
                              name="address"
                              value={invoiceData.address}
                              onChange={handleChange}
                              placeholder="Address"
                            />
                          </div>
                          <div className="col-sm-3">
                            <label htmlFor="contact" className="form-label">
                              Contact
                            </label>
                            <TextField
                              type="text"
                              size="small"
                              fullWidth
                              name="contact"
                              value={invoiceData.contact}
                              onChange={handleChange}
                              placeholder="Contact Number"
                            />
                          </div>
                          <div className="col-sm-3">
                            <label htmlFor="taxType" className="form-label">
                              Tax Type
                            </label>
                            <Autocomplete
                              disablePortal
                              size="small"
                              fullWidth
                              options={taxtypes}
                              name="taxType"
                              value={taxType}
                              onChange={(e, value) => setTaxType(value?.label || '')}
                              renderInput={(params) => (
                                <TextField
                                  {...params}
                                  placeholder="Select Tax Type"
                                />
                              )}
                            />
                          </div>
                          <div className="col-sm-6">
                            <label htmlFor="remarks" className="form-label">
                              Remarks
                            </label>
                            <TextField
                              type="text"
                              size="small"
                              fullWidth
                              name="remarks"
                              value={invoiceData.remarks}
                              onChange={handleChange}
                              placeholder="Remark"
                            />
                          </div>
                        </div>
                      </div>
                      <div className="col-lg-12 mt-4">
                        <div className="table-responsive mt-5">
                          <table id="mytable" style={{ width: '100%' }} className="table table-bordered">
                            <thead>
                              <tr>
                                <th></th>
                                <th>Sl.No</th>
                                <th style={{ textAlign: 'center' }}>Barcode</th>
                                <th style={{ textAlign: 'center' }}>Product Name</th>
                                <th style={{ textAlign: 'center' }}>MRP</th>
                                <th style={{ textAlign: 'center' }}>UOM</th>
                                <th style={{ textAlign: 'center' }}>Rate</th>
                                <th style={{ textAlign: 'center' }}>Qty</th>
                                <th style={{ textAlign: 'center', width: '100%' }}>Gross Amount</th>
                                <th style={{ textAlign: 'center' }}>Discount(%)</th>
                                <th style={{ textAlign: 'center' }}>Discount(₹)</th>
                                <th style={{ textAlign: 'center' }}>Net Amount</th>
                                <th style={{ textAlign: 'center' }}>Tax(₹)</th>
                                <th style={{ textAlign: 'center' }}>CGST(₹)</th>
                                <th style={{ textAlign: 'center' }}>SGST(₹)</th>
                                <th style={{ textAlign: 'center' }}>IGST(₹)</th>
                                <th style={{ textAlign: 'center' }}>Cess(₹)</th>
                                <th style={{ textAlign: 'center' }}>Total</th>
                              </tr>
                            </thead>
                            <tbody>
                              {rows.map((row, index) => (
                                <tr key={index}>
                                  <td>
                                    <div
                                      onClick={() => deleteRow(index)}
                                      className="bg-red-600 flex items-center justify-center w-[23px] h-[23px] rounded-md"
                                    >
                                      <ClearIcon className="text-sm text-white" />
                                    </div>
                                  </td>
                                  <td>{row.slNo}</td>
                                  <td>
                                    <TextField
                                      type="text"
                                      size="small"
                                      value={row.barcode}
                                      onChange={(e) => handleInputChange(index, 'barcode', e.target.value)}
                                      fullWidth
                                    />
                                  </td>
                                  <td>
                                    <TextField
                                      type="text"
                                      size="small"
                                      value={row.productName}
                                      onChange={(e) => handleInputChange(index, 'productName', e.target.value)}
                                      fullWidth
                                    />
                                  </td>
                                  <td>
                                    <TextField
                                      type="text"
                                      size="small"
                                      value={row.mrp}
                                      onChange={(e) => handleInputChange(index, 'mrp', e.target.value)}
                                      fullWidth
                                    />
                                  </td>
                                  <td>
                                    <TextField
                                      type="text"
                                      size="small"
                                      value={row.uom}
                                      onChange={(e) => handleInputChange(index, 'uom', e.target.value)}
                                      fullWidth
                                    />
                                  </td>
                                  <td>
                                    <TextField
                                      type="text"
                                      size="small"
                                      value={row.rate}
                                      onChange={(e) => handleInputChange(index, 'rate', e.target.value)}
                                      fullWidth
                                    />
                                  </td>
                                  <td>
                                    <TextField
                                      type="text"
                                      size="small"
                                      value={row.Qty}
                                      onChange={(e) => handleInputChange(index, 'Qty', e.target.value)}
                                      fullWidth
                                    />
                                  </td>
                                  <td>
                                    <TextField
                                      type="text"
                                      size="small"
                                      value={row.grossAmount}
                                      onChange={(e) => handleInputChange(index, 'grossAmount', e.target.value)}
                                      fullWidth
                                    />
                                  </td>
                                  <td>
                                    <TextField
                                      type="text"
                                      size="small"
                                      value={row.discountPercent}
                                      onChange={(e) => handleInputChange(index, 'discountPercent', e.target.value)}
                                      fullWidth
                                    />
                                  </td>
                                  <td>
                                    <TextField
                                      type="text"
                                      size="small"
                                      value={row.discountAmount}
                                      onChange={(e) => handleInputChange(index, 'discountAmount', e.target.value)}
                                      fullWidth
                                    />
                                  </td>
                                  <td>
                                    <TextField
                                      type="text"
                                      size="small"
                                      value={row.netAmount}
                                      onChange={(e) => handleInputChange(index, 'netAmount', e.target.value)}
                                      fullWidth
                                    />
                                  </td>
                                  <td>
                                    <TextField
                                      type="text"
                                      size="small"
                                      value={row.tax}
                                      onChange={(e) => handleInputChange(index, 'tax', e.target.value)}
                                      fullWidth
                                    />
                                  </td>
                                  <td>
                                    <TextField
                                      type="text"
                                      size="small"
                                      value={row.cgst}
                                      onChange={(e) => handleInputChange(index, 'cgst', e.target.value)}
                                      fullWidth
                                    />
                                  </td>
                                  <td>
                                    <TextField
                                      type="text"
                                      size="small"
                                      value={row.sgst}
                                      onChange={(e) => handleInputChange(index, 'sgst', e.target.value)}
                                      fullWidth
                                    />
                                  </td>
                                  <td>
                                    <TextField
                                      type="text"
                                      size="small"
                                      value={row.igst}
                                      onChange={(e) => handleInputChange(index, 'igst', e.target.value)}
                                      fullWidth
                                    />
                                  </td>
                                  <td>
                                    <TextField
                                      type="text"
                                      size="small"
                                      value={row.cess}
                                      onChange={(e) => handleInputChange(index, 'cess', e.target.value)}
                                      fullWidth
                                    />
                                  </td>
                                  <td>
                                    <TextField
                                      type="text"
                                      size="small"
                                      value={row.total}
                                      onChange={(e) => handleInputChange(index, 'total', e.target.value)}
                                      fullWidth
                                    />
                                  </td>
                                </tr>
                              ))}
                            </tbody>
                          </table>
                          <Button
                            variant="contained"
                            className="bg-[#f0f0f0] text-primary hover:bg-primary hover:text-[#f0f0f0]"
                            onClick={addRow}
                          >
                            Add Item
                          </Button>
                        </div>
                      </div>
                      <div className="col-lg-12">
                        <div className="text-center">
                          <Button type="submit" variant="contained" className="bg-blue-500 text-white">
                            Save
                          </Button>
                        </div>
                      </div>
                    </form>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default AddSalesInvoice;

import { useState, useEffect } from 'react';
import PageHead from '../../components/PageHead';
import { Select, TextField, MenuItem } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import Autocomplete from '@mui/material/Autocomplete';
import { Button } from '@mui/material';
import ClearIcon from '@mui/icons-material/Clear';

function UpdateSalesQuotation() {
  const [todays, setToday] = useState('');
  const [rows, setRows] = useState([]);
  const [taxtype, setTaxtype] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    const today = new Date();
    const formattedDate = today.toISOString().split('T')[0];
    setToday(formattedDate);
  }, []);

  // const [showAdditionalDiscountRows, setShowAdditionalDiscountRows] = useState([]);

  // const toggleAdditionalDiscount = (index) => {
  //   setShowAdditionalDiscountRows((prev) => (prev.includes(index) ? prev.filter((i) => i !== index) : [...prev, index]));
  // };

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

  const taxtypes = [{ label: 'Unregisted' }, { label: 'Local' }, { label: 'Inter' }];

  return (
    <div>
      <div className="main-content">
        <div className="page-content">
          <div className="container-fluid">
            <PageHead master="Sales" head="Update Sales Invoice" />
            <div className="row">
              <div className="col-lg-12">
                <div className="card">
                  <div className="card-body">
                    <div className="col-lg-12">
                      <div className="row">
                        <div className="col-sm-3 mb-2">
                          <label htmlFor="example-url-input" className="form-label">
                            Invoice Number
                          </label>
                          <TextField type="text" size="small" fullWidth placeholder="Invoice Number" />
                        </div>
                        <div className="col-sm-3 mb-2">
                          <label htmlFor="example-email-input" className="form-label">
                            Date
                          </label>
                          <TextField size="small" fullWidth type="date" value={todays} onChange={(e) => setToday(e.target.value)} />
                        </div>
                        <div className="col-sm-3">
                          <label htmlFor="cmb_purchasetype" className="form-label">
                            Customers
                          </label>
                          <Autocomplete
                            disablePortal
                            size="small"
                            fullWidth
                            id="combo-box-demo"
                            options={taxtypes}
                            name="taxtype"
                            renderInput={(params) => <TextField {...params} placeholder="Select Tax Type" />}
                          />
                        </div>
                        <div className="col-sm-3 mb-2">
                          <label htmlFor="example-url-input" className="form-label">
                            Address
                          </label>
                          <TextField type="text" size="small" fullWidth placeholder="Address" />
                        </div>
                        <div className="col-sm-3">
                          <label htmlFor="example-url-input" className="form-label">
                            Contact
                          </label>
                          <TextField type="text" size="small" fullWidth placeholder="Contact Number" />
                        </div>
                        <div className="col-sm-3">
                          <label htmlFor="cmb_purchasetype" className="form-label">
                            Tax Type
                          </label>
                          <Autocomplete
                            disablePortal
                            size="small"
                            fullWidth
                            id="combo-box-demo"
                            options={taxtypes}
                            name="taxtype"
                            renderInput={(params) => <TextField {...params} placeholder="Select Tax Type" />}
                          />
                        </div>
                        <div className="col-sm-6">
                          <label htmlFor="txt_remarks" className="form-label">
                            Remarks
                          </label>
                          <TextField type="text" size="small" fullWidth placeholder="Remark" />
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
                              <th style={{ textAlign: 'center' }}>ProductName</th>
                              <th style={{ textAlign: 'center' }}>MRP</th>
                              <th style={{ textAlign: 'center' }}>UOM</th>
                              <th style={{ textAlign: 'center' }}>Rate</th>
                              <th style={{ textAlign: 'center' }}>Qty</th>
                              <th style={{ textAlign: 'center', width: '100%' }}>Gross Amount</th>
                              <th style={{ textAlign: 'center' }}>Discount(%)</th>
                              <th style={{ textAlign: 'center' }}>Discount(₹)</th>

                              <th style={{ textAlign: 'center' }}>Net.Amount</th>
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
                                  <input
                                    type="text"
                                    className="form-control bg-white"
                                    value={row.barcode}
                                    onChange={(e) => handleInputChange(index, 'barcode', e.target.value)}
                                    style={{ width: '130px' }}
                                  />
                                </td>
                                <td>
                                  <input
                                    type="text"
                                    className="form-control bg-white"
                                    value={row.productName}
                                    onChange={(e) => handleInputChange(index, 'productName', e.target.value)}
                                    style={{ width: '190px' }}
                                  />
                                </td>
                                <td>
                                  <input
                                    type="text"
                                    className="form-control bg-white"
                                    value={row.mrp}
                                    onChange={(e) => handleInputChange(index, 'mrp', e.target.value)}
                                    style={{ width: '70px' }}
                                  />
                                </td>
                                <td>
                                  <input
                                    type="text"
                                    className="form-control bg-white"
                                    value={row.uom}
                                    onChange={(e) => handleInputChange(index, 'uom', e.target.value)}
                                    style={{ width: '60px' }}
                                  />
                                </td>
                                <td>
                                  <input
                                    type="text"
                                    className="form-control bg-white"
                                    value={row.rate}
                                    onChange={(e) => handleInputChange(index, 'rate', e.target.value)}
                                    style={{ width: '60px' }}
                                  />
                                </td>
                                <td>
                                  <input
                                    type="text"
                                    className="form-control bg-white"
                                    value={row.Qty}
                                    onChange={(e) => handleInputChange(index, 'Qty', e.target.value)}
                                    style={{ width: '70px' }}
                                  />
                                </td>
                                <td>
                                  <input
                                    type="text"
                                    className="form-control bg-white"
                                    value={row.grossAmount}
                                    onChange={(e) => handleInputChange(index, 'grossAmount', e.target.value)}
                                    style={{ width: '96px' }}
                                  />
                                </td>
                                <td>
                                  <input
                                    type="text"
                                    className="form-control bg-white"
                                    value={row.discountPercent}
                                    onChange={(e) => handleInputChange(index, 'discountPercent', e.target.value)}
                                  />
                                  {/* {showAdditionalDiscountRows.includes(index) && (
                                    <input
                                      type="text"
                                      className="form-control mt-2"
                                      placeholder="Add'l (%)"
                                      value={row.addlDiscountPercent}
                                      onChange={(e) => handleInputChange(index, 'addlDiscountPercent', e.target.value)}
                                      style={{ width: '85px' }}
                                    />
                                  )} */}
                                </td>
                                <td>
                                  <input
                                    type="text"
                                    className="form-control bg-white"
                                    value={row.discountAmount}
                                    onChange={(e) => handleInputChange(index, 'discountAmount', e.target.value)}
                                  />
                                  {/* {showAdditionalDiscountRows.includes(index) && (
                                    <input
                                      type="text"
                                      className="form-control mt-2"
                                      placeholder="add'l (₹)"
                                      value={row.addlDiscountAmount}
                                      onChange={(e) => handleInputChange(index, 'addlDiscountAmount', e.target.value)}
                                      style={{ width: '85px' }}
                                    />
                                  )} */}
                                </td>

                                <td>
                                  <input
                                    type="text"
                                    className="form-control bg-white"
                                    value={row.netAmount}
                                    onChange={(e) => handleInputChange(index, 'netAmount', e.target.value)}
                                  />
                                </td>
                                <td>
                                  <input
                                    type="text"
                                    className="form-control bg-white"
                                    value={row.tax}
                                    onChange={(e) => handleInputChange(index, 'tax', e.target.value)}
                                    style={{ width: '70px' }}
                                  />
                                </td>
                                <td>
                                  <input
                                    type="text"
                                    className="form-control bg-white"
                                    value={row.cgst}
                                    onChange={(e) => handleInputChange(index, 'cgst', e.target.value)}
                                    style={{ width: '70px' }}
                                  />
                                </td>
                                <td>
                                  <input
                                    type="text"
                                    className="form-control bg-white"
                                    value={row.sgst}
                                    onChange={(e) => handleInputChange(index, 'sgst', e.target.value)}
                                    style={{ width: '70px' }}
                                  />
                                </td>
                                <td>
                                  <input
                                    type="text"
                                    className="form-control bg-white"
                                    value={row.igst}
                                    onChange={(e) => handleInputChange(index, 'igst', e.target.value)}
                                    style={{ width: '70px' }}
                                  />
                                </td>
                                <td>
                                  <input
                                    type="text"
                                    className="form-control bg-white"
                                    value={row.cess}
                                    onChange={(e) => handleInputChange(index, 'cess', e.target.value)}
                                    style={{ width: '70px' }}
                                  />
                                </td>
                                <td>
                                  <input
                                    type="text"
                                    className="form-control bg-white"
                                    value={row.total}
                                    onChange={(e) => handleInputChange(index, 'total', e.target.value)}
                                    style={{ width: '90px' }}
                                  />
                                </td>
                              </tr>
                            ))}
                          </tbody>
                        </table>
                      </div>
                      <div className="col-sm">
                        <button type="button" id="btnAddrow" className="btn btn-link btn-add-row waves-effect waves-light" onClick={addRow}>
                          Add Row +
                        </button>
                      </div>
                      <div className="col-lg-12">
                        <div style={{ width: '100%' }}>
                          <table className="table-responsive">
                            <thead>
                              <tr>
                                <th>Gross</th>
                                <th>Discount</th>
                                <th>CGST</th>
                                <th>SGST</th>
                                <th>IGST</th>
                                <th>Tax</th>
                                <th>Cess</th>
                                <th>Total</th>
                              </tr>
                            </thead>
                            <tbody>
                              <tr>
                                <td>
                                  <input
                                    type="number"
                                    className="form-control bg-white"
                                    style={{ textAlign: 'right' }}
                                    id="totalGross"
                                    disabled
                                  />
                                </td>
                                <td>
                                  <input
                                    type="number"
                                    className="form-control bg-white"
                                    style={{ textAlign: 'right' }}
                                    id="totalDiscount"
                                    disabled
                                  />
                                </td>
                                <td>
                                  <input
                                    type="number"
                                    className="form-control bg-white"
                                    style={{ textAlign: 'right' }}
                                    id="totalCGST"
                                    disabled
                                  />
                                </td>
                                <td>
                                  <input
                                    type="number"
                                    className="form-control bg-white"
                                    style={{ textAlign: 'right' }}
                                    id="totalSGST"
                                    disabled
                                  />
                                </td>
                                <td>
                                  <input
                                    type="number"
                                    className="form-control bg-white"
                                    style={{ textAlign: 'right' }}
                                    id="totalIGST"
                                    disabled
                                  />
                                </td>
                                <td>
                                  <input
                                    type="number"
                                    className="form-control bg-white"
                                    style={{ textAlign: 'right' }}
                                    id="totalTax"
                                    disabled
                                  />
                                </td>
                                <td>
                                  <input
                                    type="number"
                                    className="form-control bg-white"
                                    style={{ textAlign: 'right' }}
                                    id="totalCess"
                                    disabled
                                  />
                                </td>
                                <td>
                                  <input
                                    type="number"
                                    className="form-control bg-white"
                                    style={{ textAlign: 'right' }}
                                    id="grandTotal"
                                    disabled
                                  />
                                </td>
                              </tr>
                            </tbody>
                          </table>
                        </div>
                      </div>
                    </div>
                    <div className="flex justify-end">
                      <div className="col-lg-6 mt-2">
                        <div className="flex flex-col justify-end">
                          <table>
                            <tbody>
                              <tr>
                                <td>Other Charges</td>
                                <td>
                                  <input
                                    type="text"
                                    id="txt_othercharges"
                                    style={{ textAlign: 'right' }}
                                    className="form-control col-lg-12"
                                  />
                                </td>
                              </tr>
                              <tr>
                                <td>Cash Discount</td>
                                <td>
                                  <input type="text" id="txt_cashdisc" style={{ textAlign: 'right' }} className="form-control col-lg-12 " />
                                </td>
                              </tr>
                              <tr>
                                <td>Roundoff</td>
                                <td id="roundoff">
                                  <h6 style={{ marginTop: '5px' }}>0.00</h6>
                                </td>
                              </tr>
                              <tr>
                                <td>
                                  <h5>Grand Total:</h5>
                                </td>
                                <td id="MainTotal">
                                  <h5>0.00</h5>
                                </td>
                              </tr>
                            </tbody>
                          </table>
                          <div className="col-lg-12">
                            <div style={{ float: 'right', alignItems: 'end' }}>
                              {/* <button type="button" className="btn btn-secondary" onClick={() => navigate('/PurchaseMaster')}>
                                Close
                              </button>
                              <button type="button" className="btn btn-primary ms-[8px]">
                                Primary
                              </button> */}

                              <Button variant="contained" color="secondary" size="small">
                                Close
                              </Button>
                              <Button variant="contained" size="small" className="ms-3" type="submit">
                                Save
                              </Button>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
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

export default UpdateSalesQuotation;

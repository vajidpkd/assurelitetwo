// import Select from "react-select";
import AddIcon from '@mui/icons-material/Add';
import { useState, useEffect } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import PropTypes from 'prop-types';
import { Formik, Form } from 'formik';
import * as Yup from 'yup';
import TextField from '@mui/material/TextField';
import MenuItem from '@mui/material/MenuItem';
import Select from '@mui/material/Select';
// import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
// import { faCircleXmark } from '@fortawesome/free-solid-svg-icons';
// import { FormLabel } from '@mui/material';
function PaymentReceipt({ name }) {
  const [voucherno, setVoucherNo] = useState(1);
  const [todayDate, setTodayDate] = useState();
  const [show, setShow] = useState(false);
  const [rows, setRows] = useState([]);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  useEffect(() => {
    const today = new Date();
    const formattedDate = today.toISOString().split('T')[0]; // format as YYYY-MM-DD
    setTodayDate(formattedDate);
  }, []);

  const DisplayingErrorMessagesSchema = Yup.object().shape({
    accountname: Yup.string().required('Account Name is required'),
    amount: Yup.number().required('Amount is required'),
    discount: Yup.number().required('Discount is required'),
    referalno: Yup.string().required('Referral No is required'),
    narration: Yup.string().required('Narration is required')
  });

  const addRow = (values) => {
    setRows([...rows, values]);
    handleClose();
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
  return (
    <div className="row">
      <div className="col-lg-12">
        <div className="card">
          <div className="card-body">
            <div className="row">
              <div className="col-sm">
                <div className="mb-4">
                  <button
                    type="button"
                    id="btnAdd"
                    className="btn btn-primary waves-effect btn-label waves-light"
                    onClick={() => setVoucherNo(1)}
                  >
                    <AddIcon className="label-icon" style={{ fontSize: '0.1rem !important' }} /> New Voucher
                  </button>
                </div>
              </div>
              <div className="col-sm">
                <div className="mb-4"></div>
              </div>
            </div>

            <div className="col-lg-12">
              <div className="row">
                <div className="col-sm-2">
                  <label htmlFor="txtVoucher" className="form-label">
                    Voucher No
                  </label>
                  <div className="d-flex">
                    <button
                      className="btn-sm btn-soft-primary"
                      id="btnMinus"
                      onClick={() => setVoucherNo(voucherno > 1 ? voucherno - 1 : 1)}
                    >
                      &lt;&lt;
                    </button>
                    <TextField size="small" fullWidth type="number" id="txtVoucher" value={voucherno} />
                    <button className="btn-sm btn-soft-primary" id="btnPlus" onClick={() => setVoucherNo(voucherno + 1)}>
                      &gt;&gt;
                    </button>
                  </div>
                </div>
                <div className="col-sm-2">
                  <label htmlFor="example-email-input" className="form-label">
                    Date
                  </label>
                  <TextField
                    size="small"
                    fullWidth
                    type="date"
                    id="datetimePicker"
                    value={todayDate}
                    onChange={(e) => setTodayDate(e.target.value)}
                  />
                </div>
                <div className="col-sm-4">
                  <label htmlFor="txtVoucher" className="form-label">
                    Invoice Number
                  </label>
                  <div className="d-flex">
                    <TextField
                      type="text"
                      size="small"
                      // className="form-control"
                      id="Series_numb"
                      style={{ width: '40%', marginRight: '5px' }}
                      placeholder="Series"
                    />
                    <TextField type="text" size="small" fullWidth id="invoice_number" placeholder="Invoice number" />
                  </div>
                </div>

                <div className="col-sm-2">
                  <label htmlFor="example-tel-input" className="form-label">
                    Cash Account
                  </label>
                  <Select
                    labelId="demo-simple-select-label"
                    id="demo-simple-select"
                    // value={values.ledger}
                    label="Ledger"
                    name="cashaccount"
                    style={{ width: '100%' }}
                    size="small"
                    // onChange={handleChange}
                  >
                    <MenuItem value={10}>Ten</MenuItem>
                    <MenuItem value={20}>Twenty</MenuItem>
                    <MenuItem value={30}>Thirty</MenuItem>
                  </Select>
                </div>

                <div className="col-sm-2">
                  <label htmlFor="example-tel-input" className="form-label">
                    Branch Name
                  </label>
                  <Select
                    labelId="demo-simple-select-label"
                    id="demo-simple-select"
                    // value={values.ledger}
                    label="Ledger"
                    name="ledger"
                    style={{ width: '100%' }}
                    size="small"
                    // onChange={handleChange}
                  >
                    <MenuItem value={10}>Ten</MenuItem>
                    <MenuItem value={20}>Twenty</MenuItem>
                    <MenuItem value={30}>Thirty</MenuItem>
                  </Select>
                </div>

                <div className="col-sm-4">
                  <label htmlFor="example-tel-input" className="form-label">
                    Narration
                  </label>
                  <TextField size="small" fullWidth id="cmb_narration" type="text" placeholder="Narration" />
                </div>
              </div>
            </div>

            <div className="table-responsive table  mt-3">
              <table className="table table-bordered" id="table">
                <thead>
                  <tr>
                    <th style={{ width: '30px' }}></th>
                    <th style={{ width: '55px' }}>Sl No</th>
                    <th style={{ width: '100px', textAlign: 'center' }}>Code </th>
                    <th style={{ width: '100px', textAlign: 'center' }}>Account</th>
                    <th style={{ width: '100px', textAlign: 'center' }}>Amount</th>
                    <th style={{ width: '100px', textAlign: 'center' }}>Disc</th>
                    <th style={{ width: '100px', textAlign: 'center' }}>Total</th>
                    <th style={{ width: '100px', textAlign: 'center' }}>Ref No</th>
                    <th style={{ width: '100px', textAlign: 'center' }}>Narration</th>
                  </tr>
                </thead>
                <tbody id="tableBody">
                  {rows.map((row, index) => (
                    <tr key={index}>
                      <td>
                        {' '}
                        <button type="button" className="btn btn-danger btn-sm" onClick={() => deleteRow(index)}>
                          <FontAwesomeIcon icon={faCircleXmark} />
                        </button>
                      </td>
                      <td>{index + 1}</td>
                      <td>{row.accountname}</td>
                      <td>{row.ledger}</td>
                      <td>{row.amount}</td>
                      <td>{row.discount}</td>
                      <td>{row.total}</td>
                      <td>{row.referalno}</td>
                      <td>{row.narration}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            <div className="col-sm">
              <button
                type="button"
                id="btnAddrows"
                data-bs-toggle="modal"
                data-bs-target="#exampleModal"
                className="btn btn-link btn-add-row waves-effect waves-light"
                onClick={handleShow}
              >
                Add Row +
              </button>
            </div>

            {/* <div className="table-responsive table  mt-3">
                      <table
                        className="table"
                        style="--bs-table-border-color:white !important"
                      >
                        <thead id="footer">
                          <tr>
                            <th style="width: 55px; visibility: hidden;">
                              Sl No
                            </th>
                            <th style="width: 100px; text-align: center; visibility: hidden;">
                              Code{" "}
                            </th>
                            <th style="width: 190px; text-align: center; visibility: hidden;">
                              Account
                            </th>
                            <th style="width: 100px; text-align: center;">
                              <input
                                style="text-align: end; background-color:rgb(255, 255, 255) !important; line-height:0.1 !important"
                                className="form-control"
                                id="amt"
                              ></input>
                            </th>
                            <th style="width: 100px; text-align: center;">
                              <input
                                style="text-align: end; background-color:rgb(255, 255, 255) !important; line-height:0.1 !important"
                                className="form-control"
                                id="dis"
                                // style="background-color:white !important"
                              ></input>
                            </th>
                            <th style="width: 100px; text-align: center;">
                              <input
                                style="text-align: end; background-color:rgb(255, 255, 255) !important; line-height:0.1 !important"
                                className="form-control"
                                id="tot"
                                // style="background-color:white !important"
                              ></input>
                            </th>
                            <th style="width: 100px; text-align: center; visibility: hidden;">
                              Ref No
                            </th>
                            <th style="width: 180px; text-align: center; visibility: hidden;">
                              Narration
                            </th>
                            <th style="width: 50px; text-align: center; visibility: hidden;">
                              Action
                            </th>
                          </tr>
                        </thead>
                      </table>
                    </div> */}

            <div className="col-lg-12">
              <div className="row">
                <div className="col-lg-6"></div>

                <div className="col-lg-12">
                  <div style={{ float: 'right', alignItems: 'end' }}>
                    <button type="button" className="btn btn-primary" id="btn_save">
                      Save
                    </button>
                    <button type="button" className="btn btn-secondary" id="btn_update">
                      Update
                    </button>
                    <button type="button" className="btn btn-danger" id="btn_delete">
                      Delete
                    </button>
                  </div>
                </div>
                <div className="col-lg-6">
                  <div className="mt-3">
                    <div className="row mt-2">
                      <div className="row col-lg-12"></div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <Modal show={show} onHide={handleClose}>
              <Modal.Header closeButton>
                <Modal.Title>{name}</Modal.Title>
              </Modal.Header>
              <Modal.Body>
                <Formik
                  initialValues={{
                    accountname: '',
                    ledger: '',
                    amount: '',
                    discount: '',
                    total: '',
                    referalno: '',
                    narration: ''
                  }}
                  // validationSchema={DisplayingErrorMessagesSchema}
                  // onSubmit={async (values) => {
                  //   console.log(values, "valll");
                  // }}
                  validationSchema={DisplayingErrorMessagesSchema}
                  onSubmit={(values, { setSubmitting }) => {
                    const total = Number(values.amount) - Number(values.discount);
                    addRow({ ...values, total });
                    setSubmitting(false);
                  }}
                >
                  {({ handleChange, handleSubmit, values, errors, touched }) => (
                    <Form onSubmit={handleSubmit}>
                      <div className="row mb-4">
                        <label htmlFor="horizontal-firstname-input" className="col-sm-3 col-form-label">
                          Account Code
                        </label>
                        <div className="col-sm-8">
                          <TextField
                            type="text"
                            id="outlined-basic"
                            label="Account Code"
                            variant="outlined"
                            size="small"
                            name="accountname"
                            onChange={handleChange}
                            value={values.accountname}
                            error={touched && errors.accountname}
                            helperText={errors.accountname}
                            style={{ width: '100%' }}
                          />
                        </div>
                      </div>
                      <div className="row mb-4">
                        <label htmlFor="horizontal-firstname-input" className="col-sm-3 col-form-label">
                          Ledger
                        </label>
                        <div className="col-sm-8">
                          <Select
                            labelId="demo-simple-select-label"
                            id="demo-simple-select"
                            value={values.ledger}
                            label="Ledger"
                            name="ledger"
                            style={{ width: '100%' }}
                            size="small"
                            onChange={handleChange}
                          >
                            <MenuItem value={10}>Ten</MenuItem>
                            <MenuItem value={20}>Twenty</MenuItem>
                            <MenuItem value={30}>Thirty</MenuItem>
                          </Select>
                        </div>
                      </div>
                      <div className="row mb-3">
                        <label htmlFor="horizontal-firstname-input" className="col-sm-4 col-form-label">
                          Available Amount :
                        </label>
                        <div className="col-sm-8">
                          <h6 style={{ marginTop: '11.5px' }} id="txt_avlAmnt"></h6>
                        </div>
                      </div>
                      <div className="row mb-4">
                        <label htmlFor="horizontal-firstname-input" className="col-sm-3 col-form-label">
                          Amount
                        </label>
                        <div className="col-sm-3">
                          <TextField
                            type="number"
                            label="Amount"
                            variant="outlined"
                            size="small"
                            name="amount"
                            onChange={handleChange}
                            value={values.amount}
                            error={touched && errors.amount}
                            helperText={errors.amount}
                            style={{ width: '100%' }}
                          />
                        </div>
                        <label htmlFor="horizontal-firstname-input" className="col-sm-2 col-form-label">
                          Disc
                        </label>
                        <div className="col-sm-3">
                          <TextField
                            type="number"
                            label="Disc"
                            variant="outlined"
                            size="small"
                            name="discount"
                            onChange={handleChange}
                            value={values.discount}
                            error={touched && errors.discount}
                            helperText={errors.discount}
                            style={{ width: '100%' }}
                          />
                        </div>
                      </div>
                      <div className="row mb-4">
                        <label htmlFor="horizontal-firstname-input" className="col-sm-3 col-form-label">
                          Total
                        </label>
                        <div className="col-sm-3">
                          <TextField
                            type="text"
                            label="Total"
                            variant="outlined"
                            size="small"
                            readOnly
                            id="Total"
                            name="total"
                            value={values.total}
                          />
                        </div>
                        <label htmlFor="horizontal-firstname-input" className="col-sm-2 col-form-label">
                          Ref No
                        </label>
                        <div className="col-sm-3">
                          <TextField
                            type="text"
                            label="Ref No"
                            variant="outlined"
                            size="small"
                            name="referalno"
                            onChange={handleChange}
                            value={values.referalno}
                            error={touched && errors.referalno}
                            helperText={errors.referalno}
                            style={{ width: '100%' }}
                          />
                        </div>
                      </div>
                      <div className="row mb-4">
                        <label htmlFor="horizontal-firstname-input" className="col-sm-3 col-form-label">
                          Narration
                        </label>
                        <div className="col-sm-8">
                          <TextField
                            type="text"
                            label="Narration"
                            variant="outlined"
                            size="small"
                            name="narration"
                            onChange={handleChange}
                            value={values.narration}
                            error={touched && errors.narration}
                            helperText={errors.narration}
                            style={{ width: '100%' }}
                          />
                        </div>
                      </div>
                      <div className="modal-footer">
                        <Button variant="secondary" onClick={handleClose}>
                          Close
                        </Button>
                        <Button variant="primary" type="submit">
                          Save
                        </Button>
                      </div>
                    </Form>
                  )}
                </Formik>
              </Modal.Body>
            </Modal>
          </div>
        </div>
      </div>
    </div>
  );
}
PaymentReceipt.propTypes = {
  name: PropTypes.string
};

export default PaymentReceipt;

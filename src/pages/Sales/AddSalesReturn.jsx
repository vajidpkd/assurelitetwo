import { useState, useEffect } from 'react';
import PageHead from '../../components/PageHead';
import { TextField, MenuItem, FormControl, InputLabel, Select, Button } from '@mui/material';
import Autocomplete from '@mui/material/Autocomplete';
import ClearIcon from '@mui/icons-material/Clear';
import axios from 'axios';
import { getAllAccountGroups, getAllParty } from 'api/apis/accountmaster';
import { getAllProduct } from 'api/apis/productmaster';

function AddSalesReturn() {
  const [todays, setToday] = useState('');
  const [accountGroup, setAccountGroup] = useState('');
  const [selectedAccount, setSelectedAccount] = useState(null);
  const [Items, setItems] = useState([]);
  const [product, setProduct] = useState([]);
  const [taxType, setTaxType] = useState('');
  const [selectedTaxType, setSelectedTaxType] = useState('');
  const [customers, setCustomers] = useState([]);
  const [isRounded, setIsRounded] = useState(false);

  const [invoiceData, setInvoiceData] = useState({
    EntryDate: '',
    EntryTime: '',
    Account: '',
    Customer: '',
    Address: '',
    Contact: '',
    BType: '',
    InvoiceNo: '',
    Qty: 0,
    Gross: 0,
    Disc: 0,
    Net: 0,
    CGST: 0,
    SGST: 0,
    IGST: 0,
    Cess: 0,
    Total: 0,
    OtherCharge: '',
    DiscPercent: 0,
    Discount: 0,
    RoundOff: 0,
    GrandTotal: 0,
    Received: '',
    Narration: '',
    CompanyID: 1,
    UserID: 1,
    MultiReceipt: []
  });

  const taxtypes = [
    { label: 'Unregistered', value: 'unregistered' },
    { label: 'Regular', value: 'regular' },
    { label: 'Inter', value: 'inter' }
  ];

  //RECEIVED CHANGE
  const handleReceivedChange = (event) => {
    const receivedValue = parseFloat(event.target.value) || 0;
    setInvoiceData((prevData) => ({
      ...prevData,
      Received: receivedValue
    }));
  };

  //PAYMENT TYPE CHANGE
  const handlePaymentTypeChange = (type) => {
    setInvoiceData((prevData) => ({
      ...prevData,
      PaymentType: type
    }));
  };

  //CASH DISCOUNT
  const handleCashDiscountChange = (event) => {
    const discountValue = parseFloat(event.target.value) || '';
    setInvoiceData((prevData) => ({
      ...prevData,
      Discount: discountValue
    }));
  };

  //HANDLE CHANGE
  const handleChange = (e) => {
    const { name, value } = e.target;
    setInvoiceData((prevData) => ({
      ...prevData,
      [name]: value
    }));
  };

  //USE EFFECT FOR  PRODUCT
  useEffect(() => {
    const fetchDetails = async () => {
      try {
        const data = await getAllProduct();
        console.log(data);
        if (Array.isArray(data)) {
          const reversed = data.reverse();
          setProduct(reversed);
        } else {
          console.error('Data is not an array:', data);
        }
      } catch (error) {
        console.error('Error fetching company details:', error);
      }
    };
    fetchDetails();
  }, []);

  //GET ALL CSTOMERS
  useEffect(() => {
    const fetchDetails = async () => {
      try {
        const data = await getAllParty();
        console.log(data, '???????');
        if (Array.isArray(data)) {
          const reversed = data.reverse();
          setCustomers(reversed);
        } else {
          console.error('Data is not an array:', data);
        }
      } catch (error) {
        console.error('Error fetching company details:', error);
      }
    };
    fetchDetails();
  }, []);

  //USE EFFECT FOR CALCULATE TOTAL
  useEffect(() => {
    calculateTotals();
  }, [Items, invoiceData.OtherCharge, selectedTaxType, invoiceData.Discount, invoiceData.MultiReceipt]);

  //FOR GETTING CURRENT DATE AND TIME
  useEffect(() => {
    const today = new Date();
    const formattedDate = today.toISOString().split('T')[0];
    const formattedTime = `${today.getHours()}:${today.getMinutes()}:${today.getSeconds()}`;
    setToday(formattedDate);
    setInvoiceData((prevState) => ({
      ...prevState,
      EntryDate: formattedDate,
      EntryTime: formattedTime
    }));
  }, []);

  //GET ALL ACCOUNT GROUPS
  useEffect(() => {
    const fetchDetails = async () => {
      try {
        const data = await getAllAccountGroups();
        if (Array.isArray(data)) {
          const reversed = data.reverse();
          console.log(reversed);
          setAccountGroup(reversed);
        } else {
          console.error('Data is not an array:', data);
        }
      } catch (error) {
        console.error('Error fetching company details:', error);
      }
    };
    fetchDetails();
  }, []);

  //ACCOUNT GROUP
  useEffect(() => {
    if (selectedAccount) {
      setInvoiceData((prevData) => ({
        ...prevData,
        Account: selectedAccount.GroupName || 'CASH'
      }));
    }
  }, [selectedAccount]);

  //ITEMS ROWS
  const addRow = () => {
    setItems((prevRows) => [
      ...prevRows,
      {
        slNo: prevRows.length + 1,
        Barcode: '',
        ItemName: '',
        MRP: 0.0,
        Unit: '',
        Qty: 0,
        SRate: 0.0,
        Gross: 0.0,
        DiscPer: 0.0,
        Disc: 0.0,
        Net: 0.0,
        CGST: 0.0,
        SGST: 0.0,
        IGST: 0.0,
        Cess: 0.0,
        Description: '',
        Total: 0.0
      }
    ]);
  };

  //FOR CONERTION STRING TO FLOAT (ITEMS)
  const convertItems = (items) => {
    return items.map((item) => ({
      Barcode: item.Barcode || '',
      Cess: parseFloat(item.Cess) || 0,
      CGST: parseFloat(item.CGST) || 0,
      Description: item.Description || '',
      Disc: parseFloat(item.Disc) || 0,
      DiscPer: parseFloat(item.DiscPer) || 0,
      Gross: parseFloat(item.Gross) || 0,
      IGST: parseFloat(item.IGST) || 0,
      ItemName: item.ItemName || '',
      MRP: parseFloat(item.MRP) || 0,
      Net: parseFloat(item.Net) || 0,
      Qty: parseFloat(item.Qty) || 0,
      SGST: parseFloat(item.SGST) || 0,
      SRate: parseFloat(item.SRate) || 0,
      Total: parseFloat(item.Total) || 0,
      Unit: item.Unit || ''
    }));
  };

  const calculateTotals = () => {
    let totalGross = 0;
    let totalDiscount = 0;
    let totalCGST = 0;
    let totalSGST = 0;
    let totalIGST = 0;
    let totalCess = 0;
    let grandTotal = 0;
    let totalQty = 0;
    let totalNet = 0;
    let totalDiscPercent = 0;
    // let totalMultiReceipt = 0;
    let receivedAmount = '';
    // let totalTax = 0;
    let totalOtherCharges = parseFloat(invoiceData.OtherCharge) || '';

    Items.forEach((item) => {
      const gross = parseFloat(item.Gross) || 0;
      const disc = parseFloat(item.Disc) || 0;
      const cgst = parseFloat(item.CGST) || 0;
      const sgst = parseFloat(item.SGST) || 0;
      const igst = parseFloat(item.IGST) || 0;
      // const tax = parseFloat(item.Tax) || 0;
      const cess = parseFloat(item.Cess) || 0;
      const qty = parseFloat(item.Qty) || 0;
      const net = parseFloat(item.Net) || 0;
      const discPercent = parseFloat(item.DiscPercent) || 0;

      // Calculate tax amounts
      const cgstAmount = (net * cgst) / 100;
      const sgstAmount = (net * sgst) / 100;
      const igstAmount = (net * igst) / 100;
      const cessAmount = (net * cess) / 100;
      // const taxAmount = (net * tax) / 100;

      // Update totals
      totalGross += gross;
      totalQty += qty;
      totalDiscount += disc;
      totalNet += net;
      // totalTax += taxAmount;
      totalDiscPercent += discPercent;

      if (selectedTaxType === 'regular') {
        totalCGST += cgstAmount;
        totalSGST += sgstAmount;
        totalCess += cessAmount;
      } else if (selectedTaxType === 'inter') {
        totalIGST += igstAmount;
      }
    });

    invoiceData.MultiReceipt.forEach((receipt) => {
      receivedAmount += parseFloat(receipt.Amount) || '';
    });

    console.log('Total Gross:', totalGross);
    console.log('Total Discount:', totalDiscount);
    console.log('Total CGST:', totalCGST);
    console.log('Total SGST:', totalSGST);
    console.log('Total IGST:', totalIGST);
    console.log('Total Cess:', totalCess);
    console.log('Total Other Charges:', totalOtherCharges);

    const bType = selectedTaxType === 'regular' ? 'LOCAL' : selectedTaxType === 'inter' ? 'INTERSTATE' : 'UNREGISTERED';
    // Calculate grand total based on selected tax type
    if (selectedTaxType === 'regular') {
      grandTotal = totalGross - totalDiscount + totalCGST + totalSGST + totalCess + totalOtherCharges;
    } else if (selectedTaxType === 'inter') {
      grandTotal = totalGross - totalDiscount + totalIGST + totalOtherCharges;
    } else if (selectedTaxType === 'unregistered') {
      grandTotal = totalGross - totalDiscount + totalOtherCharges;
    }
    grandTotal -= parseFloat(invoiceData.Discount) || 0;
    setInvoiceData((prevData) => ({
      ...prevData,
      Gross: totalGross,
      Disc: totalDiscount,
      CGST: totalCGST,
      SGST: totalSGST,
      IGST: totalIGST,
      // Tax: totalTax,
      Cess: totalCess,
      Total: grandTotal,
      BType: bType,
      Received: receivedAmount
    }));

    console.log('Grand Total:', grandTotal);
  };

  const deleteRow = (index) => {
    setItems((prevRows) =>
      prevRows
        .filter((_, i) => i !== index)
        .map((row, i) => ({
          ...row,
          slNo: i + 1
        }))
    );
  };

  //API INTEGRATION

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const convertedItems = convertItems(Items);
      const payload = {
        ...invoiceData,
        Items: convertedItems
      };
      const { PaymentType, ...payloadWithoutPaymentType } = payload;
      const jsonData = JSON.stringify(payloadWithoutPaymentType);
      const data = `data=${jsonData}`;
      console.log(payloadWithoutPaymentType, 'Payload to be sent');
      console.log(payload, 'AAAAAAAAAAAAAAAAAAA');
      const response = await axios.post('https://assurelite.datacubeglobal.com/Api/index.php/Entries/add_SalesReturn', data, {
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded'
        }
      });
      if (response.data.status) {
      } else {
        //
      }
    } catch (error) {
      console.error('Error adding invoice:', error);
    }
  };

  // const handleProductSelect = (event, selectedOption, index) => {
  //   const updatedItem = { ...Items[index] };

  //   if (selectedOption) {
  //     const selectedProduct = product.find((product) => product.ItemName === selectedOption.label);
  //     console.log('Selected Product:', selectedProduct);

  //     if (selectedProduct) {
  //       updatedItem.ItemName = selectedProduct.ItemName;
  //       updatedItem.Barcode = selectedProduct.Barcode || '';
  //       updatedItem.SRate = selectedProduct.SRate || '';
  //       updatedItem.Unit = selectedProduct.UnitName || '';
  //       updatedItem.CGST = selectedProduct.CGST || 0;
  //       updatedItem.IGST = selectedProduct.IGST || 0;
  //       updatedItem.SGST = selectedProduct.SGST || 0;
  //       updatedItem.Tax = selectedProduct.Tax || 0;
  //       updatedItem.Cess = selectedProduct.Cess || 0;
  //       updatedItem.Tax = selectedProduct.Tax || '';
  //       updatedItem.Cess = selectedProduct.Cess || '';
  //     }
  //   } else {
  //     updatedItem.ItemName = '';
  //     updatedItem.Barcode = '';
  //     updatedItem.SRate = '';
  //     updatedItem.Unit = '';
  //     updatedItem.Qty = '';
  //     updatedItem.Gross = '';
  //     updatedItem.Net = '';
  //     updatedItem.Disc = '';
  //     updatedItem.DiscPer = '';
  //     updatedItem.CGST = '';
  //     updatedItem.IGST = '';
  //     updatedItem.SGST = '';
  //     updatedItem.Tax = '';
  //   }

  //   const updatedItems = [...Items];
  //   updatedItems[index] = updatedItem;

  //   setItems(updatedItems);
  // };

  const handleProductSelect = (event, selectedOption, index) => {
    const updatedItem = { ...Items[index] };

    if (selectedOption) {
      const selectedProduct = product.find((product) => product.ItemName === selectedOption.label);
      console.log('Selected Product:', selectedProduct);

      if (selectedProduct) {
        updatedItem.ItemName = selectedProduct.ItemName;
        updatedItem.Barcode = selectedProduct.Barcode || '';
        updatedItem.SRate = selectedProduct.SRate || 0;
        updatedItem.Unit = selectedProduct.UnitName || '';
        updatedItem.CGST = selectedProduct.CGST || 0;
        updatedItem.IGST = selectedProduct.IGST || 0;
        updatedItem.SGST = selectedProduct.SGST || 0;
        updatedItem.Tax = selectedProduct.Tax || 0;
        updatedItem.Cess = selectedProduct.Cess || 0;
        // Initialize Qty to 1 if not set
        updatedItem.Qty = updatedItem.Qty || 1;
        // Calculate Gross based on Qty and SRate
        updatedItem.Gross = (updatedItem.Qty * updatedItem.SRate).toFixed(2);
        // Calculate Disc if DiscPer is provided
        updatedItem.DiscPer = updatedItem.DiscPer || 0;
        updatedItem.Disc = ((updatedItem.Gross * updatedItem.DiscPer) / 100).toFixed(2);
        // Calculate Net as Gross - Disc
        updatedItem.Net = (updatedItem.Gross - updatedItem.Disc).toFixed(2);
        // Calculate Total including taxes
        const taxAmount = (parseFloat(updatedItem.Net) * parseFloat(updatedItem.Tax)) / 100;
        updatedItem.Total = (parseFloat(updatedItem.Net) + taxAmount).toFixed(2);
      }
    } else {
      updatedItem.ItemName = '';
      updatedItem.Barcode = '';
      updatedItem.SRate = 0;
      updatedItem.Unit = '';
      updatedItem.Qty = 1;
      updatedItem.Gross = 0;
      updatedItem.Net = 0;
      updatedItem.Disc = 0;
      updatedItem.DiscPer = 0;
      updatedItem.CGST = 0;
      updatedItem.IGST = 0;
      updatedItem.SGST = 0;
      updatedItem.Tax = 0;
      updatedItem.Cess = 0;
      updatedItem.Total = 0;
    }

    const updatedItems = [...Items];
    updatedItems[index] = updatedItem;

    setItems(updatedItems);
  };

  const handleInputChange = (index, field, value) => {
    const updatedItems = [...Items];
    updatedItems[index][field] = parseFloat(value) || 0.0;
    // Update the specific field
    updatedItems[index][field] = value;
    if (field === 'Qty' || field === 'SRate') {
      const qty = parseFloat(updatedItems[index].Qty) || 0;
      const sRate = parseFloat(updatedItems[index].SRate) || 0;
      updatedItems[index].Gross = (qty * sRate).toFixed(2);
    }
    // Calculate Disc if DiscPer changes
    if (field === 'DiscPer') {
      const discPer = parseFloat(value) || 0;
      const gross = parseFloat(updatedItems[index].Gross) || 0;
      updatedItems[index].Disc = ((gross * discPer) / 100).toFixed(2);
    }
    // Calculate DiscPer if Disc changes
    if (field === 'Disc') {
      const disc = parseFloat(value) || 0;
      const gross = parseFloat(updatedItems[index].Gross) || 0;
      updatedItems[index].DiscPer = ((disc / gross) * 100).toFixed(2);
    }
    // Calculate Net as Gross - Disc
    if (field === 'Qty' || field === 'SRate' || field === 'DiscPer' || field === 'Disc') {
      const gross = parseFloat(updatedItems[index].Gross) || 0;
      const disc = parseFloat(updatedItems[index].Disc) || 0;
      updatedItems[index].Net = (gross - disc).toFixed(2);
    }
    if (field === 'Net') {
      const net = parseFloat(updatedItems[index].Net) || 0;
      const taxRate = parseFloat(updatedItems[index].Tax) || 0;
      const taxAmount = (net * taxRate) / 100;
      updatedItems[index].Tax = taxAmount.toFixed(2);
    }

    if (field === 'Qty' || field === 'Net' || field === 'Tax') {
      const qty = parseFloat(updatedItems.Qty) || 0;
      const net = parseFloat(updatedItems.Net) || 0;
      const taxRate = parseFloat(updatedItems.Tax) || 0;
      // Calculate tax based on Qty and Net
      updatedItems.Tax = ((qty * net * taxRate) / 100).toFixed(2);
    }

    //  Check if the field affects the tax calculation
    if (field === 'CGST' || field === 'SGST' || field === 'IGST' || field === 'Net') {
      updatedItems[index].CGST = cgstAmount;
      updatedItems[index].SGST = sgstAmount;
      updatedItems[index].IGST = igstAmount;
    }
    // Parse the updated values to ensure correct calculations
    const net = parseFloat(updatedItems[index].Net) || 0;
    const cgstAmount = parseFloat(updatedItems[index].CGST) || 0;
    const sgstAmount = parseFloat(updatedItems[index].SGST) || 0;
    const igstAmount = parseFloat(updatedItems[index].IGST) || 0;
    console.log(`Net: ${net}, CGST: ${cgstAmount}, SGST: ${sgstAmount}, IGST: ${igstAmount}`);
    // Calculate the total amount
    const total = net + (net * cgstAmount) / 100 + (net * sgstAmount) / 100 + (net * igstAmount) / 100;
    updatedItems[index].Total = total;
    console.log(`Total: ${total}`);

    setItems(updatedItems);
  };

  const calculateGrandTotal = () => {
    const total = Items.reduce((sum, item) => sum + (parseFloat(item.Total) || 0), 0);
    return total;
  };

  const handleMultiReceiptChange = (index, event) => {
    const { name, value } = event.target;
    const updatedMultiReceipt = [...invoiceData.MultiReceipt];
    updatedMultiReceipt[index] = {
      ...updatedMultiReceipt[index],
      [name]: name === 'Amount' ? value : value
    };
    setInvoiceData((prevData) => ({
      ...prevData,
      MultiReceipt: updatedMultiReceipt
    }));
  };

  const addNewReceipt = () => {
    setInvoiceData((prevData) => ({
      ...prevData,
      MultiReceipt: [...prevData.MultiReceipt, { Account: '', Amount: 0 }]
    }));
  };

  const removeReceipt = (index) => {
    const updatedReceipts = [...invoiceData.MultiReceipt];
    updatedReceipts.splice(index, 1);
    setInvoiceData((prevData) => ({
      ...prevData,
      MultiReceipt: updatedReceipts
    }));
  };

  const renderMultiReceipts = () => {
    return invoiceData.MultiReceipt.map((receipt, index) => (
      <div key={index} className="flex items-end mb-2 ">
        <input
          type="text"
          name="Account"
          value={receipt.Account}
          onChange={(e) => handleMultiReceiptChange(index, e)}
          placeholder="Account"
          className="border border-gray-300 rounded px-2 py-1 mr-2 "
        />
        <input
          type="number"
          name="Amount"
          value={receipt.Amount}
          onChange={(e) => handleMultiReceiptChange(index, e)}
          placeholder="Amount"
          className="border border-gray-300 rounded px-2 py-1 mr-2 w-32"
        />
        <button
          onClick={() => removeReceipt(index)}
          className="bg-red-500 text-white rounded px-2 py-1 hover:bg-red-600  focus:ring-red-500 border-none"
        >
          X
        </button>
      </div>
    ));
  };
  return (
    <div>
      <div className="main-content">
        <div className="page-content">
          <div className="container-fluid">
            <PageHead master="Sales" head="Add Sales Return" />
            <div className="row">
              <div className="col-lg-12">
                <div className="card">
                  <div className="col-sm-3 p-3">
                    <label htmlFor="paymentType" className="form-label">
                      Payment Type
                    </label>
                    <div className="flex space-x-2">
                      {' '}
                      <Button
                        variant={invoiceData.PaymentType === 'Cash' ? 'contained' : 'outlined'}
                        onClick={() => handlePaymentTypeChange('Cash')}
                      >
                        {' '}
                        Cash
                      </Button>
                      <Button
                        variant={invoiceData.PaymentType === 'Credit' ? 'contained' : 'outlined'}
                        onClick={() => handlePaymentTypeChange('Credit')}
                      >
                        Credit
                      </Button>
                    </div>
                  </div>
                  <div className="card-body">
                    <div className="col-lg-12">
                      <div className="row">
                        <div className="col-sm-3 mb-2">
                          <label htmlFor="example-url-input" className="form-label">
                            Invoice Number
                          </label>
                          <TextField
                            id="InvoiceNo"
                            name="InvoiceNo"
                            type="text"
                            size="small"
                            fullWidth
                            placeholder="Invoice Number"
                            value={invoiceData.InvoiceNo}
                            onChange={handleChange}
                          />
                        </div>
                        <div className="col-sm-3 mb-2">
                          <label id="date" htmlFor="example-email-input" className="form-label">
                            Date
                          </label>
                          <TextField
                            size="small"
                            fullWidth
                            type="date"
                            value={invoiceData.EntryDate}
                            onChange={(e) => setToday(e.target.value)}
                          />
                        </div>
                        {/* <div className="col-sm-3 mb-2">
                          <label id="Time" htmlFor="example-email-input" className="form-label">
                            Time
                          </label>
                          <TextField
                            size="small"
                            fullWidth
                            type="date"
                            value={invoiceData.EntryTime}
                            onChange={(e) => setToday(e.target.value)}
                          />
                        </div> */}
                        <div className="col-sm-3">
                          <label htmlFor="customerField" className="form-label">
                            {invoiceData.PaymentType === 'Credit' ? 'Select Customer' : 'Customer'}
                          </label>
                          {invoiceData.PaymentType === 'Credit' ? (
                            <FormControl fullWidth size="small">
                              <InputLabel id="customerSelectLabel">Customer</InputLabel>
                              <Select
                                labelId="customerSelectLabel"
                                value={invoiceData.Customer}
                                onChange={handleChange}
                                name="Customer"
                                displayEmpty
                              >
                                <MenuItem value="" disabled></MenuItem>
                                {customers.map((customer) => (
                                  <MenuItem key={customer.id} value={customer.AccountName}>
                                    {customer.AccountName}
                                  </MenuItem>
                                ))}
                              </Select>
                            </FormControl>
                          ) : (
                            <TextField
                              type="text"
                              size="small"
                              fullWidth
                              placeholder="Customer"
                              value={invoiceData.Customer}
                              onChange={handleChange}
                              name="Customer"
                            />
                          )}
                        </div>
                        <div className="col-sm-3 mb-2">
                          <label htmlFor="example-url-input" className="form-label">
                            Address
                          </label>
                          <TextField
                            type="text"
                            size="small"
                            fullWidth
                            placeholder="Address"
                            value={invoiceData.Address}
                            onChange={handleChange}
                            name="Address"
                          />
                        </div>
                        <div className="col-sm-3">
                          <label htmlFor="example-url-input" className="form-label">
                            Contact
                          </label>
                          <TextField
                            type="text"
                            size="small"
                            fullWidth
                            placeholder="Contact Number"
                            value={invoiceData.Contact}
                            onChange={handleChange}
                            name="Contact"
                          />
                        </div>
                        <div className="col-sm-3">
                          <label htmlFor="cmb_purchasetype" className="form-label">
                            Account
                          </label>
                          <Autocomplete
                            disablePortal
                            size="small"
                            fullWidth
                            id="combo-box-demo"
                            options={accountGroup}
                            value={selectedAccount}
                            getOptionLabel={(option) => option.GroupName || ''}
                            onChange={(event, newValue) => {
                              setSelectedAccount(newValue);
                            }}
                            renderInput={(params) => <TextField {...params} placeholder="Select Account" />}
                          />
                        </div>
                        <div className="col-sm-3 mb-2">
                          <label htmlFor="example-url-input" className="form-label">
                            Remarks
                          </label>
                          <TextField
                            type="text"
                            size="small"
                            id="Narration"
                            fullWidth
                            placeholder="Narration"
                            value={invoiceData.Narration}
                            onChange={handleChange}
                            name="Narration"
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
                              <th style={{ textAlign: 'center' }}>ProductName</th>
                              <th style={{ textAlign: 'center' }}>Rate</th>
                              <th style={{ textAlign: 'center' }}>UOM</th>
                              {/* <th style={{ textAlign: 'center' }}>Rate</th> */}
                              <th style={{ textAlign: 'center' }}>Qty</th>
                              {/* <th style={{ textAlign: 'center', width: '100%' }}>Gross Amount</th> */}
                              <th style={{ textAlign: 'center' }}>Discount(%)</th>
                              <th style={{ textAlign: 'center' }}>Discount(₹)</th>
                              {/* <th style={{ textAlign: 'center' }}>Net.Amount</th> */}
                              <th style={{ textAlign: 'center' }}>CGST(₹)</th>
                              <th style={{ textAlign: 'center' }}>SGST(₹)</th>
                              <th style={{ textAlign: 'center' }}>IGST(₹)</th>
                              <th style={{ textAlign: 'center' }}>Cess(₹)</th>
                              <th style={{ textAlign: 'center' }}>Tax</th>
                              <th style={{ textAlign: 'center' }}>Total</th>
                            </tr>
                          </thead>
                          <tbody>
                            {Items.map((row, index) => (
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
                                    type="number"
                                    className="form-control bg-white"
                                    value={row.Barcode}
                                    onChange={(e) => handleInputChange(index, 'Barcode', e.target.value)}
                                    style={{ width: '90px' }}
                                  />
                                </td>
                                <td>
                                  <Autocomplete
                                    options={product.map((p) => ({ label: p.ItemName, id: p.ItemID }))}
                                    getOptionLabel={(option) => option.label}
                                    onChange={(event, newValue) => handleProductSelect(event, newValue, index)}
                                    renderInput={(params) => (
                                      <TextField {...params} size="small" label="Select Product" variant="outlined" fullWidth />
                                    )}
                                    style={{ width: '180px' }}
                                  />
                                </td>
                                <td>
                                  <input
                                    type="number"
                                    className="form-control bg-white"
                                    value={row.SRate}
                                    onChange={(e) => handleInputChange(index, 'SRate', e.target.value)}
                                    style={{ width: '90px' }}
                                  />
                                </td>
                                <td>
                                  <input
                                    type="text"
                                    className="form-control bg-white"
                                    value={row.Unit}
                                    onChange={(e) => handleInputChange(index, 'Unit', e.target.value)}
                                    style={{ width: '60px' }}
                                  />
                                </td>

                                <td>
                                  <input
                                    type="number"
                                    className="form-control bg-white"
                                    value={row.Qty}
                                    onChange={(e) => handleInputChange(index, 'Qty', e.target.value)}
                                    style={{ width: '70px' }}
                                  />
                                </td>
                                {/* <td>
                                  <input
                                    type="number"
                                    className="form-control bg-white"
                                    value={row.Gross}
                                    onChange={(e) => handleInputChange(index, 'Gross', e.target.value)}
                                    style={{ width: '96px' }}
                                    disabled
                                  />
                                </td> */}
                                <td>
                                  <input
                                    type="text"
                                    className="form-control bg-white"
                                    value={row.DiscPer}
                                    onChange={(e) => handleInputChange(index, 'DiscPer', e.target.value)}
                                  />
                                </td>
                                <td>
                                  <input
                                    type="text"
                                    className="form-control bg-white"
                                    value={row.Disc}
                                    onChange={(e) => handleInputChange(index, 'Disc', e.target.value)}
                                  />
                                </td>
                                {/* <td>
                                  <input type="number" className="form-control bg-white" value={row.Net} readOnly />
                                </td> */}
                                <td>
                                  <input
                                    type="text"
                                    className="form-control bg-white"
                                    value={row.CGST}
                                    onChange={(e) => handleInputChange(index, 'CGST', e.target.value)}
                                    style={{ width: '70px' }}
                                    readOnly
                                  />
                                </td>

                                <td>
                                  <input
                                    type="text"
                                    className="form-control bg-white"
                                    value={row.SGST}
                                    onChange={(e) => handleInputChange(index, 'SGST', e.target.value)}
                                    style={{ width: '70px' }}
                                    readOnly
                                  />
                                </td>
                                <td>
                                  <input
                                    type="text"
                                    className="form-control bg-white"
                                    value={row.IGST}
                                    onChange={(e) => handleInputChange(index, 'IGST', e.target.value)}
                                    style={{ width: '70px' }}
                                    readOnly
                                  />
                                </td>
                                <td>
                                  <input
                                    type="text"
                                    className="form-control bg-white"
                                    value={row.Cess}
                                    onChange={(e) => handleInputChange(index, 'Cess', e.target.value)}
                                    style={{ width: '70px' }}
                                    readOnly
                                  />
                                </td>
                                <td>
                                  <input
                                    type="number"
                                    className="form-control bg-white"
                                    value={row.Tax}
                                    onChange={(e) => handleInputChange(index, 'Tax', e.target.value)}
                                    style={{ width: '70px' }}
                                  />
                                </td>
                                <td>
                                  <input
                                    type="number"
                                    className="form-control bg-white"
                                    value={row.Total}
                                    onChange={(e) => handleInputChange(index, 'Total', e.target.value)}
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
                                {/* <th>Tax</th> */}
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
                                    value={invoiceData.Gross || ''}
                                    disabled
                                  />
                                </td>
                                <td>
                                  <input
                                    type="number"
                                    className="form-control bg-white"
                                    style={{ textAlign: 'right' }}
                                    id="totalDiscount"
                                    value={invoiceData.Disc || ''}
                                    disabled
                                  />
                                </td>
                                <td>
                                  <input
                                    type="number"
                                    className="form-control bg-white"
                                    style={{ textAlign: 'right' }}
                                    id="totalCGST"
                                    value={invoiceData.CGST || ''}
                                    disabled
                                  />
                                </td>
                                <td>
                                  <input
                                    type="number"
                                    className="form-control bg-white"
                                    style={{ textAlign: 'right' }}
                                    id="totalSGST"
                                    value={invoiceData.SGST || ''}
                                    disabled
                                  />
                                </td>
                                <td>
                                  <input
                                    type="number"
                                    className="form-control bg-white"
                                    style={{ textAlign: 'right' }}
                                    id="totalIGST"
                                    value={invoiceData.IGST || ''}
                                    disabled
                                  />
                                </td>
                                {/* <td>
                                  <input
                                    type="number"
                                    className="form-control bg-white"
                                    style={{ textAlign: 'right' }}
                                    id="totalTax"
                                    value={invoiceData.Tax || ''}
                                    disabled
                                  />
                                </td> */}
                                <td>
                                  <input
                                    type="number"
                                    className="form-control bg-white"
                                    style={{ textAlign: 'right' }}
                                    id="totalCess"
                                    value={invoiceData.Cess || ''}
                                    disabled
                                  />
                                </td>
                                <td>
                                  <input
                                    type="number"
                                    className="form-control bg-white"
                                    style={{ textAlign: 'right' }}
                                    id="grandTotal"
                                    value={calculateGrandTotal() || ''}
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
                        <div className="flex flex-col">
                          <table>
                            <tbody>
                              <tr>
                                <td>Tax type</td>
                                <Autocomplete
                                  disablePortal
                                  size="small"
                                  fullWidth
                                  id="combo-box-demo"
                                  options={taxtypes}
                                  style={{
                                    textAlign: 'right',
                                    width: '200px',
                                    padding: '4px',
                                    fontSize: '12px'
                                  }}
                                  getOptionLabel={(option) => option.label}
                                  onChange={(event, newValue) => {
                                    setSelectedTaxType(newValue.value);
                                  }}
                                  renderInput={(params) => <TextField {...params} placeholder="Select Tax Type" />}
                                />
                              </tr>
                              <tr>
                                <td>Other Charges</td>
                                <td>
                                  <input
                                    type="text"
                                    id="txt_othercharges"
                                    onChange={(e) => setInvoiceData({ ...invoiceData, OtherCharge: e.target.value })}
                                    // style={{ textAlign: 'right' }}
                                    className="form-control "
                                    style={{
                                      textAlign: 'right',
                                      width: '200px',
                                      padding: '4px',
                                      fontSize: '12px'
                                    }}
                                  />
                                </td>
                              </tr>
                              <tr>
                                <td>Cash Discount</td>
                                <td>
                                  <input
                                    type="text"
                                    id="txt_cashdisc"
                                    style={{
                                      textAlign: 'right',
                                      width: '200px',
                                      padding: '4px',
                                      marginTop: '5px'
                                    }}
                                    className="form-control"
                                    value={invoiceData.Discount}
                                    onChange={handleCashDiscountChange}
                                  />
                                </td>
                              </tr>
                              <tr>
                                <td>Received</td>
                                <td id="roundoff">
                                  <input
                                    type="text"
                                    id="txt_cashdisc"
                                    style={{
                                      textAlign: 'right',
                                      width: '200px',
                                      padding: '4px',
                                      fontSize: '12px',
                                      marginTop: '5px'
                                    }}
                                    className="form-control "
                                    value={invoiceData.Received}
                                    onChange={handleReceivedChange}
                                  />
                                </td>
                              </tr>
                              <br />
                              <tr>
                                <td>Roundoff</td>
                                <td id="roundoff">
                                  <h6 style={{ marginTop: '5px' }} value={invoiceData.RoundOff}>
                                    {' '}
                                  </h6>
                                  {/* <Button
                                    variant={isRounded ? 'contained' : 'outlined'}
                                    onClick={() => setIsRounded(!isRounded)}
                                    className="mb-4"
                                  >
                                    {isRounded ? 'Disable Rounding' : 'Enable Rounding'}
                                  </Button> */}
                                </td>
                              </tr>
                              <br />
                              <tr>
                                <td>
                                  <h5 style={{ color: 'red' }}>Grand Total:</h5>
                                </td>
                                <td id="MainTotal">
                                  <h5>{invoiceData.Total ? invoiceData.Total.toFixed(2) : ''}</h5>
                                </td>
                              </tr>
                            </tbody>
                          </table>
                          <br />
                          {renderMultiReceipts()}
                          <div className="col-lg-12">
                            <div className="flex flex-col items-end space-y-3">
                              <div className="flex space-x-3">
                                <Button
                                  onClick={addNewReceipt}
                                  variant="contained"
                                  size="small"
                                  className="bg-blue-900 text-white hover:bg-blue-800 focus:outline-none focus:ring-2 focus:ring-blue-700"
                                >
                                  Add Receipt
                                </Button>
                                <Button
                                  variant="contained"
                                  color="secondary"
                                  size="small"
                                  className="bg-red-500 text-white hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-red-500"
                                >
                                  Close
                                </Button>
                                <Button
                                  variant="contained"
                                  size="small"
                                  className="bg-blue-500 text-white hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
                                  type="submit"
                                  onClick={handleSubmit}
                                >
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
    </div>
  );
}
export default AddSalesReturn;

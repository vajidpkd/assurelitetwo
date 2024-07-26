import React, { useState } from 'react';
import { List, ListItem, ListItemText, Collapse } from '@mui/material';
import ReceiptLongIcon from '@mui/icons-material/ReceiptLong';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import ArrowDropUpIcon from '@mui/icons-material/ArrowDropUp';
import { Link } from 'react-router-dom';

const NestedReceiptMaster = () => {
  const [isOpen, setIsOpen] = useState(false);

  const handleIsOpen = () => {
    setIsOpen((prev) => !prev);
  };

  return (
    <List disablePadding className="cursor-pointer">
      <ListItem onClick={handleIsOpen} className="flex items-center justify-between">
        <div className="flex items-center">
          <div className="pe-2">
            <ReceiptLongIcon className="text-lg" />
          </div>
          <ListItemText primary={'Accounts'} />
        </div>
        <div className="flex items-center">{isOpen ? <ArrowDropUpIcon /> : <ArrowDropDownIcon />}</div>
      </ListItem>
      <Collapse in={isOpen} aria-disabled>
        <div className="ps-10 flex flex-col gap-2">
          <Link to={'/viewpayment'} className="no-underline text-black">
           Payment
          </Link>
          <Link to={'/viewreceipt'} className="no-underline text-black">
          Receipt
          </Link>
          <Link to={'/Viewsalesjournal'} className="no-underline text-black">
            Journal
          </Link>
        </div>
      </Collapse>
    </List>
  );
};

export default NestedReceiptMaster;

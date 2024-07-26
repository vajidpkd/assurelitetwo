import React, { Fragment, useState } from 'react';
import { List, ListItem, ListItemText, Collapse } from '@mui/material';
import PaymentIcon from '@mui/icons-material/Payment';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import ArrowDropUpIcon from '@mui/icons-material/ArrowDropUp';
import { Link } from 'react-router-dom';

const NestedPaymentMaster = () => {
  const [isOpen, setIsOpen] = useState(false);

  const handleIsOpen = () => {
    setIsOpen((prev) => !prev);
  };

  return (
    <List disablePadding className="cursor-pointer">
      <ListItem onClick={handleIsOpen} className="flex items-center justify-between">
        <div className="flex items-center">
          <PaymentIcon className="pe-2" />
          <ListItemText primary={'Payments'} />
        </div>
        <div className="flex items-center">{isOpen ? <ArrowDropUpIcon /> : <ArrowDropDownIcon />}</div>
      </ListItem>
      <Collapse in={isOpen} aria-disabled>
        <div className="ps-10 flex flex-col gap-2">
          <Link to={'/productcategory'} className="no-underline text-black">
            Cash Payment
          </Link>
          <Link to={'/unitmaster'} className="no-underline text-black">
            Bank Payment
          </Link>
        </div>
      </Collapse>
    </List>
  );
};

export default NestedPaymentMaster;

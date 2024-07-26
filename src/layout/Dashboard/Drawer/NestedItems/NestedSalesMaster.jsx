import React, { Fragment, useState } from 'react';
import { List, ListItem, ListItemText, Collapse } from '@mui/material';
import LocalMallIcon from '@mui/icons-material/LocalMall';
import { Link } from 'react-router-dom';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import ArrowDropUpIcon from '@mui/icons-material/ArrowDropUp';

const NestedSalesMaster = () => {
  const [isOpen, setIsOpen] = useState(false);

  const handleIsOpen = () => {
    setIsOpen((prev) => !prev);
  };

  return (
    <List disablePadding className="cursor-pointer">
      <ListItem onClick={handleIsOpen} className="flex items-center justify-between">
        <div className="flex items-center">
          <div className="pe-2">
            <LocalMallIcon className="text-lg" />
          </div>
          <ListItemText primary={'Sales'} />
        </div>
        <div className="flex items-center">{isOpen ? <ArrowDropUpIcon /> : <ArrowDropDownIcon />}</div>
      </ListItem>
      <Collapse in={isOpen} aria-disabled>
        <div className="ps-10 flex flex-col gap-2">
          <Link to={'/Viewsalesquotation'} className="no-underline text-black">
            Sales Quotation
          </Link>
          <Link to={'/viewsalesorder'} className="no-underline text-black">
            Sales Order
          </Link>
          <Link to={'/viewsalesinvoice'} className="no-underline text-black">
            Sales Invoice
          </Link>
          <Link to={'/Viewsalereturn'} className="no-underline text-black">
            Sales Return
          </Link>
         
        </div>
      </Collapse>
    </List>
  );
};

export default NestedSalesMaster;

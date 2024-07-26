import React, { Fragment, useState } from 'react';
import { List, ListItem, ListItemText, Collapse } from '@mui/material';
import DashboardCustomizeIcon from '@mui/icons-material/DashboardCustomize';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import ArrowDropUpIcon from '@mui/icons-material/ArrowDropUp';
import { Link } from 'react-router-dom';

const NestedProductMaster = () => {
  const [isOpen, setIsOpen] = useState(false);

  const handleIsOpen = () => {
    setIsOpen((prev) => !prev);
  };

  return (
    <List disablePadding className="cursor-pointer">
      <ListItem onClick={handleIsOpen} className="flex items-center justify-between">
        <div className="flex items-center">
          <div className="pe-2">
            <DashboardCustomizeIcon className="text-lg " />
          </div>
          <ListItemText primary={'Product Master'} />
        </div>
        <div className="flex items-center">{isOpen ? <ArrowDropUpIcon /> : <ArrowDropDownIcon />}</div>
      </ListItem>
      <Collapse in={isOpen} aria-disabled>
        <div className="ps-10 flex flex-col gap-2">
          <Link to={'/productcategory'} className="no-underline text-black">
            Category
          </Link>
          <Link to={'/unitmaster'} className="no-underline text-black">
            Unit
          </Link>
          <Link to={'/taxschedulemaster'} className="no-underline text-black">
            Tax Schedule
          </Link>
          <Link to={'/viewallporduct'} className="no-underline text-black">
            Product
          </Link>
        </div>
      </Collapse>
    </List>
  );
};

export default NestedProductMaster;

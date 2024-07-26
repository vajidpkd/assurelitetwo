import React, { Fragment, useState } from 'react';
import { List, ListItem, ListItemText, Collapse } from '@mui/material';
import { Link } from 'react-router-dom';
import ManageAccountsIcon from '@mui/icons-material/ManageAccounts';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import ArrowDropUpIcon from '@mui/icons-material/ArrowDropUp';

const NestedAccountMaster = () => {
  const [isOpen, setIsOpen] = useState(false);

  const handleIsOpen = () => {
    setIsOpen((prev) => !prev);
  };

  return (
    <List disablePadding className="cursor-pointer">
      <ListItem onClick={handleIsOpen} className="flex items-center justify-between">
        <div className="flex items-center">
          <div className="pe-2">
            <ManageAccountsIcon className="text-xl" />
          </div>
          <ListItemText primary={'Account Master'} />
        </div>
        <div className="flex items-center">{isOpen ? <ArrowDropUpIcon /> : <ArrowDropDownIcon />}</div>
      </ListItem>
      <Collapse in={isOpen} aria-disabled>
        <div className="ps-10 flex flex-col gap-2">
          <Link to={'/accountgroup'} className="no-underline text-black">
            Account Group
          </Link>
          <Link to={'/ledger'} className="no-underline text-black">
            Ledger
          </Link>
          <Link to={'/party'} className="no-underline text-black">
            party
          </Link>
        </div>
      </Collapse>
    </List>
  );
};

export default NestedAccountMaster;

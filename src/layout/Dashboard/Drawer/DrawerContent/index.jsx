import SimpleBar from 'components/third-party/SimpleBar';
import { List, ListItemButton, ListItem, ListItemText } from '@mui/material';
import NestedAccountMaster from '../NestedItems/NestedAccountMaster';
import { Link } from 'react-router-dom';
import HomeIcon from '@mui/icons-material/Home';

// ===========|| DRAWER CONTENT ||============//
import { navRoutes } from 'utils/NavRoute';
import NestedProductMaster from '../NestedItems/NestedProductMaster';
import NestedPaymentMaster from '../NestedItems/NestedPaymentMaster';
import NestedSalesMaster from '../NestedItems/NestedSalesMaster';
import NestedReceiptMaster from '../NestedItems/NestedReceiptMaster';
import NestedReports from '../NestedItems/NestedReports';

export default function DrawerContent() {
  return (
    <>
      <SimpleBar sx={{ '& .simplebar-content': { display: 'flex', flexDirection: 'column' } }}>
        <List disablePadding>
          <Link to="/" className="text-black no-underline">
            <ListItem className="flex items-center">
              <div className="pe-2">
                <HomeIcon className="text-lg" />
              </div>
              <div>
                <ListItemText primary={'Dashbrod'} />
              </div>
            </ListItem>
          </Link>
        </List>
        <NestedAccountMaster />
        <NestedProductMaster />
        <NestedSalesMaster />
        {/* <NestedPaymentMaster /> */}
        <NestedReceiptMaster />
        <NestedReports/>
      </SimpleBar>
    </>
  );
}

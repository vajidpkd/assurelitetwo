import { lazy } from 'react';
// project import
import Loadable from 'components/Loadable';
import Dashboard from 'layout/Dashboard';
import ProductMaster from 'pages/ProductMaster/ProductMaster';
import UnitMaster from 'pages/ProductMaster/UnitMaster';
import TaxScheduleMaster from 'pages/ProductMaster/TaxScheduleMaster';
import AddSalesInvoice from 'pages/Sales/AddSalesInvoice';
import MasterInSalesInvoice from 'pages/Sales/MasterInSalesInvoice';
import AddSalesOrder from 'pages/Sales/AddSalesOrder';
import UpdateSalesOrder from 'pages/Sales/UpdateSalesOrder';
import UpdateSalesInvoice from 'pages/Sales/UpdateSalesInvoice';
import MasterSalesOrder from 'pages/Sales/MasterSalesOrder';
import MasterSalesQuotation from 'pages/Sales/MasterSalesQuotation';
import MasterJournal from 'pages/Sales/MasterJournal';
import MasterSalesReturn from 'pages/Sales/MasterSalesReturn';
import AddSalesQuotation from 'pages/Sales/AddSalesQuotation';
import AddSalesReturn from 'pages/Sales/AddSalesReturn';
import AddJournal from 'pages/Sales/AddJournal';
import AddPayment from 'pages/Paymets/AddPayment';
import GetAllPayment from 'pages/Paymets/GetAllPayment';
import ViewReceipt from 'pages/Paymets/GetAllReceipt';
import AddReceipt from 'pages/Paymets/AddReceipt';
import EditReceipt from 'pages/Paymets/EditReceipt';
import EditPayment from 'pages/Paymets/EditPayment';
import EditJournal from 'pages/Sales/EditJournal';
import AddParty from 'pages/AccountMaster/AddParty';
import EditParty from 'pages/AccountMaster/Editarty';
import EditProduct from 'pages/ProductMaster/EditProduct';
import AddProduct from 'pages/ProductMaster/AddProduct';
import SalesReport from 'pages/Reports/SalesReport';
import SalesItemsReport from 'pages/Reports/SalesReportItemWise';
import PaymentReport from 'pages/Reports/PaymentReport';
import ReceiptReport from 'pages/Reports/ReceiptReport';
import JournalReport from 'pages/Reports/JournalReport';

const DashboardDefault = Loadable(lazy(() => import('pages/dashboard/index')));
const AccountGroupMaster = Loadable(lazy(() => import('pages/AccountMaster/AccountGroupMaster')));
const LedgerMaster = Loadable(lazy(() => import('pages/AccountMaster/LedgerMaster')));
const PartyMaster = Loadable(lazy(() => import('pages/AccountMaster/PartyMaster')));
const CategoryMaster = Loadable(lazy(() => import('pages/ProductMaster/CategoryMaster')));

import ProtectedRoute from './ProtectedRoute';
import { createBrowserRouter } from 'react-router-dom';
import Login from 'pages/authentication/login';
import Profile from 'pages/porfile/Profile';

export const routes = createBrowserRouter([
  {
    path: '/',
    element: <ProtectedRoute element={<Dashboard />} />,
    children: [
      {
        path: '/',
        element: <ProtectedRoute element={<DashboardDefault />} />
      },
      {
        path: 'dashboard',
        element: <ProtectedRoute element={<DashboardDefault />} />
      },
      {
        path: 'accountgroup',
        element: <ProtectedRoute element={<AccountGroupMaster />} />
      },
      {
        path: 'ledger',
        element: <ProtectedRoute element={<LedgerMaster />} />
      },
      {
        path: 'party',
        element: <ProtectedRoute element={<PartyMaster />} />
      },
      {
        path: 'addparty',
        element: <ProtectedRoute element={<AddParty />} />
      },
      {
        path: 'editparty/:AccountID',
        element: <ProtectedRoute element={<EditParty />} />
      },
      {
        path: 'productcategory',
        element: <ProtectedRoute element={<CategoryMaster />} />
      },
      {
        path: 'viewallporduct',
        element: <ProtectedRoute element={<ProductMaster />} />
      },
      {
        path: 'unitmaster',
        element: <ProtectedRoute element={<UnitMaster />} />
      },
      {
        path: 'taxschedulemaster',
        element: <ProtectedRoute element={<TaxScheduleMaster />} />
      },
      {
        path: 'viewsalesinvoice',
        element: <ProtectedRoute element={<MasterInSalesInvoice />} />
      },
      {
        path: 'addsalesinvoice',
        element: <ProtectedRoute element={<AddSalesInvoice />} />
      },
      {
        path: 'editsalesinvoice/:RefNo',
        element: <ProtectedRoute element={<UpdateSalesInvoice />} />
      },
      {
        path: 'addsalesorder',
        element: <ProtectedRoute element={<AddSalesOrder />} />
      },
      {
        path: 'viewsalesorder',
        element: <ProtectedRoute element={<MasterSalesOrder />} />
      },
      {
        path: 'editsalesorder',
        element: <ProtectedRoute element={<UpdateSalesOrder />} />
      },
      {
        path: 'Addsalesquotation',
        element: <ProtectedRoute element={<AddSalesQuotation />} />
      },
      {
        path: 'Viewsalesquotation',
        element: <ProtectedRoute element={<MasterSalesQuotation />} />
      },
      {
        path: 'Viewsalesjournal',
        element: <ProtectedRoute element={<MasterJournal />} />
      },
      {
        path: 'Viewsalereturn',
        element: <ProtectedRoute element={<MasterSalesReturn />} />
      },
      {
        path: 'Addsalesreturn',
        element: <ProtectedRoute element={<AddSalesReturn />} />
      },
      {
        path: 'Addjournal',
        element: <ProtectedRoute element={<AddJournal />} />
      },
      {
        path: 'Editjournal/:RefNo',
        element: <ProtectedRoute element={<EditJournal />} />
      },
      {
        path: 'Addpayment',
        element: <ProtectedRoute element={<AddPayment />} />
      },
      {
        path: 'viewpayment',
        element: <ProtectedRoute element={<GetAllPayment />} />
      },
      {
        path: 'viewreceipt',
        element: <ProtectedRoute element={<ViewReceipt />} />
      },
      {
        path: 'Addreceipt',
        element: <ProtectedRoute element={<AddReceipt />} />
      },
      {
        path: 'Editreceipt/:RefNo',
        element: <ProtectedRoute element={<EditReceipt />} />
      },
      {
        path: 'editpayment/:RefNo',
        element: <ProtectedRoute element={<EditPayment />} />
      },
      {
        path: 'addproduct',
        element: <ProtectedRoute element={<AddProduct />} />
      },
      {
        path: 'editproduct/:ItemID',
        element: <ProtectedRoute element={<EditProduct />} />
      },
      {
        path: 'salesreport',
        element: <ProtectedRoute element={<SalesReport />} />
      },
      {
        path: 'salesitemreport',
        element: <ProtectedRoute element={<SalesItemsReport />} />
      },
      {
        path: 'paymentreport',
        element: <ProtectedRoute element={<PaymentReport />} />
      },
      {
        path: 'receiptreport',
        element: <ProtectedRoute element={<ReceiptReport />} />
      },
      {
        path: 'journalreport',
        element: <ProtectedRoute element={<JournalReport />} />
      },
      {
        path: 'viewprofile',
        element: <ProtectedRoute element={<Profile />} />
      }
    ]
  },
  {
    path: 'login',
    element: <Login />
  }
]);

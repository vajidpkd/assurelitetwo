// assets
import { ChromeOutlined, QuestionOutlined } from '@ant-design/icons';

// icons
const icons = {
  ChromeOutlined,
  QuestionOutlined
};

// ================= MENU ITEMS - SAMPLE PAGE & DOCUMENTATION ||============ //

const company = {
  id: 'Master',
  title: 'Master',
  type: 'group',
  children: [
    {
      id: 'Company',
      title: 'Account Group',
      type: 'item',
      url: '/company',
      icon: icons.ChromeOutlined
    }
  ]
};

export default company;

import React from 'react';
import FormControl from '@mui/material/FormControl';
import InputAdornment from '@mui/material/InputAdornment';
import OutlinedInput from '@mui/material/OutlinedInput';
import Box from '@mui/material/Box';
import SearchOutlined from '@ant-design/icons/SearchOutlined';

const CustomSerch = ({ value, onChange, placeholder = 'Ctrl + K', ...props }) => {
  return (
    <Box sx={{ width: '100%', ml: { xs: 0, md: 1 } }}>
      <FormControl sx={{ width: { xs: '100%', md: 224 } }}>
        <OutlinedInput
          size="small"
          id="header-search"
          value={value}
          onChange={onChange}
          startAdornment={
            <InputAdornment position="start" sx={{ mr: -0.5 }}>
              <SearchOutlined />
            </InputAdornment>
          }
          aria-describedby="header-search-text"
          inputProps={{
            'aria-label': 'search'
          }}
          placeholder={placeholder}
          {...props}
        />
      </FormControl>
    </Box>
  );
};

export default CustomSerch;

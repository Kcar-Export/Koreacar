import React from 'react'
import { useEffect } from 'react';

const SearchDropdown = ({ type, data, setSelectedValue, selectedValue = '' }) => {

  const handleSelectChange = (e) => {
    const selectedValue = e.target.value;
    setSelectedValue(selectedValue);
  }

  return (
    <>
      <div className=''>
        <label htmlFor="small" className="block mb-2 text-xs font-medium text-gray-900 dark:text-white">{type}</label>
        <select id="small" className="block w-full p-2 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" onChange={handleSelectChange} value={selectedValue}>
          {/* <option selected>Select</option> */}
          <option value="">
            {
              data.length === 0 ?
                type === 'Model' ? "Please select 'Make'" : "Please select 'Model'"
                :
                `Select ${type}`
            }
          </option>
          {
            data && data.map((data) => (
              <option value={data} key={data}>{data}</option>
            ))
          }
        </select>
      </div>
    </>
  )
}

export default SearchDropdown
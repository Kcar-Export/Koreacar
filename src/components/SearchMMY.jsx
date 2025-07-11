import React from 'react'
import _ from 'lodash';
import { useState, useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import SearchDropdown from './SearchDropdown'
import { setFilteredCarsData } from '../features/car/carSlice';

const SearchMMY = () => {
  const dispatch = useDispatch();
  const carsData = useSelector((state) => state.car.carsData);
  const filteredCarsData = useSelector((state) => state.car.filteredCarsData);
  const [makes, setMakes] = useState([]);
  const [models, setModels] = useState([]);
  const [years, setYears] = useState([]);
  const [selectedMake, setSelectedMake] = useState('');
  const [selectedModel, setSelectedModel] = useState('');
  const [selectedYear, setSelectedYear] = useState('');

  useEffect(() => {
    const makes = _.sortBy([...new Set(carsData.map((car) => car.make))]);
    setMakes(makes);
  }, [carsData]);

  useEffect(() => {
    const models = _.sortBy(
      [...new Set(carsData.filter((car) => car.make === selectedMake).map((car) => car.model))]
    );
    setModels(models);
  }, [selectedMake, carsData]);

  useEffect(() => {
    const years = _.sortBy(
      [...new Set(carsData.filter((car) => car.make === selectedMake && car.model === selectedModel).map((car) => car.year))]
    );
    setYears(years);
  }, [selectedMake, selectedModel, carsData]);

  const handleFilter = () => {

    const filteredData = carsData.filter(car => {
      let makeMatch = true;
      let modelMatch = true;
      let yearMatch = true;

      // Check if make is selected and matches
      if (selectedMake !== '' && car.make !== selectedMake) {
        makeMatch = false;
      }

      // Check if model is selected and matches
      if (selectedModel !== '' && car.model !== selectedModel) {
        modelMatch = false;
      }

      // Check if year is selected and matches
      if (selectedYear !== '' && car.year !== parseInt(selectedYear)) {
        yearMatch = false;
      }

      // Return true only if all three conditions are met
      return makeMatch && modelMatch && yearMatch;
    });

    dispatch(setFilteredCarsData(filteredData));
  }

  const handleReset = () => {
    dispatch(setFilteredCarsData([]));
    setSelectedMake(''); // Reset selected make
    setSelectedModel(''); // Reset selected model
    setSelectedYear(''); // Reset selected year
  }

  return (
    <>
      {
        makes && models && years &&

        <div className='flex flex-col gap-5'>
          <div className='grid grid-cols-1 md:grid-cols-3 gap-3'>
            <SearchDropdown type={'Make'} data={makes} setSelectedValue={setSelectedMake} selectedValue={selectedMake} />
            <SearchDropdown type={'Model'} data={models} setSelectedValue={setSelectedModel} selectedValue={selectedModel} />
            <SearchDropdown type={'Year'} data={years} setSelectedValue={setSelectedYear} selectedValue={selectedYear}  />

          </div>
          <div className='flex gap-3'>
            <button type="button" className="text-white right-2.5 bottom-2.5 bg-gray-900 hover:bg-gray-700 focus:ring-4 focus:outline-none focus:ring-gray-300 font-medium rounded-md text-sm px-4 py-2" onClick={handleFilter}>Filter</button>
            {
              filteredCarsData && filteredCarsData.length > 0 ? <button type="button" className="text-white right-2.5 bottom-2.5 bg-red-500 hover:bg-red-700 focus:ring-4 focus:outline-none focus:ring-gray-300 font-medium rounded-md text-sm px-4 py-2" onClick={handleReset}>Reset</button> : null
            }
          </div>
        </div>
      }

    </>
  )
}

export default SearchMMY
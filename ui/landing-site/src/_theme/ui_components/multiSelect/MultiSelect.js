import React from 'react';

import Select from 'react-select';

export const MultiSelect =  ({propertyTypeOptions, handleEventPropertyFilter}) =>{
  const multiSelectStyles = {
    control: (baseStyles, state) => ({
      ...baseStyles,
      backgroundColor: "#3A3C45",
      borderRadius: "6px",
      cursor: "pointer",
      minWidth: "150px",
    }),
    menu: (baseStyles, state) => ({
      ...baseStyles,
      backgroundColor: "#3A3C45",
      borderColor: "#C5C5C5",
      borderWidth: "1px",
      borderRadius: "6px",
      overflow: "hidden",
    }),
    option: (baseStyles, { isFocused }) => ({
      ...baseStyles,
      backgroundColor: isFocused ? "#323232" : "#3A3C45",
      ":active": {
        backgroundColor: "#323232",
      },
      color: "#EFEFFF",
    }),
    multiValue: (baseStyles, state) => ({
      ...baseStyles,
      backgroundColor: "#A82820",
      color: "#EFEFFF",
    }),
    multiValueLabel: (baseStyles, state) => ({
      ...baseStyles,
      color: "#EFEFFF",
    }),
  };
    return (
  <Select
  isMulti
  name="property type"
  options={propertyTypeOptions}
  className="basic-multi-select"
  classNamePrefix="select"
  onChange={(values) => handleEventPropertyFilter(values)}
  styles={multiSelectStyles}
  />
  )
  }
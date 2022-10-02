import React, { useEffect, useRef } from 'react';

// register Data: ('category', { required: 'true' })

function SelectWithDynamicOptions({
  allOptions = [],
  onFormRegister = () => {},
  onOptionFilter = (opt) => true,
  handleChange = (e) => '',
  handleLoad = (e) => '',
  firstOption = () => <option value={''}>{'Selecione'}</option>,
  onOptionLoad = (i, idx) => (
    <option key={idx} value={'optionValue'}>
      OptionValue: {JSON.stringify(i)}
    </option>
  ),
}) {
  const currentMapIdx = useRef(Infinity);
  const { ref, ...formRest } = onFormRegister();
  const selectRef = useRef();
  function getFirstValidOption(a) {
    return allOptions.find((opt) => onOptionFilter(opt));
  }

//   useEffect(() => handleLoad(getFirstValidOption()), [allOptions]);

  return (
    <select
      {...formRest}
      ref={(e) => {
        ref(e);
        selectRef.current = e;
      }}
      onChange={(e) => {
        handleChange(e);
      }}
    >
      {firstOption()}
      {allOptions?.map((item, idx) => {
        if (onOptionFilter(item)) {
          return onOptionLoad(item, idx);
        } else return null;
      })}
    </select>
  );
}

export default SelectWithDynamicOptions;

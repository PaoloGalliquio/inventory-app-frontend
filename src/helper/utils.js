export const initialAllOptionPromises = async (
  allPromisesArray,
  ID_TYPES_Array,
  setAllOptions
) => {
  setAllOptions([]);
  let array = [];
  await Promise.allSettled(allPromisesArray())
    .then((allOptions) => {
      allOptions.map((option, index) => {
        if (option.status === "fulfilled") {
          let key = ID_TYPES_Array[index];
          let value = option.value?.data ?? option.value;
          array.push({ key, value });
        }
      });
    })
    .finally(() => {
      setAllOptions(array);
    });
};


export const mapDropDownOptionsFromBackendToSelectOptionsNeededForLibrary = (
  backEndOptions,
  idEntity = "IdEntity"
) => {
  return backEndOptions.map((option, index) => ({
    value: option.Value,
    label: option.Text,
    idEntity: option?.IdEntity,
  }));
};

export const setStateWithCallBackResponse = async (
  callbackAPI,
  setState,
  isSelectedOptions = false
) => {
  const response = await callbackAPI();
  if (responseCode200(response)) {
    var dataMap = isSelectedOptions
      ? mapDropDownOptionsFromBackendToSelectOptionsNeededForLibrary(
          response.data
        )
      : response.data;
    setState(dataMap);
  } else {
    console.log("Error: ", response);
  }
};

export const notNullAndNotUndefinded = (data) => {
  return data != null && data != undefined ? true : false;
};

export const handleFind = (allDropdowns, key) => {
  return allDropdowns?.find((o) => o.key == key)?.value;
};

export const handleFindDropdownSelected = (allDropdowns, res, key) => {
  return allDropdowns
    ?.find((o) => o.key == key)
    ?.value?.find((o) => o.value == res[key]);
};

export const handleChangeSelect = (setFormValues, res, key) => {
  setFormValues((lastData) => ({
    ...lastData,
    [key]: res.target?.value?.value ?? res.target?.value,
  }));
};

export const responseCode200 = (response) => {
  return response && response.status && response.status === 200 ? true : false;
};
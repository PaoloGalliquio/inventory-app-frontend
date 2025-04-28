import {
  handleChangeSelect,
  handleFind,
  handleFindDropdownSelected,
} from "../../helper/utils";

export const usePropsSelect = (
  allDropdowns,
  formValues,
  setFormValues,
  sectionName
) => {
  const propsSelectFromPromises = (key) => {
    return {
      name: key,
      options: handleFind(allDropdowns, key),
      value: handleFindDropdownSelected(allDropdowns, formValues, key),
      onChange: (res) => {
        handleChangeSelect(setFormValues, res, key);
      },
      sectionName,
    };
  };
  return [propsSelectFromPromises];
};

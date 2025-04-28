export const usePropsInputs = (formValues, setFormValues, sectionName) => {
  const [onChange] = useForm(formValues, setFormValues);

  const handleChange = (res) => {
    onChange(res);
  };

  const propsCommonInputs = (name) => {
    let common = {
      name,
      value: formValues[name],
      onChange: (res) => handleChange(res),
      sectionName,
    };
    return common;
  };
  return [propsCommonInputs];
};

const useForm = (values, setValues) => {
  const handleChange = (e) => {
    let inputType = e.target.type;
    let inputValue =
      inputType === "checkbox"
        ? e.target.checked
        : e.target.value?.value ?? e.target.value;
    let inputName = e.target.name;
    setValues((lastData) => ({
      ...lastData,
      [inputName]: inputValue === "" ? null : inputValue,
    }));
  };
  return [handleChange];
};

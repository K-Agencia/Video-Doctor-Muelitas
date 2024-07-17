import { Label, TextInput } from 'flowbite-react';
import React, { useState } from 'react';
import { IoAlertCircleOutline } from "react-icons/io5";

const InputText = React.forwardRef(({ name, placeholder, type, label, icon, autoComplete, error, onChange, onBlur }, ref) => {

  const [focus, setFocus] = useState(false);

  const handleBlur = (e) => {
    setFocus(false)
    onBlur(e);
  }

  return (
    <div className='w-full mb-3'>
      <Label className={focus ? error ? "failure" : 'text-sky-600' : error} color={error && "failure"} htmlFor={name}>{label}</Label>
      <TextInput
        ref={ref}
        id={name}
        name={name}
        type={type || 'text'}
        placeholder={placeholder}
        icon={icon && icon}
        autoComplete={autoComplete || "'on"}
        onChange={onChange}
        onBlur={handleBlur}
        onFocus={() => setFocus(true)}
        color={error && "failure"}
        helperText={
          error && <span className='flex items-center'><IoAlertCircleOutline className='mr-1' /> {error.message}</span>
        }
      />
    </div >
  )
})

InputText.displayName = "InputText";

export default InputText;
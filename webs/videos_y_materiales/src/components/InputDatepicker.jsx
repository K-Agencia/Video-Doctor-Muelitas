import { Label } from 'flowbite-react';
import Datepicker from "tailwind-datepicker-react"
import { useEffect, useState } from 'react';
import Required from './Required';
import { IoAlertCircleOutline } from 'react-icons/io5';
import '../css/InputDatepicker.css';

const InputDatepicker = ({ label, required, setValue, setError, error, clearErrors, isSubmitted, name }) => {

  const options = {
    todayBtn: false,
    clearBtn: false,
    maxDate: new Date(),
    theme: {
      input: error ? 'border-red-600 bg-red-50 text-red-600 active:border-red-500 active:ring-red-500 focus:border-red-500 focus:ring-red-500' : null,
      disabledText: "bg-slate-100 text-slate-400",
    },
    language: "es",
    weekDays: ["Lu", "Ma", "Mi", "Ju", "Vi", "Sa", "Do"],
  };

  const [show, setShow] = useState(false);
  const [date, setDate] = useState(new Date());

  const handleChange = (selectedDate) => {
    const now = new Date();
    const select = new Date(selectedDate);
    select.setHours(0, 0, 0, 0);
    now.setHours(0, 0, 0, 0);

    if (select >= now) {
      console.log("error 1");
      setError(name, { type: "custom", message: "La fecha debe ser anterior a hoy" });
      return
    }

    if (!selectedDate) {
      console.log("error 2");
      setError(name, { type: "custom", message: "Debes seleccionar una fecha de nacimiento" });
      return
    }

    setDate(selectedDate)
    setValue(name, selectedDate);
    clearErrors(name);
  }

  const handleClose = (state) => {
    setShow(state)
  }

  useEffect(() => {
    if (isSubmitted) {
      handleChange(date)
    }
  }, [isSubmitted]);

  return (
    <div className='w-full mb-3 InputDatepicker'>
      <Label
        className={`flex ${show ? error ? "failure" : 'text-sky-600' : null}`}
        color={error && "failure"}
        htmlFor={name}
      >
        {label}
        {required && <Required />}
      </Label>
      <Datepicker
        id={name}
        show={show}
        options={options}
        onChange={handleChange}
        setShow={handleClose}
        classNames='Datepicker'
      />
      {error && <span className='mt-1 flex items-center text-sm text-red-600'><IoAlertCircleOutline className='mr-1' /> {error.message}</span>}
    </div >
  );
};

export default InputDatepicker;
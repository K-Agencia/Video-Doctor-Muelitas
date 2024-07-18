import { Toast } from 'flowbite-react';
import { HiBell, HiCheck, HiExclamation, HiX } from "react-icons/hi";
import { notifications } from '../constants';
import toast from 'react-hot-toast';

const Notifications = ({ type, message }) => {

  const typeIcon = () => {
    switch (type) {
      case notifications.SUCCESS:
        return (
          <div className="inline-flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-green-300 text-green-800 dark:bg-green-800 dark:text-green-200">
            <HiCheck className="h-5 w-5" />
          </div>
        )

      case notifications.WARNING:
        return (
          <div className="inline-flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-orange-300 text-orange-800 dark:bg-orange-700 dark:text-orange-200">
            <HiExclamation className="h-5 w-5" />
          </div>
        )

      case notifications.ERROR:
        return (
          <div className="inline-flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-red-300 text-red-800 dark:bg-red-800 dark:text-red-200">
            <HiX className="h-5 w-5" />
          </div>
        )

      default:
        return (
          <div className="inline-flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-cyan-300 text-cyan-800 dark:bg-cyan-800 dark:text-cyan-200">
            <HiBell className="h-5 w-5" />
          </div>
        )
    }
  }

  const styleCard = () => {
    switch (type) {
      case notifications.SUCCESS:
        return 'bg-green-50 border border-green-700'

      case notifications.WARNING:
        return 'bg-orange-50 border border-orange-700'

      case notifications.ERROR:
        return 'bg-red-50 border border-red-700'

      default:
        return 'bg-cyan-50 border border-cyan-700'
    }
  }

  // return toast.success(message)

  return toast.custom((t) => (
    <Toast className={`${styleCard()} ${t.visible ? 'animate-enter' : 'animate-leave'}`}>
      {typeIcon()}
      <div className="pl-4 text-sm font-normal">{message}</div>
    </Toast>
  ));
};

export default Notifications;
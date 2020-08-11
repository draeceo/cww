import { toast } from 'react-toastify';

export const showError = (message) => {
  toast.error(message, {
    position: 'top-center',
    autoClose: 3000
  });
}

export const showSuccess = (message) => {
  toast.success(message, {
    position: 'top-center',
    autoClose: 3000
  });
}

export const showInfo = (message) => {
  toast.info(message, {
    position: 'top-center',
    autoClose: 3000
  });
}
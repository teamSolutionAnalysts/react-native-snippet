import { getSmsCode, getSmsCodeDev } from 'api';
import { AppConfig } from 'libs';

const ENVIRONMENT = AppConfig.ENVIRONMENT;

type Values = { phone: string };

const useGetSmsCode = () => {
  if (ENVIRONMENT === 'development') {
    // We are using different solution on the Dev, to avoid sending SMS to real devices every time.
    return (values: Values) => getSmsCodeDev(values);
  }

  return (values: Values) => getSmsCode(values);
};

export default useGetSmsCode;

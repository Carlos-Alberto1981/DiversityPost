import { useEffect, useState } from 'react';

const useRequestHandler = (callback) => {
  const [response, setResponse] = useState(null);

  useEffect(() => {
    if (!response) {
      const tryFirstFetch = async () => {
        try {
          const res = await callback();
          if (res?.ok) {
            setResponse(res);
          }
        } catch (err) {
          fetchUntilRes(callback, setResponse);
          return err;
        }
      };
      tryFirstFetch();
    }
  }, [callback, response]);
  return response;
};

const fetchUntilRes = (callback, setResponse) => {
  const interval = setInterval(async () => {
    try {
      const res = await callback();
      if (res?.ok) {
        setResponse(res);
        clearInterval(interval);
      }
    } catch (err) {
      console.log(err);
      return err;
    }
  }, 5000);
};

export { useRequestHandler };

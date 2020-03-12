import React from 'react';
import {Button} from './Button';
import {useServiceWorker, useServiceWorkerMessage, useServiceWorkerUpdate} from '../helpers/hooks/serviceWorkerHooks';
import {useInterval} from '../helpers/hooks/genericHooks';


export const UpdateToaster = () => {
  const [registration] = useServiceWorker('/sw.js');
  const isInterval = registration != null && navigator.serviceWorker.controller != null;
  const [updatedServiceWorker, setUpdated] = useServiceWorkerUpdate(registration);
  useServiceWorkerMessage();

  useInterval(() => registration.update(), isInterval ? 1 * 60 * 1000 : null);

  function onUpdate() {
    updatedServiceWorker.postMessage({action: 'skipWaiting'});
    setUpdated();
  }

  return (
    <>
      {updatedServiceWorker && <Button onClick={onUpdate} type="button">Update</Button>}
    </>
  );
};
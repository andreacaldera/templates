import { unmountComponentAtNode } from 'react-dom';

module.exports = (appName, appContainerId) => {
  console.log(222, appContainerId);
  const domElement = document.getElementById(appContainerId);

  function debug(event) {
    console.log('DEBUG AGAIN!!!!!!', appName, event); // eslint-disable-line no-console
  }

  function unmount() {
    debug('unmmount');
    // appCheckoutManager.isActive = false;
    unmountComponentAtNode(domElement);
  }
  return {
    debug,
    unmount,
  };
};

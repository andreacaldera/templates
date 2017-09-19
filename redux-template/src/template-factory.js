export default () => {
  function methodOne() {
    return 'method one';
  }

  return Object.freeze({
    methodOne,
  });
};

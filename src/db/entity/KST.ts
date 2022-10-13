const KST = () => {
  const now = new Date();
  const UTC = now.getTime() + now.getTimezoneOffset() * 60 * 1000;
  const Diff = 9 * 60 * 60 * 1000;
  return new Date(UTC + Diff);
};
export default KST;

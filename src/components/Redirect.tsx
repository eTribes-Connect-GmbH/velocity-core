import { useReply } from '~/context.js';

const Redirect = ({ path }: { path: string }) => {
  useReply().redirect(path);
  return undefined;
};

export default Redirect;

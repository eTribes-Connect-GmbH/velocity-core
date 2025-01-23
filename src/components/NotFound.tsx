import { useReply } from '~/context.js';

const NotFound = () => {
  useReply().callNotFound();
  return undefined;
};

export default NotFound;

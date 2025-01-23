import '@hotwired/turbo';
import 'bundle:style.css';
import initLiveReload from './utilities/liveReload.js';

if (process.env.NODE_ENV === 'development') {
  initLiveReload();
}

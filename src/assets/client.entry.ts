import '@hotwired/turbo';
import 'bundle:tailwind.css';
import './base.css';
import initLiveReload from './utilities/liveReload';

if (process.env.NODE_ENV === 'development') {
  initLiveReload();
}

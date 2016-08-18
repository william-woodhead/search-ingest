import { subscribe } from '../../core/event-emitter';
import { listener as listener0 } from './error';
import { listener as listener1 } from  './get-from-db';
import { listener as listener2 } from  './get-from-es';
import { listener as listener3 } from  './index-in-es';
import { listener as listener4 } from  './iterator';
import { listener as listener5 } from  './method';
import { listener as listener6 } from  './success';

subscribe(listener0);
subscribe(listener1);
subscribe(listener2);
subscribe(listener3);
subscribe(listener4);
subscribe(listener5);
subscribe(listener6);

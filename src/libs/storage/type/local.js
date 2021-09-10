import { Storage } from '../storage';

class LocalStorage extends Storage {
  constructor() {
    super('localStorage');
  }
}

export default new LocalStorage();

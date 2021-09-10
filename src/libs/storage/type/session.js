import { Storage } from '../storage';

class SessionStorage extends Storage {
  constructor() {
    super('sessionStorage');
  }
}

export default new SessionStorage();

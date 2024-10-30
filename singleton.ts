
class Service {
  #api
  constructor(api: string) {
    this.#api = api
  }
  
  async getDataAsync() {
    try {
      const response = await fetch(this.#api);
      const data = await response.json();
      if (!data) throw Error('Data is not defined');
      return data;
    } catch (error) {
        // TODO handle error
    }
  }
}

// Create immutable instance 
const serviceInstance = Object.freeze(new Service('https://api-url'));

class Observer {
  private readonly observerList: Record<string, any>
  constructor() {
    this.observerList = {}
  }

  addObserver(name: string, listener: (data: any) => void) {
    if(!name) return false;
    if (!this.observerList[name]) {
      this.observerList[name] = [];
    }
    this.observerList[name].push(listener)
  }

  notifyObserver(name: string, payload: any) {
    if(!this.isValidObserver(name)) return;
    this.observerList[name].forEach((listener: (arg0: any) => any) => listener(payload))
  }

  remove(name: string) {
    if(!this.isValidObserver(name)) return;
    delete this.observerList[name]
  }

  private isValidObserver(name: string) {
    if(!name) return false;
    if(!this.observerList[name]) return false;
    return true;
  }
}

/*
export const observer = new Observer()

useEffect(() => {
  observer.addObserver("test", (data) => {
    console.log("data", data)
  })
}, [])

const handleOnPress = () => {
  observer.notifyObserver("test", {value: 2})
}
*/

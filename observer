class Observer {
  private readonly observerList: Record<string, any>
  constructor() {
    this.observerList = {}
  }

  addObserver(name: string, listener: (data: any) => void) {
    if (!this.observerList[name]) {
      this.observerList[name] = [];
    }
    this.observerList[name].push(listener)
  }

  notifyObserver(name: string, payload: any) {
    this.observerList[name].forEach((listener: (arg0: any) => any) => listener(payload))
  }
}

export const observer = new Observer()

/*
useEffect(() => {
  observer.addObserver("test", (data) => {
    console.log("data", data)
  })
}, [])

const handleOnPress = () => {
  observer.notifyObserver("test", {value: 2})
}
*/

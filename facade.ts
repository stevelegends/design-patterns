
/**
 * apply facade design pattern with flux pattern - example in redux
 */

// mock store & reducer
interface IStore {
    value: string
}
const store: IStore = {
    value: ''
}

interface IReducerState { }
interface IPayload {}
interface IAction {
    payload: IPayload
}
const testReducer = (state: IReducerState) => {
    setValue: (action: IAction) => {
        return {...state,  value: action.payload}
    }
}

// facade (hooks)
/** select state */
const useSelectTest = (name) => useSelector(state => state.testReducer[name])

/** dispatch action */
const useTestFacade = () => {
    const dispatch = useDispatch()
  
    const setValue = useCallback((payload) => {
        dispatch(setValue(payload))
    }, []) as (payload: IPayload) () => void

    return {
        setValue
    }
}

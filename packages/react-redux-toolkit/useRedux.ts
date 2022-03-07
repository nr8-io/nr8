import { useStore, useDispatch } from 'react-redux'

//
export const useRedux = () => {
  const dispatch = useDispatch()
  const store = useStore()

  return [store, dispatch]
}

export default useRedux

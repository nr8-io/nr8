import { useSelector as useReduxSelector } from 'react-redux'
import get from 'lodash/fp/get'

//
export const useSelector = (pathOrSelector: string | ((state: any) => any)) => {
  const selector =
    typeof pathOrSelector === 'function' ? pathOrSelector : get(pathOrSelector)

  return useReduxSelector(selector)
}

export default useSelector

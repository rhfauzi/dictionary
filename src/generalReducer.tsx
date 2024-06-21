import SharedReducer from 'shared-reducer-hooks'

const initialState = {
  errorCatch: '',
  errorPermission: false,
  loadingGlobal: false,
  refreshToken: false,
}

const [mapState, dispatch] = SharedReducer((state = initialState, action: any) => {
  switch (action.type) {
    case 'toggleErrorCatch':
      return Object.assign(state, { errorCatch: action.errorCatch })
    case 'toggleErrorPermission':
      return Object.assign(state, { errorPermission: action.errorPermission })

    case 'toggleLoadingGlobal':
      return Object.assign(state, { loadingGlobal: action.loadingGlobal })

    case 'toggleRefreshToken':
      return Object.assign(state, { refreshToken: action.refreshToken })
    default:
      return state
  }
})

export const useLoadingGlobal = mapState((state: any) => state.loadingGlobal)
export const useErrorCatch = mapState((state: any) => state.errorCatch)
export const useErrorPermission = mapState((state: any) => state.errorPermission)
export const useRefreshToken = mapState((state: any) => state.refreshToken)

export const toggleLoadingGlobal = (loadingGlobal) =>
  dispatch({ type: 'toggleLoadingGlobal', loadingGlobal } as any)
export const toggleErrorCatchAction = (errorCatch) =>
  dispatch({ type: 'toggleErrorCatch', errorCatch } as any)

export const toggleErrorPermissionAction = (errorPermission) =>
  dispatch({ type: 'toggleErrorPermission', errorPermission } as any)

export const toggleRefreshTokenAction = (refreshToken) =>
  dispatch({ type: 'toggleRefreshToken', refreshToken } as any)

export const setStorage = (payload: any, field: string) => (
  sessionStorage.setItem(field, JSON.stringify(payload))
)

export const getStorage = (field: string) => (
  JSON.parse(sessionStorage.getItem(field))
)

export const removeStorage = (field: string) => (
  sessionStorage.removeItem(field)
)

export const resetStorage = (field: string) => {
  window.onbeforeunload = () => {
    sessionStorage.removeItem(field);
  }
}
// PURPOSE: Actions documented in this store section is specialised for General State Management purposes

// Reducer: to mutate changes and store cookies function so it can be accessed on all pages
export const setCookiesFunction = (cookiesFunction) => {
  return {
    type: 'SET_COOKIES_FUNCTION',
    payload: cookiesFunction
  }
}

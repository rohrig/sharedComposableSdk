import {useCookie, useRequestHeaders} from '#app'

export default function () {
  const serverHeaders = useRequestHeaders(['cookie'])
  const devModeCookie = useCookie('dev-mode')?.value || ''
  
  const state = useState<{headerData: null | { isDevMode: string }, loading: boolean}>(`headerState`, () => ({
    headerData: null,
    loading: false,
  }));

  function getDevHeader () {
    console.log('************** called getDevHeader ')
    return getDevModeHeader(
      devModeCookie as string,
      serverHeaders.cookie as string
    );
  }

  function getHeaderObj(headers: string): { [key: string]: string } {
    return headers.split(';').reduce<{ [key: string]: string }>((acc, item) => {
      const [key, value] = item.trim().split('=');
      acc[key] = value;
      return acc;
    }, {});
  }

  function getDevModeHeader(cookieHeader: string, serverHeader: string): void {
    console.log('called getHeader . . .')
    if (process.server) {
      
      console.log('server sending header : ', serverHeader)
      const headerObj = getHeaderObj(serverHeader)
      state.value.headerData = {isDevMode: headerObj['dev-mode']}
      return
    }
    console.log('server sending header : ', serverHeader)
    state.value.headerData = {isDevMode: cookieHeader}
    return
  }

  return {
    getDevHeader,
    ...toRefs(state.value),
  }

  
  
}


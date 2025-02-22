
import { 
    createConfig, 
    http, 
    cookieStorage,
    createStorage
  } from 'wagmi'
  import { anvil } from 'wagmi/chains'
  
  export function getConfig() {
    return createConfig({
      chains: [anvil],
      ssr: true,
      storage: createStorage({
        storage: cookieStorage,
      }),
      transports: {
        [anvil.id]: http("http://127.0.0.1:8545"),
      },
    })
  }
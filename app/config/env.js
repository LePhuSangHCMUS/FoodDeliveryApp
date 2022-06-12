import { REACT_APP_PROD_BACKEND_URL, REACT_APP_DEV_BACKEND_URL,  } from '@env'

const devEnvironmentVariables = {
    BACKEND_URL:REACT_APP_DEV_BACKEND_URL
}
const prodEnvironmentVariables = {
    BACKEND_URL:REACT_APP_PROD_BACKEND_URL
}

// console.log("devEnvironmentVariables",devEnvironmentVariables)

export default __DEV__ ? devEnvironmentVariables : prodEnvironmentVariables
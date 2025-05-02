import { AsyncLocalStorage } from "async_hooks";

type AsyncLocalStorageType = {
    correlationId:string
}
export const asyncLocalStorage = new AsyncLocalStorage<AsyncLocalStorageType>(); //Create an instance of AsyncLocalStorage

export const  getCorrelationId = () => {
    const asyncStore = asyncLocalStorage.getStore();
    return asyncStore?.correlationId || "Unknown Error while getting correlation ID";  //Return the correlation ID from the async local storage
}
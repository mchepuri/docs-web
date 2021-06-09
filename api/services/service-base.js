 const DEFAULT_HEADER = {
    'Content-Type': 'application/json',
    Accept: 'application/json',
  };
  
 class ServiceBase {
    cookies = null;
    header = null;
    constructor() {
    }
    getRequestHeader(header) {
    return { ...DEFAULT_HEADER, ...this.header, ...header };
    }

    async post(url, body, extraHeaders = {}, extraConfig = {}, retries) {
        const date = new Date();
        const retryCodes = [408];
        console.log(`[POST][${url}]`);

        let response = null;

    try {
        const options = { method: 'POST', body: JSON.stringify(body), headers: this.getRequestHeader(extraHeaders), ...extraConfig };

        response = await fetch(url, options);
        const result = await response.json();
        // base condition to stop recursion if 200 response
        if (response.status == 200) {
        return { result, status: response.status };
        }

        // after retry reach return last response in recursion
        // ideally, keep retry < 2/3 specially on server side else it can degrade TTFB.
        // Always use retry for client side
        if (retries && retries > 0 && retryCodes.includes(response.status)) {
        return this.post(url, extraHeaders, extraConfig, retries - 1);
        }

       

        return { result, status: response.status };
    } catch (error) {
        console.log(`ServiceBase[POST][${new Date() - date}ms][${url}] Exception:`, error);
        return { error: `[POST][${url}] ==> Exception: ${error}`, status: response && response.status };
    }
    }
    }    

    export const serviceBase = new ServiceBase();
const useLocalStorage = (key, defaultVal) => {

    const getLocalStorage = () => {
        let val;
        try {
            val = JSON.parse(window.localStorage.getItem(key))
        } catch (error) {
            val = window.localStorage.getItem(key);
        }
        return val;
    }

    const setLocalStorage = (val = defaultVal) => {
        let data;
        try {
            data = JSON.stringify(val)
        } catch (error) {
            data = val
        }
        window.localStorage.setItem(key ,data)
    }

    return [ getLocalStorage, setLocalStorage ]

}

export default useLocalStorage;
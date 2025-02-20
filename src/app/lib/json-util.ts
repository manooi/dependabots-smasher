export function filterJsonObjectByKeys<T>(object: any, keys: string[]) {
    let newObj: any = {};
    for (let key in object) {
        if (keys.includes(key)) {
            newObj[key] = object[key];
        }
    }
    return newObj as T;
}
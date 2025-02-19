export const  getPackages = async (packageName: string) => {
    const res = await fetch("https://registry.npmjs.org/" + packageName);
    return res.json();
}
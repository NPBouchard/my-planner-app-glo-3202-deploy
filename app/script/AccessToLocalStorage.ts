export function saveToLocalStorage<T>(key: string, data: T): void {
    try {
        const jsonData = JSON.stringify(data);
        localStorage.setItem(key, jsonData);
    } catch (error) {
        console.error('Error saving to localStorage', error);
    }
}

export function loadFromLocalStorage<T>(key: string): T | null {
    try {
        const jsonData = localStorage.getItem(key);
        return jsonData ? (JSON.parse(jsonData) as T) : null;
    } catch (error) {
        console.error('Error loading from localStorage', error);
        return null;
    }
}
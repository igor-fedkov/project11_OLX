//Работа с localStorage
// Принимает ключ `key` по которому будет произведена выборка.
export const loadKey = key => {
  try {
    const serializedState = localStorage.getItem(key);

    return serializedState === null ? undefined : JSON.parse(serializedState);
  } catch (err) {
    console.error('Get state error: ', err);
  }
};

// Принимает ключ `key` и значение `value`.
export const saveKey = (key, value) => {
  try {
    const serializedState = JSON.stringify(value);
    localStorage.setItem(key, serializedState);
  } catch (err) {
    console.error('Set state error: ', err);
  }
};

// Принимает ключ, который будет удален
export const deleteKey = (key) => {
  try {
    localStorage.removeItem(key);
  } catch (err) {
    console.error('Set state error: ', err);
  }
};

export default { loadKey, saveKey, deleteKey };
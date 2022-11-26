import { useContext, createContext, useState, useEffect } from "react";

const AppContext = createContext({
  items: [],
  addNewItem: (item) => {},
  updateItem: (updatedItem) => {},
  removeItem: (id) => {},
  getItem: (id) => {},
  changeOrder: (posI, posF) => {},
});

export default function Store({ children }) {
  const [items, setItems] = useState([]);

  useEffect(() => {
    const temp = localStorage.getItem("items");
    const arr = JSON.parse(temp);
    setItems([...arr]);
  }, []);

  function addNewItem(item) {
    const copy = [...items];
    copy.push(item);
    localStorage.setItem("items", JSON.stringify(copy));

    setItems([...copy]);
  }

  function updateItem(updatedItem) {
    const copy = [...items];
    let tmp = copy.find((item) => item.id === updatedItem.id);
    tmp = updateItem;
    setItems([...copy]);
    localStorage.setItem("items", JSON.stringify(copy));
  }

  function removeItem(id) {
    const temp = items.filter((item) => item.id !== id);
    setItems([...temp]);
    localStorage.setItem("items", JSON.stringify(temp));
  }
  function getItem(id) {
    const res = items.find((item) => item.id === id);

    return res;
  }

  function changeOrder(idI, idF) {
    const tmp = [...items];
    const posI = items.findIndex((i) => i.id === idI);
    const posF = items.findIndex((i) => i.id === idF);

    //[tmp[posI], tmp[posF]] = [tmp[posF], tmp[posI]];
    const tmpElement = { ...tmp[posI] };
    tmp[posI] = { ...tmp[posF] };
    tmp[posF] = { ...tmpElement };

    localStorage.setItem("items", JSON.stringify(tmp));
    setItems([...tmp]);
  }

  return (
    <AppContext.Provider
      value={{
        items,
        addNewItem,
        updateItem,
        removeItem,
        getItem,
        changeOrder,
      }}
    >
      {children}
    </AppContext.Provider>
  );
}

export function useAppContext() {
  return useContext(AppContext);
}

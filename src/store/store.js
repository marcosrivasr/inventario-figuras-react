import { useContext, createContext, useState } from "react";

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

  function addNewItem(item) {
    const copy = [...items];
    copy.push(item);

    setItems([...copy]);
  }

  function updateItem(updatedItem) {
    const copy = [...items];
    let tmp = copy.find((item) => item.id === updatedItem);
    tmp = updateItem;
    setItems([...copy]);
  }

  function removeItem(id) {}
  function getItem(id) {
    const res = items.find((item) => item.id === id);
    console.log(res);

    return res;
  }

  function changeOrder(idI, idF) {
    const tmp = [...items];
    console.log("items antes", [...tmp]);
    const posI = items.findIndex((i) => i.id === idI);
    const posF = items.findIndex((i) => i.id === idF);
    console.log(tmp[posI], tmp[posF]);

    //[tmp[posI], tmp[posF]] = [tmp[posF], tmp[posI]];
    const tmpElement = { ...tmp[posI] };
    tmp[posI] = { ...tmp[posF] };
    tmp[posF] = { ...tmpElement };

    console.log("items despues", [...tmp]);
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

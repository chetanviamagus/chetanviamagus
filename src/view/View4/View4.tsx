import { useAppDispatch, useAppSelector } from "hook/redux";
import { addItem, removeItem } from "slice/CartSlice";

type TAllowedCurrencies = "INR" | "USD";

export interface IItem {
  uid: string;
  name: string;
  price: number;
  currency: TAllowedCurrencies;
}

const ITEMS: IItem[] = [
  {
    uid: "unique-id-1",
    name: "Biriyani",
    price: 100,
    currency: "INR",
  },
  {
    uid: "unique-id-2",
    name: "Chicken Chaap",
    price: 80,
    currency: "INR",
  },
  {
    uid: "unique-id-3",
    name: "Salad",
    price: 50,
    currency: "INR",
  },
];

function View4() {
  const dispatch = useAppDispatch();
  const cartItems = useAppSelector((state) => state.cart.items);

  const handleAddItem = (item: IItem) => {
    dispatch(addItem(item));
  };

  const handleRemoveItem = (item: IItem) => {
    dispatch(removeItem(item));
  };

  return (
    <div>
      <h1 className="mb-4 text-center">Cart</h1>
      <div className="flex flex-col gap-y-3">
        {ITEMS?.map?.((item: IItem) => {
          return (
            <div className="m-auto flex w-1/2 items-center justify-between gap-3 rounded-lg border p-4">
              <div className="flex flex-col">
                <div className="text-left font-semibold">{item.name}</div>
                <div className="text-left">
                  {item.currency} {item.price}
                </div>
              </div>
              <div>
                {cartItems?.find((_item: IItem) => _item.uid === item.uid) ? (
                  <button onClick={() => handleRemoveItem(item)}>-Remove</button>
                ) : (
                  <button onClick={() => handleAddItem(item)}>+Add</button>
                )}
              </div>
            </div>
          );
        })}
      </div>
      <div>
        <div className="mt-4">
          Total Price: {cartItems?.[0]?.currency ?? ""}{" "}
          {cartItems.reduce((acc: number, item: IItem) => acc + item?.price ?? 0, 0) ?? 0}
        </div>
      </div>
    </div>
  );
}

export default View4;

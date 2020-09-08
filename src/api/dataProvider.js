import createDataContext from "./createDataContext";
import Api from "../api";
import Cookie from "js-cookie";

const reducer = (state, action) => {
  switch (action.type) {
    case "SET_ITEMS":
      return {
        ...state,
        items: action.payload,
      };
    default:
      return state;
  }
};

const fetchItems = (dispatch) => async () => {
  await Api("admin/item/list")
    .then((data) => {
      dispatch({
        type: "SET_ITEMS",
        payload: data.data.data,
      });
    })
    .catch((error) => console.log(error));
};

const addItem = (dispatch) => async (data) => {
  await Api.post("admin/item/add", {
    category_id: data.category_id,
    sub_category_id: data.sub_category_id,
    brand_id: data.brand_id,
    name_en: data.name_en,
    name_ar: data.name_ar,
    description_en: data.description_en,
    description_ar: data.description_ar,
    image: "",
    price: data.price,
    status: data.status,
    item_custom_values: [],
  })
    .then(async (data) => {
      console.log(data);
      await fetchItems();
    })
    .catch((error) => console.log(error));
};

export const { Context, Provider } = createDataContext(
  reducer,
  {
    fetchItems,
    addItem,
  },
  {
    items: [],
  }
);

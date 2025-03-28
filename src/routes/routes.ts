export const routes = {
  auth: {
    base: "/auth",
    dynamic: "/auth",
  },
  home: {
    base: "/home",
    dynamic: "/home",
  },
  productView: {
    base: "/product/view",
    dynamic: "/product/view/:productId",
  },
  cart: {
    base: "/cart",
    dynamic: "/cart",
  },
  favourite: {
    base: "/favourite",
    dynamic: "/favourite",
  },
  catalog: {
    base: "/catalog",
    dynamic: "/catalog",
  },
  account: {
    base: "/account",
    dynamic: "/account",
  },
  stores: {
    base: "/stores",
    dynamic: "/stores",
  },
  storeView: {
    base: "/store/view",
    dynamic: "/store/view/:id",
  },
};

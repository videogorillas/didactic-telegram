function getCategories(products) {
  // TODO: distinct, sort
  products.forEach((item, i, arr) => { item.id = i });
  return products;
}

export {getCategories}
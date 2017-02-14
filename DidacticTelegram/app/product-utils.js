function getCategories(products) {
  // TODO: distinct, sort
  let distinct = products.filter((p, i) => {
    return products.indexOf(p) === i
  })
  
  let cats = [];
  products.forEach((product, i, arr) => {
    let cat = cats.find(cat => cat.cat == product.cat);
    if (!cat)
      cats.push({cat: product.cat, count: 1});
    else
      cat.count++;
  });
  cats.sort((a, b) => {return b.count - a.count});
  
//   let cats = Array.from(products);
  cats.forEach((cat, i, arr) => { 
    cat.id = i;
    cat.selected = true;
  });
  console.log('>> cats: ' + JSON.stringify(cats));
  return cats;
}

export {getCategories}
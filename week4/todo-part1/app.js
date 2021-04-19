const getItems = () => {
  axios
    .get("https://api.vschool.io/victoriaTartaglione/todo")
    .then((res) => {
      displayItems(res.data);
    })

    .catch((err) => console.error(err));
};
getItems();

const displayItems = (items) => {
  console.log(items);

  let container = document.getElementById("itemContainer");
  items.forEach((item) => {
    let card = document.createElement("div");
    let nameElement = document.createElement("h3");
    nameElement.textContent = item.title;
    card.appendChild(nameElement);

    let descriptionElement = document.createElement("p");
    descriptionElement.textContent = item.description;
    card.appendChild(descriptionElement);

    let priceElement = document.createElement("p");
    priceElement.textContent = item.price;
    card.appendChild(priceElement);
    container.appendChild(card);
  });
};

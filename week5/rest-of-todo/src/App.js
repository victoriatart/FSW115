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

    //delete
    let deleteButton = document.createElement("button");
    deleteButton.textContent = "DELETE";
    deleteButton.value = item._id;
    deleteButton.addEventListener("click", deleteItem);
    card.appendChild(deleteButton);

    //Update
    let updateButton = document.createElement("button");
    console.log(item.completed);
    let updateText = " ";
    if (item.completed === false) {
      updateText = " Mark Complete";
    } else {
      updateText = " Mark Incomplete";
    }
    updateButton.textContent = updateText;
    updateButton.id = item._id;
    updateButton.value = item.completed;
    updateButton.addEventListener("click", updateItem);
    card.appendChild(updateButton);

    container.appendChild(card);
  });
};

const addItem = (e) => {
  e.preventDefault();
  console.log("POST");

  let itemTitle = document.getElementById("itemTitle").value;
  let itemDescription = document.getElementById("itemDescription").value;
  let itemPrice = document.getElementById("itemPrice").value;
  let itemCompleted = document.getElementById("itemCompleted").checked;

  let data = {
    title: itemTitle,
    description: itemDescription,
    price: itemPrice,
    completed: itemCompleted,
  };

  axios
    .post("https://api.vschool.io/victoriaTartaglione/todo", data)
    .then((res) => {
      location.reload();
    })

    .catch((err) => console.error(err));
};

let form = document.getElementById("itemForm");
form.addEventListener("submit", addItem);

const deleteItem = (e) => {
  let itemId = e.target.value;

  axios
    .delete(`https://api.vschool.io/victoriaTartaglione/todo/${itemId}`)
    .then((res) => {
      location.reload();
    })

    .catch((err) => console.error(err));
};

const updateItem = (e) => {
  console.log("ran Updates");
  let itemId = e.target.value;
  let itemCompleted = e.target.value;

  let completed = null;

  itemCompleted = "false" ? (completed = true) : (completed = false);

  let updatedItem = {
    completed: completed,
  };
  axios
    .put(`https://api.vschool.io/victoriaTartaglione/todo/${itemId}`)
    .then((res) => {
      location.reload();
    })

    .catch((err) => console.error(err));
};

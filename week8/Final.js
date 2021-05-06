var starwarsFilms = [];
var listItems = [];

const getStarwarsFilms = () => {
  return axios
    .get("https://swapi.dev/api/films/")
    .then((res) => {
      starwarsFilms = res.data.results;
      return res.data.results;
    })

    .catch((err) => console.error(err));
};

const getItems = () => {
  return axios
    .get("http://api.bryanuniversity.edu/starwarsmovie/list")
    .then((res) => {
      listItems = res.data;
      return res.data;
    })

    .catch((err) => console.error(err));
};

const initPage = async () => {
  const films = await getStarwarsFilms();
  starwarsFilms = films;
  // const items = await getItems();
  // console.log(films, items);
  // displayItems(films, items)
};
initPage();

const displayItems = (films, user) => {
  console.log(films, user);
let userObj = user; //fixing scoping issue
  const episodesWatched = user.description;
  console.log(episodesWatched);

  let container = document.getElementById("itemContainer");
  container.innerHTML = "" //emptying the container
  films.forEach((film) => {
    let filmObj = film; //fixing scoping issue
    console.log(filmObj)
    let card = document.createElement("div");
    let nameElement = document.createElement("h3");
    nameElement.textContent = film.title;
    card.appendChild(nameElement);

    let directorElement = document.createElement("p");
    directorElement.textContent = film.director;
    card.appendChild(directorElement);

    let producerElement = document.createElement("p");
    producerElement.textContent = film.producer;
    card.appendChild(producerElement);

    //delete
    let deleteButton = document.createElement("button");
    deleteButton.textContent = "DELETE";
    deleteButton.value = film.episode_id;
    deleteButton.addEventListener("click", deleteItem);
    card.appendChild(deleteButton);

    //Update
    let updateButton = document.createElement("button");
    console.log(film.completed);
    let updateText = " ";
    if (episodesWatched.includes(film.episode_id)) {
      updateText = " Seen it! ";
    } else {
      updateText = " Need to Watch ";
    }
    updateButton.textContent = updateText;
    updateButton.id = film._id;
    updateButton.value = film.completed;
    updateButton.addEventListener("click", () => {
      console.log(updateButton.id, filmObj.episode_id)
      if (userObj.description.includes(filmObj.episode_id)) {
        userObj.description = userObj.description.replace(filmObj.episode_id, "");
      } else {
        userObj.description += filmObj.episode_id;
      }
      axios
        .put(
          `http://api.bryanuniversity.edu/starwarsmovie/list/${user._id}`,
          userObj
        )
        .then((res) => {
          // location.reload();
          readItem();
        })

        .catch((err) => console.error(err));
    });

    card.appendChild(updateButton);

    container.appendChild(card);
  });
};

const addItem = (event) => {
  event.preventDefault();
  console.log("POST");

  let itemName = document.getElementById("itemName").value;

  let data = {
    name: itemName,
    description: "", // this will store the episode numbers that we have seen
  };

  axios
    .post("http://api.bryanuniversity.edu/starwarsmovie/list/", data)
    .then((res) => {
      console.log(res);
      // location.reload();
    })

    .catch((err) => console.error(err));
};

let form = document.getElementById("itemForm");
form.addEventListener("submit", addItem);

const readItem = async () => {
  console.log("readItem");
  let itemName = document.getElementById("itemName").value;
  const items = await getItems();
  let matchingUsers = items.filter((item) => {
    return item.name == itemName;
  });
  let foundUser = matchingUsers[0]
  console.log(itemName, foundUser);
  displayItems(starwarsFilms, foundUser);
};

let recallButton = document.getElementById("recallButton");
recallButton.addEventListener("click", readItem);

const deleteItem = (e) => {
  let itemId = e.target.value;

  axios
    .delete(`http://api.bryanuniversity.edu/starwarsmovie/list/${itemId}`)
    .then((res) => {
      location.reload();
    })

    .catch((err) => console.error(err));
};

//API I will be using - https://forkify-api.herokuapp.com/v2

async function food() {
  try {
    let res = await fetch(
      "https://forkify-api.herokuapp.com/api/v2/recipes/5ed6604591c37cdc054bcd09"
    );
    let data = await res.json();
    console.log(data.data.recipe.title);
  } catch (error) {
    console.log(error);
  }
}

food();

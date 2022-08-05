//API I will be using - https://forkify-api.herokuapp.com/v2
//https://forkify-api.herokuapp.com/api/v2/recipes?(query string)search=pizza

async function food() {
  try {
    let res = await fetch(
      "https://forkify-api.herokuapp.com/api/v2/recipes/5ed6604591c37cdc054bcd09"
    );
    let data = await res.json();

    if (res.ok === false) {
      throw new Error(`It's a ${res.statusText}. ${data.message}`);
    } else {
      let recipe = data.data.recipe;
      //   console.log(recipe);
      recipe = {
        id: recipe.id,
        title: recipe.title,
        img: recipe.image_url,
        publisher: recipe.publisher,
        source: recipe.source_url,
        ingredients: recipe.ingredients,
        servings: recipe.servings,
        time: recipe.cooking_time,
      };
      console.log(recipe);
    }
  } catch (error) {
    console.log(error);
  }
}

food();

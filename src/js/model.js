//State Object
//Which will be rendered in the UI to display all the data regarding a certain food  item
export const state = {
  recipie: {},
};

export const loadRecipie = async function (id) {
  try {
    let res = await fetch(
      `https://forkify-api.herokuapp.com/api/v2/recipes/${id[1]}`
    );
    let data = await res.json();

    if (res.ok === false) {
      throw new Error(`It's a ${res.statusText}. ${data.message}`);
    }
    const recipe = data.data.recipe;
    state.recipie = {
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
  } catch (err) {
    console.log(err);
  }
};

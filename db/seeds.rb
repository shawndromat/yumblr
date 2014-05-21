# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the rake db:seed (or created alongside the db with db:setup).
#

shawna = User.create(email: "shawna@yumblr.io")
shawna.save!(:validate => false)
pbj = Recipe.create(
  title: "PB & J",
  photo_url: "http://cquick.agblogger.org/wp-content/blogs.dir/16/files//2008/04/pbj.jpg",
  owner: shawna
)

pbj1 = Step.create(
  body: "Spread peanut butter on one slice of bread",
  recipe_id: pbj.id,
  rank: 1
)
pbj1 = Step.create(
  body: "Spread jelly on the other slice of bread",
  recipe_id: pbj.id,
  rank: 2
)
pbj1 = Step.create(
  body: "Put the two slices of bread together and enjoy!",
  recipe_id: pbj.id,
  rank: 3
)
pb = Ingredient.create(name: "peanut butter");
j = Ingredient.create(name: "strawberry jelly");
bread = Ingredient.create(name: "bread");
pbj_ing_1 = IngredientEntry.create(
  amount: 2,
  unit: "tablespoon",
  ingredient_id: pb.id,
  recipe_id: pbj.id
)
pbj_ing_2 = IngredientEntry.create(
  numerator: 1,
  denominator: 8,
  unit: "cup",
  ingredient_id: j.id,
  recipe_id: pbj.id
)

pbj_ing_3 = IngredientEntry.create(
  amount: 2,
  unit: "slice",
  ingredient_id: bread.id,
  recipe_id: pbj.id
)

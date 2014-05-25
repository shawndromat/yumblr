json.extract! entry, :id, :amount, :fraction, :rank, :recipe_id

json.unit entry.unit_pluralize
json.ingredient_name entry.ingredient.name.downcase

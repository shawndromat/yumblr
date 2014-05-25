json.extract! entry, :id, :amount, :fraction, :unit, :rank, :recipe_id

json.unit_display entry.unit_pluralize
json.ingredient_name entry.ingredient.name.downcase

json.extract! entry, :id, :amount, :unit

json.fraction entry.translate_fraction

json.ingredient entry.ingredient.name

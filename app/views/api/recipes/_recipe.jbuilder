json.extract! recipe, :title, :photo_url, :id

json.owner recipe.owner.username
json.owner_id recipe.owner.id

json.steps recipe.steps, partial: 'api/steps/step', as: :step

json.ingredient_entries recipe.ingredient_entries, partial: 'api/ingredient_entries/ingredient_entry', as: :entry

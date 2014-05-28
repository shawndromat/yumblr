json.extract! recipe, :title, :photo_url

json.owner_id recipe.owner.id
json.owner recipe.owner.username

json.steps recipe.steps, partial: 'api/steps/step', as: :step

json.ingredient_entries recipe.ingredient_entries,
    partial: 'api/ingredient_entries/ingredient_entry',
    as: :entry

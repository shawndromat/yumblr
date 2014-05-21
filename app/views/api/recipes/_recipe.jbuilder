json.extract! recipe, :title, :photo_url

json.steps recipe.steps, partial: 'api/steps/step', as: :step

json.ingredient_entries recipe.ingredient_entries,
    partial: 'api/ingredient_entries/ingredient_entry',
    as: :entry
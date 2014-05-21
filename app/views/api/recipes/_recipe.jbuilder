json.extract! recipe, :title, :photo_url

json.steps recipe.steps, partial: 'api/steps/step', as: :step

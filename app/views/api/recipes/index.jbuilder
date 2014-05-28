json.array! @recipes do |recipe|
  json.id recipe.id
  json.title recipe.title
  json.photo_url recipe.photo_url
  json.owner recipe.owner.username
  json.owner_id recipe.owner.id
end

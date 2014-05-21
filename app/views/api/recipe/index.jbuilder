json.array! @recipes do |recipe|
  json.title recipe.title
  json.photo_url recipe.photo_url
end

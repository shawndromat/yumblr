Yumblr::Application.routes.draw do
  devise_for :users
  resources :recipes
  resources :ingredients, only: [:index]
  root to: "recipes#index"
end

Yumblr::Application.routes.draw do
  devise_for :users
  resources :recipes
  root to: "recipes#index"
end

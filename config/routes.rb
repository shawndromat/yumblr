Yumblr::Application.routes.draw do
  devise_for :users
  namespace :api, defaults: { format: :json } do
    resources :recipes
    resources :ingredients, only: [:index]
  end
  root to: "static_pages#root"
end

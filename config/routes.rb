Yumblr::Application.routes.draw do
  devise_for :users

  namespace :api, defaults: { format: :json } do
    resources :recipes do
      resources :steps, only: [:create, :update]
      resources :ingredient_entries, only: [:create, :update]
    end
    resources :ingredients, only: [:create, :index]
  end

  root to: "static_pages#root"
end

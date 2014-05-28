Yumblr::Application.routes.draw do
  resources :users, only: [:new, :create]
  resource :session, only: [:new, :create, :destroy]

  get "session/guest_sign_in", to: "sessions#guest_sign_in"

  namespace :api, defaults: { format: :json } do
    resources :recipes do
      resources :steps, only: [:create, :update, :destroy]
      resources :ingredient_entries, only: [:create, :update, :destroy]
    end
    resources :ingredients, only: [:create, :index]
  end

  root to: "static_pages#root"
end

Rails.application.routes.draw do
  post "/graphql", to: "graphql#execute"
  # For details on the DSL available within this file, see http://guides.rubyonrails.org/routing.html
  root 'root#index'

  if Rails.env.development?
    get :graphiql, controller: 'root'
  end

  get '/auth/:provider/callback', to: 'sessions#create'
end

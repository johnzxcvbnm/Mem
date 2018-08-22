Rails.application.routes.draw do

  # User Routes
  get '/users', to: 'users#index'
  get '/users/:id', to: 'users#show'
  post '/users', to: 'users#create'
  delete '/users/:id', to: 'users#delete'
  put '/users/:id', to: 'users#update'
  get '/users/find/:name', to: 'users#showName'

  # Post Routes
  get '/posts', to: 'posts#index'
  get '/posts/:id', to: 'posts#show'
  post '/posts', to: 'posts#create'
  delete '/posts/:id', to: 'posts#delete'
  put '/posts/:id', to: 'posts#update'

  # Likes Routes
  get '/likes', to: 'likes#index'
  get '/likes/:id', to: 'likes#show'
  post '/likes', to: 'likes#create'
  delete '/likes/:id', to: 'likes#delete'
  put '/likes/:id', to: 'likes#update'

end

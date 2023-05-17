Rails.application.routes.draw do
  
  # Routing logic: fallback requests for React Router.
  # Leave this here to help deploy your app later!
  
  #Custom routes
  post '/login', to: 'sessions#create' 
  delete '/logout', to: 'sessions#destroy'
   post '/signup', to: 'users#create'
   get '/me', to: 'users#show' 
   patch '/users/:id', to: 'users#update'
    
  #  get '/myaccount', to: 'bookings#myBookings'
 
   #Routes - full crud 
   resources :bookings 
   resources :hotels 
   resources :users
   
   get "*path", to: "fallback#index", constraints: ->(req) { !req.xhr? && req.format.html? }
end

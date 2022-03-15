Rails.application.routes.draw do
  root to: 'static_pages#home'

  get '/property/:id'           => 'static_pages#property'
  get '/login'                  => 'static_pages#login'
  get '/account'                => 'static_pages#account'
  get '/booking/:id/success'    => 'static_pages#booking'

  namespace :api do
    # Add routes below this line
    resources :users, only: [:create]
    resources :bookings, only: [:create]
    resources :charges, only: [:create]

    post '/sessions'                  => 'sessions#create'
    delete '/sessions'                => 'sessions#destroy'
    get  '/authenticated'             => 'sessions#authenticated'

    get '/properties/'                => 'properties#index'
    get '/properties/:id'             => 'properties#show'
    get '/properties/:id/bookings'    => 'bookings#get_property_bookings'

    get '/booking/:id/success'        => 'bookings#details'

    get '/user/:id'                   => 'users#details'

    # stripe webhook
    post '/charges/mark_complete' => 'charges#mark_complete'

  end

end

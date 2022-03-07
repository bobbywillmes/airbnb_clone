Rails.application.routes.draw do
  root to: 'static_pages#home'

  get '/property/:id' => 'static_pages#property'
  get '/login'        => 'static_pages#login'

  namespace :api do
    # Add routes below this line
    resources :users, only: [:create]
    resources :properties, only: [:index, :show]
    resources :bookings, only: [:create]
    resources :charges, only: [:create]

    post '/sessions'            => 'sessions#create'
    delete '/sessions'          => 'sessions#destroy'
    get  '/authenticated'       => 'sessions#authenticated'

    get '/properties/:id/bookings' => 'bookings#get_property_bookings'

    # stripe webhook
    post '/charges/mark_complete' => 'charges#mark_complete'

  end

end

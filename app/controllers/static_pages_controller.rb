class StaticPagesController < ApplicationController
  def home
    render 'home'
  end

  def property
    @data = { property_id: params[:id] }.to_json
    render 'property'
  end

  def newProperty
    render 'newProperty'
  end

  def editProperty
    @data = { property_id: params[:id] }.to_json
    render 'editProperty'
  end

  def login
    render 'login'
  end

  def account
    render 'account'
  end

  def booking
    @data = { booking_id: params[:id] }.to_json
    render 'booking'
  end

end

module Api
  class PropertiesController < ApplicationController
    skip_before_action :verify_authenticity_token
    def index
      @properties = Property.order(created_at: :desc).page(params[:page]).per(6)
      return render json: { error: 'not_found' }, status: :not_found if !@properties
      render 'api/properties/index', status: :ok
    end

    def show
      @property = Property.find_by(id: params[:id])
      return render json: { error: 'not_found' }, status: :not_found if !@property
      render 'api/properties/show', status: :ok
    end

    def create
      token = cookies.signed[:airbnb_session_token]
      session = Session.find_by(token: token)
      user = session.user
      @property = user.properties.new(property_params)

      if @property.save
        render json: @property, status: :created
      else
        render json: {error: 'unable to create property'}
      end
    end

    def update
      token = cookies.signed[:airbnb_session_token]
      session = Session.find_by(token: token)
      user = session.user

      @property = Property.find_by(id: params[:id])

      return render json: {message: 'not authorized'}, status: :forbidden if @property.user_id != user.id

      return render 'not_found', status: :not_found if not @property
      return render 'bad_request', status: :bad_request if not @property.update(property_params)
      render 'show', status: :ok
    end

    def deleteImage
      @attachment = ActiveStorage::Attachment.find(params[:id])
      return render json: {message: 'image deleted', status: 200} if @attachment.purge
    end

    private
      def property_params
        params.require(:property).permit(:title, :description, :city, :country, :property_type, :price_per_night, :max_guests, :bedrooms, :beds, :baths, :user, images: [])
      end
  end
end
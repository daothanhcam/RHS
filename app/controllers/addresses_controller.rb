class AddressesController < ApplicationController
  before_action :authenticate_user!, except: [:index, :show]
  before_action :find_address, only: [:show, :edit, :destroy, :update]

  def index
    if params[:addresses_to_map]
      max_price = (params[:max_price].present? && params[:max_price].to_i.to_s == params[:max_price]) ? params[:max_price].to_i : Settings.maps.max_price.to_i
      min_price = (params[:min_price].present? && params[:min_price].to_i.to_s == params[:min_price]) ? params[:min_price].to_i : 0
      min_area = (params[:min_area].present? && params[:min_area].to_i.to_s == params[:min_area]) ? params[:min_area].to_i : 0
      max_area = (params[:max_area].present? && params[:max_area].to_i.to_s == params[:max_area]) ? params[:max_area].to_i : Settings.maps.max_area.to_i
      @result = Address.area_in_range(min_area, max_area)
        .price_in_range(min_price, max_price)
        .where(house: Address.houses[params[:type]])
      respond_to {|format| format.json{render json: @result}} and return
    else
      @address = Address.new
      @recent_addresses = Address.last Settings.num_of_recent_addresses

      @search = Address.search params[:q]
    end
  end

  def show
    @address = Address.find params[:id]
    @form_user = FormUser.find @address.user_id
    @recent_addresses = Address.last Settings.num_of_recent_addresses
    @reviews = @address.reviews.page params[:page]
    @review = @address.reviews.build
    respond_to do |format|
      format.html
      format.js
    end
  end

  def edit
  end

  def new
    @address = Address.new
    @image = @address.images
  end

  def create
    address_params[:user_id] = current_user.id
    @address = Address.new address_params
    if @address.save
      redirect_to new_address_path, notice: t("address.create")
    else
      render :new
    end
  end

  def update
    if @address.update address_params
      redirect_to @address, success: t("address.updated")
    else
      render :edit
    end
  end

  def destroy
    @address.destroy
    redirect_to request.referer || root_ur, alert: t("address.destroy")
  end

  private
  def address_params
    params.require(:address).permit Address::PARAMS_ATTRIBUTES
  end

  def find_address
    @address = Address.find params[:id]
  end
end

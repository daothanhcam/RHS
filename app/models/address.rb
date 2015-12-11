class Address < ActiveRecord::Base
  include RailsAdmin::Address
  attr_accessor :google_map

  validates :title, presence: true
  validates :region, presence: true
  validates :house, presence: true
  validates :capacity, presence: true
  validates :contact, presence: true
  validates :address, presence: true
  validates :square, presence: true
  validates :price, presence: true
  validates :description, presence: true
  validates :lat, presence: true
  validates :lng, presence: true

  paginates_per Settings.pagination.per_page

  belongs_to :user
  belongs_to :region
  has_many :images, dependent: :destroy
  has_many :reviews, dependent: :destroy

  accepts_nested_attributes_for :images, allow_destroy: true

  delegate :province, to: :region

  def simplify_price
    if price >= 1000000
      "#{price/1000000} M"
    else
      price
    end
  end

  scope :by_province, ->province{joins(:region).where "regions.province = ?", province}

  enum house: [:apartment, :villa]


  scope :order_by_colunm, ->object do
    case object
    when Settings.type.title
      order :title
    when Settings.type.price_low_high
      order "price ASC"
    when Settings.type.price_high_low
      order "price DESC"
    when Settings.type.square_small_big
      order "square ASC"
    when Settings.type.square_big_small
      order "square DESC"
    when Settings.type.capacity_low_high
      order "capacity ASC"
    when Settings.type.capacity_high_low
      order "capacity DESC"
    end
  end

  def average_point
    reviews.average :point
  end

  PARAMS_ATTRIBUTES = [
    :user_id, :id, :lng, :lat, :contact, :title,
    :description, :type, :square, :address, :price, images_attributes: [:id, :photo, :is_main, :_destroy]
  ]
end

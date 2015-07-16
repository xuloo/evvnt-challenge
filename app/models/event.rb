require 'elasticsearch/persistence/model'

class Venue
  include Virtus.model

  attribute :name, String
  attribute :address_1, String
  attribute :address_2, String
  attribute :town, String
  attribute :country, String
  attribute :postcode, String
  attribute :latitude, Float
  attribute :longitude, Float
end

class Event
  include Elasticsearch::Persistence::Model

  #index_name [Rails.application.engine_name, Rails.env].join('-')
  index_name "events"

  attribute :title, String
  attribute :summary, String
  attribute :description, String
  attribute :organiser_name, String
  attribute :hastag, String
  attribute :contact, String
  attribute :package, String
  attribute :image_url, String
  attribute :image_urls, Array
  attribute :links, Array
  attribute :artists, String
  attribute :keywords, String

  attribute :venue, Venue

  attribute :category_id
  attribute :sub_category_id

  attribute :timestamp, Date
  attribute :start_time, Date
  attribute :end_time, Date
  attribute :door_time, Date
  attribute :last_entry_time, Date

  def as_json(options = nil)
    options = {:root => false}
    super(options)
  end

end



# Delete the previous articles index in Elasticsearch
# Event.__elasticsearch__.client.indices.delete index: Event.index_name rescue nil

# Create the new index with the new mapping
#Event.__elasticsearch__.client.indices.create index: Event.index_name, body: { settings: Event.settings.to_hash, mappings: Event.mappings.to_hash }

# Index all article records from the DB to Elasticsearch
#Event.import

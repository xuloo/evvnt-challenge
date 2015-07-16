require 'base64'

class EventRepository
  include Elasticsearch::Persistence::Repository

  def initialize(options={})
    index  options[:index] || 'events'
    client Elasticsearch::Client.new host: options[:host], log: options[:log]
  end

  klass Event

  type 'event'

  #settings number_of_shards: 1 do
  #  mapping do
  #    indexes :text,  analyzer: 'snowball'
  #    # Do not index images
  #    indexes :image, index: 'no'
  #  end
  #end

  # Base64 encode the "image" field in the document
  #
  #def serialize(document)
  #  hash = document.to_hash.clone
  #  hash['image'] = Base64.encode64(hash['image']) if hash['image']
  #  hash.to_hash
  #end

  # Base64 decode the "image" field in the document
  #
  #def deserialize(document)
  #  hash = document['_source']
  #  hash['image'] = Base64.decode64(hash['image']) if hash['image']
  #  klass.new hash
  #end
end

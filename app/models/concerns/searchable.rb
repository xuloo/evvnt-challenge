module Searchable
  extend ActiveSupport::Concern

  @repository = Elasticsearch::Persistence::Repository.new do

    client Elasticsearch::Client.new log: true, host: '52.18.100.236'

    index :events

    type :event

    klass :Event

  end

  included do
    include Elasticsearch::Model

    def self.all
      @repository.search(query: { match_all {} }).to_a
    end

    def self.search(query)
      @repository.search('114').to_a
    end
  end
end

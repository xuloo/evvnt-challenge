class VenuesController < ApplicationController

  def all
    results = Event.search query: { match_all: {  } }, aggregations: { venues: { terms: { field: "venue.name"}}}, size: 0

    render json: results.response.aggregations.venues.buckets.map { |venue| venue['key'] }
  end
  
end

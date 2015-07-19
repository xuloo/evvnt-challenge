class VenuesController < ApplicationController

  # returns the list of all the venue names.
  # the data is completely denormalized so we use an aggregation.
  def all
    results = Event.search query: { match_all: {  } }, aggregations: { venues: { terms: { field: "venue.name"}}}, size: 0

    render json: results.response.aggregations.venues.buckets.map { |venue| venue['key'] }
  end

end

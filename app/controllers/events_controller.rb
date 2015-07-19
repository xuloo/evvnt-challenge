class EventsController < ApplicationController

  # lists events.
  # by default they're ordered by most recent first
  # paging param 'p' defines the page to choose.
  def index
    result = Event.all sort: { start_time: { order: 'desc' } }, size: 10, from: params[:p]

    render json: { events: result, total: result.total }
  end

  # returns all the events that are occurring at the venue
  # name of the venue is supplied in the 'v' param.
  def for_venue
    result = Event.search query: { match: { 'venue.name' => params[:v] } }

    render json: { events: result, total: result.total }
  end

  # searches by keyword
  # keyword to search on is supplied in the 'q' param.
  def search
    result = Event.search query: { match: { 'keywords' => params[:q] } }

    render json: { events: result, total: result.total }
  end

end

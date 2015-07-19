class EventsController < ApplicationController

  # GET /events
  # GET /events.json
  def index
    result = Event.all sort: { start_time: { order: 'desc' } }, size: 10, from: params[:p]

    render json: { events: result, total: result.total }
  end

  def for_venue
    result = Event.search query: { match: { 'venue.name' => params[:v] } }

    render json: { events: result, total: result.total }
  end

  def search
    result = Event.search query: { match: { 'keywords' => params[:q] } }

    render json: { events: result, total: result.total }
  end

end

class EventsController < ApplicationController

  # GET /events
  # GET /events.json
  def index
    result = Event.all sort: { start_time: { order: 'desc' } }, size: 10, from: params[:p]

    render json: {events: result, total: result.total}
  end

  def for_venue

    print "finding events taking place at #{params[:v]}"

    #result = Event.search { 'query': { 'match': { 'venue.name': '#{params[:v]}'}}};
    query = '{"query": {"bool": {"must": [{ "match": { "user.name": "' + params[:v] + '"}}]}}}'
    print query
    result = Event.search query

    #result = Event.search \
    #  query: {
    #    bool: {
    #      must: [
    #        {
    #          nested: {
    #            path: "venue",
    #            query: {
    #              bool: {
    #                must: [
    #                  { match: { venue: params[:v] }}
    #                ]
    #              }
    #            }
    #          }
    #        }
    #      ]
    #    }
    #  }

      render json: {events: result, total: result.total}
  end

  def search
    tags = { pre_tags: '<em class="hl">', post_tags: '</em>' }
    results = Event.search \
      query: {
        multi_match: {
          query: params[:q],
          fields: ['keywords']
        }
      },
      highlight: {
        tags_schema: 'styled',
        fields: {
          name:    { number_of_fragments: 0 },
          members_combined: { number_of_fragments: 0 },
          profile: { fragment_size: 50 }
        }
      }

    render json: results
  end


  # GET /events/1
  # GET /events/1.json
  def show
    @event = Event.find(params[:id])

    respond_to do |format|
      format.html # show.html.erb
      format.json { render json: @event }
    end
  end

  # GET /events/new
  # GET /events/new.json
  def new
    @event = Event.new

    respond_to do |format|
      format.html # new.html.erb
      format.json { render json: @event }
    end
  end

  # GET /events/1/edit
  def edit
    @event = Event.find(params[:id])
  end

  # POST /events
  # POST /events.json
  def create
    @event = Event.new(params[:event])

    respond_to do |format|
      if @event.save
        format.html { redirect_to @event, notice: 'Event was successfully created.' }
        format.json { render json: @event, status: :created, location: @event }
      else
        format.html { render action: "new" }
        format.json { render json: @event.errors, status: :unprocessable_entity }
      end
    end
  end

  # PUT /events/1
  # PUT /events/1.json
  def update
    @event = Event.find(params[:id])

    respond_to do |format|
      if @event.update_attributes(params[:event])
        format.html { redirect_to @event, notice: 'Event was successfully updated.' }
        format.json { head :no_content }
      else
        format.html { render action: "edit" }
        format.json { render json: @event.errors, status: :unprocessable_entity }
      end
    end
  end

  # DELETE /events/1
  # DELETE /events/1.json
  def destroy
    @event = Event.find(params[:id])
    @event.destroy

    respond_to do |format|
      format.html { redirect_to events_url }
      format.json { head :no_content }
    end
  end
end

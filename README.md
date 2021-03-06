## Instructions for coding test

The following repository is an empty Rails 3.2.19 application with Rspec.
Please clone the repository, complete the exercise outlined below and provide us
access to your repository containing the solution.
Feel free to use any database and any version of Ruby (1.9 or greater).

## The exercise

The following endpoint lists event listings:

**https://api.sandbox.evvnt.com/events**

The endpoint is protected by Basic Auth and requires the following credentials to
access:

Username: evvntchallenge

Password: c2136849e524d6f43b90ac3d7e98e5dc



Build a system that periodically collects event listing data from the endpoint above, stores it in
a local database and provides a user interface to query the data. (This exercise is synonymous with
a simplified aggregate event listing platform, like Songkick or Eventful). The interface should allow a user to query the event listing data by:
* Start date (between range)
* Keyword
* Venue

All search operations should use AJAX where possible and paginate results.



We will be observing:
* The way you architect the overall application
* The way you model the data
* Use of clean, expressive, performant code


You may add new classes of any description to assist you. Any new classes
should have accompanying tests.

Make sure all tests are passing by running:

`rake`

**There is no time limit for this test.**

===

## My Solution

### Elasticsearch/Logstash

I've chosen to use Elasticsearch as the database backing the site for the following reasons:

1. Built on Ruby (JRuby, but still...)
2. I've been wanting to do something with Elasticsearch for a while now in order to learn more about it (and the accompanying Logstash/Kibana 'stack').
3. The schema-less nature of ES should make it easier to support other data sources in future (should this project be developed further).
4. It's extremely fast, even on large documents.
5. It's a doddle to cluster - so you can create something to prototype (like this site) and move to a production cluster with ease.

The data is periodically collected from the supplied endpoint via Logstash. This is a hammer-to-crack-a-nut for this specific use-case but the fact that Logstash is, like Elasticsearch, very straightforward to install and setup and provides a Ruby-based plugin architecture means that it was relatively simple to setup a pipepline for grabbing the data from the endpoint and updating the ES index with changes.

Setting things up like this also separates the data store and collection/collation from the site itself at an infrastructure level. If this project was going into production then the data stores could be clustered, those clusters changed, the management of the pipeline changed/monitored/tested in complete isolation to the site logic. This is a good thing, it means multiple teams can do multiple things, at once, without stepping on each other's toes.

in order to ge the data into Elasticsearch via Logstash (and to do a bit more Ruby work) i created a custom input plugin that's available [here on my Github account](https://github.com/xuloo/logstash-input-evvnt-challenge). It's also built and uploaded to [RubyGems](https://rubygems.org/gems/logstash-input-evvnt-challenge).

### AngularJS

The front end was built completely separately from the Rails backend:

1. This allows the front end to be built with Yeoman without any configuration changes; NPM, Bower etc. all work as-is
2. The back-end is now an 'API' - we're just asking it for data and receiving JSON responses. If we want to add another consumer (mobile app(s), public API access etc.) we aren't saddled with an API that's also a website and the interweaving dependencies that usually entails (and the subsequent game of cat's cradle when you try to separate them.)

### Arch overview

The design is prety sparse - this is deliberae, the idea is to make the frameworks/tools we're using do the heavy lifing - they've been built by people who are smarer han us and used by lots of oher people who are smarter than us. We don't need to re-invent the wheel.

So, an initializer `iniializers/elasticsearch.rb` configures the elasticsearch client (and configures the logger it uses, for good measure) - the host for elasticsearch is defined by an environment variable to make it easy to run the same code on different environments in different modes.

a couple of routes forwrd requests to the `/api` rather than the main site url.

There's a single model module `models/event.rb` which contains the domain model for the Event class and also the Venue class (which is never queried directly).

Calls to the /api are routed to the controllers - there are only 4 methods in total here for handling everything we need. The controller methods delegate to `Elasticsearch::Persistence::Model` methods and almost return the data provided by those methods, they're only decorated in a couple of instances in order to provide pagination support on the front-end.

===

## Running this project

The site is already running at http://evvnt-challenge.xuloo.cc However, if you want to get it up and running locally there are a couple of options, what with using elasticsearch:

#### Run the site locally, use the remote Elasticsearch/Logstash instances i've got running on AWS.

This is the easiest way - it'll connect to the same ES instance that the demo site is using. just create the environment variable that tells the site where to find ES

```
export ELASTICSEARCH_HOST=evvnt-challenge.xuloo.cc
```

Start the Rails app

```
bundle install
rails s
```

Then you'll need to setup the front-end project

```
cd [repo directory]/ngapp
npm install
bower install
grunt server

```

This starts the front-end running on port 9000 - with the rails app running on 3000 there's a problem accessing the api so there's a proxy configured in the `Gruntfile` to map the `/api` calls to the correct port.

#### Run the whole thing locally (this site and ES).

This is a bit more complicated as it requires the configuration of Logstash. But it's by no means difficult.

##### Setting up Elasticsearch/Logstash locally

Download and install Elasticsearch and Logstash for you platform.

*Elasticsearch 1.4.4*

https://www.elastic.co/downloads/past-releases/elasticsearch-1-4-4

*Logstash 1.5.1*

https://www.elastic.co/downloads/past-releases/logstash-1-5-1

Once ES and Logstash are running you'll need to:

1. create the 'events' index
2. customise the mapping for the 'event' type
3. Install the _logstash-input-evvnt-challenge_ plugin into Logstash
4. Define the Logstash pipeline that will collect the event data and push it to ES.

###### Create the 'events' index && Customise the mapping for the 'event' type

We need to map the `_id` field for the event document to the 'id' property of the event that's being stored in the document. We also need to prevent the analyzer from
processing venue.name - otherwise when we try to get the list of the venue names with an 'aggregate' it'll give us the unique _words_ that make up the venue
names rather than the _phrases_.

```
# create the 'events' index
curl -XPUT 'http://localhost:9200/events/'

# list all the indices to confirm creation
curl 'localhost:9200/_cat/indices?v'

# create the '_id' mapping - the document's '_id' field will now be the same as the value of the 'id' property of the document.
curl -XPUT 'http://localhost:9200/events/_mapping/event' -d '{"event": {"_id": {"path": "id"}}}'

# create the mapping for the 'venue.name' property field - stopping it from being analyzed
curl -XPUT 'http://localhost:9200/events/event/_mapping' -d '{"event": {"properties": {"venue": {"properties": {"name": {"type": "string", "index": "not_analyzed"}}}}}}'

# check the mappings are all created correctly
curl -XGET 'http://localhost:9200/events/_mapping/event'
```

### Install the _logstash-input-evvnt-challenge_ plugin into Logstash

###### Install development version

The plugin can be used from source available at

https://github.com/xuloo/logstash-input-evvnt-challenge

You'll need to clone the repo and then install it by specifying the path to the clone.

```
bin/plugin install [path-to-plugin-source] --no-validate
```

Then restart Logstash

###### Install from RubyGems

This is the same as any other Logstash plugin.

```
bin/plugin install logstash-input-evvnt-challenge
```

###### Define the Logstash pipeline that will collect the event data and push it to ES.

The following config will create the pipeline.

```
input {
  evvnt {
    host => "https://api.sandbox.evvnt.com"
    path => "events"
    user => "evvntchallenge"
    pass => "c2136849e524d6f43b90ac3d7e98e5dc"
  }
}

output {
  elasticsearch {
    host => localhost
    index => "events"
    index_type => "event"
  }
  stdout {
    codec => rubydebug
  }
}
```

You'll then have to specify this config when you start Logstash.

##### note about grunt build

You may find that the `cdnify:dist` task step of `grunt build` fails due to an error with git - if so then it's probably because it's trying to make a git request with the `git://` protocol. To fix it try

```
git config --global url."https://".insteadOf git://
```

==

## [TODO]

##### Search between dates
At the moment Elastic search queries aren't returning results for a filter with dates in it. I've added the JS 'moment' library in order to format dates nicely to pass to ES (to see if it's a problem with formatting in the request) but that's not the problem.

##### UI/UX
There's a lot of work to do with the layout of the front-end, including, but not limited to:
* The date selection for date filtering
* The layout of the 'detail' view (shown when you select an event from the list)
* Make the 'search' section at the top of the page much more unobtrusive, put the content to the top (perhaps make the search options part of a burger menu)
* Make the keyword search much more google-y - have it search not just keywords but description, title etc and make the auto-complete list contents more styled (add the date/time of the event, thumbnail image etc.)

##### Deployment
Capistrano is setup to deploy (with Unicorn serving and ngix proxying) but it's not quite there yet. Needs to add the 'grunt build' of the front end app and point to the ngapp/dist directory.

##### Logstash plugin
* At the moment a new net connection is created each time the request for data is made - this should be created when the plugin is started and torn down when it's destroyed so the same connection is used throughout the plugin's lifetime (with error handling to recreate it if it's dropped).

##### Tests
There's very little to test in the rails app right now but the front-end could be provided with tests - to ensure that the UI components are in the correct state (when an event is selected, searched for etc.)

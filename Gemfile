source 'https://rubygems.org'

gem 'rails', '3.2.19'

# Bundle edge Rails instead:
# gem 'rails', :git => 'git://github.com/rails/rails.git'

#gem 'sqlite3'

# We're using elasticsearch for persistence
gem 'elasticsearch', git: 'git://github.com/elasticsearch/elasticsearch-ruby.git'
gem 'elasticsearch-model', git: 'git://github.com/elasticsearch/elasticsearch-rails.git', require: 'elasticsearch/model'
gem 'elasticsearch-persistence', git: 'git://github.com/elasticsearch/elasticsearch-rails.git', require: 'elasticsearch/persistence/model'
gem 'elasticsearch-rails', git: 'git://github.com/elasticsearch/elasticsearch-rails.git'

# Gems used only for assets and not required
# in production environments by default.
group :assets do
  gem 'sass-rails',   '~> 3.2.3'
  gem 'coffee-rails', '~> 3.2.1'

  # See https://github.com/sstephenson/execjs#readme for more supported runtimes
  # gem 'therubyracer', :platforms => :ruby

  gem 'uglifier', '>= 1.0.3'
end

group :development do
  gem 'capistrano', '~> 3.1.0'

  # rails specific capistrano funcitons
  gem 'capistrano-rails', '~> 1.1.0'

  # integrate bundler with capistrano
  gem 'capistrano-bundler'

  gem 'capistrano-rvm'

  gem 'capistrano-unicorn-nginx', '~> 3.2.0'
end

# Use the Unicorn app server
gem 'unicorn'

gem 'jquery-rails'
gem 'rspec-rails'

# To use ActiveModel has_secure_password
# gem 'bcrypt-ruby', '~> 3.0.0'

# To use Jbuilder templates for JSON
# gem 'jbuilder'

# Use unicorn as the app server
# gem 'unicorn'

# Deploy with Capistrano
# gem 'capistrano'

# To use debugger
# gem 'debugger'

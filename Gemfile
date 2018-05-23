source 'https://rubygems.org'
git_source(:github) { |repo| "https://github.com/#{repo}.git" }

ruby '2.5.1'

gem 'rails', '~> 5.2.0'
gem 'pg'
gem 'puma'
gem 'bootsnap', require: false
gem 'omniauth'
gem 'omniauth-github'
gem 'webpacker'
gem 'graphql', github: 'mtsmfm/graphql-ruby', branch: 'use-method-instead-of-ivar'
gem 'graphql-batch'
gem 'octokit'

group :development, :test do
  gem 'pry-byebug'
  gem 'pry-rails'
end

group :development do
  gem 'listen', '>= 3.0.5', '< 3.2'
end

FROM ruby

ENV BUNDLE_JOBS=4 RAILS_LOG_TO_STDOUT=true RAILS_SERVE_STATIC_FILES=true

COPY --from=node /usr/local /usr/local
COPY --from=node /opt /opt

RUN apt-get update && apt-get install -y autoconf automake build-essential python-dev less
RUN cd && \
  git clone https://github.com/facebook/watchman && \
  cd watchman && git checkout v4.9.0 && ./autogen.sh && ./configure && \
  make && make install && \
  cd && rm -rf watchman

RUN useradd --create-home --user-group --uid 1000 app
RUN mkdir /app
RUN chown -R app /app

WORKDIR /app

USER app

COPY --chown=app Gemfile Gemfile.lock ./

RUN bundle install

COPY --chown=app package.json yarn.lock ./

RUN yarn install

COPY --chown=app . ./

RUN yarn run relay

RUN SECRET_KEY_BASE=`bin/rails secret` RAILS_ENV=production bin/rails assets:precompile

CMD ["bin/rails", "server", "-b", "0.0.0.0"]

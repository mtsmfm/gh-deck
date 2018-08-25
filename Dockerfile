FROM ruby

ARG DISABLE_COMPILE

ENV BUNDLE_JOBS=4 RAILS_LOG_TO_STDOUT=true RAILS_SERVE_STATIC_FILES=true

COPY --from=node /usr/local /usr/local
COPY --from=node /opt /opt

RUN apt-get update && apt-get install -y less

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

RUN if [ -z "$DISABLE_COMPILE" ]; then \
  yarn run apollo:codegen && SECRET_KEY_BASE=`bin/rails secret` RAILS_ENV=production bin/rails assets:precompile \
  ;fi

CMD ["bin/rails", "server", "-b", "0.0.0.0"]

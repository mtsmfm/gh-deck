FROM ruby

ENV BUNDLE_JOBS=4

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

CMD ["bin/rails", "server", "-b", "0.0.0.0"]

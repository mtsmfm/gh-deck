FROM ruby

ENV BUNDLE_JOBS=4

COPY --from=node /usr/local /usr/local
COPY --from=node /opt /opt

RUN useradd --create-home --user-group --uid 1000 app
RUN mkdir /app
RUN chown -R app /app

WORKDIR /app

USER app

CMD ["bin/rails", "server", "-b", "0.0.0.0"]

import { hot } from "react-hot-loader";
import * as React from "react";
import { Avatar, Button, Grid } from "material-ui";
import GithubEventList from "./GithubEventList";
import { ApolloProvider, Query } from "react-apollo";
import gql from "graphql-tag";
import { AppQuery } from "./__generated__/AppQuery";
import PageVisibility from "react-page-visibility";
import client from "../client";
import { GithubEventCreatedSubscription } from "./__generated__/GithubEventCreatedSubscription";

class App extends React.Component {
  render() {
    return (
      <ApolloProvider client={client}>
        <Query<AppQuery>
          query={gql`
            query AppQuery {
              viewer {
                id
                image
                githubEvents {
                  ...GithubEventList_githubEvent
                }
              }
              ...GithubEventList_query
            }
            ${GithubEventList.fragments.query}
            ${GithubEventList.fragments.githubEvent}
          `}
        >
          {({ loading, error, data, subscribeToMore }) => {
            if (loading) return <p>Loading...</p>;
            if (error || !data) return <p>Error</p>;

            return (
              <div>
                <PageVisibility>
                  {isVisible =>
                    data.viewer ? (
                      <Grid container>
                        <Grid item xs={2}>
                          <Avatar src={data.viewer.image} />
                        </Grid>
                        <Grid item xs={10}>
                          {isVisible && (
                            <GithubEventList
                              query={data}
                              githubEvents={data.viewer.githubEvents}
                              subscribeToMore={() => {
                                subscribeToMore({
                                  document: gql`
                                    subscription GithubEventCreatedSubscription {
                                      githubEventCreated {
                                        id
                                        ...GithubEventList_githubEvent
                                      }
                                    }
                                    ${GithubEventList.fragments.githubEvent}
                                  `,
                                  updateQuery: (
                                    prev: AppQuery,
                                    {
                                      subscriptionData
                                    }: { subscriptionData: { data: any } }
                                  ) => {
                                    const data: GithubEventCreatedSubscription =
                                      subscriptionData.data;

                                    if (!data) return prev;
                                    if (!prev.viewer) return prev;

                                    return {
                                      ...prev,
                                      viewer: {
                                        ...prev.viewer,
                                        githubEvents: [
                                          data.githubEventCreated,
                                          ...prev.viewer.githubEvents
                                        ]
                                      }
                                    };
                                  }
                                });
                              }}
                            />
                          )}
                        </Grid>
                      </Grid>
                    ) : (
                      <Button href="/auth/github">Login via GitHub</Button>
                    )
                  }
                </PageVisibility>
              </div>
            );
          }}
        </Query>
      </ApolloProvider>
    );
  }
}

export default hot(module)(App);

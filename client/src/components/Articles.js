import React, { Component, Fragment } from "react";
import gql from "graphql-tag";
import { Query } from "react-apollo";
import ArticleItem from "./ArticleItem";

const US_BUSINESS_QUERY = gql`
  query businessArticlesQuery {
    articles {
      title
      description
      content
      publishedAt
      url
      source {
        name
      }
    }
  }
`;

export default class Articles extends Component {
  render() {
    return (
      <div>
        <h5>Articles for the day</h5>
        <Query query={US_BUSINESS_QUERY}>
          {({ loading, error, data }) => {
            if (loading) {
              return (
                <h4>
                  <i class="fa fa-sync fa-spin" />
                  Loading...
                </h4>
              );
            }
            if (error) console.log(error);
            console.log(data);
            console.log(data.articles);
            return (
              <Fragment>
                {data.articles.map(article => {
                  return <ArticleItem article={article} />;
                })}
              </Fragment>
            );
          }}
        </Query>
      </div>
    );
  }
}
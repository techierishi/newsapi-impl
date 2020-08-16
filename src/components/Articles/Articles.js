import React, { useEffect, useState } from "react";
import { Container, Row, Col } from "shards-react";
import "./Articles.css";
import Article from "../Article/Article";
import Util from "../../Util";
import NewsFilter from "../NewFilter/NewsFilter";
import UserDetails from "../UserDetails/UserDetails";

export default function Articles() {
  const [articles, setArticles] = useState([]);

  useEffect(() => {
    getNews();
  }, []);

  function getNews(searchKey) {
    const baseUrl = Util.baseURL();
    const addSearch = searchKey ? `?search=${searchKey}` : "";
    fetch(`${baseUrl}/news${addSearch}`, {
      headers: Util.httpHeader(),
    })
      .then(function (response) {
        return response.json();
      })
      .then(function (data) {
        if (Util.is(() => data.data.articles, null)) {
          setArticles(data.data.articles);
        }
      })
      .catch((error) => {
        console.log("Articles.useEffect.error", error);
      });
  }

  function searchNews(searchKey) {
    getNews(searchKey);
  }

  return (
    <Container fluid className="main-content-container px-4 pb-4">
      <Row>
        <Col lg="3" md="12">
          <UserDetails />
        </Col>
        <Col lg="5" md="12">
          {articles.length ? (
            <Article articles={articles} />
          ) : (
            <div className="row no-news" >
              <div className="col-md-12">
                <p>No articles are available</p>
              </div>
            </div>
          )}
        </Col>
        <Col lg="4" md="12">
          <NewsFilter onSearch={searchNews} />
        </Col>
      </Row>
    </Container>
  );
}

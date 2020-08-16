import React from "react";
import {
  Card,
  CardHeader,
  CardTitle,
  CardImg,
  CardBody,
  Row,
  Col,
} from "shards-react";
import "./Article.css";
import moment from "moment";
import Util from "../../Util";

export default function Article(props) {
  return (
    <Row>
      <Col>
        {props.articles.map((article, i) => {
          let date = article.publishedAt;
          let dateFormat = moment(date).format("LL");
          let imgUrl = Util.is(
            () => article.urlToImage,
            "https://listonline.com.au/wp-content/uploads/2018/04/no_image_ava.png"
          );
          return (
            <Row key={i}>
              <Col>
                <Card className="news-card" >
                <CardHeader>
                    {article.source.name} | {dateFormat}
                  </CardHeader>
                  <CardImg className="news-img" src={imgUrl} alt={article.title} />
                  <CardBody>
                    <CardTitle>{article.title}</CardTitle>
                    <p>{article.description}</p>
                    {/* <Button>Read more &rarr;</Button> */}
                  </CardBody>
                </Card>
              </Col>
            </Row>
          );
        })}
      </Col>
    </Row>
  );
}

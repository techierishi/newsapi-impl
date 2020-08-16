import React, { useState } from "react";
import PropTypes from "prop-types";
import {
  Card,
  CardHeader,
  CardBody,
  Button,
  InputGroup,
  InputGroupAddon,
  FormInput,
} from "shards-react";
import "./NewsFilter.css";

function NewsFilter({ title, onSearch }) {
  const [searchKey, setSearchKey] = useState('');

  return (
    <Card className="mb-3 news-filter">
      <CardHeader className="border-bottom">
        <h6 className="m-0">{title}</h6>
      </CardHeader>
      <CardBody className="p-2">
        <InputGroup seamless className="mb-3 filter-input">
          <FormInput
            placeholder="Enter keyword"
            value={searchKey}
            onChange={(e) => setSearchKey(e.target.value)}
          />
          <InputGroupAddon type="append">
            <Button theme="secondary" onClick={(e) => onSearch(searchKey)}>
              Search
            </Button>
          </InputGroupAddon>
        </InputGroup>
      </CardBody>
    </Card>
  );
}

NewsFilter.propTypes = {
  title: PropTypes.string,
};

NewsFilter.defaultProps = {
  title: "Filters",
};

export default NewsFilter;

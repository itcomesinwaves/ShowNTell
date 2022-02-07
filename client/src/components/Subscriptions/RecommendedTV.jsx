import React, { useState, useEffect } from 'react';
import axios from 'axios';

import noImgAvail from './no_img_avail.png';
import Carousel from './Carousel.jsx';
import RecommendStyle from './RecommendStyle.js';
import RecResultStyle from './RecResultStyle.js';

const RecommendedTV = ({ current, tvOptions, getTvSubs }) => {
  const [recommendedTV, setRecommendedTV] = useState([]);
  const [clicked, setClicked] = useState(false);
  const [error, setError] = useState(null);
  const [isLoaded, setIsLoaded] = useState(true);
  const [selectOption, setSelectOption] = useState(0);
  const [gotNewTvSub, setGotNewTvSub] = useState(false);

  const getTvImage = (show) => {
    let result;
    if (!show.poster_path) {
      result = (<img src={`https://image.tmdb.org/t/p/original/${show.backdrop_path}`} alt="" />);
    } else if (!show.poster_path && !show.backdrop_path) {
      result = (<img src={noImgAvail} alt="" />);
    } else {
      result = (<img src={`https://image.tmdb.org/t/p/original/${show.poster_path}`} alt="" />);
    }
    return result;
  };

  const conditionalRender = () => {
    let result;
    if (error) {
      result = (
        <div>
          Error:
          {error.message}
        </div>
      );
    } else if (!isLoaded) {
      result = (<h1 style={{ color: 'ghostwhite' }}>Loading...</h1>);
    } else {
      result = (
        <div>{recommendedTV}</div>
      );
    }
    return result;
  };

  const handleOptionChange = (e) => {
    const { value } = e.target;
    setSelectOption(value);
  };

  const getRecommends = () => {
    setIsLoaded(false);
    axios.get(`/getrectv/${selectOption}`)
      .then((response) => {
        return setRecommendedTV(response.data.results.map((show) => {
          return (
            <RecResultStyle>
              <div
                key={show.id}
                id="rec-item-container"
              >
                <div>
                  <div style={{ height: '100%', width: 'auto' }}>
                    {getTvImage(show)}
                  </div>
                  <div>
                    <h1>{show.name}</h1>
                    <p className="overview">
                      {show.overview}
                    </p>
                  </div>
                </div>
              </div>
            </RecResultStyle>
          );
        }));
      })
      .catch((err) => {
        setIsLoaded(true);
        setError(err);
      });
  };

  const handleClick = () => {
    getRecommends();
    setClicked(!clicked);
  };

  const optionsMap = () => {
    getTvSubs();
    return tvOptions.map((option) => {
      return (
        <option
          key={option.key}
          value={option.value}
        >
          {option.label}
        </option>
      );
    });
  };

  useEffect(() => {
    conditionalRender();
  }, [recommendedTV, isLoaded, error]);

  return (
    <RecommendStyle>
      <div className="rec-container">
        <select
          onChange={handleOptionChange}
          id="rec-select"
        >
          {/* {getTvSubs()} */}
          {optionsMap()}
        </select>
        <button
          onClick={handleClick}
          className="rec-btn"
        >
          Recommended
        </button>
        <Carousel recommendedTV={recommendedTV} current={current}>
          {recommendedTV}
        </Carousel>
      </div>
    </RecommendStyle>
  );
};

export default RecommendedTV;
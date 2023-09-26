/* news section css*/
import styled from 'styled-components';

export const NewsWrapper = styled.div`
.industry-news {
    padding: 10px;
}

.industry-news-bottom {
    float: left;
    width: 25%;
    padding: 4px;
    margin: 0px;
    box-sizing: border-box;
}

.industry-news-bottom:hover {
    border: solid 1px #20a8d8;
}

.industry-news-bgoverlay {
    right: 0 !important;
    left: 0 !important;
    background: #013d7d;
    opacity: 0.7;
    margin-bottom: -4% !important;
}

.industry-news-image {
    width: 100%;
    height: 70px;
    object-fit: cover;
    object-position: 50% top;
}

.carousel-image {
    height: 360px;
    object-fit: cover;
}

.industry-news-sec .card-header h5 {
    font-size: 16px;
}

@media (max-width: 992px) {
    .carousel-image {
        height: 258px;
    }
    .industry-news-bgoverlay h3 {
        font-size: 18px;
    }
    .industry-news-bgoverlay {
        padding: 10px 10px;
        margin-bottom: -9% !important;
    }
}

@media (max-width: 767px) {
    .carousel-image {
        height: 170px;
    }
}`;
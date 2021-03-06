import React, { useEffect, useRef, useState } from 'react';

import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { Container } from "@mui/material";
import { Helmet } from "react-helmet";

import Backdrop from "./Backdrop";
import ParagraphLayoutWrapper from "../../components/shared/ParagraphLayoutWrapper";
import Overview from "./Overview";
import Tagline from "./Tagline";
import CastMember from "./Actors/CastMember";
import Trailer from "./Trailer";
import Production from "./Production";
import Footer from "../../components/shared/Footer";
import NotAvailable from "../../components/shared/NotAvailable";
import SocialRatings from "./SocialRatings";
import StickySidebar from "../../components/shared/StickySidebar";
import * as MovieSelectors from '../../store/shared/movie/Movie.selectors';
import { actions as movieActions } from '../../store/shared/movie/Movie.actions';
import * as UserSelectors from '../../store/shared/user/User.selectors';
import { actions as userActions } from '../../store/shared/user/User.actions';
import { useWindowSize } from "../../hooks/useWindowSize";
import { sortObjectsByProperty } from "../../util/string";
import { extractYearFromReleaseDate } from "../../util/timeAndDate";
import { movieDetailsNavItems } from "../../constants/movieDetails";
import styles from './MovieDetails.module.scss';

const MovieDetails = () => {
    const dispatch = useDispatch();

    const params = useParams();

    const movieRef = useRef();

    const { width } = useWindowSize();

    const [startVisit] = useState(new Date().getTime());

    const status = useSelector(MovieSelectors.status);
    const details = useSelector(MovieSelectors.activeIdDetails);
    const mainStats = useSelector(MovieSelectors.mainStats);
    const genres = useSelector(MovieSelectors.genres);
    const released = useSelector(MovieSelectors.released);
    const spokenLanguages = useSelector(MovieSelectors.spokenLanguages);
    const budget = useSelector(MovieSelectors.budget);
    const revenue = useSelector(MovieSelectors.revenue);
    const ytVideo = useSelector(MovieSelectors.ytVideo);

    const userId = useSelector(UserSelectors.id);
    const likedMovies = useSelector(UserSelectors.likedMovies);
    const watchlist = useSelector(UserSelectors.watchlist);

    const releaseYear = extractYearFromReleaseDate(details?.release_date);

    const backdropImage = width <= 576 ?
        `https://image.tmdb.org/t/p/w780${details?.backdrop_path}`
        :
        `https://image.tmdb.org/t/p/w1280${details?.backdrop_path}`;

    const getCastImage = (member) => {
        return width <= 576 ?
            `https://image.tmdb.org/t/p/w92${member.profile_path}`
            :
            `https://image.tmdb.org/t/p/w154${member.profile_path}`;
    };

    const isLiked = likedMovies.find(movieId => movieId === details?.id);

    const isAddedToWatchlist = watchlist.find(movieId => movieId === details?.id);

    const handleMovieLike = () => {
        if (isLiked) {
            dispatch(userActions.removeFromLikes({ userId, movieId: details?.id }));
        } else {
            dispatch(userActions.addToLikes({ userId, movieId: details?.id }));
        }
    };

    const handleToggleWatchlist = () => {
        if (isAddedToWatchlist) {
            dispatch(userActions.removeFromWatchlist({ userId, movieId: details?.id }));
        } else {
            dispatch(userActions.addToWatchlist({ userId, movieId: details?.id }));
        }
    };

    movieRef.current = details;

    useEffect(() => {
        dispatch(movieActions.getMovieDetailsAndToggleLoader(params.id));

        return () => {
            const seconds = (new Date().getTime() - startVisit) / 1000;
            dispatch(userActions.logVisit({
                userId: userId,
                movieId: movieRef.current?.id,
                time: seconds.toFixed(0)
            }));
        };
    }, [params?.id]);

    return (
        <>
            {status === 'success' &&
                <>
                    <Helmet>
                        <meta
                            name='description'
                            content={details.overview}
                        />
                        <meta property="og:image" content={details.backdrop_path ? `https://image.tmdb.org/t/p/w300${details.backdrop_path}` : '../../assets/images/movie-backdrop-fallback.png'}/>
                        <meta property='og:image:type' content='image/jpeg'/>
                        <meta property='og:image:width' content='200'/>
                        <meta property='og:image:height' content='200'/>
                        <title>{details.title} {releaseYear ? `(${releaseYear})` : ''} &bull; Recommend.me</title>
                    </Helmet>
                    <div className={styles.movieDetails}>
                        <Backdrop
                            id={details.id}
                            movieName={details.title}
                            releaseYear={releaseYear}
                            pictureUrl={details.backdrop_path ? backdropImage : null}
                            mainStats={mainStats}
                            imdbId={details.imdb_id}
                            genres={details.genres}
                            isLiked={isLiked}
                            isAddedToWatchlist={isAddedToWatchlist}
                            handleMovieLike={handleMovieLike}
                            handleToggleWatchlist={handleToggleWatchlist}
                        />
                        <Container
                            maxWidth='lg'
                            className={styles.movieDetails__detailsSection}
                        >
                            <StickySidebar
                                poster={{
                                    src: details.poster_path ? `https://image.tmdb.org/t/p/w300${details.poster_path}` : null,
                                    width: 300,
                                    height: 450,
                                    alt: details.original_title
                                }}
                                navItems={movieDetailsNavItems}
                            />
                            <div className={styles.movieDetails__data}>
                                {details.tagline &&
                                    <Tagline tagline={details.tagline}/>
                                }
                                <div className={styles.movieDetails__paragraphsWrapper}>
                                    {movieDetailsNavItems.map((item, index, arr) => {
                                        switch (item) {
                                            case arr[0]: {
                                                return (
                                                    <ParagraphLayoutWrapper
                                                        title={item}
                                                        className={styles.movieDetails__paragraph}
                                                        key={index}
                                                    >
                                                        <Overview
                                                            context='Overview'
                                                            synopsys={details.overview}
                                                            genres={genres}
                                                            released={released}
                                                            adult={details.adult ? 'Yes' : 'No'}
                                                            budget={budget}
                                                            revenue={revenue}
                                                            spokenLanguages={spokenLanguages}
                                                            imdbId={details.imdb_id}
                                                            isLiked={isLiked}
                                                            isAddedToWatchlist={isAddedToWatchlist}
                                                            handleMovieLike={handleMovieLike}
                                                            handleToggleWatchlist={handleToggleWatchlist}
                                                        />
                                                    </ParagraphLayoutWrapper>
                                                )
                                            }
                                            case arr[1]: {
                                                return (
                                                    <ParagraphLayoutWrapper
                                                        title={item}
                                                        className={styles.movieDetails__paragraph}
                                                        key={index}
                                                    >
                                                        {details.cast.length > 0 ? (
                                                            <div className={styles.movieDetails__castWrapper}>
                                                                {details.cast
                                                                    .slice()
                                                                    .sort(sortObjectsByProperty('popularity'))
                                                                    .map((member, index) => {
                                                                    const castImage = getCastImage(member);

                                                                    return <CastMember
                                                                        id={member.id}
                                                                        pictureLink={
                                                                            member.profile_path ?
                                                                                castImage
                                                                                :
                                                                                null
                                                                        }
                                                                        width={154}
                                                                        height={231}
                                                                        name={member.name}
                                                                        character={member.character}
                                                                        key={index}
                                                                    />
                                                                })}
                                                            </div>
                                                        ) : (
                                                            <NotAvailable itemNotAvailable='Actors'/>
                                                        )}
                                                    </ParagraphLayoutWrapper>
                                                )
                                            }
                                            case arr[2]: {
                                                return (
                                                    <ParagraphLayoutWrapper
                                                        title={item}
                                                        className={styles.movieDetails__paragraph}
                                                        key={index}
                                                    >
                                                        <Production
                                                            companies={details.production_companies}
                                                            countries={details.production_countries}
                                                        />
                                                    </ParagraphLayoutWrapper>
                                                )
                                            }
                                            case arr[3]: {
                                                return (
                                                    <ParagraphLayoutWrapper
                                                        title={item}
                                                        className={styles.movieDetails__paragraph}
                                                        key={index}
                                                    >
                                                        <SocialRatings socialsRatings={details.social_ratings}/>
                                                    </ParagraphLayoutWrapper>
                                                )
                                            }
                                            case arr[4]: {
                                                return (
                                                    <ParagraphLayoutWrapper
                                                        title={item}
                                                        className={styles.movieDetails__paragraph}
                                                        key={index}
                                                    >
                                                        <Trailer info={ytVideo}/>
                                                    </ParagraphLayoutWrapper>
                                                )
                                            }
                                        }
                                    })}
                                </div>
                            </div>
                        </Container>
                        <Footer/>
                    </div>
                </>
            }
        </>
    );
};

export default MovieDetails;
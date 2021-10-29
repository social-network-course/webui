import React, { useEffect } from 'react';

import { useHistory } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { Container } from "@mui/material";

import Header from "../../components/shared/Header";
import Backdrop from "./Backdrop";
import Poster from "./Poster";
import Sidenav from "./Sidenav";
import WithParagraphLayoutWrapper from "./withParagraphLayoutWrapper";
import Overview from "./Overview";
import Tagline from "./Overview/Tagline";
import CastMember from "./Overview/CastMember";
import * as MovieSelectors from '../../store/shared/movie/Movie.selectors';
import { actions as movieActions } from '../../store/shared/movie/Movie.actions';
import { setActiveMovie } from "../../store/shared/movie/Movie.slice";
import { sortObjectsByProperty } from "../../util/string";
import { movieDetailsNavItems } from "../../constants/movieDetails";
import styles from './MovieDetails.module.scss';

const MovieDetails = () => {
    const dispatch = useDispatch();

    const history = useHistory();

    const status = useSelector(MovieSelectors.status);
    const details = useSelector(MovieSelectors.activeIdDetails);
    const mainStats = useSelector(MovieSelectors.mainStats);
    const genres = useSelector(MovieSelectors.genres);
    const released = useSelector(MovieSelectors.released);
    const spokenLanguages = useSelector(MovieSelectors.spokenLanguages);
    const budget = useSelector(MovieSelectors.budget);

    const readMovieIdFromPath = (callback) => {
        const id = history.location.pathname.split('/').pop();

        dispatch(setActiveMovie(id));
        callback(id);
    };

    useEffect(() => {
        readMovieIdFromPath((activeId) => {
            dispatch(movieActions.getMovieDetailsAndToggleLoader(activeId))
        });
    }, []);

    return (
        <>
            <Header opacity={0.6}/>
            {status === 'success' &&
                <>
                    <div className={styles.movieDetails}>
                        <Backdrop
                            pictureUrl={details.backdrop_path}
                            mainStats={mainStats}
                            imdbId={details.imdb_id}
                        />
                    </div>
                    <Container
                        maxWidth='lg'
                        className={styles.movieDetails__detailsSection}
                    >
                        <div className={styles.movieDetails__sidenavWrapper}>
                            <Poster
                                src={`https://image.tmdb.org/t/p/w300${details.poster_path}`}
                                alt={details.original_title}
                            />
                            <Sidenav/>
                        </div>
                        <div className={styles.movieDetails__data}>
                            {details.tagline &&
                                <Tagline tagline={details.tagline}/>
                            }
                            <div className={styles.movieDetails__paragraphsWrapper}>
                                {movieDetailsNavItems.map((item, index, arr) => {
                                    switch (item) {
                                        case arr[0]: {
                                            return (
                                                <WithParagraphLayoutWrapper
                                                    title={item}
                                                    id={item}
                                                    className={styles.movieDetails__paragraph}
                                                    key={index}
                                                >
                                                    <Overview
                                                        synopsys={details.overview}
                                                        genres={genres}
                                                        released={released}
                                                        adult={details.adult ? 'Yes' : 'No'}
                                                        budget={budget}
                                                        spokenLanguages={spokenLanguages}
                                                    />
                                                </WithParagraphLayoutWrapper>
                                            )
                                        }
                                        case arr[1]: {
                                            return (
                                                <div
                                                    id={item}
                                                    className={styles.movieDetails__castAnchor}
                                                >
                                                    <WithParagraphLayoutWrapper
                                                        title={item}
                                                        className={styles.movieDetails__castOverflow}
                                                        key={index}
                                                    >
                                                        <div className={styles.movieDetails__castWrapper}>
                                                            {details.cast.slice().sort(sortObjectsByProperty('popularity')).map((member, index) => (
                                                                <CastMember
                                                                    pictureLink={
                                                                        member.profile_path ?
                                                                            `https://image.tmdb.org/t/p/w154${member.profile_path}`
                                                                            :
                                                                            null
                                                                    }
                                                                    name={member.name}
                                                                    character={member.character}
                                                                    key={index}
                                                                />
                                                            ))}
                                                        </div>
                                                    </WithParagraphLayoutWrapper>
                                                </div>
                                            )
                                        }
                                        case arr[2]: {
                                            return (
                                                <WithParagraphLayoutWrapper
                                                    title={item}
                                                    id={item}
                                                    className={styles.movieDetails__paragraph}
                                                    key={index}
                                                >
                                                    <div style={{height: '1000px'}}></div>
                                                </WithParagraphLayoutWrapper>
                                            )
                                        }
                                    }
                                })}
                            </div>
                        </div>
                    </Container>
                </>
            }
        </>
    );
};

export default MovieDetails;
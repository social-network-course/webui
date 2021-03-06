import React, { useEffect, useState } from 'react';

import { useNavigate, useLocation } from "react-router-dom";
import { useSelector } from "react-redux";
import queryString from 'query-string';
import classNames from "classnames";

import WithLayoutWrapper from "../../../components/shared/withLayoutWrapper";
import MovieCard from "../../../components/shared/MovieCard";
import CustomPagination from "../../../components/shared/CustomPagination";
import Footer from "../../../components/shared/Footer";
import MoviesNavigation from "../MoviesNavigation";
import NoResults from "../../../components/shared/NoResults";
import NoUserRatings from "../../../components/shared/NoUserRatings";
import * as UserSelectors from "../../../store/shared/user/User.selectors";
import useScrollToTop from "../../../hooks/useScrollToTop";
import styles from './MoviesGrid.module.scss';

const MoviesGrid = ({
    getMovies,
    status,
    movies,
    pages
}) => {
    const navigate = useNavigate();

    const location = useLocation();

    const [ page, setPage ] = useState(null);

    const userId = useSelector(UserSelectors.id);

    const handleOnPageChange = (event, value) => {
        setPage(value);
        navigate({
            pathname: `${location.pathname}`,
            search: `?page=${value}`
        });
    };

    const handleGoToLoginClick = () => {
        navigate('/auth', { state: location })
    };

    useEffect(() => {
        if (location && location.search) {
            const page = queryString.parse(location.search).page;
            setPage(page);
            getMovies(Number(page));
        } else if (!location.search) {
            setPage(1);
            getMovies(1);
        }
    }, [location]);

    useScrollToTop(location);

    return (
        <WithLayoutWrapper className={styles.moviesContainer}>
            <MoviesNavigation page={page}/>
            <div className={classNames(
                styles.moviesContainer__wrapper,
                { [styles.moviesContainer__noResults]:
                    (status === 'success' && movies && movies.length === 0) || (status === 'success' && movies === null)}
            )}>
                {status === 'success' && movies && movies.map((movie, index) => (
                    <MovieCard
                        movie={movie}
                        width={789}
                        height={439}
                        index={index + 1}
                        key={movie.id}
                    />
                ))}
                {status === 'success' && movies && movies.length === 0 && (
                    <NoResults/>
                )}
                {status === 'success' && movies === null && (
                    <NoUserRatings/>
                )}
            </div>
            {status === 'failure' && !userId && location.pathname.includes('recommended') &&
                <div className={styles.moviesContainer__authErrWrapper}>
                    <span className={styles.moviesContainer__authErrMsg}>
                        To get the best recommended movies, please
                        &nbsp;
                        <span
                            onClick={handleGoToLoginClick}
                            className={styles.moviesContainer__loginLink}
                        >
                            Sign in
                        </span>
                        .
                    </span>
                </div>
            }
            {status === 'success' && page && pages > 0 &&
                <CustomPagination
                    count={pages}
                    page={Number(page)}
                    onChange={handleOnPageChange}
                />
            }
            {(status === 'success' || status === 'failure') &&
                <Footer/>
            }
        </WithLayoutWrapper>
    );
};

export default MoviesGrid;
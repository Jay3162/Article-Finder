import React, { useState, useEffect } from "react";
import style from '../landing-page/home.css';
import { FaSearch } from 'react-icons/fa'
export default function Home () {
    const [clicked, setClicked] = useState(false);
    const [searchQuery, setSearchQuery] = useState("");
    const [articleData, setArticleData] = useState([]);
    const [articleInfo, setArticleInfo] = useState("");


    // ensure that keys are not pushed up to github
    const appKey = process.env.REACT_APP_API_KEY;
    const conKey = process.env.REACT_APP_CONSUMER_KEY;

    // const toggleSearch = (e) => {
    //     e.preventDefault();
    //     setClicked(!clicked);
    // }

    // ensure api calls are made when search query is completed
    const StartSearch = (e) => {
        e.preventDefault();
        if (clicked) {
            getArt(searchQuery);
        }
        setClicked(!clicked);
    }

    const getArt = (query) => {
        var token;
        var articles;

        var myHeaders = new Headers();
        myHeaders.append("APPLICATIONKEY", appKey);
        myHeaders.append("CONSUMERKEY", conKey);
        myHeaders.append("Content-Type", "application/json");

        var raw = JSON.stringify({
        "firstname": "Jamal"
        });

        var requestOptions = {
        method: 'POST',
        headers: myHeaders,
        body: raw,
        redirect: 'follow'
        };
        try {
            const fetchArticles = () => {
                // make the call for the token
                fetch("https://apisandbox.synthetix.com/2.0/external/session", requestOptions)
                .then(response => response.text())
                .then(result => {
                    token = JSON.parse(result);
                    console.log(token)
                    var newHeaders = new Headers();
                    newHeaders.append("APPLICATIONKEY", appKey);
                    newHeaders.append("CONSUMERKEY", conKey);
                    newHeaders.append("Authorization", "Bearer "+token.token);
                    newHeaders.append("Content-Type", "application/x-www-form-urlencoded");

                    var urlencoded = new URLSearchParams();
                    urlencoded.append("userid", "123456");
                    // use user's search data to direct the next search
                    urlencoded.append("query", query);
                    urlencoded.append("channel", "14");
                    urlencoded.append("highlight", "true");
                    urlencoded.append("autosuggest", "false");
                    urlencoded.append("lc", "");

                    var requestOptions = {
                    method: 'POST',
                    headers: newHeaders,
                    body: urlencoded,
                    redirect: 'follow'
                    };

                    fetch("https://apisandbox.synthetix.com/2.0/external/search", requestOptions)
                        .then(response => response.json())
                        .then(result => {
                            // store each new search parameter inside global variable 
                            articles = result.results.map(article => ({
                                title: article.faq,
                                labels: article.label,
                                id: article.id,
                                index: article.index
                            }))
                            // ensure that we don't overwrite previous article if there was one there already
                            setArticleInfo(prevArticle => [...prevArticle, ...articles]);

                            // search api call
                            const articleQueries = articles.map(article => {
                                var myHeaders = new Headers();
                                myHeaders.append("APPLICATIONKEY", appKey);
                                myHeaders.append("CONSUMERKEY", conKey);
                                myHeaders.append("Authorization", "Bearer "+token.token);
                                myHeaders.append("Content-Type", "application/x-www-form-urlencoded");

                                var urlencoded = new URLSearchParams();
                                urlencoded.append("userid", article.id);
                                urlencoded.append("label", article.labels);
                                urlencoded.append("index", article.index);
                                urlencoded.append("origin_url", "");
                                urlencoded.append("channel", "14");
                                urlencoded.append("revision_history", "false");
                                urlencoded.append("origin", "");

                                var requestOptions = {
                                    method: 'POST',
                                    headers: myHeaders,
                                    body: urlencoded,
                                    redirect: 'follow'
                                };
                                
                                return fetch("https://apisandbox.synthetix.com/2.0/external/article", requestOptions)
                                    .then(response => response.json())
                                    .then(result => {
                                        // check that current article hasn't been presented to user to avoid duplicates
                                        if (!articleData.some(article => article.question === result.question)) {
                                            setArticleData(prev => [...prev, result]);
                                        }
                                    })
    
                                    .catch(error => console.log('error', error));
                            })
                        })
                        .catch(error => console.log('error', error));
                })
                .catch(e => {
                    console.error(e);
                })
            }
            fetchArticles();
        } catch(e) {
            console.error(e);
        }
    }

    // useEffect(() => {
    //     if (articleData) {
    //         console.log(articleData);
    //     }
    // }, [articleData])


    return (
        <div className="container">
            <h2>Article Finder</h2>
            {/* <h4></h4> */}
            <form className="search-wrapper" onSubmit={StartSearch}>
                <input 
                className="search-bar" 
                onChange={(e) => setSearchQuery(e.target.value)} 
                data-testid="search-bar"
                ></input>
                <button className="search-btn">
                    <FaSearch/>
                </button>
            </form>
            <div>
            {articleData ? 
                <div className="article-wrapper">
                    <ul>
                    {articleData.map((article) => {
                        return (
                        <li 
                            className="article" 
                            key={article.answerid} 
                            data-testid="result"
                        >
                            <h2 
                                className="article-title" 
                                data-testid="result">{article.question}
                            </h2>
                            <div className="article-break"></div>
                            <div 
                            className="article-main" dangerouslySetInnerHTML={{ __html: article.answer }}
                            ></div>
                            {article.url === null ? 
                            <div> 
                            </div> : 
                            <div>
                                <a href={article.url}>Go To Article</a> 
                            </div>}
                        </li>)
                    })}
                    </ul>
                </div> : <div></div>}
            </div>
        </div>
    )
}
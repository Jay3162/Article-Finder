import React, { useEffect, useState } from "react";

export default function ApiCall (query) {
    const appKey = "7b829f3aeaf04561471b8e258739da3d";
    const conKey = "9800bcc32393905388563bb784b84720";
    const [articleData, setArticleData] = useState([]);
    var token;
    var articles;
    var arr = [];
    var data;

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
                    .then(response => response.text())
                    .then(result => {
                        articles = JSON.parse(result);
                        setArticleData(articles.children);
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
    
        
    // fetch("https://apisandbox.synthetix.com/2.0/external/session", requestOptions)
    // .then(response => response.text())
    // .then(result => {
    //     token = JSON.parse(result)
    //     console.log(token)
    //     var myHeaders = new Headers();
    //     myHeaders.append("APPLICATIONKEY", appKey);
    //     myHeaders.append("CONSUMERKEY", conKey);
    //     myHeaders.append("Authorization", "Bearer "+token.token);
    //     myHeaders.append("Content-Type", "application/x-www-form-urlencoded");

    //     var urlencoded = new URLSearchParams();
    //     urlencoded.append("userid", "username");
    //     urlencoded.append("query", "nike");
    //     urlencoded.append("channel", "14");
    //     urlencoded.append("highlight", "true");
    //     urlencoded.append("autosuggest", "false");
    //     urlencoded.append("lc", "");

    //     var requestOptions = {
    //     method: 'POST',
    //     headers: myHeaders,
    //     body: urlencoded,
    //     redirect: 'follow'
    //     };

    //     fetch("https://apisandbox.synthetix.com/2.0/external/search", requestOptions)
    //     .then(response => response.text())
    //     .then(result => {
    //         articles = JSON.parse(result);
    //         console.log(articles)
    //     })
    //     .catch(error => console.log('error', error));
        // var artHeaders = new Headers();
        // artHeaders.append("APPLICATIONKEY", appKey);
        // artHeaders.append("CONSUMERKEY", conKey);
        // artHeaders.append("Authorization", "Bearer "+token.token);
        // artHeaders.append("Content-Type", "application/json");
        // var requestOptions = {
        //     method: 'GET',
        //     headers: artHeaders,
        //     redirect: 'follow'
        // };
            
        // fetch("https://apisandbox.synthetix.com/2.0/external/all_faqs?limitdate=365&limitno=999&view=FAQs&pop=true", requestOptions)
        // .then(response => response.text())
        // .then(result => {
        //     articles = JSON.parse(result);
        //     console.log(articles)
        //     console.log(articles.items[0].label)
        //     for (let i = 0; i < articles.items.length; i++) {
        //         arr.push(articles.items[i].question)
        //     }
        //     console.log(arr)
        //     var myHeaders = new Headers();
        //     myHeaders.append("APPLICATIONKEY", appKey);
        //     myHeaders.append("CONSUMERKEY", conKey);
        //     myHeaders.append("Authorization", "Bearer "+token.token);
        //     artHeaders.append("Content-Type", "application/json");

        //     var urlencoded = new URLSearchParams();
        //     urlencoded.append("userid", "123456");
        //     urlencoded.append("label", articles.items[0].label);
        //     urlencoded.append("index", "8");
        //     urlencoded.append("origin_url", "http://www.xxxxxx.com");
        //     urlencoded.append("channel", "14");
        //     urlencoded.append("revision_history", "false");
        //     urlencoded.append("origin", "xxxxxx");

        //     var requestOptions = {
        //     method: 'POST',
        //     headers: myHeaders,
        //     body: urlencoded,
        //     redirect: 'follow'
        //     };

        //     fetch("https://apisandbox.synthetix.com/2.0/external/article", requestOptions)
        //     .then(response => response.text())
        //     .then(result => {
        //         data = JSON.parse(result);
        //         console.log(data.url)
        //     })
        //     .catch(error => console.log('error', error));
        // })
        // .catch(error => console.log('error', error));
        
            
    // })
    // .catch(error => console.log('error', error));
}

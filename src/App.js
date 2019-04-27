import React, { Component } from "react";
import "./App.css";
import axios from "axios";
import { Card } from "react-materialize";

class App extends Component {
  state = {
    content: "",
    link: "",
    title: "",

    hasQuote: false
  };

  getQuote = (link, title) => {
    axios
      .get(
        `https://quotesondesign.com/wp-json/posts?filter[orderby]=rand&filter[posts_per_page]=1&timestamp=${new Date().getTime()}`
      )
      .then(response => {
        const { title, content, link } = response.data[0];
        this.setState(() => ({
          title,
          content,
          link,
          hasQuote: true
        }));
      })
      .catch(err => {
        console.log(`${err} whilst contacting the quote API.`);
      });
    console.log(link, title);
  };

  shareOnTwitter = (link, title) => {
    const url = { link };
    const text = { title };
    window.open(
      "http://twitter.com/share?url=" +
        encodeURIComponent(url) +
        "&text=" +
        encodeURIComponent(text),
      "",
      "left=0,top=0,width=550,height=450,personalbar=0,toolbar=0,scrollbars=0,resizable=0"
    );
  };

  render() {
    const { hasQuote } = this.state;
    const { content } = this.state;
    const { link } = this.state;
    const { title } = this.state;
    const str = content.toString();
    const str_title = title;
    const str_link = link;

    return (
      <div className="App">
        <header className="App-header">
          {hasQuote === true ? (
            <div>
              <h3 className="titleQuote">Your Daily Quote</h3>
              <Card className="cardType">
                <div className="quoteContainer animated fadeIn">
                  <h4 className="quoteText">{str.replace(/<[^>]*>/g, "")}</h4>{" "}
                  <p className="quote-author">-{str_title}</p>
                </div>
              </Card>{" "}
            </div>
          ) : (
            <img src="images/EVERYTHING.png" />
          )}
          <button id="quoteButton" onClick={this.getQuote}>
            New Quote
          </button>
        </header>
      </div>
    );
  }
}

export default App;

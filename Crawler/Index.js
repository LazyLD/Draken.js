const fetch = require('node-fetch')
const cheerio = require("cheerio");

var FandomSearch = "/wiki/Special:Search?query=";

class HermitPurple {
  constructor(fandom = "jojo", limit = 1) {
    this.limit = Number.isInteger(limit) ? limit : 1;
    this.wikiUrl = "https://" + fandom + ".fandom.com";
  }

  _getSearchData(webPage) {
    const $ = cheerio.load(webPage);
    const articles = [];
    $(".unified-search__result__title").each((x, y) => {
      const obj = {
        url: $(y).prop("href"),
        id: $(y).prop("data-page-id"),
        title: $(y).prop("data-title")
      };
      if (obj.id) {
        articles.push(obj);
      }
    });

    return articles;
  }

  async _downloadPage(pageUrl) {
    const res = await fetch(pageUrl);
    return res.text();
  }

  async getArticle(article) {
    if (!article.hasOwnProperty("url"))
      throw new Error("Partial article passed into getArticle()");
    const webPage = await this._downloadPage(article.url);
    const reply = article;
    const $ = cheerio.load(webPage);

    reply["img"] =
      $(".pi-image-thumbnail").prop("src") || $(".image").prop("href");

    $("aside").remove();
    $(".cquote").remove();
    $("gallery").remove();

    const text = [];

    $("p").each((x, y) => {
      if (
        $(y)
          .text()
          .replace(/\s/g, "") !== ""
      )
        text.push($(y).text());
    });

    reply["article"] = text.join(" ").replace(/(\r\n|\n|\r)|(\[\d+\])/gm, "");

    return reply;
  }

  async _fetch(search_query) {
    const searchUrl =
      this.wikiUrl + FandomSearch + encodeURIComponent(search_query);

    return await this._downloadPage(searchUrl);
  }

  async searchResults(query) {
    const webPage = await this._fetch(query);
    const articles = this._getSearchData(webPage);
    if (articles.length === 0) throw new Error("No articles found");

    return articles;
  }

  async search(query) {
    const articles = await this.searchResults(query);
    const articleData = [];
    for (let i = 0; i < articles.length; i++) {
      articleData.push(await this.getArticle(articles[i]));
    }

    return articleData;
  }
}
module.exports = HermitPurple;

import { API } from "../../types";
import { quotes } from "./quotes"; // Add this line
import { Quote } from "./types";

// Get developer excuse
async function getDeveloperExcuse() {
  try {
    const res = await fetch("https://api.tabliss.io/v1/developer-excuses");
    const body = await res.json();

    return {
      quote: body.data,
    };
  } catch (err) {
    return {
      quote: "Unable to get a new developer excuse.",
    };
  }
}


// Get quote of the day
async function getQuoteOfTheDay(category?: string) {
  let quote = quotes[Math.floor(Math.random() * quotes.length)]

  return {
    author: quote.author,
    quote: quote.text,
  };
}

export async function getQuote(
  loader: API["loader"],
  category: string,
): Promise<Quote> {
  loader.push();

  const data = 
    category === "developerexcuses"
      ? await getDeveloperExcuse()
      : await getQuoteOfTheDay(category); // Use this line

  loader.pop();

  const quote = cleanQuote(data.quote);

  return {
    ...data,
    quote,
    timestamp: Date.now(),
  };
}

function cleanQuote(quote: string) {
  // We remove whitespaces at the beginning and the end of the quote.
  quote = quote.trim();

  // We change all straight quotes (' and ") following a non-whitespace character by
  // a closing curvy quote (’).
  const singleStraightQuote = new RegExp(/(\S)'|"/, "g");
  quote = quote.replace(singleStraightQuote, "$1’");

  // We now change all remaining straight quotes (all following a whitespace
  // character) by an opening curvy quote (‘).
  const openingStraightQuote = new RegExp(/(^|\s)'|"/, "g");
  quote = quote.replace(openingStraightQuote, "$1‘");

  // We replace all series of three dots or more by a proper ellipsis (…).
  const threeDots = new RegExp(/\.{3,}/, "g");
  quote = quote.replace(threeDots, "…");

  // We replace all series of spaces by a single one.
  const spaces = new RegExp(/\s{2,}/, "g");
  quote = quote.replace(spaces, " ");

  // We replace all dashes between whitespace characters by a proper em dash (—).
  const dash = new RegExp(/\s-\s/, "g");
  quote = quote.replace(dash, "—");

  // We add a period at the end of the quote if need be.
  const closingPunctuation = new RegExp(/[.\?!…’]$/);
  if (!quote.match(closingPunctuation)) quote = quote + ".";

  return quote;
}

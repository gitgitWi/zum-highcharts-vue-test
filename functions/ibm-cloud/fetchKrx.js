// @ts-check
/* eslint-disable @typescript-eslint/no-var-requires */
const axios = require("axios");

const parseIntWithComma = (numStr) => parseInt(numStr.replace(/,/g, ""));
const parseFloatWithComma = (numStr) => parseFloat(numStr.replace(/,/g, ""));

/**
 *
 * @param {Record<string, any>} results
 * @returns {Record<string, any>[]}
 */
const refiner = ({ data: { stocks } }) =>
  stocks.map(
    ({
      closePrice,
      compareToPreviousClosePrice,
      itemCode,
      fluctuationsRatio,
      marketValue,
      stockName,
    }) => ({
      price: parseIntWithComma(closePrice),
      priceChange: parseIntWithComma(compareToPreviousClosePrice),
      stockCode: itemCode,
      stockName,
      rateOfChange: parseFloatWithComma(fluctuationsRatio),
      marketCap: parseIntWithComma(marketValue),
    })
  );

async function main(param) {
  const type = param["__ow_headers"]["x-forwarded-uri"]
    .match(/(KOSPI|KOSDAQ)/i)[0]
    .toUpperCase();

  const results = await Promise.all(
    [1, 2, 3, 4, 5].map((page) =>
      axios
        // @ts-ignore
        .get(`https://m.stock.naver.com/api/stocks/marketValue/${type}`, {
          params: { page, pageSize: 50 },
        })
        .then((res) => {
          console.log(res.request);
          return refiner(res);
        })
        .catch((e) => e)
    )
  );

  return { results: results.flat(), param };
}

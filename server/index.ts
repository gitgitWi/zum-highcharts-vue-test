import { writeFileSync } from "fs";
import { ZumFetcher } from "./services";
import { wantedKospi, wantedKosdaq } from "./constants";

async function main() {
  console.log(`__Fetcher Started__`);

  // console.log(
  //   await ZumFetcher.searchStockCodes(
  //     wantedKosdaq.map(({ stockName }) => stockName)
  //   )
  // );

  const kospi = ZumFetcher.getStockData(
    wantedKospi.map(({ stockCode }) => stockCode)
  );
  const kosdaq = ZumFetcher.getStockData(
    wantedKosdaq.map(({ stockCode }) => stockCode)
  );

  Promise.all([kospi, kosdaq]).then(([kospiResult, kosdaqResult]) => {
    const scraped = JSON.stringify({
      stocks: [
        ...kospiResult.map((data) => ({ category: "KOSPI", ...data })),
        ...kosdaqResult.map((data) => ({ category: "KOSDAQ", ...data })),
      ],
    });

    writeFileSync(`../assets/kr-dummy.json`, scraped, {
      flag: "w",
    });
  });
}

main();

/**
 * @description
 * Cloudflare Workers에서
 * 금융줌 API 활용해 국내증시 주요종목 데이터 스크랩 및 데이터 정제
 */
addEventListener("fetch", (event) => {
  event.respondWith(handleRequest(event.request));
});

const wanted = {
  kospi: [
    "005930",
    "000660",
    "006400",
    "034220",
    "020150",
    "323410",
    "105560",
    "032830",
    "006800",
    "035420",
    "035720",
    "259960",
    "036570",
    "326030",
    "051910",
    "096770",
    "051900",
    "015760",
    "010950",
    "005380",
    "000270",
    "003490",
    "009540",
    "207940",
    "068270",
    "302440",
    "137310",
    "128940",
    "005490",
    "004020",
    "003670",
    "028260",
    "139480",
    "008770",
    "034020",
    "000720",
    "018880",
    "017670",
    "033780",
    "383220",
    "003580",
    "097950",
    "271560",
    "000080",
  ],
  kosdaq: [
    "068760",
    "145020",
    "096530",
    "064550",
    "048260",
    "247540",
    "036490",
    "058470",
    "240810",
    "108320",
    "066970",
    "086520",
    "067160",
    "196170",
    "095700",
    "215600",
    "091990",
    "035080",
    "263750",
    "293490",
    "194480",
    "042000",
    "098460",
    "056190",
    "222080",
    "278280",
    "383310",
    "015750",
    "035760",
    "253450",
    "034230",
    "215000",
    "357780",
    "028300",
    "041510",
    "100090",
    "074600",
    "038500",
    "032500",
    "178320",
    "025980",
    "092040",
    "267980",
    "003380",
    "078020",
    "025900",
    "078130",
    "217270",
  ],
};

const krSectorsMap = {
  1: { name: "음식료품", code: "110" },
  2: { name: "기타제조", code: "215" },
  4: { name: "화학·전기·가스", code: "103" },
  5: { name: "의료·의약품", code: "106" },
  6: { name: "철감금속·비금속", code: "109" },
  7: { name: "철감금속·비금속", code: "109" },
  8: { name: "기계·건설", code: "107" },
  9: { name: "전기·전자", code: "101" },
  10: { name: "의료·의약품", code: "106" },
  11: { name: "운수", code: "105" },
  12: { name: "유통업", code: "108" },
  13: { name: "화학·전기·가스", code: "103" },
  14: { name: "기계·건설", code: "107" },
  15: { name: "운수", code: "105" },
  16: { name: "통신", code: "211" },
  17: { name: "기타금융", code: "104" },
  18: { name: "기타금융", code: "104" },
  19: { name: "기타금융", code: "104" },
  20: { name: "기타금융", code: "104" },
  21: { name: "오락·방송", code: "102" },
  60: { name: "음식료·숙박", code: "214" },
  62: { name: "기타제조", code: "215" },
  63: { name: "기타제조", code: "215" },
  64: { name: "화학·에너지", code: "208" },
  65: { name: "제약·의료", code: "201" },
  66: { name: "금속·비금속", code: "213" },
  67: { name: "금속·비금속", code: "213" },
  68: { name: "기계·장비·건설", code: "212" },
  69: { name: "전기전자·반도체", code: "202" },
  70: { name: "제약·의료", code: "201" },
  71: { name: "운송·장비", code: "207" },
  79: { name: "유통업", code: "217" },
  81: { name: "음식료·숙박", code: "214" },
  86: { name: "금융", code: "209" },
  88: { name: "금융", code: "209" },
  91: { name: "기타서비스", code: "216" },
  98: { name: "오락·방송", code: "210" },
  106: { name: "오락·방송", code: "210" },
  107: { name: "디지털", code: "206" },
  108: { name: "디지털", code: "206" },
  109: { name: "IT·소프트웨어", code: "203" },
  111: { name: "통신", code: "211" },
  113: { name: "전기전자·반도체", code: "202" },
  114: { name: "IT·소프트웨어", code: "203" },
};

async function handleRequest({ url }) {
  const _url = new URL(url);
  const targets =
    wanted[_url.searchParams.get(`target`)] ?? Object.values(wanted).flat();
  const parseJson = (res) => res.json();
  const refiner = ({
    price: {
      detail: {
        id,
        name,
        symbol,
        currentPrice,
        priceChange,
        rateOfChange,
        marketCap,
      },
    },
    additionalInfo: { industry },
  }) => ({
    stockCode: id,
    stockName: name,
    symbol,
    currentPrice,
    priceChange,
    rateOfChange,
    marketCap,
    sectorId: krSectorsMap[industry?.id]?.code ?? "999",
    sectorName: krSectorsMap[industry?.id]?.name ?? "기타분류",
    _sectorOrigin: { code: industry?.id, name: industry?.name },
  });

  try {
    const results = await Promise.all(
      targets.map((code) =>
        fetch(`https://finance.zum.com/api/domestic/stock/${code}`)
          .then(parseJson)
          .then(refiner)
      )
    );

    console.log({ length: results.length });
    return new Response(JSON.stringify(results), {
      headers: {
        "content-type": "application/json;charset=UTF-8",
        "Cache-Control": "max-age=2",
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Request-Method": "GET",
      },
    });
  } catch (e) {
    console.error(e);
    return new Response(
      { status: 500 },
      {
        headers: {
          "content-type": "application/json;charset=UTF-8",
        },
      }
    );
  }
}

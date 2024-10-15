// 各レイヤ: "div[id$='-layer-items-container']"
// (レイヤ内の)グループ種別: ":scope > div[fl_id]"
// (レイヤ内の)グループ種別の名称: ":scope > div[fl_id] > div:nth-child(2) > div:nth-child(1)"
// (レイヤ内の)グループ種別のスタイル変更ボタン: ":scope > div[fl_id] > div:nth-child(3)"
// スタイル変更コンポーネントの閉じるボタン "#stylepopup-close"

/* */
const $ = (s, n = document) => n.querySelector(s);
const $$ = (s, n = document) => [...n.querySelectorAll(s)];
const sleep = millis => new Promise(resolve => setTimeout(resolve, millis));

/*
  const iconMap = {};
  const iconSelection = $("#iconspopup-category-target-1")?.parentElement;
  for (const icon of $$("div[iconcode]", iconSelection)) {
    const iconcode = icon.getAttribute("iconcode");
    const ariaLabel = icon.children[0].getAttribute("aria-label");
    iconMap[ariaLabel] = iconcode;
  }
  console.log(JSON.stringify(iconMap));
  // の結果がこれ↓
*/
// prettier-ignore
const iconMap = {"ピン":"1899","ポイント":"1739","四角（小）":"1498","四角":"1500","ひし形":"1501","円":"1499","星":"1502","ハート":"1592","引用":"1846","チェックマーク":"1769","×":"1898","野球":"1519","バスケットボール":"1520","フットボール":"1579","サッカー":"1696","ラグビー":"1858","バレーボール":"1890","ゴルフ":"1585","ゴルフコース":"1799","テニス":"1707","ポロ":"1843","バドミントン":"1755","ラケットボール":"1849","スカッシュ":"1875","ボクシング":"1761","武道":"1825","フェンシング":"1788","ウエイトリフティング":"1893","レース":"1661","競技場":"1698","乗馬":"1601","ボーリング":"1527","ビリヤード":"1747","クリケット":"1554","アーチェリー":"1752","ランニング":"1680","ノルディック ウォーキング":"1837","自転車":"1522","ダンス":"1773","登山（カラビナ）":"1771","登山（ロープ）":"1772","ケイビング":"1768","フリスビー":"1794","スケートボード":"1866","パラシュート":"1838","ウィングスーツ":"1897","ホッケー":"1805","スケート":"1867","スキー（滑降）":"1688","スキー（クロス カントリー）":"1690","スキーリフト":"1689","スノーボード":"1871","そり滑り":"1691","スノーシューイング":"1873","スノーモービル":"1872","カヌー":"1536","カヤック":"1615","セーリング":"1681","ジェットスキー":"1814","サーフィン":"1880","カイトサーフィン":"1817","ウィンドサーフィン":"1896","水泳":"1701","シュノーケリング":"1870","スキューバ":"1861","釣り":"1573","難破船":"1864","海":"1521","ダイビング":"1777","ピクニック":"1650","樹木（針葉樹）":"1720","樹木（落葉樹）":"1886","樹木（ヤシ）":"1887","山":"1634","洞窟":"1767","温泉":"1811","滝":"1892","潮溜り":"1882","トレイルの起点":"1597","ハイキング":"1596","ハイキング（グループ）":"1595","バードウォッチング":"1760","野生動物":"1774","狩猟":"1812","岩石収集":"1855","天体観測":"1878","見どころ":"1523","キャンプ":"1765","ギター":"1801","キャンプファイヤー":"1764","グリル":"1800","手おの":"1802","キャンピングカー":"1763","四輪バギー":"1754","RV":"1859","ダンプ ステーション":"1781","食品庫":"1792","シャワー":"1687","レストラン":"1577","ファストフード":"1567","ハンバーガー":"1530","ホットドッグ":"1810","ピザ":"1651","麺類":"1640","寿司":"1835","ステーキ":"1553","チキン":"1545","シーフード":"1573","アイスクリーム":"1607","カクテル":"1517","パブ":"1518","ビール":"1879","眼鏡":"1798","カフェ":"1534","喫茶店":"1705","ショッピング":"1684","ギフト":"1584","ショッピング カート":"1685","食料品":"1578","靴":"1683","衣料品":"1549","ジュエリー":"1613","庭園":"1582","健康食品":"1587","薬局":"1646","薬局（ヨーロッパ）":"1841","携帯電話":"1647","インターネット サービス":"1609","Wi-Fi":"1895","ノートパソコン":"1820","テレビ":"1725","書籍":"1526","売店":"1638","ATM":"1510","ATM（一般）":"1753","金融サービス":"1570","両替":"1555","銀行":"1756","ドル":"1512","ユーロ":"1513","ポンド":"1514","ウオン":"1758","円、元":"1515","劇場":"1709","イベント":"1511","誕生日":"1762","映画":"1635","チケット":"1712","チケット（スター）":"1713","ギャンブル":"1540","遊園地":"1568","動物園":"1743","音楽堂":"1649","音楽":"1637","カラオケ":"1614","口ひげ":"1832","風俗":"1503","タワー":"1715","アート":"1509","障害者用":"1735","駐車場":"1644","ピクニック テーブル":"1650","遊び場":"1652","公園":"1720","写真":"1535","動画":"1727","ドア":"1783","エレベーター":"1782","エスカレーター":"1786","エスカレーター（下り）":"1784","エスカレーター（上り）":"1785","階段":"1877","動く歩道":"1833","現在地":"1654","待ち合わせスポット":"1826","遺失物取扱所":"1824","ロッカー":"1823","プリンタ":"1845","待合室":"1891","電話":"1648","ゴミ箱":"1857","リサイクル":"1850","禁煙":"1836","喫煙":"1868","トイレ":"1733","トイレ（女性用）":"1734","トイレ（男性用）":"1732","託児所":"1742","ベビーカー":"1844","消火器":"1790","医療サービス":"1558","AED":"1749","モーターボート":"1525","マリーナ":"1623","ヨット":"1622","監視塔":"1621","円形競技場":"1708","アニマル シェルター":"1508","ペットサービス":"1506","記念碑":"1599","噴水":"1580","スポット":"1611","墓地（日本）":"1610","墓地":"1542","額縁":"1600","博物館、美術館":"1636","歴史的建造物":"1598","農場":"1566","鉱山":"1627","灯台":"1618","無線塔":"1529","眺望":"1729","眺望（部分的）":"1728","本社":"1591","ホテル":"1602","寮":"1559","コンビニエンス ストア":"1631","郵便局":"1659","郵便局（日本）":"1612","ガソリンスタンド":"1581","EV 充電スタンド":"1787","レンタカー":"1741","自動車修理":"1539","出会い":"1592","美容院、床屋":"1516","ランドリー サービス":"1617","ランドリー センター":"1821","キッチン":"1816","建築":"1551","ハードウェア":"1590","電気工":"1561","配管":"1703","ビジネス":"1531","旅行":"1699","不動産":"1665","学校":"1682","大学":"1726","図書館":"1664","アカデミー":"1740","公民館":"1548","裁判所":"1552","警察":"1657","歯科医":"1557","検眼医":"1643","スポーツジム":"1589","温水浴槽":"1809","スパ":"1697","ヨガ":"1737","祈祷":"1676","バハイ教":"1666","仏教（法輪）":"1668","仏教（禅）":"1669","キリスト教":"1670","ヒンドゥー教":"1672","イスラム教":"1673","ジャイナ教":"1674","ユダヤ教":"1675","モルモン教":"1830","神道":"1677","シーク教":"1678","参拝所、礼拝所":"1671","寺院":"1706","情報":"1608","ヘルプ":"1594","住居":"1603","店舗":"1686","ゲート付き住宅地":"1583","大字":"1604","都市":"1546","中心街":"1547","工場":"1565","旗":"1574","市役所（日本）":"1770","銀行（日本）":"1757","博物館、美術館（日本）":"1834","消防署（日本）":"1791","病院（日本）":"1808","警察（日本）":"1842","学校（日本）":"1860","歴史的建造物（中国）":"1804","大型帆船":"1881","宝箱":"1885","瓶入りメッセージ":"1827","サメ":"1863","ロボット":"1854","ロケット":"1856","UFO":"1889","宇宙人":"1751","徒歩":"1731","原動機付自転車":"1632","オートバイ":"1633","車":"1538","タクシー":"1704","バス":"1532","地下鉄":"1719","電車":"1716","路面電車":"1718","都市型交通機関":"1626","鉄道":"1662","電車（蒸気）":"1717","ゴンドラ":"1586","ケーブルカー":"1533","モノレール":"1629","フェリー":"1569","カーフェリー":"1537","空港":"1504","滑走路":"1750","ヘリコプター":"1593","トラック":"1722","トラクター":"1883","駐車スペース":"1562","橋":"1528","トンネル":"1724","事故":"1748","道路工事":"1853","信号機":"1884","警察署、交番":"1655","パトカー":"1656","病院":"1807","病院（イスラム教）":"1806","病院（キリスト教）":"1624","病院（シールド）":"1808","救急車":"1505","爆発":"1564","銃":"1588","死":"1556","行方不明":"1628","警備":"1625","バイオハザード":"1524","原子力":"1641","放射能":"1642","毒":"1653","化学物質":"1544","汚染":"1693","流出":"1658","断水":"1702","水":"1703","蚊":"1831","電気":"1660","注意":"1541","非政府組織":"1639","竜巻":"1714","津波":"1723","火山":"1730","火事":"1571","ハリケーン（強大）":"1605","ハリケーン（弱小）":"1606","洪水":"1575","地震":"1560","震源":"1563","地滑り":"1616","モンスター":"1630","晴れ":"1700","所により曇り":"1645","曇り":"1550","降水確率":"1543","雨":"1663","雷雨":"1711","みぞれ":"1692","雪":"1695","雪の結晶":"1694","霧":"1576","風":"1736","暴風":"1721","温度":"1710","雷":"1619","動物":"1507","ワニ":"1795","クマ":"1759","鳥":"1874","ネコ":"1766","鶏":"1545","牛":"1553","シカ":"1774","恐竜":"1775","イヌ":"1778","イルカ":"1779","アヒル":"1780","ワシ":"1776","ゾウ":"1743","フィンチ":"1789","魚":"1573","熱帯魚":"1572","キツネ":"1793","ヤモリ":"1620","キリン":"1797","馬":"1601","ネズミ":"1679","クラゲ":"1813","カンガルー":"1815","キウイ":"1818","クラーケン":"1819","ライオン":"1822","サル":"1828","ヘラジカ":"1829","オウム":"1839","ペンギン":"1840","ウサギ":"1847","アライグマ":"1848","サイ":"1851","ゴキブリ":"1852","アザラシ":"1862","ヘビ":"1869","リス":"1876","カメ":"1888","クジラ":"1894","ゴースト":"1796"};

/* キーはCSVの "種別1" */
const configMap = {
  住宅: { color: "RGB (129, 119, 23)", icon: iconMap["住居"] },
  天然記念物: { color: "RGB (85, 139, 47)", icon: iconMap["樹木（落葉樹）"] },
  史跡: { color: "RGB (117, 117, 117)", icon: iconMap["歴史的建造物"] },
  特別史跡: { color: "RGB (66, 66, 66)", icon: iconMap["歴史的建造物"] },
  宗教: { color: "RGB (0, 0, 0)", icon: iconMap["祈祷"] },
  風俗慣習: { color: "RGB (1, 87, 155)", icon: iconMap["祈祷"] },
  交通: { color: "RGB (189, 189, 189)", icon: iconMap["車"] },
  "交通・運輸・通信に用いられるもの": {
    color: "RGB (194, 24, 91)",
    icon: iconMap["郵便局"],
  },
  信仰に用いられるもの: {
    color: "RGB (121, 85, 72)",
    icon: iconMap["参拝所、礼拝所"],
  },
  名勝: { color: "RGB (2, 136, 209)", icon: iconMap["滝"] },
  商家町: { color: "RGB (255, 82, 82)", icon: iconMap["中心街"] },
  国宝: { color: "RGB (251, 192, 45)", icon: iconMap["宝箱"] },
  学校: { color: "RGB (66, 66, 66)", icon: iconMap["学校"] },
  官公庁舎: { color: "RGB (189, 189, 189)", icon: iconMap["市役所（日本）"] },
  文化福祉: { color: "RGB (103, 58, 183)", icon: iconMap["博物館、美術館"] },
  民俗技術: { color: "RGB (0, 96, 100)", icon: iconMap["手おの"] },
  民俗芸能: { color: "RGB (255, 214, 0)", icon: iconMap["ダンス"] },
  "民俗芸能、娯楽、遊戯に用いられるもの": {
    color: "RGB (124, 179, 66)",
    icon: iconMap["音楽"],
  },
  治山治水: { color: "RGB (26, 35, 126)", icon: iconMap["断水"] },
  特別名勝: { color: "RGB (245, 124, 0)", icon: iconMap["登山（ロープ）"] },
  特別天然記念物: { color: "RGB (9, 113, 56)", icon: iconMap["シカ"] },
  生活関連: { color: "RGB (129, 119, 23)", icon: iconMap["エスカレーター"] },
  "生産、生業に用いられるもの": {
    color: "RGB (85, 139, 47)",
    icon: iconMap["農場"],
  },
  産業1次: { color: "RGB (230, 81, 0)", icon: iconMap["釣り"] },
  産業2次: { color: "RGB (165, 39, 20)", icon: iconMap["工場"] },
  産業3次: { color: "RGB (136, 14, 79)", icon: iconMap["レストラン"] },
  "登録記念物（名勝地関係）": {
    color: "RGB (156, 39, 176)",
    icon: iconMap["眺望"],
  },
  衣食住に用いられるもの: {
    color: "RGB (121, 85, 72)",
    icon: iconMap["衣料品"],
  },
  重要文化財: { color: "RGB (78, 52, 46)", icon: iconMap["歴史的建造物"] },
};

/* */
// マイマップが持てるレイヤは最大10個
async function getLayersContainers() {
  return $$("div[id$='-layer-items-container']");
}

// レイヤが持てるグループは最大20個
async function getGroupTypes(layer) {
  return $$(":scope > div[fl_id]", layer);
}

function getGroupTypeName(groupType) {
  const name = $(":scope > div:nth-child(2) > div:nth-child(1)", groupType);
  return name ? name.textContent.trim() : null;
}

function getStyleChangeButton(groupType) {
  return $(":scope > div:nth-child(3)", groupType);
}

async function changeColor(colorLabel) {
  const colorButton = $(`*[aria-label='${colorLabel}']`);
  if (!colorButton) {
    throw Error("colorButton not found");
    return;
  }
  await simulateMouseClick(colorButton);
}

async function openStylePopup(groupType) {
  const styleButton = getStyleChangeButton(groupType);
  if (!styleButton) {
    throw Error("styleButton not found");
  }
  await simulateMouseClick(styleButton);
  return styleButton;
}

async function closeStylePopup() {
  const closeButton = $("#stylepopup-close");
  if (!closeButton) {
    throw Error("closeButton not found");
  }
  await simulateMouseClick(closeButton);
}

async function changeIcon(icon) {
  // "その他のアイコン" をオープン
  $("#stylepopup-moreicons-button").click();

  const iconElement = $(`div[iconcode='${icon}']`);
  const iconElementInner = iconElement.children[0];
  await simulateMouseClick(iconElementInner);

  // "その他のアイコン" を閉じる
  $("button[name='ok']").click();
}

// async?
async function simulateMouseClick(element) {
  const rect = element.getBoundingClientRect();
  const x = rect.left + rect.width / 2;
  const y = rect.top + rect.height / 2;

  const events = [
    new MouseEvent("mouseover", {
      bubbles: true,
      cancelable: true,
      view: window,
      clientX: x,
      clientY: y,
    }),
    new MouseEvent("mousedown", {
      bubbles: true,
      cancelable: true,
      view: window,
      clientX: x,
      clientY: y,
    }),
    new MouseEvent("mouseup", {
      bubbles: true,
      cancelable: true,
      view: window,
      clientX: x,
      clientY: y,
    }),
    new MouseEvent("click", {
      bubbles: true,
      cancelable: true,
      view: window,
      clientX: x,
      clientY: y,
    }),
  ];

  for (const event of events) {
    element.dispatchEvent(event);
  }
}

/* */
async function processGroupType(groupType) {
  const name = getGroupTypeName(groupType);
  console.debug(`group name=${name}`);
  if (!(name && configMap[name])) {
    console.error(`Unexpected configMap key=${name}`);
    return;
  }

  await openStylePopup(groupType);
  await sleep(100);

  const config = configMap[name];
  if (config.color) {
    await changeColor(config.color);
    await sleep(200);
  }
  if (config.icon) {
    await changeIcon(config.icon);
    await sleep(200);
  }

  await closeStylePopup();
  await sleep(50);
}

async function processLayer(layer) {
  const groupTypes = await getGroupTypes(layer);

  for (i = 0; i < groupTypes.length; i++) {
    // processGroupType を呼ぶ度にDOM更新されるので、毎回取得する。
    const groupType = (await getGroupTypes(layer))[i];

    console.debug(groupType);
    await processGroupType(groupType);
  }
}

async function main() {
  const layers = await getLayersContainers();
  for (const layer of layers) {
    console.debug(layer);
    await processLayer(layer);
  }
  console.log("Done");
}

// /* ページが完全に読み込まれた後にスクリプトを実行 */
// window.addEventListener("load", async () => {
//   console.log("Layer Style Modification script is running...");
//   await main();
//   console.log("Layer Style Modification script finished.");
// });

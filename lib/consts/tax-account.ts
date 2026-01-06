export interface TaxAccount {
    id: number
    text: string
}

export interface TaxSubCategory {
    id: number
    text: string
    parentId?: number
    accounts: TaxAccount[]
}

export interface TaxCategory {
    id: number
    text: string
    subCategories: TaxSubCategory[]
}

export const taxAccounts: TaxCategory[] = [

    {
        "id": 1,
        "text": "Tillgångar",
        "subCategories": [
            {
                "id": 10,
                "text": "Immateriella anläggningstillgångar",
                "parentId": 0,
                "accounts": [
                    {
                        "id": 1010,
                        "text": "Utvecklingsutgifter"
                    },
                    {
                        "id": 1011,
                        "text": "Balanserade utgifter för forskning och utveckling"
                    },
                    {
                        "id": 1012,
                        "text": "Balanserade utgifter för programvaror"
                    },
                    {
                        "id": 1018,
                        "text": "Ackumulerade nedskrivningar på balanserade utgifter"
                    },
                    {
                        "id": 1019,
                        "text": "Ackumulerade avskrivningar på balanserade utgifter"
                    },
                    {
                        "id": 1020,
                        "text": "Koncessioner m.m."
                    },
                    {
                        "id": 1028,
                        "text": "Ackumulerade nedskrivningar på koncessioner m.m."
                    },
                    {
                        "id": 1029,
                        "text": "Ackumulerade avskrivningar på koncessioner m.m."
                    },
                    {
                        "id": 1030,
                        "text": "Patent"
                    },
                    {
                        "id": 1038,
                        "text": "Ackumulerade nedskrivningar på patent"
                    },
                    {
                        "id": 1039,
                        "text": "Ackumulerade avskrivningar på patent"
                    },
                    {
                        "id": 1040,
                        "text": "Licenser"
                    },
                    {
                        "id": 1048,
                        "text": "Ackumulerade nedskrivningar på licenser"
                    },
                    {
                        "id": 1049,
                        "text": "Ackumulerade avskrivningar på licenser"
                    },
                    {
                        "id": 1050,
                        "text": "Varumärken"
                    },
                    {
                        "id": 1058,
                        "text": "Ackumulerade nedskrivningar på varumärken"
                    },
                    {
                        "id": 1059,
                        "text": "Ackumulerade avskrivningar på varumärken"
                    },
                    {
                        "id": 1060,
                        "text": "Hyresrätter, tomträtter och liknande"
                    },
                    {
                        "id": 1068,
                        "text": "Ackumulerade nedskrivningar på hyresrätter, tomträtter och liknande"
                    },
                    {
                        "id": 1069,
                        "text": "Ackumulerade avskrivningar på hyresrätter, tomträtter och liknande"
                    },
                    {
                        "id": 1070,
                        "text": "Goodwill"
                    },
                    {
                        "id": 1078,
                        "text": "Ackumulerade nedskrivningar på goodwill"
                    },
                    {
                        "id": 1079,
                        "text": "Ackumulerade avskrivningar på goodwill"
                    },
                    {
                        "id": 1080,
                        "text": "Pågående projekt och förskott för immateriella anläggningstillgångar"
                    },
                    {
                        "id": 1081,
                        "text": "Pågående projekt för immateriella anläggningstillgångar"
                    },
                    {
                        "id": 1088,
                        "text": "Förskott för immateriella anläggningstillgångar"
                    }
                ]
            },
            {
                "id": 11,
                "text": "Byggnader och mark",
                "parentId": 0,
                "accounts": [
                    {
                        "id": 1110,
                        "text": "Byggnader"
                    },
                    {
                        "id": 1111,
                        "text": "Byggnader på egen mark"
                    },
                    {
                        "id": 1112,
                        "text": "Byggnader på annans mark"
                    },
                    {
                        "id": 1118,
                        "text": "Ackumulerade nedskrivningar på byggnader"
                    },
                    {
                        "id": 1119,
                        "text": "Ackumulerade avskrivningar på byggnader"
                    },
                    {
                        "id": 1120,
                        "text": "Förbättringsutgifter på annans fastighet"
                    },
                    {
                        "id": 1129,
                        "text": "Ackumulerade avskrivningar på förbättringsutgifter på annans fastighet"
                    },
                    {
                        "id": 1130,
                        "text": "Mark"
                    },
                    {
                        "id": 1140,
                        "text": "Tomter och obebyggda markområden"
                    },
                    {
                        "id": 1150,
                        "text": "Markanläggningar"
                    },
                    {
                        "id": 1158,
                        "text": "Ackumulerade nedskrivningar på markanläggningar"
                    },
                    {
                        "id": 1159,
                        "text": "Ackumulerade avskrivningar på markanläggningar"
                    },
                    {
                        "id": 1180,
                        "text": "Pågående nyanläggningar och förskott för byggnader och mark"
                    },
                    {
                        "id": 1181,
                        "text": "Pågående ny-, till- och ombyggnad"
                    },
                    {
                        "id": 1188,
                        "text": "Förskott för byggnader och mark"
                    }
                ]
            },
            {
                "id": 12,
                "text": "Maskiner och inventarier",
                "parentId": 0,
                "accounts": [
                    {
                        "id": 1210,
                        "text": "Maskiner och andra tekniska anläggningar"
                    },
                    {
                        "id": 1211,
                        "text": "Maskiner"
                    },
                    {
                        "id": 1213,
                        "text": "Andra tekniska anläggningar"
                    },
                    {
                        "id": 1218,
                        "text": "Ackumulerade nedskrivningar på maskiner och andra tekniska anläggningar"
                    },
                    {
                        "id": 1219,
                        "text": "Ackumulerade avskrivningar på maskiner och andra tekniska anläggningar"
                    },
                    {
                        "id": 1220,
                        "text": "Inventarier och verktyg"
                    },
                    {
                        "id": 1221,
                        "text": "Inventarier"
                    },
                    {
                        "id": 1222,
                        "text": "Byggnadsinventarier"
                    },
                    {
                        "id": 1223,
                        "text": "Markinventarier"
                    },
                    {
                        "id": 1225,
                        "text": "Verktyg"
                    },
                    {
                        "id": 1228,
                        "text": "Ackumulerade nedskrivningar på inventarier och verktyg"
                    },
                    {
                        "id": 1229,
                        "text": "Ackumulerade avskrivningar på inventarier och verktyg"
                    },
                    {
                        "id": 1230,
                        "text": "Installationer"
                    },
                    {
                        "id": 1231,
                        "text": "Installationer på egen fastighet"
                    },
                    {
                        "id": 1232,
                        "text": "Installationer på annans fastig het"
                    },
                    {
                        "id": 1238,
                        "text": "Ackumulerade nedskrivningar på installationer"
                    },
                    {
                        "id": 1239,
                        "text": "Ackumulerade avskrivningar på installationer"
                    },
                    {
                        "id": 1240,
                        "text": "Bilar och andra transportmedel"
                    },
                    {
                        "id": 1241,
                        "text": "Personbilar"
                    },
                    {
                        "id": 1242,
                        "text": "Lastbilar"
                    },
                    {
                        "id": 1243,
                        "text": "Truckar"
                    },
                    {
                        "id": 1244,
                        "text": "Arbetsmaskiner"
                    },
                    {
                        "id": 1245,
                        "text": "Traktorer"
                    },
                    {
                        "id": 1246,
                        "text": "Motorcyklar, mopeder och skotrar"
                    },
                    {
                        "id": 1247,
                        "text": "Båtar, flygplan och helikoptrar"
                    },
                    {
                        "id": 1248,
                        "text": "Ackumulerade nedskrivningar på bilar och andra transportmedel"
                    },
                    {
                        "id": 1249,
                        "text": "Ackumulerade avskrivningar på bilar och andra transportmedel"
                    },
                    {
                        "id": 1250,
                        "text": "Datorer"
                    },
                    {
                        "id": 1251,
                        "text": "Datorer, företaget"
                    },
                    {
                        "id": 1257,
                        "text": "Datorer, personal"
                    },
                    {
                        "id": 1258,
                        "text": "Ackumulerade nedskrivningar på datorer"
                    },
                    {
                        "id": 1259,
                        "text": "Ackumulerade avskrivningar på datorer"
                    },
                    {
                        "id": 1260,
                        "text": "Leasade tillgångar"
                    },
                    {
                        "id": 1269,
                        "text": "Ackumulerade avskrivningar på leasade tillgångar"
                    },
                    {
                        "id": 1280,
                        "text": "Pågående nyanläggningar och förskott för maskiner och inventarier"
                    },
                    {
                        "id": 1281,
                        "text": "Pågående nyanläggningar, maskiner och inventarier"
                    },
                    {
                        "id": 1288,
                        "text": "Förskott för maskiner och inventarier"
                    },
                    {
                        "id": 1290,
                        "text": "Övriga materiella anläggningstillgångar"
                    },
                    {
                        "id": 1291,
                        "text": "Konst och liknande tillgångar"
                    },
                    {
                        "id": 1292,
                        "text": "Djur som klassificeras som anläggningstillgång"
                    },
                    {
                        "id": 1298,
                        "text": "Ackumulerade nedskrivningar på övriga materiella anläggningstillgångar"
                    },
                    {
                        "id": 1299,
                        "text": "Ackumulerade avskrivningar på övriga materiella anläggningstillgångar"
                    }
                ]
            },
            {
                "id": 13,
                "text": "Finansiella anläggningstillgångar",
                "parentId": 0,
                "accounts": [
                    {
                        "id": 1310,
                        "text": "Andelar i koncernföretag"
                    },
                    {
                        "id": 1311,
                        "text": "Aktier i noterade svenska koncernföretag"
                    },
                    {
                        "id": 1312,
                        "text": "Aktier i onoterade svenska koncernföretag"
                    },
                    {
                        "id": 1313,
                        "text": "Aktier i noterade utländska koncernföretag"
                    },
                    {
                        "id": 1314,
                        "text": "Aktier i onoterade utländska koncernföretag"
                    },
                    {
                        "id": 1316,
                        "text": "Övriga andelar i koncernföretag"
                    },
                    {
                        "id": 1318,
                        "text": "Ackumulerade nedskrivningar av andelar i koncernföretag"
                    },
                    {
                        "id": 1320,
                        "text": "Långfristiga fordringar hos koncernföretag"
                    },
                    {
                        "id": 1321,
                        "text": "Långfristiga fordringar hos moderföretag"
                    },
                    {
                        "id": 1322,
                        "text": "Långfristiga fordringar hos dotterföretag"
                    },
                    {
                        "id": 1323,
                        "text": "Långfristiga fordringar hos andra koncernföretag"
                    },
                    {
                        "id": 1328,
                        "text": "Ackumulerade nedskrivningar av långfristiga fordringar hos koncernföretag"
                    },
                    {
                        "id": 1330,
                        "text": "Andelar i intresseföretag"
                    },
                    {
                        "id": 1336,
                        "text": "Andelar i ekonomiska föreningar, intresseföretag"
                    },
                    {
                        "id": 1338,
                        "text": "Ackumulerade nedskrivningar av andelar i intresseföretag"
                    },
                    {
                        "id": 1340,
                        "text": "Långfristiga fordringar hos intresseföretag"
                    },
                    {
                        "id": 1348,
                        "text": "Ackumulerade nedskrivningar av långfristiga fordringar hos intresseföretag"
                    },
                    {
                        "id": 1350,
                        "text": "Andelar och värdepapper i andra företag"
                    },
                    {
                        "id": 1351,
                        "text": "Andelar i börsnoterade företag"
                    },
                    {
                        "id": 1352,
                        "text": "Andra andelar"
                    },
                    {
                        "id": 1353,
                        "text": "Andelar i bostadsrättsföreningar"
                    },
                    {
                        "id": 1354,
                        "text": "Obligationer"
                    },
                    {
                        "id": 1356,
                        "text": "Andelar i ekonomiska föreningar, övriga företag"
                    },
                    {
                        "id": 1358,
                        "text": "Ackumulerade nedskrivningar av andra andelar och värdepapper"
                    },
                    {
                        "id": 1360,
                        "text": "Lån till delägare eller närstående, långfristig del"
                    },
                    {
                        "id": 1369,
                        "text": "Ackumulerade nedskrivningar på lån till delägare eller närstående, långfristig del"
                    },
                    {
                        "id": 1370,
                        "text": "Uppskjuten skattefordran"
                    },
                    {
                        "id": 1380,
                        "text": "Andra långfristiga fordringar"
                    },
                    {
                        "id": 1381,
                        "text": "Långfristiga reversfordringar"
                    },
                    {
                        "id": 1382,
                        "text": "Långfristiga fordringar hos anställda"
                    },
                    {
                        "id": 1383,
                        "text": "Lämnade depositioner, långfristiga"
                    },
                    {
                        "id": 1384,
                        "text": "Derivat"
                    },
                    {
                        "id": 1385,
                        "text": "Värde av kapitalförsäkring"
                    },
                    {
                        "id": 1386,
                        "text": "Förutbetalda leasingavgifter, långfristig del"
                    },
                    {
                        "id": 1387,
                        "text": "Långfristiga kontraktsfordringar"
                    },
                    {
                        "id": 1389,
                        "text": "Ackumulerade nedskrivningar av andra långfristiga fordringar"
                    }
                ]
            },
            {
                "id": 14,
                "text": "Lager, produkter i arbete och pågående arbeten",
                "parentId": 0,
                "accounts": [
                    {
                        "id": 1410,
                        "text": "Lager av råvaror"
                    },
                    {
                        "id": 1419,
                        "text": "Förändring av lager av råvaror"
                    },
                    {
                        "id": 1420,
                        "text": "Lager av tillsatsmaterial och förnödenheter"
                    },
                    {
                        "id": 1429,
                        "text": "Förändring av lager av tillsatsmaterial och förnödenheter"
                    },
                    {
                        "id": 1430,
                        "text": "Lager av halvfabrikat"
                    },
                    {
                        "id": 1431,
                        "text": "Lager av köpta halvfabrikat"
                    },
                    {
                        "id": 1432,
                        "text": "Lager av egentillverkade halvfabrikat"
                    },
                    {
                        "id": 1438,
                        "text": "Förändring av lager av köpta halvfabrikat"
                    },
                    {
                        "id": 1439,
                        "text": "Förändring av lager av egentillverkade halvfabrikat"
                    },
                    {
                        "id": 1440,
                        "text": "Produkter i arbete"
                    },
                    {
                        "id": 1449,
                        "text": "Förändring av produkter i arbete"
                    },
                    {
                        "id": 1450,
                        "text": "Lager av färdiga varor"
                    },
                    {
                        "id": 1459,
                        "text": "Förändring av lager av färdiga varor"
                    },
                    {
                        "id": 1460,
                        "text": "Lager av handelsvaror"
                    },
                    {
                        "id": 1465,
                        "text": "Lager av varor VMB"
                    },
                    {
                        "id": 1466,
                        "text": "Nedskrivning av varor VMB"
                    },
                    {
                        "id": 1467,
                        "text": "Lager av varor VMB förenklad"
                    },
                    {
                        "id": 1469,
                        "text": "Förändring av lager av handelsvaror"
                    },
                    {
                        "id": 1470,
                        "text": "Pågående arbeten"
                    },
                    {
                        "id": 1471,
                        "text": "Pågående arbeten, nedlagda kostnader"
                    },
                    {
                        "id": 1478,
                        "text": "Pågående arbeten, fakturering"
                    },
                    {
                        "id": 1479,
                        "text": "Förändring av pågående arbeten"
                    },
                    {
                        "id": 1480,
                        "text": "Förskott för varor och tjänster"
                    },
                    {
                        "id": 1481,
                        "text": "Remburser"
                    },
                    {
                        "id": 1489,
                        "text": "Övriga förskott till leverantörer"
                    },
                    {
                        "id": 1490,
                        "text": "Övriga lagertillgångar"
                    },
                    {
                        "id": 1491,
                        "text": "Lager av värdepapper"
                    },
                    {
                        "id": 1492,
                        "text": "Lager av fastigheter"
                    },
                    {
                        "id": 1493,
                        "text": "Djur som klassificeras som omsättningstillgång"
                    }
                ]
            },
            {
                "id": 15,
                "text": "Kundfordringar",
                "parentId": 0,
                "accounts": [
                    {
                        "id": 1510,
                        "text": "Kundfordringar"
                    },
                    {
                        "id": 1511,
                        "text": "Kundfordringar"
                    },
                    {
                        "id": 1512,
                        "text": "Belånade kundfordringar (factoring)"
                    },
                    {
                        "id": 1513,
                        "text": "Kundfordringar – delad faktura"
                    },
                    {
                        "id": 1515,
                        "text": "Osäkra kundfordringar"
                    },
                    {
                        "id": 1516,
                        "text": "Tvistiga kundfordringar"
                    },
                    {
                        "id": 1518,
                        "text": "Ej reskontraförda kundfordringar"
                    },
                    {
                        "id": 1519,
                        "text": "Nedskrivning av kundfordringar"
                    },
                    {
                        "id": 1520,
                        "text": "Växelfordringar"
                    },
                    {
                        "id": 1525,
                        "text": "Osäkra växelfordringar"
                    },
                    {
                        "id": 1529,
                        "text": "Nedskrivning av växelfordringar"
                    },
                    {
                        "id": 1530,
                        "text": "Kontraktsfordringar"
                    },
                    {
                        "id": 1531,
                        "text": "Kontraktsfordringar"
                    },
                    {
                        "id": 1532,
                        "text": "Belånade kontraktsfordringar"
                    },
                    {
                        "id": 1535,
                        "text": "Osäkra kontraktsfordringar"
                    },
                    {
                        "id": 1536,
                        "text": "Tvistiga kontraktsfordringar"
                    },
                    {
                        "id": 1539,
                        "text": "Nedskrivning av kontraktsfordringar"
                    },
                    {
                        "id": 1550,
                        "text": "Konsignationsfordringar"
                    },
                    {
                        "id": 1560,
                        "text": "Kundfordringar hos koncernföretag"
                    },
                    {
                        "id": 1561,
                        "text": "Kundfordringar hos moderföretag"
                    },
                    {
                        "id": 1562,
                        "text": "Kundfordringar hos dotterföretag"
                    },
                    {
                        "id": 1563,
                        "text": "Kundfordringar hos andra koncernföretag"
                    },
                    {
                        "id": 1565,
                        "text": "Osäkra kundfordringar hos koncernföretag"
                    },
                    {
                        "id": 1568,
                        "text": "Ej reskontraförda kundfordringar hos koncernföretag"
                    },
                    {
                        "id": 1569,
                        "text": "Nedskrivning av kundfordringar hos koncernföretag"
                    },
                    {
                        "id": 1570,
                        "text": "Kundfordringar hos intresseföretag"
                    },
                    {
                        "id": 1575,
                        "text": "Osäkra kundfordringar hos intresseföretag"
                    },
                    {
                        "id": 1578,
                        "text": "Ej reskontraförda kundfordringar hos intresseföretag"
                    },
                    {
                        "id": 1579,
                        "text": "Nedskrivning av kundfordringar hos intresseföretag"
                    },
                    {
                        "id": 1580,
                        "text": "Fordringar för kontokort och kuponger"
                    }
                ]
            },
            {
                "id": 16,
                "text": "Övriga kortfristiga fordringar",
                "parentId": 0,
                "accounts": [
                    {
                        "id": 1610,
                        "text": "Kortfristiga fordringar hos anställda"
                    },
                    {
                        "id": 1611,
                        "text": "Reseförskott"
                    },
                    {
                        "id": 1612,
                        "text": "Kassaförskott"
                    },
                    {
                        "id": 1613,
                        "text": "Övriga förskott"
                    },
                    {
                        "id": 1614,
                        "text": "Tillfälliga lån till anställda"
                    },
                    {
                        "id": 1619,
                        "text": "Övriga fordringar hos anställda"
                    },
                    {
                        "id": 1620,
                        "text": "Upparbetad men ej fakturerad intäkt"
                    },
                    {
                        "id": 1630,
                        "text": "Avräkning för skatter och avgifter (skattekonto)"
                    },
                    {
                        "id": 1640,
                        "text": "Skattefordringar"
                    },
                    {
                        "id": 1650,
                        "text": "Momsfordran"
                    },
                    {
                        "id": 1660,
                        "text": "Kortfristiga fordringar hos koncernföretag"
                    },
                    {
                        "id": 1661,
                        "text": "Kortfristiga fordringar hos moderföretag"
                    },
                    {
                        "id": 1662,
                        "text": "Kortfristiga fordringar hos dotterföretag"
                    },
                    {
                        "id": 1663,
                        "text": "Kortfristiga fordringar hos andra koncernföretag"
                    },
                    {
                        "id": 1670,
                        "text": "Kortfristiga fordringar hos intresseföretag"
                    },
                    {
                        "id": 1680,
                        "text": "Andra kortfristiga fordringar"
                    },
                    {
                        "id": 1681,
                        "text": "Utlägg för kunder"
                    },
                    {
                        "id": 1682,
                        "text": "Kortfristiga lånefordringar"
                    },
                    {
                        "id": 1683,
                        "text": "Derivat"
                    },
                    {
                        "id": 1684,
                        "text": "Kortfristiga fordringar hos leverantörer"
                    },
                    {
                        "id": 1685,
                        "text": "Kortfristiga fordringar hos delägare eller närstående"
                    },
                    {
                        "id": 1687,
                        "text": "Kortfristig del av långfristiga fordringar"
                    },
                    {
                        "id": 1688,
                        "text": "Fordran arbetsmarknadsförsäkringar"
                    },
                    {
                        "id": 1689,
                        "text": "Övriga kortfristiga fordringar"
                    },
                    {
                        "id": 1690,
                        "text": "Fordringar för tecknat men ej inbetalt aktiekapital"
                    }
                ]
            },
            {
                "id": 17,
                "text": "Förutbetalda kostnader och upplupna intäkter",
                "parentId": 0,
                "accounts": [
                    {
                        "id": 1710,
                        "text": "Förutbetalda hyreskostnader"
                    },
                    {
                        "id": 1720,
                        "text": "Förutbetalda leasingavgifter, kortfristig del"
                    },
                    {
                        "id": 1730,
                        "text": "Förutbetalda försäkringspremier"
                    },
                    {
                        "id": 1740,
                        "text": "Förutbetalda räntekostnader"
                    },
                    {
                        "id": 1750,
                        "text": "Upplupna hyresintäkter"
                    },
                    {
                        "id": 1760,
                        "text": "Upplupna ränteintäkter"
                    },
                    {
                        "id": 1770,
                        "text": "Tillgångar av kostnadsnatur"
                    },
                    {
                        "id": 1780,
                        "text": "Upplupna avtalsintäkter"
                    },
                    {
                        "id": 1790,
                        "text": "Övriga förutbetalda kostnader och upplupna intäkter"
                    }
                ]
            },
            {
                "id": 18,
                "text": "Kortfristiga placeringar",
                "parentId": 0,
                "accounts": [
                    {
                        "id": 1810,
                        "text": "Andelar i börsnoterade företag"
                    },
                    {
                        "id": 1820,
                        "text": "Obligationer"
                    },
                    {
                        "id": 1830,
                        "text": "Konvertibla skuldebrev"
                    },
                    {
                        "id": 1860,
                        "text": "Andelar i koncernföretag"
                    },
                    {
                        "id": 1869,
                        "text": "Nedskrivning av andelar i koncernföretag"
                    },
                    {
                        "id": 1880,
                        "text": "Andra kortfristiga placeringar"
                    },
                    {
                        "id": 1886,
                        "text": "Derivat"
                    },
                    {
                        "id": 1889,
                        "text": "Andelar i övriga företag"
                    },
                    {
                        "id": 1890,
                        "text": "Nedskrivning av kortfristiga placeringar"
                    }
                ]
            },
            {
                "id": 19,
                "text": "Kassa och bank",
                "parentId": 0,
                "accounts": [
                    {
                        "id": 1910,
                        "text": "Kassa"
                    },
                    {
                        "id": 1911,
                        "text": "Huvudkassa"
                    },
                    {
                        "id": 1912,
                        "text": "Kassa 2"
                    },
                    {
                        "id": 1913,
                        "text": "Kassa 3"
                    },
                    {
                        "id": 1914,
                        "text": "Kassa 4"
                    },
                    {
                        "id": 1920,
                        "text": "PlusGiro"
                    },
                    {
                        "id": 1930,
                        "text": "Företagskonto / affärskonto"
                    },
                    {
                        "id": 1931,
                        "text": "Sparkonto"
                    },
                    {
                        "id": 1932,
                        "text": "Bokio Företagskonto"
                    },
                    {
                        "id": 1940,
                        "text": "Övriga bankkonton"
                    },
                    {
                        "id": 1950,
                        "text": "Bankcertifikat"
                    },
                    {
                        "id": 1960,
                        "text": "Koncernkonto moderföretag"
                    },
                    {
                        "id": 1970,
                        "text": "Särskilda bankkonton"
                    },
                    {
                        "id": 1972,
                        "text": "Upphovsmannakonto"
                    },
                    {
                        "id": 1973,
                        "text": "Skogskonto"
                    },
                    {
                        "id": 1974,
                        "text": "Spärrade bankmedel"
                    },
                    {
                        "id": 1979,
                        "text": "Övriga särskilda bankkonton"
                    },
                    {
                        "id": 1980,
                        "text": "Valutakonton"
                    },
                    {
                        "id": 1990,
                        "text": "Redovisningsmedel"
                    }
                ]
            }
        ]
    },
    {
        "id": 2,
        "text": "Eget kapital och skulder",
        "subCategories": [
            {
                "id": 20,
                "text": "Eget kapital",
                "parentId": 0,
                "accounts": [
                    {
                        "id": 2010,
                        "text": "Eget kapital, delägare 1"
                    },
                    {
                        "id": 2011,
                        "text": "Egna varuuttag"
                    },
                    {
                        "id": 2012,
                        "text": "Avräkning för skatter och avgifter (skattekonto)"
                    },
                    {
                        "id": 2013,
                        "text": "Övriga egna uttag"
                    },
                    {
                        "id": 2017,
                        "text": "Årets kapitaltillskott"
                    },
                    {
                        "id": 2018,
                        "text": "Övriga egna insättningar"
                    },
                    {
                        "id": 2019,
                        "text": "Årets resultat, delägare 1"
                    },
                    {
                        "id": 2020,
                        "text": "Eget kapital, delägare 2"
                    },
                    {
                        "id": 2023,
                        "text": "Egna uttag delägare 2 (Handelsbolag)"
                    },
                    {
                        "id": 2028,
                        "text": "Övriga egna insättningar, delägare 2"
                    },
                    {
                        "id": 2029,
                        "text": "Årets resultat, delägare 2"
                    },
                    {
                        "id": 2030,
                        "text": "Eget kapital, delägare 3"
                    },
                    {
                        "id": 2033,
                        "text": "Egna uttag delägare 3 (Handelsbolag)"
                    },
                    {
                        "id": 2038,
                        "text": "Övriga egna insättningar, delägare 3"
                    },
                    {
                        "id": 2039,
                        "text": "Årets resultat, delägare 3"
                    },
                    {
                        "id": 2040,
                        "text": "Eget kapital, delägare 4"
                    },
                    {
                        "id": 2043,
                        "text": "Egna uttag delägare 4 (Handelsbolag)"
                    },
                    {
                        "id": 2048,
                        "text": "Övriga egna insättningar, delägare 4"
                    },
                    {
                        "id": 2049,
                        "text": "Årets resultat, delägare 4"
                    },
                    {
                        "id": 2050,
                        "text": "Avsättning till expansionsfond"
                    },
                    {
                        "id": 2060,
                        "text": "Eget kapital i ideella föreningar, stiftelser och registrerade trossamfund"
                    },
                    {
                        "id": 2061,
                        "text": "Eget kapital/stiftelsekapital/grundkapital"
                    },
                    {
                        "id": 2065,
                        "text": "Förändring i fond för verkligt värde"
                    },
                    {
                        "id": 2066,
                        "text": "Värdesäkringsfond"
                    },
                    {
                        "id": 2067,
                        "text": "Balanserad vinst eller förlust/balanserat kapital"
                    },
                    {
                        "id": 2068,
                        "text": "Vinst eller förlust från föregående år"
                    },
                    {
                        "id": 2069,
                        "text": "Årets resultat"
                    },
                    {
                        "id": 2070,
                        "text": "Ändamålsbestämda medel"
                    },
                    {
                        "id": 2071,
                        "text": "Ändamål 1"
                    },
                    {
                        "id": 2072,
                        "text": "Ändamål 2"
                    },
                    {
                        "id": 2080,
                        "text": "Bundet eget kapital"
                    },
                    {
                        "id": 2081,
                        "text": "Aktiekapital"
                    },
                    {
                        "id": 2082,
                        "text": "Ej registrerat aktiekapital"
                    },
                    {
                        "id": 2083,
                        "text": "Medlemsinsatser"
                    },
                    {
                        "id": 2084,
                        "text": "Förlagsinsatser"
                    },
                    {
                        "id": 2085,
                        "text": "Uppskrivningsfond"
                    },
                    {
                        "id": 2086,
                        "text": "Reservfond"
                    },
                    {
                        "id": 2087,
                        "text": "Insatsemission"
                    },
                    {
                        "id": 2088,
                        "text": "Fond för yttre underhåll"
                    },
                    {
                        "id": 2090,
                        "text": "Fritt eget kapital"
                    },
                    {
                        "id": 2091,
                        "text": "Balanserad vinst eller förlust"
                    },
                    {
                        "id": 2092,
                        "text": "Mottagna/lämnade koncernbidrag"
                    },
                    {
                        "id": 2093,
                        "text": "Erhållna aktieägartillskott"
                    },
                    {
                        "id": 2094,
                        "text": "Egna aktier"
                    },
                    {
                        "id": 2095,
                        "text": "Fusionsresultat"
                    },
                    {
                        "id": 2096,
                        "text": "Fond för verkligt värde"
                    },
                    {
                        "id": 2097,
                        "text": "Överkursfond"
                    },
                    {
                        "id": 2098,
                        "text": "Vinst eller förlust från föregående år"
                    },
                    {
                        "id": 2099,
                        "text": "Årets resultat"
                    }
                ]
            },
            {
                "id": 21,
                "text": "Obeskattade reserver",
                "parentId": 0,
                "accounts": [
                    {
                        "id": 2110,
                        "text": "Periodiseringsfond vid 2010 års taxering"
                    },
                    {
                        "id": 2111,
                        "text": "Periodiseringsfond vid 2011 års taxering"
                    },
                    {
                        "id": 2112,
                        "text": "Periodiseringsfond vid 2012 års taxering"
                    },
                    {
                        "id": 2113,
                        "text": "Periodiseringsfond vid 2013 års taxering"
                    },
                    {
                        "id": 2120,
                        "text": "Periodiseringsfonder"
                    },
                    {
                        "id": 2121,
                        "text": "Periodiseringsfonder"
                    },
                    {
                        "id": 2122,
                        "text": "Periodiseringsfonder"
                    },
                    {
                        "id": 2123,
                        "text": "Periodiseringsfond 2020"
                    },
                    {
                        "id": 2124,
                        "text": "Periodiseringsfond 2021"
                    },
                    {
                        "id": 2125,
                        "text": "Periodiseringsfond 2022"
                    },
                    {
                        "id": 2126,
                        "text": "Periodiseringsfond 2023"
                    },
                    {
                        "id": 2127,
                        "text": "Periodiseringsfond 2017"
                    },
                    {
                        "id": 2128,
                        "text": "Periodiseringsfond 2018"
                    },
                    {
                        "id": 2129,
                        "text": "Periodiseringsfond 2019"
                    },
                    {
                        "id": 2150,
                        "text": "Ackumulerade överavskrivningar"
                    },
                    {
                        "id": 2151,
                        "text": "Ackumulerade överavskrivningar på immateriella anläggningstillgångar"
                    },
                    {
                        "id": 2152,
                        "text": "Ackumulerade överavskrivningar på byggnader och markanläggningar"
                    },
                    {
                        "id": 2153,
                        "text": "Ackumulerade överavskrivningar på maskiner och inventarier"
                    },
                    {
                        "id": 2160,
                        "text": "Ersättningsfond"
                    },
                    {
                        "id": 2161,
                        "text": "Ersättningsfond maskiner och inventarier"
                    },
                    {
                        "id": 2162,
                        "text": "Ersättningsfond byggnader och markanläggningar"
                    },
                    {
                        "id": 2163,
                        "text": "Ersättningsfond mark"
                    },
                    {
                        "id": 2164,
                        "text": "Ersättningsfond för djurlager i jordbruk och renskötsel"
                    },
                    {
                        "id": 2180,
                        "text": "Obeskattade intäkter"
                    },
                    {
                        "id": 2181,
                        "text": "Obeskattade upphovsmannaintäkter"
                    },
                    {
                        "id": 2185,
                        "text": "Obeskattade skogsintäkter"
                    },
                    {
                        "id": 2190,
                        "text": "Övriga obeskattade reserver"
                    },
                    {
                        "id": 2196,
                        "text": "Lagerreserv"
                    },
                    {
                        "id": 2199,
                        "text": "Övriga obeskattade reserver"
                    }
                ]
            },
            {
                "id": 22,
                "text": "Avsättningar",
                "parentId": 0,
                "accounts": [
                    {
                        "id": 2210,
                        "text": "Avsättningar för pensioner enligt tryggandelagen"
                    },
                    {
                        "id": 2220,
                        "text": "Avsättningar för garantier"
                    },
                    {
                        "id": 2230,
                        "text": "Övriga avsättningar för pensioner och liknande förpliktelser"
                    },
                    {
                        "id": 2240,
                        "text": "Avsättningar för uppskjutna skatter"
                    },
                    {
                        "id": 2250,
                        "text": "Övriga avsättningar för skatter"
                    },
                    {
                        "id": 2252,
                        "text": "Avsättningar för tvistiga skatter"
                    },
                    {
                        "id": 2253,
                        "text": "Avsättningar särskild löneskatt, deklarationspost"
                    },
                    {
                        "id": 2290,
                        "text": "Övriga avsättningar"
                    }
                ]
            },
            {
                "id": 23,
                "text": "Långfristiga skulder",
                "parentId": 0,
                "accounts": [
                    {
                        "id": 2310,
                        "text": "Obligations- och förlagslån"
                    },
                    {
                        "id": 2320,
                        "text": "Konvertibla lån och liknande"
                    },
                    {
                        "id": 2321,
                        "text": "Konvertibla lån"
                    },
                    {
                        "id": 2322,
                        "text": "Lån förenade med optionsrätt"
                    },
                    {
                        "id": 2323,
                        "text": "Vinstandelslån"
                    },
                    {
                        "id": 2324,
                        "text": "Kapitalandelslån"
                    },
                    {
                        "id": 2330,
                        "text": "Checkräkningskredit"
                    },
                    {
                        "id": 2340,
                        "text": "Byggnadskreditiv"
                    },
                    {
                        "id": 2350,
                        "text": "Andra långfristiga skulder till kreditinstitut"
                    },
                    {
                        "id": 2351,
                        "text": "Fastighetslån, långfristig del"
                    },
                    {
                        "id": 2355,
                        "text": "Långfristiga lån i utländsk valuta från kreditinstitut"
                    },
                    {
                        "id": 2359,
                        "text": "Övriga långfristiga lån från kreditinstitut"
                    },
                    {
                        "id": 2360,
                        "text": "Långfristiga skulder till koncernföretag"
                    },
                    {
                        "id": 2361,
                        "text": "Långfristiga skulder till moderföretag"
                    },
                    {
                        "id": 2362,
                        "text": "Långfristiga skulder till dotterföretag"
                    },
                    {
                        "id": 2363,
                        "text": "Långfristiga skulder till andra koncernföretag"
                    },
                    {
                        "id": 2370,
                        "text": "Långfristiga skulder till intresseföretag"
                    },
                    {
                        "id": 2390,
                        "text": "Övriga långfristiga skulder"
                    },
                    {
                        "id": 2391,
                        "text": "Avbetalningskontrakt, långfristig del"
                    },
                    {
                        "id": 2392,
                        "text": "Villkorliga långfristiga skulder"
                    },
                    {
                        "id": 2393,
                        "text": "Lån från närstående personer, långfristig del"
                    },
                    {
                        "id": 2394,
                        "text": "Långfristiga leverantörskrediter"
                    },
                    {
                        "id": 2395,
                        "text": "Andra långfristiga lån i utländsk valuta"
                    },
                    {
                        "id": 2396,
                        "text": "Derivat"
                    },
                    {
                        "id": 2397,
                        "text": "Mottagna depositioner, långfristiga"
                    },
                    {
                        "id": 2399,
                        "text": "Övriga långfristiga skulder"
                    }
                ]
            },
            {
                "id": 24,
                "text": "Kortfristiga skulder till kreditinstitut, kunder och leverantörer",
                "parentId": 0,
                "accounts": [
                    {
                        "id": 2410,
                        "text": "Andra kortfristiga låneskulder till kreditinstitut"
                    },
                    {
                        "id": 2411,
                        "text": "Kortfristiga lån från kreditinstitut"
                    },
                    {
                        "id": 2417,
                        "text": "Kortfristig del av långfristiga skulder till kreditinstitut"
                    },
                    {
                        "id": 2419,
                        "text": "Övriga kortfristiga skulder till kreditinstitut"
                    },
                    {
                        "id": 2420,
                        "text": "Förskott från kunder"
                    },
                    {
                        "id": 2421,
                        "text": "Ej inlösta presentkort"
                    },
                    {
                        "id": 2429,
                        "text": "Övriga förskott från kunder"
                    },
                    {
                        "id": 2430,
                        "text": "Pågående arbeten"
                    },
                    {
                        "id": 2431,
                        "text": "Pågående arbeten, fakturering"
                    },
                    {
                        "id": 2438,
                        "text": "Pågående arbeten, nedlagda kostnader"
                    },
                    {
                        "id": 2439,
                        "text": "Beräknad förändring av pågående arbeten"
                    },
                    {
                        "id": 2440,
                        "text": "Leverantörsskulder"
                    },
                    {
                        "id": 2441,
                        "text": "Leverantörsskulder"
                    },
                    {
                        "id": 2443,
                        "text": "Konsignationsskulder"
                    },
                    {
                        "id": 2445,
                        "text": "Tvistiga leverantörsskulder"
                    },
                    {
                        "id": 2448,
                        "text": "Ej reskontraförda leverantörsskulder"
                    },
                    {
                        "id": 2450,
                        "text": "Fakturerad men ej upparbetad intäkt"
                    },
                    {
                        "id": 2460,
                        "text": "Leverantörsskulder till koncernföretag"
                    },
                    {
                        "id": 2461,
                        "text": "Leverantörsskulder till moderföretag"
                    },
                    {
                        "id": 2462,
                        "text": "Leverantörsskulder till dotterföretag"
                    },
                    {
                        "id": 2463,
                        "text": "Leverantörsskulder till andra koncernföretag"
                    },
                    {
                        "id": 2470,
                        "text": "Leverantörsskulder till intresseföretag"
                    },
                    {
                        "id": 2480,
                        "text": "Checkräkningskredit, kortfristig"
                    },
                    {
                        "id": 2490,
                        "text": "Övriga kortfristiga skulder till kreditinstitut, kunder och leverantörer"
                    },
                    {
                        "id": 2491,
                        "text": "Avräkning spelarrangörer"
                    },
                    {
                        "id": 2492,
                        "text": "Växelskulder"
                    },
                    {
                        "id": 2499,
                        "text": "Andra övriga kortfristiga skulder"
                    }
                ]
            },
            {
                "id": 25,
                "text": "Skatteskulder",
                "parentId": 0,
                "accounts": [
                    {
                        "id": 2510,
                        "text": "Skatteskulder"
                    },
                    {
                        "id": 2512,
                        "text": "Beräknad inkomstskatt"
                    },
                    {
                        "id": 2513,
                        "text": "Beräknad fastighetsskatt/fastighetsavgift"
                    },
                    {
                        "id": 2514,
                        "text": "Beräknad särskild löneskatt på pensionskostnader"
                    },
                    {
                        "id": 2515,
                        "text": "Beräknad avkastningsskatt"
                    },
                    {
                        "id": 2516,
                        "text": "Moms"
                    },
                    {
                        "id": 2517,
                        "text": "Beräknad utländsk skatt"
                    },
                    {
                        "id": 2518,
                        "text": "Betald F-skatt"
                    }
                ]
            },
            {
                "id": 26,
                "text": "Moms och särskilda punktskatter",
                "parentId": 0,
                "accounts": [
                    {
                        "id": 2610,
                        "text": "Utgående moms, 25 %"
                    },
                    {
                        "id": 2611,
                        "text": "Utgående moms på försäljning inom Sverige, 25 %"
                    },
                    {
                        "id": 2612,
                        "text": "Utgående moms på egna uttag, 25 %"
                    },
                    {
                        "id": 2613,
                        "text": "Utgående moms för uthyrning, 25 %"
                    },
                    {
                        "id": 2614,
                        "text": "Utgående moms omvänd skattskyldighet, 25 %"
                    },
                    {
                        "id": 2615,
                        "text": "Utgående moms import av varor, 25%"
                    },
                    {
                        "id": 2616,
                        "text": "Utgående moms VMB 25 %"
                    },
                    {
                        "id": 2617,
                        "text": "Utgående moms omvänd skattskyldighet varor och tjänster i Sverige, 25 %"
                    },
                    {
                        "id": 2618,
                        "text": "Vilande utgående moms, 25 %"
                    },
                    {
                        "id": 2620,
                        "text": "Utgående moms, 12 %"
                    },
                    {
                        "id": 2621,
                        "text": "Utgående moms på försäljning inom Sverige, 12 %"
                    },
                    {
                        "id": 2622,
                        "text": "Utgående moms på egna uttag, 12 %"
                    },
                    {
                        "id": 2623,
                        "text": "Utgående moms för uthyrning, 12 %"
                    },
                    {
                        "id": 2624,
                        "text": "Utgående moms omvänd skattskyldighet, 12 %"
                    },
                    {
                        "id": 2625,
                        "text": "Utgående moms import av varor, 12 %"
                    },
                    {
                        "id": 2626,
                        "text": "Utgående moms VMB 12 %"
                    },
                    {
                        "id": 2627,
                        "text": "Utgående moms omvänd skattskyldighet varor och tjänster i Sverige, 12 %"
                    },
                    {
                        "id": 2628,
                        "text": "Vilande utgående moms, 12 %"
                    },
                    {
                        "id": 2630,
                        "text": "Utgående moms, 6 %"
                    },
                    {
                        "id": 2631,
                        "text": "Utgående moms på försäljning inom Sverige, 6 %"
                    },
                    {
                        "id": 2632,
                        "text": "Utgående moms på egna uttag, 6 %"
                    },
                    {
                        "id": 2633,
                        "text": "Utgående moms för uthyrning, 6 %"
                    },
                    {
                        "id": 2634,
                        "text": "Utgående moms omvänd skattskyldighet, 6 %"
                    },
                    {
                        "id": 2635,
                        "text": "Utgående moms import av varor, 6 %"
                    },
                    {
                        "id": 2636,
                        "text": "Utgående moms VMB 6 %"
                    },
                    {
                        "id": 2637,
                        "text": "Utgående moms omvänd skattskyldighet varor och tjänster i Sverige, 6 %"
                    },
                    {
                        "id": 2638,
                        "text": "Vilande utgående moms, 6 %"
                    },
                    {
                        "id": 2640,
                        "text": "Ingående moms"
                    },
                    {
                        "id": 2641,
                        "text": "Debiterad ingående moms"
                    },
                    {
                        "id": 2642,
                        "text": "Debiterad ingående moms i anslutning till frivillig skattskyldighet"
                    },
                    {
                        "id": 2645,
                        "text": "Beräknad ingående moms på förvärv från utlandet"
                    },
                    {
                        "id": 2646,
                        "text": "Ingående moms på uthyrning"
                    },
                    {
                        "id": 2647,
                        "text": "Ingående moms omvänd skattskyldighet varor och tjänster i Sverige"
                    },
                    {
                        "id": 2648,
                        "text": "Vilande ingående moms"
                    },
                    {
                        "id": 2649,
                        "text": "Ingående moms, blandad verksamhet"
                    },
                    {
                        "id": 2650,
                        "text": "Redovisningskonto för moms"
                    },
                    {
                        "id": 2660,
                        "text": "Särskilda punktskatter"
                    },
                    {
                        "id": 2661,
                        "text": "Reklamskatt"
                    },
                    {
                        "id": 2668,
                        "text": "OSS, moms"
                    },
                    {
                        "id": 2669,
                        "text": "Övriga punktskatter"
                    }
                ]
            },
            {
                "id": 27,
                "text": "Personalens skatter, avgifter och löneavdrag",
                "parentId": 0,
                "accounts": [
                    {
                        "id": 2710,
                        "text": "Personalskatt"
                    },
                    {
                        "id": 2730,
                        "text": "Lagstadgade sociala avgifter och särskild löneskatt"
                    },
                    {
                        "id": 2731,
                        "text": "Avräkning lagstadgade sociala avgifter"
                    },
                    {
                        "id": 2732,
                        "text": "Avräkning särskild löneskatt"
                    },
                    {
                        "id": 2740,
                        "text": "Avtalade sociala avgifter"
                    },
                    {
                        "id": 2750,
                        "text": "Utmätning i lön m.m."
                    },
                    {
                        "id": 2760,
                        "text": "Semestermedel"
                    },
                    {
                        "id": 2761,
                        "text": "Avräkning semesterlöner"
                    },
                    {
                        "id": 2762,
                        "text": "Semesterlönekassa"
                    },
                    {
                        "id": 2790,
                        "text": "Övriga löneavdrag"
                    },
                    {
                        "id": 2791,
                        "text": "Personalens intressekonto"
                    },
                    {
                        "id": 2792,
                        "text": "Lönsparande"
                    },
                    {
                        "id": 2793,
                        "text": "Gruppförsäkringspremier"
                    },
                    {
                        "id": 2794,
                        "text": "Fackföreningsavgifter"
                    },
                    {
                        "id": 2795,
                        "text": "Mätnings- och granskningsarvoden"
                    },
                    {
                        "id": 2799,
                        "text": "Övriga löneavdrag"
                    }
                ]
            },
            {
                "id": 28,
                "text": "Övriga kortfristiga skulder",
                "parentId": 0,
                "accounts": [
                    {
                        "id": 2810,
                        "text": "Avräkning för factoring och belånade kontraktsfordringar"
                    },
                    {
                        "id": 2811,
                        "text": "Avräkning för factoring"
                    },
                    {
                        "id": 2812,
                        "text": "Avräkning för belånade kontraktsfordringar"
                    },
                    {
                        "id": 2820,
                        "text": "Kortfristiga skulder till anställda"
                    },
                    {
                        "id": 2821,
                        "text": "Löneskulder"
                    },
                    {
                        "id": 2822,
                        "text": "Reseräkningar"
                    },
                    {
                        "id": 2823,
                        "text": "Tantiem, gratifikationer"
                    },
                    {
                        "id": 2829,
                        "text": "Övriga kortfristiga skulder till anställda"
                    },
                    {
                        "id": 2830,
                        "text": "Avräkning för annans räkning"
                    },
                    {
                        "id": 2840,
                        "text": "Kortfristiga låneskulder"
                    },
                    {
                        "id": 2841,
                        "text": "Kortfristig del av långfristiga skulder"
                    },
                    {
                        "id": 2849,
                        "text": "Övriga kortfristiga låneskulder"
                    },
                    {
                        "id": 2850,
                        "text": "Avräkning för skatter och avgifter (skattekonto)"
                    },
                    {
                        "id": 2860,
                        "text": "Kortfristiga skulder till koncernföretag"
                    },
                    {
                        "id": 2861,
                        "text": "Kortfristiga skulder till moderföretag"
                    },
                    {
                        "id": 2862,
                        "text": "Kortfristiga skulder till dotterföretag"
                    },
                    {
                        "id": 2863,
                        "text": "Kortfristiga skulder till andra koncernföretag"
                    },
                    {
                        "id": 2870,
                        "text": "Kortfristiga skulder till intresseföretag"
                    },
                    {
                        "id": 2880,
                        "text": "Skuld erhållna bidrag"
                    },
                    {
                        "id": 2890,
                        "text": "Övriga kortfristiga skulder"
                    },
                    {
                        "id": 2891,
                        "text": "Skulder under indrivning"
                    },
                    {
                        "id": 2892,
                        "text": "Inre reparationsfond/underhållsfond"
                    },
                    {
                        "id": 2893,
                        "text": "Skulder till närstående personer, kortfristig del"
                    },
                    {
                        "id": 2895,
                        "text": "Derivat (kortfristiga skulder)"
                    },
                    {
                        "id": 2897,
                        "text": "Mottagna depositioner, kortfristiga"
                    },
                    {
                        "id": 2898,
                        "text": "Outtagen vinstutdelning"
                    },
                    {
                        "id": 2899,
                        "text": "Övriga kortfristiga skulder"
                    }
                ]
            },
            {
                "id": 29,
                "text": "Upplupna kostnader och förutbetalda intäkter",
                "parentId": 0,
                "accounts": [
                    {
                        "id": 2910,
                        "text": "Upplupna löner"
                    },
                    {
                        "id": 2911,
                        "text": "Löneskulder"
                    },
                    {
                        "id": 2912,
                        "text": "Ackordsöverskott"
                    },
                    {
                        "id": 2919,
                        "text": "Övriga upplupna löner"
                    },
                    {
                        "id": 2920,
                        "text": "Upplupna semesterlöner"
                    },
                    {
                        "id": 2930,
                        "text": "Upplupna pensionskostnader"
                    },
                    {
                        "id": 2931,
                        "text": "Upplupna pensionsutbetalningar"
                    },
                    {
                        "id": 2940,
                        "text": "Upplupna lagstadgade sociala och andra avgifter"
                    },
                    {
                        "id": 2941,
                        "text": "Beräknade upplupna lagstadgade sociala avgifter"
                    },
                    {
                        "id": 2942,
                        "text": "Beräknad upplupen särskild löneskatt"
                    },
                    {
                        "id": 2943,
                        "text": "Beräknad upplupen särskild löneskatt på pensionskostnader, deklarationspost"
                    },
                    {
                        "id": 2944,
                        "text": "Beräknad upplupen avkastningsskatt på pensionskostnader"
                    },
                    {
                        "id": 2950,
                        "text": "Upplupna avtalade sociala avgifter"
                    },
                    {
                        "id": 2951,
                        "text": "Upplupna avtalade arbetsmarknadsförsäkringar"
                    },
                    {
                        "id": 2959,
                        "text": "Upplupna avtalade pensionsförsäkringsavgifter, deklarationspost"
                    },
                    {
                        "id": 2960,
                        "text": "Upplupna räntekostnader"
                    },
                    {
                        "id": 2970,
                        "text": "Förutbetalda intäkter"
                    },
                    {
                        "id": 2971,
                        "text": "Förutbetalda hyresintäkter"
                    },
                    {
                        "id": 2972,
                        "text": "Förutbetalda medlemsavgifter"
                    },
                    {
                        "id": 2979,
                        "text": "Övriga förutbetalda intäkter"
                    },
                    {
                        "id": 2980,
                        "text": "Upplupna avtalskostnader"
                    },
                    {
                        "id": 2990,
                        "text": "Övriga upplupna kostnader och förutbetalda intäkter"
                    },
                    {
                        "id": 2991,
                        "text": "Beräknat arvode för bokslut"
                    },
                    {
                        "id": 2992,
                        "text": "Beräknat arvode för revision"
                    },
                    {
                        "id": 2993,
                        "text": "Ospecificerad skuld till leverantörer"
                    },
                    {
                        "id": 2998,
                        "text": "Övriga upplupna kostnader och förutbetalda intäkter"
                    },
                    {
                        "id": 2999,
                        "text": "OBS-konto"
                    }
                ]
            }
        ]
    },
    {
        "id": 3,
        "text": "Rörelsens inkomster/intäkter",
        "subCategories": [
            {
                "id": 30,
                "text": "Försäljning inom Sverige",
                "parentId": 0,
                "accounts": [
                    {
                        "id": 3000,
                        "text": "Försäljning inom Sverige"
                    },
                    {
                        "id": 3001,
                        "text": "Försäljning varor inom Sverige, 25 % moms"
                    },
                    {
                        "id": 3002,
                        "text": "Försäljning varor inom Sverige, 12 % moms"
                    },
                    {
                        "id": 3003,
                        "text": "Försäljning varor inom Sverige, 6 % moms"
                    },
                    {
                        "id": 3004,
                        "text": "Försäljning varor inom Sverige, momsfri"
                    },
                    {
                        "id": 3011,
                        "text": "Försäljning tjänster inom Sverige, 25 % moms"
                    },
                    {
                        "id": 3012,
                        "text": "Försäljning tjänster inom Sverige, 12 % moms"
                    },
                    {
                        "id": 3013,
                        "text": "Försäljning tjänster inom Sverige, 6 % moms"
                    },
                    {
                        "id": 3014,
                        "text": "Försäljning tjänster inom Sverige, momsfri"
                    },
                    {
                        "id": 3071,
                        "text": "Förutbetalda intäkter, varor och tjänster"
                    },
                    {
                        "id": 3089,
                        "text": "Försäljning inom Sverige, momsfri"
                    },
                    {
                        "id": 3099,
                        "text": "Justering av försäljning, ej moms"
                    }
                ]
            },
            {
                "id": 31,
                "text": "Försäljning av varor utanför Sverige",
                "parentId": 0,
                "accounts": [
                    {
                        "id": 3105,
                        "text": "Försäljning varor till land utanför EU"
                    },
                    {
                        "id": 3106,
                        "text": "Försäljning varor till annat EU-land, momspliktig"
                    },
                    {
                        "id": 3107,
                        "text": "Treparts försäljn varor till EU"
                    },
                    {
                        "id": 3108,
                        "text": "Försäljning varor till annat EU-land, momsfri"
                    }
                ]
            },
            {
                "id": 32,
                "text": "Försäljning VMB och omvänd moms",
                "parentId": 0,
                "accounts": [
                    {
                        "id": 3200,
                        "text": "Försäljning VMB och omvänd moms"
                    },
                    {
                        "id": 3211,
                        "text": "Försäljning positiv VMB 25 %"
                    },
                    {
                        "id": 3212,
                        "text": "Försäljning negativ VMB 25 %"
                    },
                    {
                        "id": 3223,
                        "text": "Positiv VM omföringskonto"
                    },
                    {
                        "id": 3231,
                        "text": "Försäljning inom byggsektorn, omvänd skattskyldighet moms"
                    }
                ]
            },
            {
                "id": 33,
                "text": "Försäljning av tjänster utanför Sverige",
                "parentId": 0,
                "accounts": [
                    {
                        "id": 3305,
                        "text": "Försäljning tjänster till land utanför EU"
                    },
                    {
                        "id": 3308,
                        "text": "Försäljning tjänster till annat EU-land"
                    },
                    {
                        "id": 3389,
                        "text": "Försäljning EU moms/OSS"
                    }
                ]
            },
            {
                "id": 34,
                "text": "Försäljning, egna uttag",
                "parentId": 0,
                "accounts": [
                    {
                        "id": 3401,
                        "text": "Egna uttag momspliktiga, 25 %"
                    },
                    {
                        "id": 3402,
                        "text": "Egna uttag momspliktiga, 12 %"
                    },
                    {
                        "id": 3403,
                        "text": "Egna uttag momspliktiga, 6 %"
                    },
                    {
                        "id": 3404,
                        "text": "Egna uttag, momsfria"
                    }
                ]
            },
            {
                "id": 35,
                "text": "Fakturerade kostnader",
                "parentId": 0,
                "accounts": [
                    {
                        "id": 3500,
                        "text": "Fakturerade kostnader (gruppkonto)"
                    },
                    {
                        "id": 3510,
                        "text": "Fakturerat emballage"
                    },
                    {
                        "id": 3511,
                        "text": "Fakturerat emballage"
                    },
                    {
                        "id": 3518,
                        "text": "Returnerat emballage"
                    },
                    {
                        "id": 3520,
                        "text": "Fakturerade frakter"
                    },
                    {
                        "id": 3521,
                        "text": "Fakturerade frakter, EU-land"
                    },
                    {
                        "id": 3522,
                        "text": "Fakturerade frakter, export"
                    },
                    {
                        "id": 3530,
                        "text": "Fakturerade tull- och speditionskostnader m.m."
                    },
                    {
                        "id": 3540,
                        "text": "Faktureringsavgifter"
                    },
                    {
                        "id": 3541,
                        "text": "Faktureringsavgifter, EU-land"
                    },
                    {
                        "id": 3542,
                        "text": "Faktureringsavgifter, export"
                    },
                    {
                        "id": 3550,
                        "text": "Fakturerade resekostnader"
                    },
                    {
                        "id": 3560,
                        "text": "Fakturerade kostnader till koncernföretag"
                    },
                    {
                        "id": 3561,
                        "text": "Fakturerade kostnader till moderföretag"
                    },
                    {
                        "id": 3562,
                        "text": "Fakturerade kostnader till dotterföretag"
                    },
                    {
                        "id": 3563,
                        "text": "Fakturerade kostnader till andra koncernföretag"
                    },
                    {
                        "id": 3570,
                        "text": "Fakturerade kostnader till intresseföretag"
                    },
                    {
                        "id": 3590,
                        "text": "Övriga fakturerade kostnader"
                    }
                ]
            },
            {
                "id": 36,
                "text": "Rörelsens sidointäkter",
                "parentId": 0,
                "accounts": [
                    {
                        "id": 3600,
                        "text": "Rörelsens sidointäkter (gruppkonto)"
                    },
                    {
                        "id": 3610,
                        "text": "Försäljning av material"
                    },
                    {
                        "id": 3611,
                        "text": "Försäljning av råmaterial"
                    },
                    {
                        "id": 3612,
                        "text": "Försäljning av skrot"
                    },
                    {
                        "id": 3613,
                        "text": "Försäljning av förbrukningsmaterial"
                    },
                    {
                        "id": 3619,
                        "text": "Försäljning av övrigt material"
                    },
                    {
                        "id": 3620,
                        "text": "Tillfällig uthyrning av personal"
                    },
                    {
                        "id": 3630,
                        "text": "Tillfällig uthyrning av transportmedel"
                    },
                    {
                        "id": 3670,
                        "text": "Intäkter från värdepapper"
                    },
                    {
                        "id": 3671,
                        "text": "Försäljning av värdepapper"
                    },
                    {
                        "id": 3672,
                        "text": "Utdelning från värdepapper"
                    },
                    {
                        "id": 3679,
                        "text": "Övriga intäkter från värdepapper"
                    },
                    {
                        "id": 3680,
                        "text": "Management fees"
                    },
                    {
                        "id": 3690,
                        "text": "Övriga sidointäkter"
                    }
                ]
            },
            {
                "id": 37,
                "text": "Intäktskorrigeringar",
                "parentId": 0,
                "accounts": [
                    {
                        "id": 3700,
                        "text": "Intäktskorrigeringar (gruppkonto)"
                    },
                    {
                        "id": 3710,
                        "text": "Ofördelade intäktsreduktioner"
                    },
                    {
                        "id": 3730,
                        "text": "Lämnade rabatter"
                    },
                    {
                        "id": 3731,
                        "text": "Lämnade kassarabatter"
                    },
                    {
                        "id": 3732,
                        "text": "Lämnade mängdrabatter"
                    },
                    {
                        "id": 3740,
                        "text": "Öres- och kronutjämning"
                    },
                    {
                        "id": 3750,
                        "text": "Punktskatter"
                    },
                    {
                        "id": 3751,
                        "text": "Intäktsförda punktskatter (kreditkonto)"
                    },
                    {
                        "id": 3752,
                        "text": "Skuldförda punktskatter (debetkonto)"
                    },
                    {
                        "id": 3790,
                        "text": "Övriga intäktskorrigeringar"
                    }
                ]
            },
            {
                "id": 38,
                "text": "Aktiverat arbete för egen räkning",
                "parentId": 0,
                "accounts": [
                    {
                        "id": 3800,
                        "text": "Aktiverat arbete för egen räkning (gruppkonto)"
                    },
                    {
                        "id": 3840,
                        "text": "Aktiverat arbete (material)"
                    },
                    {
                        "id": 3850,
                        "text": "Aktiverat arbete (omkostnader)"
                    },
                    {
                        "id": 3870,
                        "text": "Aktiverat arbete (personal)"
                    }
                ]
            },
            {
                "id": 39,
                "text": "Övriga rörelseintäkter",
                "parentId": 0,
                "accounts": [
                    {
                        "id": 3900,
                        "text": "Övriga rörelseintäkter (gruppkonto)"
                    },
                    {
                        "id": 3910,
                        "text": "Hyres- och arrendeintäkter"
                    },
                    {
                        "id": 3911,
                        "text": "Hyresintäkter"
                    },
                    {
                        "id": 3912,
                        "text": "Arrendeintäkter"
                    },
                    {
                        "id": 3913,
                        "text": "Frivilligt momspliktiga hyresintäkter"
                    },
                    {
                        "id": 3914,
                        "text": "Övriga momspliktiga hyresintäkter"
                    },
                    {
                        "id": 3920,
                        "text": "Provisionsintäkter, licensintäkter och royalties"
                    },
                    {
                        "id": 3921,
                        "text": "Provisionsintäkter"
                    },
                    {
                        "id": 3922,
                        "text": "Licensintäkter och royalties"
                    },
                    {
                        "id": 3925,
                        "text": "Franchiseintäkter"
                    },
                    {
                        "id": 3929,
                        "text": "Kickback momsfri"
                    },
                    {
                        "id": 3930,
                        "text": "Påminnelseavgifter på intäkter (kundfakturor)"
                    },
                    {
                        "id": 3940,
                        "text": "Orealiserade negativa/positiva värdeförändringar på säkringsinstrument"
                    },
                    {
                        "id": 3950,
                        "text": "Återvunna, tidigare avskrivna kundfordringar"
                    },
                    {
                        "id": 3960,
                        "text": "Valutakursvinster på fordringar och skulder av rörelsekaraktär"
                    },
                    {
                        "id": 3970,
                        "text": "Vinst vid avyttring av immateriella och materiella anläggningstillgångar"
                    },
                    {
                        "id": 3971,
                        "text": "Vinst vid avyttring av immateriella anläggningstillgångar"
                    },
                    {
                        "id": 3972,
                        "text": "Vinst vid avyttring av byggnader och mark"
                    },
                    {
                        "id": 3973,
                        "text": "Vinst vid avyttring av maskiner och inventarier"
                    },
                    {
                        "id": 3980,
                        "text": "Erhållna offentliga stöd m.m."
                    },
                    {
                        "id": 3981,
                        "text": "Erhållna EU-bidrag"
                    },
                    {
                        "id": 3985,
                        "text": "Erhållna statliga bidrag"
                    },
                    {
                        "id": 3987,
                        "text": "Erhållna kommunala bidrag"
                    },
                    {
                        "id": 3988,
                        "text": "Erhållna bidrag och ersättningar för personal"
                    },
                    {
                        "id": 3989,
                        "text": "Övriga erhållna bidrag"
                    },
                    {
                        "id": 3990,
                        "text": "Övriga ersättningar och intäkter"
                    },
                    {
                        "id": 3991,
                        "text": "Konfliktersättning"
                    },
                    {
                        "id": 3992,
                        "text": "Erhållna skadestånd"
                    },
                    {
                        "id": 3993,
                        "text": "Erhållna donationer och gåvor"
                    },
                    {
                        "id": 3994,
                        "text": "Försäkringsersättningar"
                    },
                    {
                        "id": 3995,
                        "text": "Erhållet ackord på skulder av rörelsekaraktär"
                    },
                    {
                        "id": 3996,
                        "text": "Erhållna reklambidrag"
                    },
                    {
                        "id": 3997,
                        "text": "Sjuklöneersättning"
                    },
                    {
                        "id": 3998,
                        "text": "Sjukpenning"
                    },
                    {
                        "id": 3999,
                        "text": "Övriga rörelseintäkter"
                    }
                ]
            }
        ]
    },
    {
        "id": 4,
        "text": "Utgifter/kostnader för varor, material och vissa köpta tjänster",
        "subCategories": [
            {
                "id": 40,
                "text": "Inköp av varor och material",
                "parentId": 0,
                "accounts": [
                    {
                        "id": 4000,
                        "text": "Inköp av varor från Sverige"
                    },
                    {
                        "id": 4010,
                        "text": "Inköp material och varor"
                    }
                ]
            },
            {
                "id": 42,
                "text": "Sålda varor VMB",
                "parentId": 0,
                "accounts": [
                    {
                        "id": 4200,
                        "text": "Sålda varor VMB"
                    },
                    {
                        "id": 4211,
                        "text": "Sålda varor positiv VMB 25 %"
                    },
                    {
                        "id": 4212,
                        "text": "Sålda varor negativ VMB 25 %"
                    }
                ]
            },
            {
                "id": 44,
                "text": "Inköpta tjänster i Sverige, omvänd skattskyldighet",
                "parentId": 0,
                "accounts": [
                    {
                        "id": 4400,
                        "text": "Inköpta tjänster i Sverige, omvänd skattskyldighet"
                    },
                    {
                        "id": 4415,
                        "text": "Inköpta varor i Sverige, omvänd skattskyldighet, 25 %"
                    },
                    {
                        "id": 4416,
                        "text": "Inköpta varor i Sverige, omvänd skattskyldighet, 12 %"
                    },
                    {
                        "id": 4417,
                        "text": "Inköpta varor i Sverige, omvänd skattskyldighet, 6 %"
                    },
                    {
                        "id": 4425,
                        "text": "Inköpta tjänster i Sverige, omvänd skattskyldighet, 25 %"
                    },
                    {
                        "id": 4426,
                        "text": "Inköpta tjänster i Sverige, omvänd skattskyldighet, 12 %"
                    },
                    {
                        "id": 4427,
                        "text": "Inköpta tjänster i Sverige, omvänd skattskyldighet, 6 %"
                    }
                ]
            },
            {
                "id": 45,
                "text": "Inköp utanför Sverige",
                "parentId": 0,
                "accounts": [
                    {
                        "id": 4500,
                        "text": "Inköp utanför Sverige"
                    },
                    {
                        "id": 4512,
                        "text": "Förvärv varor, trepartsförvärv från annat EU-land, mellan man"
                    },
                    {
                        "id": 4515,
                        "text": "Inköp av varor från annat EU-land, 25 %"
                    },
                    {
                        "id": 4516,
                        "text": "Inköp av varor från annat EU-land, 12 %"
                    },
                    {
                        "id": 4517,
                        "text": "Inköp av varor från annat EU-land, 6 %"
                    },
                    {
                        "id": 4518,
                        "text": "Inköp av varor från annat EU-land, momsfri"
                    },
                    {
                        "id": 4531,
                        "text": "Import tjänster land utanför EU, 25% moms"
                    },
                    {
                        "id": 4532,
                        "text": "Import tjänster land utanför EU, 12% moms"
                    },
                    {
                        "id": 4533,
                        "text": "Import tjänster land utanför EU, 6% moms"
                    },
                    {
                        "id": 4534,
                        "text": "Import tjänster land utanför EU, momsfri"
                    },
                    {
                        "id": 4535,
                        "text": "Inköp av tjänster från annat EU-land, 25 %"
                    },
                    {
                        "id": 4536,
                        "text": "Inköp av tjänster från annat EU-land, 12 %"
                    },
                    {
                        "id": 4537,
                        "text": "Inköp av tjänster från annat EU-land, 6 %"
                    },
                    {
                        "id": 4538,
                        "text": "Inköp av tjänster från annat EU-land, momsfri"
                    },
                    {
                        "id": 4545,
                        "text": "Import av varor, 25 % moms"
                    },
                    {
                        "id": 4546,
                        "text": "Import av varor, 12 % moms"
                    },
                    {
                        "id": 4547,
                        "text": "Import av varor, 6 % moms"
                    },
                    {
                        "id": 4549,
                        "text": "Motkonto beskattningsunderlag import"
                    },
                    {
                        "id": 4598,
                        "text": "Justering, omvänd moms"
                    }
                ]
            },
            {
                "id": 46,
                "text": "Legoarbeten, underentreprenader",
                "parentId": 0,
                "accounts": [
                    {
                        "id": 4600,
                        "text": "Legoarbeten och underentreprenader (gruppkonto)"
                    }
                ]
            },
            {
                "id": 47,
                "text": "Reduktion av inköpspriser",
                "parentId": 0,
                "accounts": [
                    {
                        "id": 4700,
                        "text": "Reduktion av inköpspriser (gruppkonto)"
                    },
                    {
                        "id": 4730,
                        "text": "Erhållna rabatter"
                    },
                    {
                        "id": 4731,
                        "text": "Erhållna kassarabatter"
                    },
                    {
                        "id": 4732,
                        "text": "Erhållna mängdrabatter (inkl. bonus)"
                    },
                    {
                        "id": 4733,
                        "text": "Erhållet aktivitetsstöd"
                    },
                    {
                        "id": 4790,
                        "text": "Övriga reduktioner av inköpspriser"
                    }
                ]
            },
            {
                "id": 49,
                "text": "Förändring av lager, produkter i arbete och pågående arbeten",
                "parentId": 0,
                "accounts": [
                    {
                        "id": 4900,
                        "text": "Förändring av lager (gruppkonto)"
                    },
                    {
                        "id": 4910,
                        "text": "Förändring av lager av råvaror"
                    },
                    {
                        "id": 4920,
                        "text": "Förändring av lager av tillsatsmaterial och förnödenheter"
                    },
                    {
                        "id": 4930,
                        "text": "Förändring av lager av halvfabrikat"
                    },
                    {
                        "id": 4931,
                        "text": "Förändring av lager av köpta halvfabrikat"
                    },
                    {
                        "id": 4932,
                        "text": "Förändring av lager av egentillverkade halvfabrikat"
                    },
                    {
                        "id": 4940,
                        "text": "Förändring av produkter i arbete"
                    },
                    {
                        "id": 4944,
                        "text": "Förändring av produkter i arbete, material och utlägg"
                    },
                    {
                        "id": 4945,
                        "text": "Förändring av produkter i arbete, omkostnader"
                    },
                    {
                        "id": 4947,
                        "text": "Förändring av produkter i arbete, personalkostnader"
                    },
                    {
                        "id": 4950,
                        "text": "Förändring av lager av färdiga varor"
                    },
                    {
                        "id": 4960,
                        "text": "Förändring av lager av handelsvaror"
                    },
                    {
                        "id": 4970,
                        "text": "Förändring av pågående arbeten, nedlagda kostnader"
                    },
                    {
                        "id": 4974,
                        "text": "Förändring av pågående arbeten, material och utlägg"
                    },
                    {
                        "id": 4975,
                        "text": "Förändring av pågående arbeten, omkostnader"
                    },
                    {
                        "id": 4977,
                        "text": "Förändring av pågående arbeten, personalkostnader"
                    },
                    {
                        "id": 4980,
                        "text": "Förändring av lager av värdepapper"
                    },
                    {
                        "id": 4981,
                        "text": "Sålda värdepappers anskaffningsvärde"
                    },
                    {
                        "id": 4987,
                        "text": "Nedskrivning av värdepapper"
                    },
                    {
                        "id": 4988,
                        "text": "Återföring av nedskrivning av värdepapper"
                    },
                    {
                        "id": 4990,
                        "text": "Förändring av lager och pågående arbeten (ofördelad)"
                    }
                ]
            }
        ]
    },
    {
        "id": 5,
        "text": "Övriga externa rörelseutgifter/ kostnader",
        "subCategories": [
            {
                "id": 50,
                "text": "Lokalkostnader",
                "parentId": 0,
                "accounts": [
                    {
                        "id": 5000,
                        "text": "Lokalkostnader (gruppkonto)"
                    },
                    {
                        "id": 5010,
                        "text": "Lokalhyra"
                    },
                    {
                        "id": 5011,
                        "text": "Hyra för kontorslokaler"
                    },
                    {
                        "id": 5012,
                        "text": "Hyra för garage"
                    },
                    {
                        "id": 5013,
                        "text": "Hyra för lagerlokaler"
                    },
                    {
                        "id": 5020,
                        "text": "El för belysning"
                    },
                    {
                        "id": 5030,
                        "text": "Värme"
                    },
                    {
                        "id": 5040,
                        "text": "Vatten och avlopp"
                    },
                    {
                        "id": 5050,
                        "text": "Lokaltillbehör"
                    },
                    {
                        "id": 5060,
                        "text": "Städning och renhållning"
                    },
                    {
                        "id": 5061,
                        "text": "Städning"
                    },
                    {
                        "id": 5062,
                        "text": "Sophämtning"
                    },
                    {
                        "id": 5063,
                        "text": "Hyra för sopcontainer"
                    },
                    {
                        "id": 5064,
                        "text": "Snöröjning"
                    },
                    {
                        "id": 5065,
                        "text": "Trädgårdsskötsel"
                    },
                    {
                        "id": 5070,
                        "text": "Reparation och underhåll av lokaler"
                    },
                    {
                        "id": 5090,
                        "text": "Övriga lokalkostnader"
                    },
                    {
                        "id": 5098,
                        "text": "Övriga lokalkostnader, avdragsgilla"
                    },
                    {
                        "id": 5099,
                        "text": "Övriga lokalkostnader, ej avdragsgilla"
                    }
                ]
            },
            {
                "id": 51,
                "text": "Fastighetskostnader",
                "parentId": 0,
                "accounts": [
                    {
                        "id": 5100,
                        "text": "Fastighetskostnader (gruppkonto)"
                    },
                    {
                        "id": 5110,
                        "text": "Tomträttsavgäld/arrende"
                    },
                    {
                        "id": 5120,
                        "text": "El för belysning"
                    },
                    {
                        "id": 5130,
                        "text": "Värme"
                    },
                    {
                        "id": 5131,
                        "text": "Uppvärmning"
                    },
                    {
                        "id": 5132,
                        "text": "Sotning"
                    },
                    {
                        "id": 5140,
                        "text": "Vatten och avlopp"
                    },
                    {
                        "id": 5160,
                        "text": "Städning och renhållning"
                    },
                    {
                        "id": 5161,
                        "text": "Städning"
                    },
                    {
                        "id": 5162,
                        "text": "Sophämtning"
                    },
                    {
                        "id": 5163,
                        "text": "Hyra för sopcontainer"
                    },
                    {
                        "id": 5164,
                        "text": "Snöröjning"
                    },
                    {
                        "id": 5165,
                        "text": "Trädgårdsskötsel"
                    },
                    {
                        "id": 5170,
                        "text": "Reparation och underhåll av fastighet"
                    },
                    {
                        "id": 5190,
                        "text": "Övriga fastighetskostnader"
                    },
                    {
                        "id": 5191,
                        "text": "Fastighetsskatt/fastighetsavgift"
                    },
                    {
                        "id": 5192,
                        "text": "Fastighetsförsäkringspremier"
                    },
                    {
                        "id": 5193,
                        "text": "Fastighetsskötsel och förvaltning"
                    },
                    {
                        "id": 5198,
                        "text": "Övriga fastighetskostnader, avdragsgilla"
                    },
                    {
                        "id": 5199,
                        "text": "Övriga fastighetskostnader, ej avdragsgilla"
                    }
                ]
            },
            {
                "id": 52,
                "text": "Hyra av anläggningstillgångar",
                "parentId": 0,
                "accounts": [
                    {
                        "id": 5200,
                        "text": "Hyra av anläggningstillgångar (gruppkonto)"
                    },
                    {
                        "id": 5210,
                        "text": "Hyra av maskiner och andra tekniska anläggningar"
                    },
                    {
                        "id": 5211,
                        "text": "Korttidshyra av maskiner och andra tekniska anläggningar"
                    },
                    {
                        "id": 5212,
                        "text": "Leasing av maskiner och andra tekniska anläggningar"
                    },
                    {
                        "id": 5220,
                        "text": "Hyra av inventarier och verktyg"
                    },
                    {
                        "id": 5221,
                        "text": "Korttidshyra av inventarier och verktyg"
                    },
                    {
                        "id": 5222,
                        "text": "Leasing av inventarier och verktyg"
                    },
                    {
                        "id": 5250,
                        "text": "Hyra av datorer"
                    },
                    {
                        "id": 5251,
                        "text": "Korttidshyra av datorer"
                    },
                    {
                        "id": 5252,
                        "text": "Leasing av datorer"
                    },
                    {
                        "id": 5290,
                        "text": "Övriga hyreskostnader för anläggningstillgångar"
                    }
                ]
            },
            {
                "id": 53,
                "text": "Energikostnader",
                "parentId": 0,
                "accounts": [
                    {
                        "id": 5300,
                        "text": "Energikostnader (gruppkonto)"
                    },
                    {
                        "id": 5310,
                        "text": "El för drift"
                    },
                    {
                        "id": 5320,
                        "text": "Gas"
                    },
                    {
                        "id": 5330,
                        "text": "Eldningsolja"
                    },
                    {
                        "id": 5340,
                        "text": "Stenkol och koks"
                    },
                    {
                        "id": 5350,
                        "text": "Torv, träkol, ved och annat träbränsle"
                    },
                    {
                        "id": 5360,
                        "text": "Bensin, fotogen och motorbrännolja"
                    },
                    {
                        "id": 5370,
                        "text": "Fjärrvärme, kyla och ånga"
                    },
                    {
                        "id": 5380,
                        "text": "Vatten"
                    },
                    {
                        "id": 5390,
                        "text": "Övriga energikostnader"
                    }
                ]
            },
            {
                "id": 54,
                "text": "Förbrukningsinventarier och förbrukningsmaterial",
                "parentId": 0,
                "accounts": [
                    {
                        "id": 5400,
                        "text": "Förbrukningsinventarier och förbrukningsmaterial (gruppkonto)"
                    },
                    {
                        "id": 5410,
                        "text": "Förbrukningsinventarier"
                    },
                    {
                        "id": 5411,
                        "text": "Förbrukningsinventarier med en livslängd på mer än ett år"
                    },
                    {
                        "id": 5412,
                        "text": "Förbrukningsinventarier med en livslängd på ett år eller mindre"
                    },
                    {
                        "id": 5420,
                        "text": "Programvaror"
                    },
                    {
                        "id": 5430,
                        "text": "Transportinventarier"
                    },
                    {
                        "id": 5440,
                        "text": "Förbrukningsemballage"
                    },
                    {
                        "id": 5460,
                        "text": "Förbrukningsmaterial"
                    },
                    {
                        "id": 5480,
                        "text": "Arbetskläder och skyddsmaterial"
                    },
                    {
                        "id": 5490,
                        "text": "Övriga förbrukningsinventarier och förbrukningsmaterial"
                    },
                    {
                        "id": 5491,
                        "text": "Övriga förbrukningsinventarier med en livslängd på mer än ett år"
                    },
                    {
                        "id": 5492,
                        "text": "Övriga förbrukningsinventarier med en livslängd på ett år eller mindre"
                    },
                    {
                        "id": 5493,
                        "text": "Övrigt förbrukningsmaterial"
                    }
                ]
            },
            {
                "id": 55,
                "text": "Reparation och underhåll",
                "parentId": 0,
                "accounts": [
                    {
                        "id": 5500,
                        "text": "Reparation och underhåll (gruppkonto)"
                    },
                    {
                        "id": 5510,
                        "text": "Reparation och underhåll av maskiner och andra tekniska anläggningar"
                    },
                    {
                        "id": 5520,
                        "text": "Reparation och underhåll av inventarier, verktyg och datorer m.m."
                    },
                    {
                        "id": 5530,
                        "text": "Reparation och underhåll av installationer"
                    },
                    {
                        "id": 5550,
                        "text": "Reparation och underhåll av förbrukningsinventarier"
                    },
                    {
                        "id": 5580,
                        "text": "Underhåll och tvätt av arbetskläder"
                    },
                    {
                        "id": 5590,
                        "text": "Övriga kostnader för reparation och underhåll"
                    }
                ]
            },
            {
                "id": 56,
                "text": "Kostnader för transportmedel",
                "parentId": 0,
                "accounts": [
                    {
                        "id": 5600,
                        "text": "Kostnader för transportmedel (gruppkonto)"
                    },
                    {
                        "id": 5610,
                        "text": "Personbilskostnader"
                    },
                    {
                        "id": 5611,
                        "text": "Drivmedel för personbilar"
                    },
                    {
                        "id": 5612,
                        "text": "Försäkring och skatt för personbilar"
                    },
                    {
                        "id": 5613,
                        "text": "Reparation och underhåll av personbilar"
                    },
                    {
                        "id": 5615,
                        "text": "Leasing av personbilar"
                    },
                    {
                        "id": 5616,
                        "text": "Trängselskatt, avdragsgill"
                    },
                    {
                        "id": 5619,
                        "text": "Övriga personbilskostnader"
                    },
                    {
                        "id": 5620,
                        "text": "Lastbilskostnader"
                    },
                    {
                        "id": 5630,
                        "text": "Truckkostnader"
                    },
                    {
                        "id": 5640,
                        "text": "Kostnader för arbetsmaskiner"
                    },
                    {
                        "id": 5650,
                        "text": "Traktorkostnader"
                    },
                    {
                        "id": 5660,
                        "text": "Motorcykel-, moped- och skoterkostnader"
                    },
                    {
                        "id": 5670,
                        "text": "Båt-, flygplans- och helikopterkostnader"
                    },
                    {
                        "id": 5690,
                        "text": "Övriga kostnader för transportmedel"
                    }
                ]
            },
            {
                "id": 57,
                "text": "Frakter och transporter",
                "parentId": 0,
                "accounts": [
                    {
                        "id": 5700,
                        "text": "Frakter och transporter (gruppkonto)"
                    },
                    {
                        "id": 5710,
                        "text": "Frakter, transporter och försäkringar vid varudistribution"
                    },
                    {
                        "id": 5720,
                        "text": "Tull- och speditionskostnader m.m."
                    },
                    {
                        "id": 5730,
                        "text": "Arbetstransporter"
                    },
                    {
                        "id": 5790,
                        "text": "Övriga kostnader för frakter och transporter"
                    }
                ]
            },
            {
                "id": 58,
                "text": "Resekostnader",
                "parentId": 0,
                "accounts": [
                    {
                        "id": 5800,
                        "text": "Resekostnader (gruppkonto)"
                    },
                    {
                        "id": 5810,
                        "text": "Biljetter"
                    },
                    {
                        "id": 5820,
                        "text": "Hyrbilskostnader"
                    },
                    {
                        "id": 5830,
                        "text": "Kost och logi"
                    },
                    {
                        "id": 5831,
                        "text": "Kost och logi i Sverige"
                    },
                    {
                        "id": 5832,
                        "text": "Kost och logi i utlandet"
                    },
                    {
                        "id": 5841,
                        "text": "Milersättning, avdragsgill (Ägare enskild firma)"
                    },
                    {
                        "id": 5842,
                        "text": "Milersättning, ej avdragsgill (Ägare enskild firma)"
                    },
                    {
                        "id": 5843,
                        "text": "Traktamente Sverige avdragsgillt (Ägare enskild firma)"
                    },
                    {
                        "id": 5844,
                        "text": "Traktamente Sverige ej avdragsgillt (Ägare enskild firma)"
                    },
                    {
                        "id": 5845,
                        "text": "Traktamente Utlandet avdragsgillt (Ägare enskild firma)"
                    },
                    {
                        "id": 5846,
                        "text": "Traktamente Utlandet ej avdragsgillt (Ägare enskild firma)"
                    },
                    {
                        "id": 5890,
                        "text": "Övriga resekostnader"
                    }
                ]
            },
            {
                "id": 59,
                "text": "Reklam och PR",
                "parentId": 0,
                "accounts": [
                    {
                        "id": 5900,
                        "text": "Reklam och PR (gruppkonto)"
                    },
                    {
                        "id": 5910,
                        "text": "Annonsering"
                    },
                    {
                        "id": 5920,
                        "text": "Utomhus- och trafikreklam"
                    },
                    {
                        "id": 5930,
                        "text": "Reklamtrycksaker och direktreklam"
                    },
                    {
                        "id": 5940,
                        "text": "Utställningar och mässor"
                    },
                    {
                        "id": 5950,
                        "text": "Butiksreklam och återförsäljarreklam"
                    },
                    {
                        "id": 5960,
                        "text": "Varuprover, reklamgåvor, presentreklam och tävlingar"
                    },
                    {
                        "id": 5970,
                        "text": "Film-, radio-, TV- och Internetreklam"
                    },
                    {
                        "id": 5980,
                        "text": "PR, institutionell reklam och sponsring"
                    },
                    {
                        "id": 5990,
                        "text": "Övriga kostnader för reklam och PR"
                    }
                ]
            }
        ]
    },
    {
        "id": 6,
        "text": "Övriga externa rörelseutgifter/ kostnader",
        "subCategories": [
            {
                "id": 60,
                "text": "Övriga försäljningskostnader",
                "parentId": 0,
                "accounts": [
                    {
                        "id": 6000,
                        "text": "Övriga försäljningskostnader (gruppkonto)"
                    },
                    {
                        "id": 6010,
                        "text": "Kataloger, prislistor m.m."
                    },
                    {
                        "id": 6020,
                        "text": "Egna facktidskrifter"
                    },
                    {
                        "id": 6030,
                        "text": "Speciella orderkostnader"
                    },
                    {
                        "id": 6040,
                        "text": "Kontokortsavgifter"
                    },
                    {
                        "id": 6050,
                        "text": "Försäljningsprovisioner"
                    },
                    {
                        "id": 6055,
                        "text": "Franchisekostnader o.dyl."
                    },
                    {
                        "id": 6060,
                        "text": "Kreditförsäljningskostnader"
                    },
                    {
                        "id": 6061,
                        "text": "Kreditupplysning"
                    },
                    {
                        "id": 6062,
                        "text": "Inkasso och KFM-avgifter"
                    },
                    {
                        "id": 6063,
                        "text": "Kreditförsäkringspremier"
                    },
                    {
                        "id": 6064,
                        "text": "Factoringavgifter"
                    },
                    {
                        "id": 6069,
                        "text": "Övriga kreditförsäljningskostnader"
                    },
                    {
                        "id": 6070,
                        "text": "Representation"
                    },
                    {
                        "id": 6071,
                        "text": "Representation, avdragsgill"
                    },
                    {
                        "id": 6072,
                        "text": "Representation, ej avdragsgill"
                    },
                    {
                        "id": 6080,
                        "text": "Bankgarantier"
                    },
                    {
                        "id": 6090,
                        "text": "Övriga försäljningskostnader"
                    }
                ]
            },
            {
                "id": 61,
                "text": "Kontorsmateriel och trycksaker",
                "parentId": 0,
                "accounts": [
                    {
                        "id": 6100,
                        "text": "Kontorsmateriel och trycksaker (gruppkonto)"
                    },
                    {
                        "id": 6110,
                        "text": "Kontorsmateriel"
                    },
                    {
                        "id": 6150,
                        "text": "Trycksaker"
                    }
                ]
            },
            {
                "id": 62,
                "text": "Tele och post",
                "parentId": 0,
                "accounts": [
                    {
                        "id": 6200,
                        "text": "Tele och post (gruppkonto)"
                    },
                    {
                        "id": 6210,
                        "text": "Telekommunikation"
                    },
                    {
                        "id": 6211,
                        "text": "Fast telefoni"
                    },
                    {
                        "id": 6212,
                        "text": "Mobiltelefon"
                    },
                    {
                        "id": 6213,
                        "text": "Mobilsökning"
                    },
                    {
                        "id": 6214,
                        "text": "Fax"
                    },
                    {
                        "id": 6215,
                        "text": "Telex"
                    },
                    {
                        "id": 6230,
                        "text": "Datakommunikation"
                    },
                    {
                        "id": 6250,
                        "text": "Postbefordran"
                    }
                ]
            },
            {
                "id": 63,
                "text": "Företagsförsäkringar och övriga riskkostnader",
                "parentId": 0,
                "accounts": [
                    {
                        "id": 6300,
                        "text": "Företagsförsäkringar och övriga riskkostnader (gruppkonto)"
                    },
                    {
                        "id": 6310,
                        "text": "Företagsförsäkringar"
                    },
                    {
                        "id": 6320,
                        "text": "Självrisker vid skada"
                    },
                    {
                        "id": 6330,
                        "text": "Förluster i pågående arbeten"
                    },
                    {
                        "id": 6340,
                        "text": "Lämnade skadestånd"
                    },
                    {
                        "id": 6341,
                        "text": "Lämnade skadestånd, avdragsgilla"
                    },
                    {
                        "id": 6342,
                        "text": "Lämnade skadestånd, ej avdragsgilla"
                    },
                    {
                        "id": 6350,
                        "text": "Förluster på kundfordringar"
                    },
                    {
                        "id": 6351,
                        "text": "Konstaterade förluster på kundfordringar"
                    },
                    {
                        "id": 6352,
                        "text": "Befarade förluster på kundfordringar"
                    },
                    {
                        "id": 6360,
                        "text": "Garantikostnader"
                    },
                    {
                        "id": 6361,
                        "text": "Förändring av garantiavsättning"
                    },
                    {
                        "id": 6362,
                        "text": "Faktiska garantikostnader"
                    },
                    {
                        "id": 6370,
                        "text": "Kostnader för bevakning och larm"
                    },
                    {
                        "id": 6380,
                        "text": "Förluster på övriga kortfristiga fordringar"
                    },
                    {
                        "id": 6390,
                        "text": "Övriga riskkostnader"
                    }
                ]
            },
            {
                "id": 64,
                "text": "Förvaltningskostnader",
                "parentId": 0,
                "accounts": [
                    {
                        "id": 6400,
                        "text": "Förvaltningskostnader (gruppkonto)"
                    },
                    {
                        "id": 6410,
                        "text": "Styrelsearvoden som inte är lön"
                    },
                    {
                        "id": 6420,
                        "text": "Ersättningar till revisor"
                    },
                    {
                        "id": 6421,
                        "text": "Revision"
                    },
                    {
                        "id": 6422,
                        "text": "Revisonsverksamhet utöver revision"
                    },
                    {
                        "id": 6423,
                        "text": "Skatterådgivning – revisor"
                    },
                    {
                        "id": 6424,
                        "text": "Övriga tjänster – revisor"
                    },
                    {
                        "id": 6430,
                        "text": "Management fees"
                    },
                    {
                        "id": 6440,
                        "text": "Årsredovisning och delårsrapporter"
                    },
                    {
                        "id": 6450,
                        "text": "Bolagsstämma/års- eller föreningsstämma"
                    },
                    {
                        "id": 6490,
                        "text": "Övriga förvaltningskostnader"
                    }
                ]
            },
            {
                "id": 65,
                "text": "Övriga externa tjänster",
                "parentId": 0,
                "accounts": [
                    {
                        "id": 6500,
                        "text": "Övriga externa tjänster (gruppkonto)"
                    },
                    {
                        "id": 6510,
                        "text": "Mätningskostnader"
                    },
                    {
                        "id": 6520,
                        "text": "Ritnings- och kopieringskostnader"
                    },
                    {
                        "id": 6530,
                        "text": "Redovisningstjänster"
                    },
                    {
                        "id": 6540,
                        "text": "IT-tjänster"
                    },
                    {
                        "id": 6550,
                        "text": "Konsultarvoden"
                    },
                    {
                        "id": 6560,
                        "text": "Serviceavgifter till branschorganisationer"
                    },
                    {
                        "id": 6570,
                        "text": "Bankkostnader"
                    },
                    {
                        "id": 6580,
                        "text": "Advokat- och rättegångskostnader"
                    },
                    {
                        "id": 6590,
                        "text": "Övriga externa tjänster"
                    }
                ]
            },
            {
                "id": 68,
                "text": "Inhyrd personal",
                "parentId": 0,
                "accounts": [
                    {
                        "id": 6800,
                        "text": "Inhyrd personal (gruppkonto)"
                    },
                    {
                        "id": 6810,
                        "text": "Inhyrd produktionspersonal"
                    },
                    {
                        "id": 6820,
                        "text": "Inhyrd lagerpersonal"
                    },
                    {
                        "id": 6830,
                        "text": "Inhyrd transportpersonal"
                    },
                    {
                        "id": 6840,
                        "text": "Inhyrd kontors- och ekonomipersonal"
                    },
                    {
                        "id": 6850,
                        "text": "Inhyrd IT-personal"
                    },
                    {
                        "id": 6860,
                        "text": "Inhyrd marknads- och försäljningspersonal"
                    },
                    {
                        "id": 6870,
                        "text": "Inhyrd restaurang- och butikspersonal"
                    },
                    {
                        "id": 6880,
                        "text": "Inhyrda företagsledare"
                    },
                    {
                        "id": 6890,
                        "text": "Övrig inhyrd personal"
                    }
                ]
            },
            {
                "id": 69,
                "text": "Övriga externa kostnader",
                "parentId": 0,
                "accounts": [
                    {
                        "id": 6900,
                        "text": "Övriga externa kostnader (gruppkonto)"
                    },
                    {
                        "id": 6910,
                        "text": "Licensavgifter och royalties"
                    },
                    {
                        "id": 6920,
                        "text": "Kostnader för egna patent"
                    },
                    {
                        "id": 6930,
                        "text": "Kostnader för varumärken m.m."
                    },
                    {
                        "id": 6940,
                        "text": "Kontroll-, provnings- och stämpelavgifter"
                    },
                    {
                        "id": 6950,
                        "text": "Tillsynsavgifter myndigheter"
                    },
                    {
                        "id": 6970,
                        "text": "Tidningar, tidskrifter och facklitteratur"
                    },
                    {
                        "id": 6980,
                        "text": "Föreningsavgifter"
                    },
                    {
                        "id": 6981,
                        "text": "Föreningsavgifter, avdragsgilla"
                    },
                    {
                        "id": 6982,
                        "text": "Föreningsavgifter, ej avdragsgilla"
                    },
                    {
                        "id": 6990,
                        "text": "Övriga externa kostnader"
                    },
                    {
                        "id": 6991,
                        "text": "Övriga externa kostnader, avdragsgilla"
                    },
                    {
                        "id": 6992,
                        "text": "Övriga externa kostnader, ej avdragsgilla"
                    },
                    {
                        "id": 6993,
                        "text": "Lämnade bidrag och gåvor"
                    },
                    {
                        "id": 6996,
                        "text": "Betald utländsk inkomstskatt"
                    },
                    {
                        "id": 6997,
                        "text": "Obetald utländsk inkomstskatt"
                    },
                    {
                        "id": 6998,
                        "text": "Utländsk moms"
                    },
                    {
                        "id": 6999,
                        "text": "Ingående moms, blandad verksamhet"
                    }
                ]
            }
        ]
    },
    {
        "id": 7,
        "text": "Utgifter/kostnader för personal, avskrivningar m.m.",
        "subCategories": [
            {
                "id": 70,
                "text": "Löner till kollektivanställda",
                "parentId": 0,
                "accounts": [
                    {
                        "id": 7000,
                        "text": "Löner till kollektivanställda (gruppkonto)"
                    },
                    {
                        "id": 7010,
                        "text": "Löner till kollektivanställda"
                    },
                    {
                        "id": 7011,
                        "text": "Löner till kollektivanställda"
                    },
                    {
                        "id": 7012,
                        "text": "Vinstandelar till kollektivanställda"
                    },
                    {
                        "id": 7013,
                        "text": "Löner till kollektivanställda under 26 år"
                    },
                    {
                        "id": 7014,
                        "text": "Löner till kollektivanställda (nya pensionssystemet)"
                    },
                    {
                        "id": 7015,
                        "text": "Löner till kollektivanställda (avgiftsbefriade)"
                    },
                    {
                        "id": 7016,
                        "text": "Vinstandelar till kollektivanställda (avgiftsbefriade)"
                    },
                    {
                        "id": 7017,
                        "text": "Avgångsvederlag till kollektivanställda"
                    },
                    {
                        "id": 7018,
                        "text": "Bruttolöneavdrag, kollektivanställda"
                    },
                    {
                        "id": 7019,
                        "text": "Upplupna löner och vinstandelar till kollektivanställda"
                    },
                    {
                        "id": 7030,
                        "text": "Löner till kollektivanställda (utlandsanställda)"
                    },
                    {
                        "id": 7031,
                        "text": "Löner till kollektivanställda (utlandsanställda)"
                    },
                    {
                        "id": 7032,
                        "text": "Vinstandelar till kollektivanställda (utlandsanställda)"
                    },
                    {
                        "id": 7033,
                        "text": "Löner till kollektivanställda under 26 år (utlandsanställda)"
                    },
                    {
                        "id": 7034,
                        "text": "Löner till kollektivanställda (nya pensionssystemet) (utlandsanställda)"
                    },
                    {
                        "id": 7035,
                        "text": "Löner till kollektivanställda (avgiftsbefriade) (utlandsanställda)"
                    },
                    {
                        "id": 7036,
                        "text": "Vinstandelar till kollektivanställda (avgiftsbefriade) (utlandsanställda)"
                    },
                    {
                        "id": 7037,
                        "text": "Avgångsvederlag till kollektivanställda (utlandsanställda)"
                    },
                    {
                        "id": 7038,
                        "text": "Bruttolöneavdrag, kollektivanställda (utlandsanställda)"
                    },
                    {
                        "id": 7039,
                        "text": "Upplupna löner och vinstandelar till kollektivanställda (utlandsanställda)"
                    },
                    {
                        "id": 7080,
                        "text": "Löner till kollektivanställda för ej arbetad tid"
                    },
                    {
                        "id": 7081,
                        "text": "Sjuklöner till kollektivanställda"
                    },
                    {
                        "id": 7082,
                        "text": "Semesterlöner till kollektivanställda"
                    },
                    {
                        "id": 7083,
                        "text": "Föräldraersättning till kollektivanställda"
                    },
                    {
                        "id": 7090,
                        "text": "Förändring av semesterlöneskuld"
                    }
                ]
            },
            {
                "id": 72,
                "text": "Löner till tjänstemän och företagsledare",
                "parentId": 0,
                "accounts": [
                    {
                        "id": 7200,
                        "text": "Löner till tjänstemän och företagsledare (gruppkonto)"
                    },
                    {
                        "id": 7210,
                        "text": "Löner till tjänstemän"
                    },
                    {
                        "id": 7211,
                        "text": "Löner till tjänstemän"
                    },
                    {
                        "id": 7212,
                        "text": "Vinstandelar till tjänstemän"
                    },
                    {
                        "id": 7213,
                        "text": "Löner till tjänstemän under 26 år"
                    },
                    {
                        "id": 7214,
                        "text": "Löner till tjänstemän (nya pensionssystemet)"
                    },
                    {
                        "id": 7215,
                        "text": "Löner till tjänstemän (avgiftsbefriade)"
                    },
                    {
                        "id": 7216,
                        "text": "Vinstandelar till tjänstemän (avgiftsbefriade)"
                    },
                    {
                        "id": 7217,
                        "text": "Avgångsvederlag till tjänstemän"
                    },
                    {
                        "id": 7218,
                        "text": "Bruttolöneavdrag, tjänstemän"
                    },
                    {
                        "id": 7219,
                        "text": "Upplupna löner och vinstandelar till tjänstemän"
                    },
                    {
                        "id": 7220,
                        "text": "Löner till företagsledare"
                    },
                    {
                        "id": 7221,
                        "text": "Löner till företagsledare"
                    },
                    {
                        "id": 7222,
                        "text": "Tantiem till företagsledare"
                    },
                    {
                        "id": 7223,
                        "text": "Löner till företagsledare under 26 år"
                    },
                    {
                        "id": 7224,
                        "text": "Löner till företagsledare (nya pensionssystemet)"
                    },
                    {
                        "id": 7225,
                        "text": "Löner till företagsledare (avgiftsbefriade)"
                    },
                    {
                        "id": 7227,
                        "text": "Avgångsvederlag till företagsledare"
                    },
                    {
                        "id": 7228,
                        "text": "Bruttolöneavdrag, företagsledare"
                    },
                    {
                        "id": 7229,
                        "text": "Upplupna löner och tantiem till företagsledare"
                    },
                    {
                        "id": 7230,
                        "text": "Löner till tjänstemän och ftgsledare (utlandsanställda)"
                    },
                    {
                        "id": 7231,
                        "text": "Löner till tjänstemän och ftgsledare (utlandsanställda)"
                    },
                    {
                        "id": 7232,
                        "text": "Vinstandelar till tjänstemän och ftgsledare (utlandsanställda)"
                    },
                    {
                        "id": 7233,
                        "text": "Löner till tjänstemän och ftgsledare under 26 år (utlandsanställda)"
                    },
                    {
                        "id": 7234,
                        "text": "Löner till tjänstemän och ftgsledare (utlandsanställda) (nya pensionssystemet)"
                    },
                    {
                        "id": 7235,
                        "text": "Löner till tjänstemän och ftgsledare (utlandsanställda) (avgiftsbefriade)"
                    },
                    {
                        "id": 7236,
                        "text": "Vinstandelar till tjänstemän och ftgsledare (utlandsanställda) (avgiftsbefriade)"
                    },
                    {
                        "id": 7237,
                        "text": "Avgångsvederlag till tjänstemän och ftgsledare (utlandsanställda)"
                    },
                    {
                        "id": 7238,
                        "text": "Bruttolöneavdrag, tjänstemän och ftgsledare (utlandsanställda)"
                    },
                    {
                        "id": 7239,
                        "text": "Upplupna löner och vinstandelar till tjänstemän och ftgsledare (utlandsanställda)"
                    },
                    {
                        "id": 7240,
                        "text": "Styrelsearvoden"
                    },
                    {
                        "id": 7280,
                        "text": "Löner till tjänstemän och företagsledare för ej arbetad tid"
                    },
                    {
                        "id": 7281,
                        "text": "Sjuklöner till tjänstemän"
                    },
                    {
                        "id": 7282,
                        "text": "Sjuklöner till företagsledare"
                    },
                    {
                        "id": 7283,
                        "text": "Föräldraersättning till tjänstemän"
                    },
                    {
                        "id": 7284,
                        "text": "Föräldraersättning till företagsledare"
                    },
                    {
                        "id": 7285,
                        "text": "Semesterlöner till tjänstemän"
                    },
                    {
                        "id": 7286,
                        "text": "Semesterlöner till företagsledare"
                    },
                    {
                        "id": 7288,
                        "text": "Övriga löner till tjänstemän för ej arbetad tid"
                    },
                    {
                        "id": 7289,
                        "text": "Övriga löner till företagsledare för ej arbetad tid"
                    },
                    {
                        "id": 7290,
                        "text": "Förändring av semesterlöneskuld"
                    },
                    {
                        "id": 7291,
                        "text": "Förändring av semesterlöneskuld till tjänstemän"
                    },
                    {
                        "id": 7292,
                        "text": "Förändring av semesterlöneskuld till företagsledare"
                    }
                ]
            },
            {
                "id": 73,
                "text": "Kostnadsersättningar och förmåner",
                "parentId": 0,
                "accounts": [
                    {
                        "id": 7300,
                        "text": "Kostnadsersättningar och förmåner (gruppkonto)"
                    },
                    {
                        "id": 7310,
                        "text": "Kontanta extraersättningar"
                    },
                    {
                        "id": 7311,
                        "text": "Ersättningar för sammanträden m.m."
                    },
                    {
                        "id": 7312,
                        "text": "Ersättningar för förslagsverksamhet och uppfinningar"
                    },
                    {
                        "id": 7313,
                        "text": "Ersättningar för/bidrag till bostadskostnader"
                    },
                    {
                        "id": 7314,
                        "text": "Ersättningar för/bidrag till måltidskostnader"
                    },
                    {
                        "id": 7315,
                        "text": "Ersättningar för/bidrag till resor till och från arbetsplatsen"
                    },
                    {
                        "id": 7316,
                        "text": "Ersättningar för/bidrag till arbetskläder"
                    },
                    {
                        "id": 7317,
                        "text": "Ersättningar för/bidrag till arbetsmaterial och arbetsverktyg"
                    },
                    {
                        "id": 7318,
                        "text": "Felräkningspengar"
                    },
                    {
                        "id": 7319,
                        "text": "Övriga kontanta extraersättningar"
                    },
                    {
                        "id": 7320,
                        "text": "Traktamenten vid tjänsteresa"
                    },
                    {
                        "id": 7321,
                        "text": "Skattefria traktamenten, Sverige"
                    },
                    {
                        "id": 7322,
                        "text": "Skattepliktiga traktamenten, Sverige"
                    },
                    {
                        "id": 7323,
                        "text": "Skattefria traktamenten, utlandet"
                    },
                    {
                        "id": 7324,
                        "text": "Skattepliktiga traktamenten, utlandet"
                    },
                    {
                        "id": 7330,
                        "text": "Bilersättningar"
                    },
                    {
                        "id": 7331,
                        "text": "Skattefria bilersättningar"
                    },
                    {
                        "id": 7332,
                        "text": "Skattepliktiga bilersättningar"
                    },
                    {
                        "id": 7333,
                        "text": "Ersättning för trängselskatt, skattefri"
                    },
                    {
                        "id": 7350,
                        "text": "Ersättningar för föreskrivna arbetskläder"
                    },
                    {
                        "id": 7370,
                        "text": "Representationsersättningar"
                    },
                    {
                        "id": 7380,
                        "text": "Kostnader för förmåner till anställda"
                    },
                    {
                        "id": 7381,
                        "text": "Kostnader för fri bostad"
                    },
                    {
                        "id": 7382,
                        "text": "Kostnader för fria eller subventionerade måltider"
                    },
                    {
                        "id": 7383,
                        "text": "Kostnader för fria resor till och från arbetsplatsen"
                    },
                    {
                        "id": 7384,
                        "text": "Kostnader för fria eller subventionerade arbetskläder"
                    },
                    {
                        "id": 7385,
                        "text": "Kostnader för fri bil"
                    },
                    {
                        "id": 7386,
                        "text": "Subventionerad ränta"
                    },
                    {
                        "id": 7387,
                        "text": "Kostnader för lånedatorer"
                    },
                    {
                        "id": 7388,
                        "text": "Anställdas ersättning för erhållna förmåner"
                    },
                    {
                        "id": 7389,
                        "text": "Övriga kostnader för förmåner"
                    },
                    {
                        "id": 7390,
                        "text": "Övriga kostnadsersättningar och förmåner"
                    },
                    {
                        "id": 7391,
                        "text": "Kostnad för trängselskatteförmån"
                    },
                    {
                        "id": 7392,
                        "text": "Kostnad för förmån av hushållsnära tjänster"
                    },
                    {
                        "id": 7399,
                        "text": "Motkonto skattepliktiga förmåner"
                    }
                ]
            },
            {
                "id": 74,
                "text": "Pensionskostnader",
                "parentId": 0,
                "accounts": [
                    {
                        "id": 7400,
                        "text": "Pensionskostnader (gruppkonto)"
                    },
                    {
                        "id": 7410,
                        "text": "Pensionsförsäkringspremier"
                    },
                    {
                        "id": 7411,
                        "text": "Premier för kollektiva pensionsförsäkringar"
                    },
                    {
                        "id": 7412,
                        "text": "Premier för individuella pensionsförsäkringar"
                    },
                    {
                        "id": 7418,
                        "text": "Återbäring från försäkringsföretag"
                    },
                    {
                        "id": 7420,
                        "text": "Förändring av pensionsskuld"
                    },
                    {
                        "id": 7421,
                        "text": "Direktpension, ej avdragsgill"
                    },
                    {
                        "id": 7430,
                        "text": "Avdrag för räntedel i pensionskostnad"
                    },
                    {
                        "id": 7440,
                        "text": "Förändring av pensionsstiftelsekapital"
                    },
                    {
                        "id": 7441,
                        "text": "Avsättning till pensionsstiftelse"
                    },
                    {
                        "id": 7448,
                        "text": "Gottgörelse från pensionsstiftelse"
                    },
                    {
                        "id": 7460,
                        "text": "Pensionsutbetalningar"
                    },
                    {
                        "id": 7461,
                        "text": "Pensionsutbetalningar till f.d. kollektivanställda"
                    },
                    {
                        "id": 7462,
                        "text": "Pensionsutbetalningar till f.d. tjänstemän"
                    },
                    {
                        "id": 7463,
                        "text": "Pensionsutbetalningar till f.d. företagsledare"
                    },
                    {
                        "id": 7470,
                        "text": "Förvaltnings- och kreditförsäkringsavgifter"
                    },
                    {
                        "id": 7490,
                        "text": "Övriga pensionskostnader"
                    }
                ]
            },
            {
                "id": 75,
                "text": "Sociala och andra avgifter enligt lag och avtal",
                "parentId": 0,
                "accounts": [
                    {
                        "id": 7500,
                        "text": "Sociala och andra avgifter enligt lag och avtal (gruppkonto)"
                    },
                    {
                        "id": 7510,
                        "text": "Lagstadgade sociala avgifter"
                    },
                    {
                        "id": 7511,
                        "text": "Sociala avgifter för löner och ersättningar"
                    },
                    {
                        "id": 7512,
                        "text": "Sociala avgifter för förmånsvärden"
                    },
                    {
                        "id": 7515,
                        "text": "Sociala avgifter på skattepliktiga kostnadsersättningar"
                    },
                    {
                        "id": 7516,
                        "text": "Sociala avgifter på arvoden"
                    },
                    {
                        "id": 7518,
                        "text": "Sociala avgifter på bruttolöneavdrag m.m."
                    },
                    {
                        "id": 7519,
                        "text": "Sociala avgifter för semester- och löneskulder"
                    },
                    {
                        "id": 7520,
                        "text": "Arbetsgivaravgifter (nya pensionssystemet)"
                    },
                    {
                        "id": 7521,
                        "text": "Arbetsgivaravgifter för löner och ersättningar (nya pensionssystemet)"
                    },
                    {
                        "id": 7522,
                        "text": "Arbetsgivaravgifter för förmånsvärden (nya pensionssystemet)"
                    },
                    {
                        "id": 7525,
                        "text": "Arbetsgivaravgifter på skattepliktiga kostnadsersättningar (nya pensionssystemet)"
                    },
                    {
                        "id": 7526,
                        "text": "Arbetsgivaravgifter på arvoden (nya pensionssystemet)"
                    },
                    {
                        "id": 7528,
                        "text": "Arbetsgivaravgifter på bruttolöneavdrag m.m. (nya pensionssystemet)"
                    },
                    {
                        "id": 7529,
                        "text": "Arbetsgivaravgifter för semester- och löneskulder (nya pensionssystemet)"
                    },
                    {
                        "id": 7530,
                        "text": "Särskild löneskatt"
                    },
                    {
                        "id": 7531,
                        "text": "Särskild löneskatt för vissa försäkringsersättningar m.m."
                    },
                    {
                        "id": 7532,
                        "text": "Särskild löneskatt pensionskostnader, deklarationspost"
                    },
                    {
                        "id": 7533,
                        "text": "Särskild löneskatt för pensionskostnader"
                    },
                    {
                        "id": 7550,
                        "text": "Avkastningsskatt på pensionsmedel"
                    },
                    {
                        "id": 7560,
                        "text": "Arbetsgivaravgifter under 26 år"
                    },
                    {
                        "id": 7570,
                        "text": "Premier för arbetsmarknadsförsäkringar"
                    },
                    {
                        "id": 7571,
                        "text": "Arbetsmarknadsförsäkringar"
                    },
                    {
                        "id": 7572,
                        "text": "Arbetsmarknadsförsäkringar pensionsförsäkringspremier, deklarationspost"
                    },
                    {
                        "id": 7580,
                        "text": "Gruppförsäkringspremier"
                    },
                    {
                        "id": 7581,
                        "text": "Grupplivförsäkringspremier"
                    },
                    {
                        "id": 7582,
                        "text": "Gruppsjukförsäkringspremier"
                    },
                    {
                        "id": 7583,
                        "text": "Gruppolycksfallsförsäkringspremier"
                    },
                    {
                        "id": 7589,
                        "text": "Övriga gruppförsäkringspremier"
                    },
                    {
                        "id": 7590,
                        "text": "Övriga sociala och andra avgifter enligt lag och avtal"
                    }
                ]
            },
            {
                "id": 76,
                "text": "Övriga personalkostnader",
                "parentId": 0,
                "accounts": [
                    {
                        "id": 7600,
                        "text": "Övriga personalkostnader (gruppkonto)"
                    },
                    {
                        "id": 7610,
                        "text": "Utbildning"
                    },
                    {
                        "id": 7620,
                        "text": "Sjuk- och hälsovård"
                    },
                    {
                        "id": 7621,
                        "text": "Sjuk- och hälsovård, avdragsgill"
                    },
                    {
                        "id": 7622,
                        "text": "Sjuk- och hälsovård, ej avdragsgill"
                    },
                    {
                        "id": 7623,
                        "text": "Sjukvårdsförsäkring, ej avdragsgill"
                    },
                    {
                        "id": 7630,
                        "text": "Personalrepresentation"
                    },
                    {
                        "id": 7631,
                        "text": "Personalrepresentation, avdragsgill"
                    },
                    {
                        "id": 7632,
                        "text": "Personalrepresentation, ej avdragsgill"
                    },
                    {
                        "id": 7650,
                        "text": "Sjuklöneförsäkring"
                    },
                    {
                        "id": 7670,
                        "text": "Förändring av personalstiftelsekapital"
                    },
                    {
                        "id": 7671,
                        "text": "Avsättning till personalstiftelse"
                    },
                    {
                        "id": 7678,
                        "text": "Gottgörelse från personalstiftelse"
                    },
                    {
                        "id": 7690,
                        "text": "Övriga personalkostnader"
                    },
                    {
                        "id": 7691,
                        "text": "Personalrekrytering"
                    },
                    {
                        "id": 7692,
                        "text": "Begravningshjälp"
                    },
                    {
                        "id": 7693,
                        "text": "Fritidsverksamhet"
                    },
                    {
                        "id": 7699,
                        "text": "Övriga personalkostnader"
                    }
                ]
            },
            {
                "id": 77,
                "text": "Nedskrivningar och återföring av nedskrivningar",
                "parentId": 0,
                "accounts": [
                    {
                        "id": 7710,
                        "text": "Nedskrivningar av immateriella anläggningstillgångar"
                    },
                    {
                        "id": 7720,
                        "text": "Nedskrivningar av byggnader och mark"
                    },
                    {
                        "id": 7730,
                        "text": "Nedskrivningar av maskiner och inventarier"
                    },
                    {
                        "id": 7740,
                        "text": "Nedskrivningar av vissa omsättningstillgångar"
                    },
                    {
                        "id": 7760,
                        "text": "Återföring av nedskrivningar av immateriella anläggningstillgångar"
                    },
                    {
                        "id": 7770,
                        "text": "Återföring av nedskrivningar av byggnader och mark"
                    },
                    {
                        "id": 7780,
                        "text": "Återföring av nedskrivningar av maskiner och inventarier"
                    },
                    {
                        "id": 7790,
                        "text": "Återföring av nedskrivningar av vissa omsättningstillgångar"
                    }
                ]
            },
            {
                "id": 78,
                "text": "Avskrivningar enligt plan",
                "parentId": 0,
                "accounts": [
                    {
                        "id": 7810,
                        "text": "Avskrivningar på immateriella anläggningstillgångar"
                    },
                    {
                        "id": 7811,
                        "text": "Avskrivningar på balanserade utgifter"
                    },
                    {
                        "id": 7812,
                        "text": "Avskrivningar på koncessioner m.m."
                    },
                    {
                        "id": 7813,
                        "text": "Avskrivningar på patent"
                    },
                    {
                        "id": 7814,
                        "text": "Avskrivningar på licenser"
                    },
                    {
                        "id": 7815,
                        "text": "Avskrivningar på varumärken"
                    },
                    {
                        "id": 7816,
                        "text": "Avskrivningar på hyresrätter"
                    },
                    {
                        "id": 7817,
                        "text": "Avskrivningar på goodwill"
                    },
                    {
                        "id": 7819,
                        "text": "Avskrivningar på övriga immateriella anläggningstillgångar"
                    },
                    {
                        "id": 7820,
                        "text": "Avskrivningar på byggnader och markanläggningar"
                    },
                    {
                        "id": 7821,
                        "text": "Avskrivningar på byggnader"
                    },
                    {
                        "id": 7824,
                        "text": "Avskrivningar på markanläggningar"
                    },
                    {
                        "id": 7829,
                        "text": "Avskrivningar på övriga byggnader"
                    },
                    {
                        "id": 7830,
                        "text": "Avskrivningar på maskiner och inventarier"
                    },
                    {
                        "id": 7831,
                        "text": "Avskrivningar på maskiner och andra tekniska anläggningar"
                    },
                    {
                        "id": 7832,
                        "text": "Avskrivningar på inventarier och verktyg"
                    },
                    {
                        "id": 7833,
                        "text": "Avskrivningar på installationer"
                    },
                    {
                        "id": 7834,
                        "text": "Avskrivningar på bilar och andra transportmedel"
                    },
                    {
                        "id": 7835,
                        "text": "Avskrivningar på datorer"
                    },
                    {
                        "id": 7836,
                        "text": "Avskrivningar på leasade tillgångar"
                    },
                    {
                        "id": 7839,
                        "text": "Avskrivningar på övriga maskiner och inventarier"
                    },
                    {
                        "id": 7840,
                        "text": "Avskrivningar på förbättringsutgifter på annans fastighet"
                    }
                ]
            },
            {
                "id": 79,
                "text": "Övriga rörelsekostnader",
                "parentId": 0,
                "accounts": [
                    {
                        "id": 7940,
                        "text": "Orealiserade positiva/negativa värdeförändringar på säkringsinstrument"
                    },
                    {
                        "id": 7960,
                        "text": "Valutakursförluster på fordringar och skulder av rörelsekaraktär"
                    },
                    {
                        "id": 7970,
                        "text": "Förlust vid avyttring av immateriella och materiella anläggningstillgångar"
                    },
                    {
                        "id": 7971,
                        "text": "Förlust vid avyttring av immateriella anläggningstillgångar"
                    },
                    {
                        "id": 7972,
                        "text": "Förlust vid avyttring av byggnader och mark"
                    },
                    {
                        "id": 7973,
                        "text": "Förlust vid avyttring av maskiner och inventarier"
                    },
                    {
                        "id": 7990,
                        "text": "Övriga rörelsekostnader"
                    }
                ]
            }
        ]
    },
    {
        "id": 8,
        "text": "Finansiella och andra inkomster/ intäkter och utgifter/kostnader",
        "subCategories": [
            {
                "id": 80,
                "text": "Resultat från andelar i koncernföretag",
                "parentId": 0,
                "accounts": [
                    {
                        "id": 8010,
                        "text": "Utdelning på andelar i koncernföretag"
                    },
                    {
                        "id": 8012,
                        "text": "Utdelning på andelar i dotterföretag"
                    },
                    {
                        "id": 8013,
                        "text": "Utdelning på andelar i andra koncernföretag"
                    },
                    {
                        "id": 8014,
                        "text": "Koncernbidrag"
                    },
                    {
                        "id": 8016,
                        "text": "Insatsemission, koncernföretag"
                    },
                    {
                        "id": 8019,
                        "text": "Övriga utdelningar på andelar i koncernföretag"
                    },
                    {
                        "id": 8020,
                        "text": "Resultat vid försäljning av andelar i koncernföretag"
                    },
                    {
                        "id": 8022,
                        "text": "Resultat vid försäljning av andelar i dotterföretag"
                    },
                    {
                        "id": 8023,
                        "text": "Resultat vid försäljning av andelar i andra koncernföretag"
                    },
                    {
                        "id": 8030,
                        "text": "Resultatandelar från handelsbolag (dotterföretag)"
                    },
                    {
                        "id": 8070,
                        "text": "Nedskrivningar av andelar i och långfristiga fordringar hos koncernföretag"
                    },
                    {
                        "id": 8072,
                        "text": "Nedskrivningar av andelar i dotterföretag"
                    },
                    {
                        "id": 8073,
                        "text": "Nedskrivningar av andelar i andra koncernföretag"
                    },
                    {
                        "id": 8076,
                        "text": "Nedskrivningar av långfristiga fordringar hos moderföretag"
                    },
                    {
                        "id": 8077,
                        "text": "Nedskrivningar av långfristiga fordringar hos dotterföretag"
                    },
                    {
                        "id": 8078,
                        "text": "Nedskrivningar av långfristiga fordringar hos andra koncernföretag"
                    },
                    {
                        "id": 8080,
                        "text": "Återföringar av nedskrivningar av andelar i och långfristiga fordringar hos koncernföretag"
                    },
                    {
                        "id": 8082,
                        "text": "Återföringar av nedskrivningar av andelar i dotterföretag"
                    },
                    {
                        "id": 8083,
                        "text": "Återföringar av nedskrivningar av andelar i andra koncernföretag"
                    },
                    {
                        "id": 8086,
                        "text": "Återföringar av nedskrivningar av långfristiga fordringar hos moderföretag"
                    },
                    {
                        "id": 8087,
                        "text": "Återföringar av nedskrivningar av långfristiga fordringar hos dotterföretag"
                    },
                    {
                        "id": 8088,
                        "text": "Återföringar av nedskrivningar av långfristiga fordringar hos andra koncernföretag"
                    }
                ]
            },
            {
                "id": 81,
                "text": "Resultat från andelar i intresseföretag",
                "parentId": 0,
                "accounts": [
                    {
                        "id": 8110,
                        "text": "Utdelning på andelar i intresseföretag"
                    },
                    {
                        "id": 8112,
                        "text": "Utdelningar från intresseföretag"
                    },
                    {
                        "id": 8116,
                        "text": "Insatsemission, intresseföretag"
                    },
                    {
                        "id": 8120,
                        "text": "Resultat vid försäljning av andelar i intresseföretag"
                    },
                    {
                        "id": 8130,
                        "text": "Resultatandelar från handelsbolag (intresseföretag)"
                    },
                    {
                        "id": 8170,
                        "text": "Nedskrivningar av andelar i och långfristiga fordringar hos intresseföretag"
                    },
                    {
                        "id": 8171,
                        "text": "Nedskrivningar av andelar i intresseföretag"
                    },
                    {
                        "id": 8172,
                        "text": "Nedskrivningar av långfristiga fordringar hos intresseföretag"
                    },
                    {
                        "id": 8180,
                        "text": "Återföringar av nedskrivningar av andelar i och långfristiga fordringar hos intresseföretag"
                    },
                    {
                        "id": 8181,
                        "text": "Återföringar av nedskrivningar av andelar i intresseföretag"
                    },
                    {
                        "id": 8182,
                        "text": "Återföringar av nedskrivningar av långfristiga fordringar hos intresseföretag"
                    }
                ]
            },
            {
                "id": 82,
                "text": "Resultat från övriga värdepapper och långfristiga fordringar (anläggningstillgångar)",
                "parentId": 0,
                "accounts": [
                    {
                        "id": 8210,
                        "text": "Utdelningar på andelar i andra företag"
                    },
                    {
                        "id": 8212,
                        "text": "Utdelningar, övriga företag"
                    },
                    {
                        "id": 8216,
                        "text": "Insatsemissioner, övriga företag"
                    },
                    {
                        "id": 8220,
                        "text": "Resultat vid försäljning av värdepapper i och långfristiga fordringar hos andra företag"
                    },
                    {
                        "id": 8221,
                        "text": "Resultat vid försäljning av andelar i andra företag"
                    },
                    {
                        "id": 8222,
                        "text": "Resultat vid försäljning av långfristiga fordringar hos andra företag"
                    },
                    {
                        "id": 8223,
                        "text": "Resultat vid försäljning av derivat (långfristiga värdepappersinnehav)"
                    },
                    {
                        "id": 8228,
                        "text": "Värdeförändring kapitalförsäkring, skattemässig justering"
                    },
                    {
                        "id": 8230,
                        "text": "Valutakursdifferenser på långfristiga fordringar"
                    },
                    {
                        "id": 8231,
                        "text": "Valutakursvinster på långfristiga fordringar"
                    },
                    {
                        "id": 8236,
                        "text": "Valutakursförluster på långfristiga fordringar"
                    },
                    {
                        "id": 8240,
                        "text": "Resultatandelar från handelsbolag (andra företag)"
                    },
                    {
                        "id": 8250,
                        "text": "Ränteintäkter från långfristiga fordringar hos och värdepapper i andra företag"
                    },
                    {
                        "id": 8251,
                        "text": "Ränteintäkter från långfristiga fordringar"
                    },
                    {
                        "id": 8252,
                        "text": "Ränteintäkter från övriga värdepapper"
                    },
                    {
                        "id": 8254,
                        "text": "Skattefria ränteintäkter, långfristiga tillgångar"
                    },
                    {
                        "id": 8260,
                        "text": "Ränteintäkter från långfristiga fordringar hos koncernföretag"
                    },
                    {
                        "id": 8261,
                        "text": "Ränteintäkter från långfristiga fordringar hos moderföretag"
                    },
                    {
                        "id": 8262,
                        "text": "Ränteintäkter från långfristiga fordringar hos dotterföretag"
                    },
                    {
                        "id": 8263,
                        "text": "Ränteintäkter från långfristiga fordringar hos andra koncernföretag"
                    },
                    {
                        "id": 8270,
                        "text": "Nedskrivningar av innehav av andelar i och långfristiga fordringar hos andra företag"
                    },
                    {
                        "id": 8271,
                        "text": "Nedskrivningar av andelar i andra företag"
                    },
                    {
                        "id": 8272,
                        "text": "Nedskrivningar av långfristiga fordringar hos andra företag"
                    },
                    {
                        "id": 8273,
                        "text": "Nedskrivningar av övriga värdepapper hos andra företag"
                    },
                    {
                        "id": 8280,
                        "text": "Återföringar av nedskrivningar av andelar i och långfristiga fordringar hos andra företag"
                    },
                    {
                        "id": 8281,
                        "text": "Återföringar av nedskrivningar av andelar i andra företag"
                    },
                    {
                        "id": 8282,
                        "text": "Återföringar av nedskrivningar av långfristiga fordringar hos andra företag"
                    },
                    {
                        "id": 8283,
                        "text": "Återföringar av nedskrivningar av övriga värdepapper i andra företag"
                    },
                    {
                        "id": 8290,
                        "text": "Värdering till verkligt värde, anläggningstillgångar"
                    },
                    {
                        "id": 8291,
                        "text": "Orealiserade värdeförändringar på anläggningstillgångar"
                    },
                    {
                        "id": 8295,
                        "text": "Orealiserade värdeförändringar på derivatinstrument"
                    }
                ]
            },
            {
                "id": 83,
                "text": "Övriga ränteintäkter och liknande resultatposter",
                "parentId": 0,
                "accounts": [
                    {
                        "id": 8310,
                        "text": "Ränteintäkter från omsättningstillgångar"
                    },
                    {
                        "id": 8311,
                        "text": "Ränteintäkter från bank"
                    },
                    {
                        "id": 8312,
                        "text": "Ränteintäkter från kortfristiga placeringar"
                    },
                    {
                        "id": 8313,
                        "text": "Ränteintäkter från kortfristiga fordringar"
                    },
                    {
                        "id": 8314,
                        "text": "Skattefria ränteintäkter"
                    },
                    {
                        "id": 8317,
                        "text": "Ränteintäkter för dold räntekompensation"
                    },
                    {
                        "id": 8319,
                        "text": "Övriga ränteintäkter från omsättningstillgångar"
                    },
                    {
                        "id": 8320,
                        "text": "Värdering till verkligt värde, omsättningstillgångar"
                    },
                    {
                        "id": 8321,
                        "text": "Orealiserade värdeförändringar på omsättningstillgångar"
                    },
                    {
                        "id": 8325,
                        "text": "Orealiserade värdeförändringar på derivatinstrument (oms.-tillg.)"
                    },
                    {
                        "id": 8330,
                        "text": "Valutakursdifferenser på kortfristiga fordringar och placeringar"
                    },
                    {
                        "id": 8331,
                        "text": "Valutakursvinster på kortfristiga fordringar och placeringar"
                    },
                    {
                        "id": 8336,
                        "text": "Valutakursförluster på kortfristiga fordringar och placeringar"
                    },
                    {
                        "id": 8340,
                        "text": "Utdelningar på kortfristiga placeringar"
                    },
                    {
                        "id": 8350,
                        "text": "Resultat vid försäljning av kortfristiga placeringar"
                    },
                    {
                        "id": 8360,
                        "text": "Övriga ränteintäkter från koncernföretag"
                    },
                    {
                        "id": 8361,
                        "text": "Övriga ränteintäkter från moderföretag"
                    },
                    {
                        "id": 8362,
                        "text": "Övriga ränteintäkter från dotterföretag"
                    },
                    {
                        "id": 8363,
                        "text": "Övriga ränteintäkter från andra koncernföretag"
                    },
                    {
                        "id": 8370,
                        "text": "Nedskrivningar av kortfristiga placeringar"
                    },
                    {
                        "id": 8380,
                        "text": "Återföringar av nedskrivningar av kortfristiga placeringar"
                    },
                    {
                        "id": 8390,
                        "text": "Övriga finansiella intäkter"
                    },
                    {
                        "id": 8398,
                        "text": "Värdeförändring kortfristig placering, skattemässig justering"
                    }
                ]
            },
            {
                "id": 84,
                "text": "Räntekostnader och liknande resultatposter",
                "parentId": 0,
                "accounts": [
                    {
                        "id": 8400,
                        "text": "Räntekostnader (gruppkonto)"
                    },
                    {
                        "id": 8410,
                        "text": "Räntekostnader för långfristiga skulder"
                    },
                    {
                        "id": 8411,
                        "text": "Räntekostnader för obligations-, förlags- och konvertibla lån"
                    },
                    {
                        "id": 8412,
                        "text": "Räntedel i årets pensionskostnad"
                    },
                    {
                        "id": 8413,
                        "text": "Räntekostnader för checkräkningskredit"
                    },
                    {
                        "id": 8414,
                        "text": "Räntekostnader för byggnadskreditiv"
                    },
                    {
                        "id": 8415,
                        "text": "Räntekostnader för andra skulder till kreditinstitut"
                    },
                    {
                        "id": 8417,
                        "text": "Räntekostnader för dold räntekompensation m.m."
                    },
                    {
                        "id": 8418,
                        "text": "Avdragspost för räntesubventioner"
                    },
                    {
                        "id": 8419,
                        "text": "Övriga räntekostnader för långfristiga skulder"
                    },
                    {
                        "id": 8420,
                        "text": "Räntekostnader för kortfristiga skulder"
                    },
                    {
                        "id": 8421,
                        "text": "Räntekostnader till kreditinstitut"
                    },
                    {
                        "id": 8422,
                        "text": "Dröjsmålsräntor för leverantörsskulder"
                    },
                    {
                        "id": 8423,
                        "text": "Räntekostnader för skatter och avgifter"
                    },
                    {
                        "id": 8429,
                        "text": "Övriga räntekostnader för kortfristiga skulder"
                    },
                    {
                        "id": 8430,
                        "text": "Valutakursdifferenser på skulder"
                    },
                    {
                        "id": 8431,
                        "text": "Valutakursvinster på skulder"
                    },
                    {
                        "id": 8436,
                        "text": "Valutakursförluster på skulder"
                    },
                    {
                        "id": 8440,
                        "text": "Erhållna räntebidrag"
                    },
                    {
                        "id": 8450,
                        "text": "Orealiserade värdeförändringar på skulder"
                    },
                    {
                        "id": 8451,
                        "text": "Orealiserade värdeförändringar på skulder"
                    },
                    {
                        "id": 8455,
                        "text": "Orealiserade värdeförändringar på säkringsinstrument"
                    },
                    {
                        "id": 8460,
                        "text": "Räntekostnader till koncernföretag"
                    },
                    {
                        "id": 8461,
                        "text": "Räntekostnader till moderföretag"
                    },
                    {
                        "id": 8462,
                        "text": "Räntekostnader till dotterföretag"
                    },
                    {
                        "id": 8463,
                        "text": "Räntekostnader till andra koncernföretag"
                    },
                    {
                        "id": 8480,
                        "text": "Aktiverade ränteutgifter"
                    },
                    {
                        "id": 8490,
                        "text": "Övriga skuldrelaterade poster"
                    },
                    {
                        "id": 8491,
                        "text": "Erhållet ackord på skulder till kreditinstitut m.m."
                    }
                ]
            },
            {
                "id": 87,
                "text": "Extraordinära intäkter och kostnader",
                "parentId": 0,
                "accounts": [
                    {
                        "id": 8710,
                        "text": "Extraordinära intäkter"
                    },
                    {
                        "id": 8750,
                        "text": "Extraordinära kostnader"
                    }
                ]
            },
            {
                "id": 88,
                "text": "Bokslutsdispositioner",
                "parentId": 0,
                "accounts": [
                    {
                        "id": 8810,
                        "text": "Förändring av periodiseringsfond"
                    },
                    {
                        "id": 8811,
                        "text": "Avsättning till periodiseringsfond"
                    },
                    {
                        "id": 8819,
                        "text": "Återföring från periodiseringsfond"
                    },
                    {
                        "id": 8820,
                        "text": "Mottagna koncernbidrag"
                    },
                    {
                        "id": 8830,
                        "text": "Lämnade koncernbidrag"
                    },
                    {
                        "id": 8840,
                        "text": "Lämnade gottgörelser"
                    },
                    {
                        "id": 8850,
                        "text": "Förändring av överavskrivningar"
                    },
                    {
                        "id": 8851,
                        "text": "Förändring av överavskrivningar, immateriella anläggningstillgångar"
                    },
                    {
                        "id": 8852,
                        "text": "Förändring av överavskrivningar, byggnader och markanläggningar"
                    },
                    {
                        "id": 8853,
                        "text": "Förändring av överavskrivningar, maskiner och inventarier"
                    },
                    {
                        "id": 8860,
                        "text": "Förändring av ersättningsfond"
                    },
                    {
                        "id": 8861,
                        "text": "Avsättning till ersättningsfond för inventarier"
                    },
                    {
                        "id": 8862,
                        "text": "Avsättning till ersättningsfond för byggnader och markanläggningar"
                    },
                    {
                        "id": 8863,
                        "text": "Avsättning till ersättningsfond för mark"
                    },
                    {
                        "id": 8864,
                        "text": "Avsättning till ersättningsfond för djurlager i jordbruk och renskötsel"
                    },
                    {
                        "id": 8865,
                        "text": "Ianspråktagande av ersättningsfond för avskrivningar"
                    },
                    {
                        "id": 8866,
                        "text": "Ianspråktagande av ersättningsfond för annat än avskrivningar"
                    },
                    {
                        "id": 8869,
                        "text": "Återföring från ersättningsfond"
                    },
                    {
                        "id": 8880,
                        "text": "Förändring av obeskattade intäkter"
                    },
                    {
                        "id": 8881,
                        "text": "Avsättning till upphovsmannakonto"
                    },
                    {
                        "id": 8882,
                        "text": "Återföring från upphovsmannakonto"
                    },
                    {
                        "id": 8885,
                        "text": "Avsättning till skogskonto"
                    },
                    {
                        "id": 8886,
                        "text": "Återföring från skogskonto"
                    },
                    {
                        "id": 8890,
                        "text": "Övriga bokslutsdispositioner"
                    },
                    {
                        "id": 8891,
                        "text": "Förändring av skillnad mellan bokförd och faktisk pensionsskuld"
                    },
                    {
                        "id": 8892,
                        "text": "Nedskrivningar av konsolideringskaraktär av anläggningstillgångar"
                    },
                    {
                        "id": 8896,
                        "text": "Förändring av lagerreserv"
                    },
                    {
                        "id": 8899,
                        "text": "Övriga bokslutsdispositioner"
                    }
                ]
            },
            {
                "id": 89,
                "text": "Skatter och årets resultat",
                "parentId": 0,
                "accounts": [
                    {
                        "id": 8910,
                        "text": "Skatt som belastar årets resultat"
                    },
                    {
                        "id": 8920,
                        "text": "Skatt på grund av ändrad beskattning"
                    },
                    {
                        "id": 8930,
                        "text": "Restituerad skatt"
                    },
                    {
                        "id": 8940,
                        "text": "Uppskjuten skatt"
                    },
                    {
                        "id": 8980,
                        "text": "Övriga skatter"
                    },
                    {
                        "id": 8990,
                        "text": "Resultat"
                    },
                    {
                        "id": 8999,
                        "text": "Årets resultat"
                    }
                ]
            }
        ]
    }

]

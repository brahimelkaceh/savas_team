// const batiments = [
//   {
//     id: 1,
//     batiment: "B1",
//   },
//   {
//     id: 2,
//     batiment: "B2",
//   },
//   {
//     id: 3,
//     batiment: "B3",
//   },
//   {
//     id: 4,
//     batiment: "B4",
//   },
//   {
//     id: 5,
//     batiment: "B5",
//   },
//   {
//     id: 6,
//     batiment: "B6",
//   },
// ];
const batiments = [
  {
    name: "SIDI HMIDA",
    production: [
      {
        id: 1,
        name: "B2",
        typeOf: "production",
        full: false,
        eleveur: 1,
        site: 1,
        nextDate: "2022-07-02",
        lot: [
          {
            id: 1,
            hebdoFill: false,
            archived: false,
            code: "LotCodeBAT1",
            effectifDP: 120000,
            birthDate: "2022-07-01",
            transferDate: "2023-03-01",
            reformStarted: false,
            batiment: 1,
            souche: 1,
          },
        ],
      },
      {
        id: 2,
        name: "B3",
        typeOf: "production",
        full: false,
        eleveur: 1,
        site: 1,
        nextWeek: "42",
        lot: [
          {
            id: 2,
            hebdoFill: true,
            archived: false,
            code: "LotCodeBAT2",
            effectifDP: 100000,
            birthDate: "2022-06-01",
            transferDate: "2023-03-01",
            reformStarted: false,
            batiment: 2,
            souche: 1,
          },
        ],
      },
    ],
    poussiniere: [],
  },
  {
    name: "kamoni",
    production: [
      {
        id: 1,
        name: "B2",
        typeOf: "production",
        full: false,
        eleveur: 1,
        site: 1,
        nextDate: "2022-07-02",
        lot: [
          {
            id: 1,
            hebdoFill: false,
            archived: false,
            code: "LotCodeBAT1",
            effectifDP: 120000,
            birthDate: "2022-07-01",
            transferDate: "2023-03-01",
            reformStarted: false,
            batiment: 1,
            souche: 1,
          },
        ],
      },
      {
        id: 2,
        name: "B3",
        typeOf: "production",
        full: false,
        eleveur: 1,
        site: 1,
        nextWeek: "42",
        lot: [
          {
            id: 2,
            hebdoFill: true,
            archived: false,
            code: "LotCodeBAT2",
            effectifDP: 100000,
            birthDate: "2022-06-01",
            transferDate: "2023-03-01",
            reformStarted: false,
            batiment: 2,
            souche: 1,
          },
        ],
      },
    ],
    poussiniere: [],
  },
];
export default batiments;

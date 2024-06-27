export const tableHeaders = [
  {
    parent: " ",
    class: "",
    children: [{ key: "isWeek", title: " " }],
  },
  {
    parent: "Calendrier",
    class: "calendrie",
    children: [
      { key: "semCivil", title: "Semaine Civile" },
      { key: "date", title: "Date" },
      { key: "age", title: "Age(sem)" },
      { key: "age_j", title: "Age(jour)" },
    ],
  },
  {
    parent: "Ambiance",
    class: "ambiance",
    children: [
      { key: "lumiere", title: "Lumiére" },
      { key: "humidity", title: "Humidité" },
      { key: "flash", title: "Flash" },
      { key: "intensite", title: "intensité" },
      { key: "temperature", title: "Temp °C" },
    ],
  },
  {
    parent: "Viabilité",
    class: "viability",
    children: [
      {
        key: "effectif",
        title: "Effectif présent",
      },
      {
        key: "homog",
        title: "Homogénéité",
      },
      {
        key: "poid_vif",
        title: "P.corporel (g)",
      },
      {
        key: "viabilite",
        title: "Viabilité(%)",
      },
      {
        key: "mort_sem",
        title: "Mort /j",
      },
      {
        key: "mort_cuml",
        title: "Mort /sem",
      },
    ],
  },
  {
    parent: "Consommation",
    class: "consommation",
    children: [
      { key: "eau_dist", title: "Eau (m³)" },
      { key: "alt_dist", title: "Aliment (t)" },
      { key: "eps", title: "EPS(ml)" },
      { key: "aps", title: "APS(g)" },
      { key: "alt_cuml", title: "∑ APS(kg)" },
      { key: "ratio", title: "Ratio E/A" },
    ],
  },
  {
    parent: "Indice de conversion",
    class: "ic-header",
    children: [{ key: "ic", title: "IC" }],
  },
  {
    parent: "Prophylaxie",
    class: "prohylaxie-header",
    children: [
      { key: "proph_intervention", title: "Intervention" },
      { key: "proph_mode_admin", title: "Mode d'administration" },
      { key: "proph_dose", title: "Dose" },
      { key: "proph_nbr_flacons", title: "Nombre flacons" },
      { key: "proph_eff_vaccine", title: "Effectif vacciné" },
      { key: "proph_moy_flacon", title: "Moyen / flacon" },
      { key: "proph_nbr_equipe", title: "Nbr Équipe" },
      { key: "proph_equipe", title: "Équipe" },
    ],
  },
  {
    parent: "Observation",
    class: "observ-header",
    children: [{ key: "observ", title: "--" }],
  },
];

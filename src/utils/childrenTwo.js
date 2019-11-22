export default {
  name: "CEO",
  employees: [
    {
      name: "boss1",
      colname: "level2",
      employees: [
        { name: "mister_a", group: "A", valueX: 28, colname: "level3" },
        { name: "mister_b", group: "A", valueX: 19, colname: "level3" },
        { name: "mister_c", group: "C", valueX: 18, colname: "level3" },
        { name: "mister_d", group: "C", valueX: 19, colname: "level3" }
      ],
    },
    {
      name: "boss2",
      colname: "level2",
      employees: [
        { name: "mister_e", group: "C", valueX: 14, colname: "level3" },
        { name: "mister_f", group: "A", valueX: 11, colname: "level3" },
        { name: "mister_g", group: "B", valueX: 15, colname: "level3" },
        { name: "mister_h", group: "B", valueX: 16, colname: "level3" }
      ],
    },
    {
      name: "boss3",
      colname: "level2",
      employees: [
        { name: "mister_i", group: "B", valueX: 10, colname: "level3" },
        { name: "mister_j", group: "A", valueX: 13, colname: "level3" },
        { name: "mister_k", group: "A", valueX: 13, colname: "level3" },
        { name: "mister_l", group: "D", valueX: 25, colname: "level3" },
        { name: "mister_m", group: "D", valueX: 16, colname: "level3" },
        { name: "mister_n", group: "D", valueX: 28, colname: "level3" }
      ],
    },
  ],
};

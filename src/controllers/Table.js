import Row from "./Row";

class Table {
  constructor() {}

  print(employees) {
    const table = document.querySelector('.table-hover');
    const row = new Row();

    while (table.firstChild) {
      table.removeChild(table.firstChild);
    }

    employees.reverse().forEach((employee) => {
      const row$ = document.createElement('tr');
      row.print(row$, employee);
      row.onClick(row$);
      table.appendChild(row$);
    });
  }
}

export default Table;

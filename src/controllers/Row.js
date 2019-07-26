import {EMPLOYEE_ID_ATTR} from "../config/constants";
import ApiClient from "../services/api/ApiClient";

class Row {
  constructor() {}

  print(row, employee) {
    for (const attribute in employee) {
      if (employee.hasOwnProperty(attribute)) {
        const cell = document.createElement('td');
        cell.classList.add('text-center');
        cell.innerText = employee[attribute];

        if (attribute === EMPLOYEE_ID_ATTR) {
          cell.setAttribute('data-id', employee[attribute]);
        }

        row.appendChild(cell);
      }
    }
  }

  onClick(row) {
    row.addEventListener('click', () => {
      const idCell = row.querySelector('[data-id]');
      const id = idCell.getAttribute('data-id');
      ApiClient.instance.getEmployee(id);
    });
  }
}

export default Row;

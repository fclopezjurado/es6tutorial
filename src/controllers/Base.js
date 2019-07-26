import Table from "./Table";
import ApiClient from "../services/api/ApiClient";

class Base {
  constructor() {
    this.table = new Table();
    ApiClient.instance.getEmployees(this.table.print.bind(this));
  }
}

export default Base;

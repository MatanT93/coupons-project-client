import axios from "axios";
import { Company } from "../Models/Company";
import { Customer } from "../Models/Customer";

class AdminService {
    async getAllCompanies() {
        return (await axios.get<Company[]>("http://localhost:8080/admin/companies")).data;
    }

    async deleteCompany(id: number) {
        return (await axios.delete("http://localhost:8080/admin/delete/company/" + id));
    }

    async getOneCompany(id: number) {
        return (await axios.get<Company>("http://localhost:8080/admin/company/" + id)).data;
    }

    async updateCompany(company: Company) {
        return (await axios.put<Company>("http://localhost:8080/admin/update/company/" + company.id, company)).data;
    }

    async AddCompany(company: Company) {
         return (await axios.post<Company>("http://localhost:8080/admin/add/company", company)).data;
    }

    async getAllCustomers() {
        return (await axios.get<Customer[]>("http://localhost:8080/admin/customers")).data;
    }

    async deleteCustomer(id: number) {
        return (await axios.delete("http://localhost:8080/admin/delete/customer/" + id));
    }

    async AddCustomer(customer: Customer) {
        return (await axios.post<Customer>("http://localhost:8080/admin/add/customer", customer)).data;
   }

   async getOneCustomer(id: number) {
    return (await axios.get<Customer>("http://localhost:8080/admin/customer/" + id)).data;
    }

    async updateCustomer(customer: Customer) {
        return (await axios.put<Customer>("http://localhost:8080/admin/update/customer" , customer)).data;
    }

}

const adminService = new AdminService();
export default adminService;